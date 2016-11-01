# Create a recipe

Import modules
````python
from cookbook.models import Direction, Recipe
````
Create a recipe:
````python
honey = Recipe.objects.create(name='Honey Beer')
honey.save()
````
Create directions and Add:
````python
i1= Direction.objects.create(title="Calentar Agua")
honey.directions.add(i1)
````
or create and add in one step
````python
honey.directions.create(title='Colocar bombas para trasvase de agua')
honey.directions.create(title='Alcanzar TC de olla licor')
honey.directions.create(title='Alcanzar TC para macerar', temp=73.0)
````
for more details see
https://docs.djangoproject.com/en/dev/topics/db/examples/many_to_many/

# Serializer
````python
from cookbook.serializers import RecipeSerializer
honey = Recipe.objects.first()
s1 = RecipeSerializer(honey)
s1.data
````
