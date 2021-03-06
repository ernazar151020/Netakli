import random

from django.http import JsonResponse
from rest_framework import status
from rest_framework.decorators import action, api_view
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet, ReadOnlyModelViewSet

from .models import TalkTheme, Censorship, TotalTheme, Message
from .serializers import ThemeSerializer, TotalThemeSerializer, MessageSerializer
from self_auth.models import Profile

from Netakli.permissions import PermissionsMixin


class TotalThemeAPIView(ReadOnlyModelViewSet):
    queryset = TotalTheme.objects.all()
    serializer_class = TotalThemeSerializer


@api_view(['GET'])
def get_filter_by_total(request, slug):
    try:
        total_theme = TotalTheme.objects.get(slug=slug)
        theme = TalkTheme.objects.filter(total_theme=total_theme)
        serializer = ThemeSerializer(theme, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    except :
        raise ValidationError('Переданной общей темы не существует', code=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_self_groups(request, slug):
    """
        Опция фильтрации бесед текущего пользователя
        по слагу общей тематики
    """
    try:
        profile = Profile.objects.get(user=request.user)
    except:
        profile = Profile.objects.create(user=request.user)
    total = TotalTheme.objects.get(slug=slug)
    groups = TalkTheme.objects.filter(total_theme=total, users=profile)
    serializer = ThemeSerializer(instance=groups, many=True, context={'request': request})
    return Response(serializer.data, status=status.HTTP_200_OK)


class ThemeViewSet(ModelViewSet):
    queryset = TalkTheme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = [IsAuthenticated]

    @staticmethod
    def _get_filter_title(title):
        try:
            Censorship.objects.filter(word__icontains__unaccent__trigram_similar=title)
            return True
        except:
            return False

    def create(self, request, *args, **kwargs):
        """
        Создание темы с проверкой на цензуру
        """
        title = request.data.get('title')
        if not self._get_filter_title(title):
            return super().create(request, *args, **kwargs)
        raise ValidationError('Вам стоит сменить наименование темы!', status.HTTP_400_BAD_REQUEST)

    def _error_if_not_theme(self, pk=None, total_theme=None):
        """

        проверка на действительность
        """
        if total_theme and pk:
            try:
                total_theme = TotalTheme.objects.get(slug=total_theme)
                self.queryset.get(total_theme=total_theme, pk=pk)
            except:
                raise ValidationError('Данной темы для обсуждения не нашлось', status.HTTP_404_NOT_FOUND)
        if pk:
            try:
                self.queryset.get(pk=pk)
            except:
                raise ValidationError('Данной темы для обсуждения не нашлось', status.HTTP_404_NOT_FOUND)
        if not self.queryset:
            raise ValidationError({'detail': 'Пока никто не создал тему для обсуждения'}, status.HTTP_404_NOT_FOUND)

    @action(methods=['POST'], detail=False)
    def random_chat(self, request, slug):
        """
        опция рандомного подбора чата
        """
        self._error_if_not_theme()
        start = True
        chat = None
        try:
            total_theme = TotalTheme.objects.get(slug=slug)
        except:
            raise ValidationError('Указана неверная общая тематика')
        while start:
            x = random.randint(int(self.queryset.filter(busy=False, total_them=total_theme).all().count()))
            try:
                chat = self.queryset.get(pk=x)
                start = False
            except:
                continue
        if chat:
            chat.users.add(request.user)
            chat.check_to_busy()
            serializer = self.serializer_class(chat, context={'request': request})
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        else:
            self.random_chat(request)

    @action(methods=['GET'], detail=True)
    def add_mein_chat(self, request, pk):
        """
        опция добавления пользователя в чат
        """
        self._error_if_not_theme(pk=pk)
        try:
            chat = self.queryset.get(busy=False, pk=pk)
            chat.user.add(request.user)
            chat.check_to_busy()
            serializer_data = self.serializer_class(chat, context={'request': request})
            return Response(serializer_data.data)
        except:
            raise ValidationError('К сожалению чат уже занят', status.HTTP_400_BAD_REQUEST)

    @action(methods=['GET'], detail=True)
    def get_messages(self, request, pk):
        """
        Опция вывода сообщений чата
        """
        messages = self.get_object().messages.all()
        serializer = MessageSerializer(messages, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    @action(methods=['GET'], detail=True)
    def logout_from_chat(self, request, pk):
        """
        опция выхода из чата
        """
        self._error_if_not_theme(pk=pk)
        try:
            chat = self.queryset.get(users__icontains=request.user, pk=pk)
            author = chat.author
            for user in chat.users.all():
                if user == request.user and request.user in chat.users.all():
                    chat.users.remove(user)
            if request.user == author and chat.user.all().first() is not None:
                chat.update(creator=chat.user.all().first())
            if chat.users.all().first() is None:
                chat.users.add(author)
                chat.messages.all().delete()
                chat.delete()
                return Response({'success': 'Вы успешно покинули чат'},
                                status=status.HTTP_204_NO_CONTENT)
            chat.save()
            chat.check_to_busy()
            return Response({'success': 'Вы успешно покинули чат'}, status=status.HTTP_204_NO_CONTENT)
        except:
            raise ValidationError('Произошла ошибка, попробуйте покинуть чат позже', status.HTTP_400_BAD_REQUEST)


class MessageViewSet(PermissionsMixin, ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
