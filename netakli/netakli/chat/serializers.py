from rest_framework import serializers

from .models import TalkTheme, TotalTheme


class TotalThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TotalTheme
        fields = '__all__'
    
    def to_representation(self, instance):
        request = self.context['request']
        representation = super().to_representation(instance)
        representation['image'] = request.build_absolute_uri(instance.image.url)
        return representation

class ThemeSerializer(serializers.ModelSerializer):
    class Meta:
        model = TalkTheme
        fields = ['total_theme', 'created_at', 'title', 'busy', 'send_to']

    def create(self, validated_data):
        request = self.context.get('request')
        slug = self.context.get('slug')
        total_theme = TotalTheme.objects.get(slug=slug)
        theme = TalkTheme.objects.create(total_theme=total_theme, **validated_data)
        theme.users.add(request.user)
        return theme
