from django.contrib import admin

from .models import SentMessage, Profile

admin.site.register(SentMessage)
admin.site.register(Profile)
