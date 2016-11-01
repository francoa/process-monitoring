from django.db import models


class Direction(models.Model):
    # Instruction itself
    title = models.CharField(max_length=100, unique=True)
    # Temperature and time when is needed
    temp = models.DecimalField(default=0, max_digits=5, decimal_places=2, blank=True)
    duration = models.PositiveSmallIntegerField(default=0, blank=True)
    # Description with an image for clarify
    description = models.TextField(max_length=1000, blank=True)
    img = models.ImageField(max_length=3000, blank=True)
    # If the system should watch for temperature or time
    autom = models.BooleanField(default=False)

    # Overwrite so string representation has title on it
    def __unicode__(self):
        return self.title

    # __str__ on Python 3
    def __str__(self):
        return self.title


class Recipe(models.Model):
    """ Beer Recipes Model """
    # Name of the recipe and author
    name = models.CharField(max_length=100, unique=True)
    author = models.CharField(max_length=100, blank=True)
    # Timestamps of creation and update
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    directions = models.ManyToManyField(Direction)

    # Overwrite so string representation has name on it
    def __unicode__(self):
        return self.name

    # __str__ on Python 3
    def __str__(self):
        return self.name
