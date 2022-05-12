from main.serializers import UserSerializer
from .models import Event
from main.serializers import EventSerializer, UserSerializer
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.permissions  import IsAuthenticated, IsAdminUser


class UserList(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserDetail(generics.RetrieveAPIView):
    permission_classes = [IsAdminUser]
    queryset = User.objects.all()
    serializer_class = UserSerializer


class EventList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    def get(self, request, format=None):
        events = Event.objects.filter(owner=self.request.user)
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data)

class EventDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def toggleReminder(request, pk, format=None):
    ev = Event.objects.get(id=pk)
    ev.reminder = not request.data['reminder']
    ev.save(update_fields=['reminder'])
    return Response('200')