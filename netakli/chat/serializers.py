from rest_framework import serializers
from rest_framework import status

from .models import TalkTheme, TotalTheme, Message


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
    class Meta:
        model = TalkTheme
        fields = ['total_theme', 'created_at', 'title', 'busy', 'messages']
        extra_kwargs = {'messages': {'required': False}}
    
    # def validate_total_theme(self, total_theme):
    #     try: 
    #         TotalTheme.objects.get(slug=str(total_theme))
    #     except:
    #         raise serializers.ValidationError({'total_theme': 'Переданной общей тематики не существует'}, 
    #                                           code=status.HTTP_404_NOT_FOUND)
    #     return total_theme

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        theme = TalkTheme.objects.create(author=user, **validated_data)
        theme.users.add(request.user)
        return theme

    def to_representation(self, instance):
        request = self.context['request']
        representation = super(ThemeSerializer, self).to_representation(instance)
        representation['messages'] = MessageSerializer(instance.messages.all(),
                                                       context={'request': request},
                                                       many=True).data
        return representation
