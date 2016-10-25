# STEPS
1 Set VirtualEnv and activate
````bash
mkdir ~/.virtualenvs
python3 -m venv ~/.virtualenvs/djangodev
source ~/.virtualenvs/djangodev/bin/activate
````
2 Install Django
````bash
pip3 install Django
````
3 Create project
````bash
mkdir python && cd python
django-admin startproject backend
````
4 Verify it works
````bash
cd backend
python manage.py runserver
````
5 Make a new app called authentication
````bash
python manage.py startapp authentiction
````
6 Add to authentication/models.py the Account model and its manager.
When you want to get a model instance in Django, you use an expression of the form Model.objects.get(**kwargs). The objects attribute here is a Manager class whose name typically follows the modelnameManager convention.
7 Update backend/settings.py to set Account as our authentication model. Add at the end of file
````python
AUTH_USER_MODEL = 'authentication.Account'
````
8 Install authentication app by appending 'authentication' to INSTALLED_APPS on backend/settings.py
````python
INSTALLED_APPS = (
    ...,
    'authentication',
)
````
9 Migrations: is the process of creating the table for our model in the database and offer us a way to rollback the changes if we make a mistake.
Now generate the migrations for the authentication app and apply them:
````bash
python manage.py makemigrations
python manage.py migrate
````
----
10 Create a superuser, that is to say an admin user
Run:
````bash
python manage.py createsuperuser
````
11 Open Django's shell:
````bash
python manage.py shell
````
We can have access to attributes of Account object
````python
>>> from authentication.models import Account
>>> a = Account.objects.latest('created_at')
>>> a
>>> a.email
>>> a.username
````
----
> Serializing the Account Model:
 This is the process of transforming Django models to JSON.
 To this purpose we use djangorestframework
````bash
pip3 install djangorestframework
````
Add 'rest_framework' to your INSTALLED_APPS setting.
````python
INSTALLED_APPS = (
    ...
    'rest_framework',
)
````

12 The serializer is called AccountSerializer. 
Create the file authentication/serializers.py and define AccountSerializer class

13 Check if Account object is serialized JSON.
Open Django shell again: ````python manage.py shell ````
Run:
````python
>>> from authentication.models import Account
>>> from authentication.serializers import AccountSerializer
>>> account = Account.objects.latest('created_at')
>>> serialized_account = AccountSerializer(account)
>>> serialized_account.data.get('email')
>>> serialized_account.data.get('username')
>>> serialized_account.data
````
----
14 Account API viewset. To register a user, we need an API endpoint that will create an Account object, an AngularJS service to make an AJAX request to the API and a registration form.
Edit authentication/views.py and authentication/permissions.py
15 Adding an API endpoint.
Add the view and routers(from rest_framework) to URLs file. Update backend/urls.py
----
(Creo que esto es mas frontend)
16 Angular service for registering new users

