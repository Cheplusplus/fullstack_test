from django.db import models

class Event(models.Model):
    owner = models.ForeignKey('auth.User', related_name='events', on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    date = models.CharField(max_length=50)
    reminder = models.BooleanField()

    def __str__(self):
        return self.text



