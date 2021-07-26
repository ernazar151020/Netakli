# Generated by Django 3.2.5 on 2021-07-26 10:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('self_auth', '0002_remove_profile_date_joined'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sentmessage',
            name='body',
        ),
        migrations.RemoveField(
            model_name='sentmessage',
            name='subject',
        ),
        migrations.AddField(
            model_name='sentmessage',
            name='activation_code',
            field=models.CharField(blank=True, max_length=14),
        ),
        migrations.AddField(
            model_name='sentmessage',
            name='confirm',
            field=models.BooleanField(default=False),
        ),
    ]
