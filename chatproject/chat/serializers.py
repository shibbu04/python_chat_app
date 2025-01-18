from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Message

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class MessageSerializer(serializers.ModelSerializer):
    sender_username = serializers.CharField(source='sender.username', read_only=True)
    receiver_username = serializers.CharField(source='receiver.username', read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'sender', 'receiver', 'sender_username', 'receiver_username', 'content', 'timestamp']