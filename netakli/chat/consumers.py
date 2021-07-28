import json
import random

from channels.db import database_sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.contrib.auth import get_user_model

from self_auth.models import Profile
from .models import TalkTheme, Message, TotalTheme


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.slug = self.scope['url_route']['kwargs']['slug']
        self.user_id = self.scope["session"]["_auth_user_id"]
        self.total_theme_name = 'theme_%s' % self.slug

        # Join room group
        await self.channel_layer.group_add(
            self.total_theme_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.total_theme_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        body_data_json = json.loads(text_data)
        title = body_data_json['title']
        new_theme = await self.create_new_theme(title=title)
        data = {
            'id': new_theme['id'],
            'created_at': new_theme['created_at'].strftime('%d %B %Y %H:%M'),
            'title': title,
            'author': new_theme['author']
        }
        # Send message to room group
        await self.channel_layer.group_send(
            self.total_theme_name,
            {
                'type': 'new_theme',
                'theme': data
            }
        )

    # Receive message from room group
    async def new_theme(self, event):
        theme = event['theme']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'theme': theme
        }))

    @database_sync_to_async
    def create_new_theme(self, title):
        user = get_user_model().objects.get(id=int(self.user_id))
        profile = Profile.objects.get(user=user)
        total_theme = TotalTheme.objects.get(slug=self.slug)
        new_theme = TalkTheme.objects.create(
            author=profile,
            title=title,
            total_theme=total_theme
        )
        new_theme.users.add(profile)
        new_theme.save()
        data = {
            'id': new_theme.id,
            'created_at': new_theme.created_at,
            'author': {
                'id': new_theme.author.user.id,
                'username': new_theme.author.user.username
            }
        }
        return data


class MessageConsumer(AsyncWebsocketConsumer):

    async def connect(self):
        self.user_id = self.scope["session"]["_auth_user_id"]
        self.theme_id = self.scope['url_route']['kwargs']['theme_id']
        self.chat_group_name = f'chat_{self.theme_id}'

        # Join room group
        await self.channel_layer.group_add(
            self.chat_group_name,
            self.channel_name
        )

        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        await self.channel_layer.group_discard(
            self.chat_group_name,
            self.channel_name
        )

    # Receive message from WebSocket
    async def receive(self, text_data):
        body_data_json = json.loads(text_data)
        message = body_data_json['body']
        new_message = await self.create_new_message(message)
        data = {
            'id': new_message['id'],
            'author': new_message['author'],
            'created_at': new_message['created_at'].strftime('%d %B %Y %H:%M'),
            'sending': new_message['sending'],
            'body': message
        }
        # Send message to room group
        await self.channel_layer.group_send(
            self.chat_group_name,
            {
                'type': 'new_message',
                'message': data
            }
        )

    # Receive message from room group
    async def new_message(self, event):
        message = event['message']

        # Send message to WebSocket
        await self.send(text_data=json.dumps({
            'message': message
        }))

    @database_sync_to_async
    def create_new_message(self, body):
        user = get_user_model().objects.get(id=int(self.user_id))
        profile = Profile.objects.get(user=user)
        chat = TalkTheme.objects.get(id=int(self.theme_id))
        new_mess = Message.objects.create(
            author=profile,
            body=body,
        )
        new_mess.sending.add(chat)
        new_mess.save()
        data = {
            'id': new_mess.id,
            'author': {
                'id': new_mess.author.user.id,
                'username': new_mess.author.user.username
            },
            'created_at': new_mess.created_at,
            'sending': {
                'id': chat.id,
                'title': chat.title,
                'author': {
                    'id': chat.author.user.id,
                    'username': chat.author.user.username
                },
                'created_at': chat.created_at
            }
        }
        return data
