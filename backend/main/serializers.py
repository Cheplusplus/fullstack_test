from dataclasses import fields
from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, ReadOnlyField
from main.models import Event
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):
    events = PrimaryKeyRelatedField(many=True, queryset=Event.objects.all())

    class Meta:
        model = User
        fields = ['id', 'username', 'events']

class EventSerializer(ModelSerializer):
    owner = ReadOnlyField(source='owner.username')

    class Meta:
        model= Event
        fields = ['id','owner', 'text', 'date', 'reminder']



