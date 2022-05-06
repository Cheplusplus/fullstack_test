from django.db import models

# Create your models here.
class Events(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Event(models.Model):
    todolist = models.ForeignKey(Events, on_delete=models.CASCADE)
    text = models.CharField(max_length=300)
    date = models.CharField(max_length=50)
    reminder = models.BooleanField()

    def __str__(self):
        return self.text

    def get_all(this):
        return {"text":this.text, "date":this.date, "reminder":this.reminder}


