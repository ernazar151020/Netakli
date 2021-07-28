from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('theme/<str:slug>/', consumers.ChatConsumer.as_asgi()),
    path('send_message/<int:theme_id>/', consumers.MessageConsumer.as_asgi())
]
