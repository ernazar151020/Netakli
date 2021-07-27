from django.contrib.auth.models import User
from django.db import models

from self_auth.models import Profile


class Censorship(models.Model):
    """
    Модель цензуры
    """
    word = models.CharField(max_length=250, unique=True)


class TotalTheme(models.Model):
    """
    Модель общей тематики
    """
    image = models.ImageField(upload_to='total-theme', blank=True, null=True)
    slug = models.SlugField(verbose_name='Слаг', max_length=250, primary_key=True)
    title = models.CharField(verbose_name='Наименование общей темы', max_length=250)
    created_at = models.DateTimeField(auto_now_add=True)


class TalkTheme(models.Model):
    """
    Модель тематики
    """
    total_theme = models.ForeignKey(TotalTheme, on_delete=models.CASCADE, related_name='total')
    title = models.CharField(max_length=250, verbose_name='Наименование')
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.DO_NOTHING, related_name='author')
    users = models.ManyToManyField(Profile, related_name='participants', blank=True)
    busy = models.BooleanField(default=False)

    def check_to_busy(self):
        if int(self.participants.all().count()) == 2:
            self.busy = True
            return self.save()
        elif int(self.participants.all().count()) < 2:
            self.busy = False
            return self.save()
        elif not self.participants.all():
            return self.delete()
        else:
            self.paticipants.all().last().remove()


class Message(models.Model):
    """
    Сообщения в теме
    """
    body = models.TextField(verbose_name='Текст')
    author = models.ForeignKey(Profile, on_delete=models.DO_NOTHING, related_name='author')
    sending = models.ManyToManyField(TalkTheme, related_name='send_to', blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
