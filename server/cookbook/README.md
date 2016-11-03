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
from cookbook.models import Direction, Recipe
from cookbook.serializers import RecipeSerializer
honey = Recipe.objects.first()
s1 = RecipeSerializer(honey)
s1.data
````
View more info about serializer of Many-to-Many on:
http://www.django-rest-framework.org/api-guide/relations/#stringrelatedfield

## Serializer Create
````python
from cookbook.models import Direction, Recipe
from cookbook.serializers import RecipeSerializer
honey = Recipe.objects.first()
s1 = RecipeSerializer(honey)
new = s1.data
new['name'] = 'kolsch beer'
s1.create(new)
````
## Serializer Update
````python
from cookbook.models import Direction, Recipe
from cookbook.serializers import RecipeSerializer
kolsch = Recipe.objects.get(name='kolsch beer')
kolsch.directions.clear()
honey = Recipe.objects.get(name='Honey Beer')
s1 = RecipeSerializer(honey)
s2 = RecipeSerializer(kolsch)
update = s2.data
update['directions'] = s1.data['directions']
kolsch = s1.update(kolsch, update_directions)
kolsch.directions.all()
````
http://www.django-rest-framework.org/api-guide/relations/#nested-relationships

# Views
viewsets.ModelViewSet will take care of CRUD operations as is defined on serializers
For example:

1. Concerning the monitor point of view. Restricted view and read only
    1. `GET /api/v1/monitor_recipe/` will response with a JSON containing all recipes
    2. `GET /api/v1/monitor_recipe/Honey%20Beer/` will bring a JSON with Honey Beer recipe

1. From the admin point of view. Full recipe and read/write permission
    1. `GET /api/v1/recipe/Honey%20Beer/` same as monitor but full information
    2. `PUT /api/v1/recipe/Honey%20Beer/` with JSON in the body will update information
    3. `PUT /api/v1/recipe/` with JSON will add new recipe if it does not exist
