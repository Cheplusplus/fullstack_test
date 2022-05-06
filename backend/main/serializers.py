from dataclasses import fields
from rest_framework.serializers import ModelSerializer
from main.models import Event, Events

class EventSerializer(ModelSerializer):
    class Meta:
        model= Event
        fields = '__all__'

class EventsSerializer(ModelSerializer):
    class Meta:
        model= Events
        fields = '__all__'



