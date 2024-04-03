from django.db import models
from django.contrib.auth.models import User

class Tasks(models.Model):
    PRIORITY_CHOICE=[(1,'Low'),(2,'Medium'),(3,'Normal'),(4,'High'),(5,'Very High')]
    title = models.CharField(max_length = 100)
    content = models.TextField(blank=True)
    completed = models.BooleanField(default=False)
    user_id = models.ForeignKey(User,on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    priority = models.IntegerField(choices=PRIORITY_CHOICE)

    def __str__(self) :
        return self.title

