# Generated by Django 4.0.4 on 2022-05-06 04:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Item',
            new_name='Event',
        ),
        migrations.RenameModel(
            old_name='ToDoList',
            new_name='Events',
        ),
    ]
