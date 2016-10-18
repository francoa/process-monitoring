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
python manage.py startapp authentication
````