# Generated by Django 3.2.5 on 2021-07-27 10:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0006_alter_talktheme_author'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='talktheme',
            options={'ordering': ['-created_at']},
        ),
    ]
