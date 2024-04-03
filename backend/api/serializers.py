from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Tasks


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['title', 'content', 'completed', 'user_id', 'created_at', 'priority']
        extra_kwargs = {"user_id":{"readonly":True}}