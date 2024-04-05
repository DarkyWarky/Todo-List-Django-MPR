from django.urls import path
from . import views

urlpatterns =[
    path('tasks/',views.TasksCreate.as_view(),name='tasks-list'),
    path('tasks/delete/<int:pk>/',views.TasksDelete.as_view(),name ="delete-task"),
    path('tasks/priority/', views.TasksPriorityFilter.as_view(), name="tasks-priority-filter"),
    path('tasks/completed/', views.TasksCompletedFilter.as_view(), name="tasks-completed-filter"),
    path('tasks/remaining/', views.TasksRemainingFilter.as_view(), name="tasks-remaining-filter"),
]