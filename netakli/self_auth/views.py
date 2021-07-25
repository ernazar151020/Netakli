from django.contrib.auth import get_user_model
from django.http import JsonResponse
from rest_framework import status
from rest_framework.generics import UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serialzers import RegistrationSerializer, ChangePasswordSerializer, UpdateUserSerializer


class RegistrationView(APIView):
    serializer_class = RegistrationSerializer

    def post(self, request):
        data = request.data
        serializer = self.serializer_class(data=data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return Response('Произошла ошибка, повторите попытку позже.', status=status.HTTP_400_BAD_REQUEST)


class ChangePasswordView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = ChangePasswordSerializer


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdateProfileView(UpdateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = (IsAuthenticated,)
    serializer_class = UpdateUserSerializer
