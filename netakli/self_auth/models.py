from django.contrib.auth import get_user_model
from django.db import models


class SentMessage(models.Model):
    subject = models.CharField(max_length=250, verbose_name='Заголовок', blank=True, null=True)
    email = models.EmailField(verbose_name='почта клиента')
    body = models.TextField('Текст', blank=True, null=True)


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='profile')
    date_joined = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)
