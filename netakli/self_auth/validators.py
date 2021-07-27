from django.conf import settings
from django.contrib.auth import get_user_model

from rest_framework import status, serializers


def check_serializer(serializer):
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        return serializer.data, status.HTTP_201_CREATED
    return serializer.error, status.HTTP_400_BAD_REQUEST


def check_email_domain(email):
    domain = settings.EMAIL_DOMAINS_LIST
    if email.split('@')[1] not in domain:
        raise serializers.ValidationError(
            {"email ": 'Данный домен почтового адреса, к сожалению мы пока не поддерживаем.'})


def check_email_exists(email):
    if get_user_model().objects.filter(email=email).exists():
        raise serializers.ValidationError({"email": "Пользователь с данной почтой уже зарегистрирован."})


# грубо говоря астрактная функция
def check_email_exists_and_domain(email):
    check_email_exists(email)
    check_email_domain(email)


def check_passwords(password1, password2):
    if password1 != password2:
        raise serializers.ValidationError({"password": 'Пароли не совпадают'})
