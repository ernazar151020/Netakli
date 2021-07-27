from djoser.serializers import UserSerializer
from rest_framework import serializers, status

from .models import TalkTheme, TotalTheme, Message
from self_auth.serialzers import ProfileSerializer
from self_auth.models import Profile


class TotalThemeSerializer(serializers.ModelSerializer):

    class Meta:
        model = TotalTheme
        fields = '__all__'
    
    def to_representation(self, instance):
        request = self.context['request']
        representation = super().to_representation(instance)
        representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = '__all__'


class ThemeSerializer(serializers.ModelSerializer):
    author = ProfileSerializer(required=False)

    class Meta:
        model = TalkTheme
        fields = '__all__'

    def create(self, validated_data):
        request = self.context.get('request')
        try:
            user = Profile.objects.get(user=request.user)
        except:
            user = Profile.objects.create(user=request.user)
        theme = TalkTheme.objects.create(author=user, **validated_data)
        theme.users.add(user)
        return theme

    def to_representation(self, instance):
        request = self.context['request']
        representation = super(ThemeSerializer, self).to_representation(instance)
        if instance.messages.all():
            representation['messages'] = MessageSerializer(instance.messages.all(),
                                                           context={'request': request},
                                                           many=True).data
        return representation
