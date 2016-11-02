from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Code extracted from: https://thinkster.io/django-angularjs-tutorial
# Advice: Start reading class Account and then its Manager

# Manager of Account Model
class AccountManager(BaseUserManager):
    # Create a user (not admin = monitor)
    def create_user(self, password=None, **kwargs):
        # Username is required if missing an error is raised
        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(username=kwargs.get('username'),manager=kwargs.get('manager'))

        account.set_password(password)
        account.save()

        return account

    # Create an admin (user with privileges)
    def create_superuser(self, password, **kwargs):
        account = self.create_user(password, **kwargs)

        # Define as admin
        account.is_admin = True
        account.save()

        return account


# Account Model: inherits from AbstractBaseUser
class Account(AbstractBaseUser):
    # We use the USERNAME_FIELD to login
    username = models.CharField(max_length=40, unique=True)

    # Admin user definition
    is_admin = models.BooleanField(default=False)

    manager = models.BooleanField(default=False)

    # Timestamps of creation and update
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Manager of the Account Model (this model, right here)
    # This attribute will allow to have access to the rest of attr
    # By these expression: Model.objects.get(**kwargs)
    objects = AccountManager()

    # We use email to login
    USERNAME_FIELD = 'username'
    # Username field is compulsory
    # The field named as the 'USERNAME_FIELD' for a custom user model must not be included in 'REQUIRED_FIELDS'.
    REQUIRED_FIELDS = ['manager']

    # Overwrite so string representation has email on it
    def __unicode__(self):
        return self.username

    def get_full_name(self):
        return self.username

    def get_short_name(self):
        return self.username