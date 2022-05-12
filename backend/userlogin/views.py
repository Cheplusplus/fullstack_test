from rest_framework.decorators import api_view, parser_classes
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from main.serializers import UserSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.authtoken.models import Token
from operator import itemgetter
from rest_framework.renderers import JSONRenderer





@api_view(['POST'])
def login_user(request):    
        username, password =   itemgetter('username','password')(request.data)
        user = authenticate(request, username=username, password=password)     
        serializer = UserSerializer(user)
        user_obj = JSONRenderer().render(serializer.data)
        if user is not None and user.is_active:
            try:
                token = Token.objects.create(user=user)
            except:
                token = Token.objects.get(user=user).delete()
                token = Token.objects.create(user=user)
            return Response([token.key, user_obj], status=status.HTTP_200_OK)
        else:
            return Response('', status=status.HTTP_400_BAD_REQUEST)
 

@api_view(['POST'])
def logout_user(request):
    try:
        token = Token.objects.get(key=request.data['token_key'])
        token.delete()
    except AttributeError:
        return Response({"Failed": ("Token not found.")},
                    status=status.HTTP_400_BAD_REQUEST)

    return Response({"success": ("Successfully logged out.")},
                    status=status.HTTP_200_OK)    

    

@api_view(['POST'])
@parser_classes([JSONParser])
def createUser(request):
    user = User.objects.create_user(username=request.data['username'], email=request.data['email'], password=request.data['password'])
    user.save()
    pass


