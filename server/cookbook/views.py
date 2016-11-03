from django.shortcuts import render
from rest_framework import viewsets
from cookbook.models import Recipe, Direction
from cookbook.serializers import RecipeSerializer, DirectionSerializer, MonitorRecipeSerializer, \
    MonitorDirectionSerializer


# ModelViewSets: class that comes pre-packaged with all CRUD operations and
# connects directly to an existing model
# CRUD: Create, Retrive, Update, Delete
class DirectionViewSet(viewsets.ModelViewSet):
    # Viewing and editing Direction objects
    queryset = Direction.objects.all()
    serializer_class = DirectionSerializer
    lookup_field = 'title'


class RecipeViewSet(viewsets.ModelViewSet):
    # Viewing and editing Recipe objects
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    lookup_field = 'name'


class MonitorRecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = MonitorRecipeSerializer
    lookup_field = 'name'
