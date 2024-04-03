from django.urls import path
from . import views

urlpatterns =[
    path('tasks/',views.TasksCreate.as_view(),name='tasks-list'),
    path('notes/delete/<int:pk>/',views.TasksDelete.as_view(),name ="delete-task")
]