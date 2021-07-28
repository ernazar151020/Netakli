from django.contrib import admin

from .models import TalkTheme, TotalTheme, Message

admin.site.register(TotalTheme)
admin.site.register(TalkTheme)
admin.site.register(Message)
