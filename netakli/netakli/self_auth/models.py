from django.conf import settings
from django.contrib.auth import get_user_model
from django.db import models
from django.core.cache import cache
from django.utils import timezone
from django.utils.crypto import get_random_string


class SentMessage(models.Model):
    email = models.EmailField(verbose_name='почта клиента')
    confirm = models.BooleanField(default=False)
    activation_code = models.CharField(max_length=14, blank=True)

    def create_activation_code(self):
        code = get_random_string(length=14,
                                 allowed_chars='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789')
        self.activation_code = code
        self.save()
        return self.activation_code

    def send_confirm(self):
        code = self.create_activation_code()
        message = str(settings.CONFIRM_MESSAGE).replace('***', str(code))
        self.user.email_user(subject="Подтверждение почты",
                             message=message,
                             from_email=settings.EMAIL_HOST_USER)


class Profile(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='profile')
    updated_on = models.DateTimeField(auto_now=True)

    def last_seen(self):
        return cache.get('last_seen_%s' % self.user.username)

    def is_online(self):
        if self.last_seen():
            now = timezone.now()
            if now > (self.last_seen() + timezone.timedelta(seconds=settings.USER_ONLINE_TIMEOUT)):
                return False
            else:
                return True
        else:
            return False
