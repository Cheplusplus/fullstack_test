import json
from .models import Events, Event
from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from main.serializers import EventSerializer, EventsSerializer


@api_view(['GET', 'DELETE'])
def index(request, id):

    ev = Events.objects.get(id=id)
    ev = ev.event_set.all()
    ser = EventSerializer(ev, many=True)
    return Response(ser.data)

@api_view(['POST'])
@parser_classes([JSONParser])
def addEvent(request, id , format=None):
    ev = Events.objects.get(id=id)
    print(request.data)
    ev.event_set.create(text=request.data['text'], date=request.data['date'], reminder=request.data['reminder'])
    return Response('200')

@api_view(['DELETE'])
@parser_classes([JSONParser])
def deleteEvent(request, id, format=None):
    ev = Events.objects.get(id=1)
    ev.event_set.get(id=id).delete()
    return Response('200')