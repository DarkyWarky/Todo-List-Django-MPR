from django.contrib.auth.models import User
from rest_framework import serializers
from api.models import Tasks


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password","id"]
        extra_kwargs = {"password": {"write_only": True},'id': {'read_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class TasksSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = ['title', 'content', 'completed', 'user_id', 'created_at', 'priority','due_date','id']
        extra_kwargs = {"user_id":{"read_only":True}}
        