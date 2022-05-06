from unicodedata import name
from models import Event, Events

t = Events(name="To Do List")
t.save()

t.item_set.all()