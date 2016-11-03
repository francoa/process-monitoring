from rest_framework import serializers
from cookbook.models import Direction, Recipe


class DirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ("title", "temp", "duration", "description", "img", "autom")

    def create(self, validated_data):
        direction, created = Direction.objects.update_or_create(title=validated_data['title'],
                                                                defaults=validated_data)
        return direction

    def update(self, instance, validated_data):
        instance.title = validated_data.get('title', instance.title)
        instance.temp = validated_data.get('temp', instance.temp)
        instance.duration = validated_data.get('durartion', instance.duration)
        instance.description = validated_data.get('description', instance.description)
        instance.img = validated_data.get('img', instance.img)
        instance.autom = validated_data.get('autom', instance.autom)
        instance.save()
        return instance


class RecipeSerializer(serializers.ModelSerializer):
    directions = DirectionSerializer(many=True)

    class Meta:
        model = Recipe
        fields = ("name", "author", "created_at", "updated_at", "directions")

    def create(self, validated_data):
        directions_data = validated_data.pop('directions')
        recipe = Recipe.objects.create(**validated_data)
        for direction_data in directions_data:
            direction, created = Direction.objects.update_or_create(title=direction_data['title'],
                                                                    defaults=direction_data)
            recipe.directions.add(direction)
        return recipe

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.author = validated_data.get('author', instance.author)

        instance.save()

        directions_update = validated_data.get('directions', None)
        if directions_update:
            instance.directions.clear()
            for direction_update in directions_update:
                direction, created = Direction.objects.update_or_create(title=direction_update['title'],
                                                                        defaults=direction_update)
                instance.directions.add(direction)
            instance.save()

        return instance


class MonitorDirectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Direction
        fields = ("title", "description", "img")


class MonitorRecipeSerializer(serializers.ModelSerializer):
    directions = MonitorDirectionSerializer(many=True, read_only=True)

    class Meta:
        model = Recipe
        read_only_fields = ("name", "directions")
        exclude = ("id","author", "created_at", "updated_at",)
