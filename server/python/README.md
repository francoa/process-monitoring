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
python manage.py ruserver
````
5 Make a new app called authentication
````bash
python manage.py startapp authentiction
````
6 Add to authentication/models.py the Account model and its manager
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