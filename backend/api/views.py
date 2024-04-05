from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,TasksSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Tasks

#--------------------------------------------- Insert & Delete -------------------------------------------#

class TasksCreate(generics.ListCreateAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user_id = user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(user_id=self.request.user)
        else:
            print(serializer.errors)
            
class TasksDelete(generics.DestroyAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user_id = user)


# ------------------------------------------------ Tasks Filters -------------------------------------------------- #


class TasksPriorityFilter(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        priority = self.request.query_params.get('priority')
        queryset = Tasks.objects.filter(user_id=user)
        queryset = queryset.filter(priority=priority)
        queryset = sorted(queryset, key=lambda x: x.priority)
        return queryset

class TasksCompletedFilter(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user_id=user, completed=True)

class TasksRemainingFilter(generics.ListAPIView):
    serializer_class = TasksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Tasks.objects.filter(user_id=user, completed=False)

#-----------------------------------Authorization--------------------------------#

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class =UserSerializer
    permission_classes = [AllowAny]