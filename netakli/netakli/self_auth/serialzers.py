from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.utils import timezone
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from collections import OrderedDict

from .models import SentMessage, Profile
from .validators import check_email_domain, check_passwords, check_email_exists_and_domain


class RegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password', 'password2')

    @staticmethod
    def validate_username(username):
        alpha = 'qwertyuiopasdfghjklzxcvbnm0123456789_'
        if get_user_model().objects.filter(username=username).exists():
            raise serializers.ValidationError({"username": 'Пользователь с данным ником уже зарегистрирован'})
        for letter in list(username):
            if str(letter).lower() not in alpha:
                raise serializers.ValidationError({"username": 'Ваш Ник должен содержать только латинские буквы'})
        return username

    def validate(self, attrs):
        check_passwords(attrs['password'], attrs['password2'])
        if attrs.get('email'):
            check_email_exists_and_domain(attrs.get('email'))
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        user = get_user_model().objects.create_user(**validated_data)
        try:
            Profile.objects.get(user=user)
        except:
            Profile.objects.create(user=user)
        if user.email:
            SentMessage.objects.create(email=user.email)
        return user

    def to_representation(self, instance):
        ret = OrderedDict()
        refresh = RefreshToken.for_user(user=instance)
        ret['refresh'] = str(refresh)
        ret['access'] = str(refresh.access_token)
        return ret


class ChangePasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ('old_password', 'password', 'password2')

    def validate(self, attrs):
        check_passwords(attrs['password'], attrs['password2'])
        return attrs

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError({"old_password": "Старый пароль не верен! Введите правельный пароль"})
        return value

    def update(self, instance, validated_data):
        user = self.context['request'].user
        if user.pk != instance.pk:
            raise serializers.ValidationError({"authorize": "Вы вели неверные данные."})
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class ForgotPasswordSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ('email',)

    @staticmethod
    def _get_mail_obj(email):
        try:
            mail = SentMessage.objects.get(email=email)
            mail.confirm = False
            mail.save()
        except:
            mail = SentMessage.objects.create(email=email)
        return mail

    def validate_email(self, email):
        if not get_user_model().objects.filter(email=email).exists():
            raise serializers.ValidationError({"email": "Пользователь с данной почтой не зарегистрирован."})
        check_email_domain(email)
        mail = self._get_mail_obj(email)
        mail.send_confirm()
        return email


class ChangeForgotPasswordSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = get_user_model()
        fields = ('password', 'password2')

    def validate(self, attrs):
        check_passwords(attrs['password'], attrs['password2'])
        return attrs

    def update(self, instance, validated_data):
        instance.set_password(validated_data['password'])
        instance.save()
        return instance


class UpdateUserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)

    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'last_name', 'email')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate_email(self, value):
        user = self.context['request'].user
        if get_user_model().objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError({"email": "Пользователь с данной почтой уже зарегистрирован"})
        return value

    def validate_username(self, value):
        user = self.context['request'].user
        if get_user_model().objects.exclude(pk=user.pk).filter(username=value).exists():
            raise serializers.ValidationError({"username": "Пользователь с данным ником уже зарегистрирован."})
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data['first_name']
        instance.last_name = validated_data['last_name']
        instance.email = validated_data['email']
        instance.username = validated_data['username']
        instance.save()
        profile = None
        try:
            profile = Profile.objects.get(user=instance)
        except:
            profile = Profile.objects.create(user=instance)
        finally:
            if profile:
                profile.updated_on = timezone.now()
                profile.save()
        return instance


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'

    @staticmethod
    def _get_user_data(instance):
        res = OrderedDict()
        res['username'] = instance.user.username
        if instance.user.first_name:
            res['first_name'] = instance.user.first_name
        if instance.user.last_name:
            res['last_name'] = instance.user.last_name
        res['date_joined'] = instance.user.date_joined
        res['updated_on'] = instance.updated_on
        return res

    def to_representation(self, instance):
        res = self._get_user_data(instance)
        representation = super().to_representation(instance)
        representation['user'] = res
        return representation
