from rest_framework import serializers
from cookbook.models import Direction, Recipe


class RecipeSerializer(serializers.ModelSerializer):
    directions = serializers.StringRelatedField(many=True)

    class Meta:
        model = Recipe
        fields = ("name", "author", "created_at", "updated_at", "directions")


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ("title", "temp", "duration", "description", "img", "autom")
