from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


# Code extracted from: https://thinkster.io/django-angularjs-tutorial
# Advice: Star reading class Account and then its Manager

# Manager of Account Model
class AccountManager(BaseUserManager):
    # Create a user (not admin = monitor)
    def create_user(self, email, password=None, **kwargs):
        # Both email and username are required if missing an error is raised
        if not email:
            raise ValueError('Users must have a valid email address.')

        if not kwargs.get('username'):
            raise ValueError('Users must have a valid username.')

        account = self.model(email=self.normalize_email(email), username=kwargs.get('username'))
        account.set_password(password)
        account.save()

        return account

    # Create an admin (user with )
    def create_superuser(self, email, password, **kwargs):
        account = self.create_user(email, password, **kwargs)

        # Define as admin
        account.is_admin = True
        account.save()

        return account


# Account Model
class Account(AbstractBaseUser):
    # We use the email in the USERNAME_FIELD to login
    email = models.EmailField(unique=True)
    # The user still have a username to be use in profile/urls/post/etc
    username = models.CharField(max_length=40, unique=True)

    # More personal information is optional
    first_name = models.CharField(max_length=40, blank=True)
    last_name = models.CharField(max_length=40, blank=True)
    # Tagline gives the profile a hint of user's personaity
    tagline = models.CharField(max_length=140, blank=True)

    # Admin user definition
    is_admin = models.BooleanField(default=False)

    # Timestamps of creation and update
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Manager of the Account Model (this model, right here)
    objects = AccountManager()

    # We use email to login
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Overwrite so string representation has email on it
    def __unicode__(self):
        return self.email

    # Last functions are Django conventions
    def get_full_name(self):
        return ' '.join([self.first_name, self.last_name])

    def get_short_name(self):
        return self.first_name
