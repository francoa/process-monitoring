from django.shortcuts import render
from rest_framework import permissions, viewsets, status, views
from rest_framework.response import Response
from authentication.models import Account
from authentication.serializers import AccountSerializer
from authentication.permissions import IsAccountOwner
import json
from django.contrib.auth import authenticate, login, logout


# View of the API endpoint that will create and Account object
# The ModelViewSet offers an interface for listing, creating, retrieving, updating
# and destroying objects of a given model.
class AccountViewSet(viewsets.ModelViewSet):
    # We will use the username attribute of the Account model to look up accounts
    # instead of the id attribute
    lookup_field = 'username'
    # The viewset will operate on the query set and the serialzier
    # to perform the listed actions
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    # The only user able to modify should be the owner
    def get_permissions(self):
        # If the method is safe allow
        # if self.request.method in permissions.SAFE_METHODS:
            # return (permissions.AllowAny(),)
        # If it is just POST allow
        if self.request.method == 'POST':
            return (permissions.AllowAny(),)
        # In other case
        return (permissions.IsAuthenticated(), IsAccountOwner(),)

    # We override create so we can use our create user to create an Account object
    def create(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            Account.objects.create_user(**serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'manage': 'Account could not be created with received data'
        }, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request):
        data = request.data
        # Extract email and password from request
        username = data.get('username', None)
        password = data.get('password', None)
        # Authenticate information
        account = authenticate(username=username, password=password)
        print(account)
        if account is not None:
            if account.is_active:
                serializer = self.serializer_class(data=request.data)
                if serializer.is_valid():
                    return Response(serializer.data)
                return Response({
                    'status': 'Bad request',
                    'manage': 'Account could not be created with received data'
                }, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'manage': 'This account has been disabled'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'manage': 'Username/password combination invalid'
            }, status=status.HTTP_401_UNAUTHORIZED)


# We are not using the most generic class because
# views.APIView are made specifically to handle AJAX requests
class LoginView(views.APIView):
    def post(self, request, format=None):
        data = request.data
        # Extract email and password from request
        username = data.get('username', None)
        password = data.get('password', None)
        # Authenticate information
        account = authenticate(username=username, password=password)

        if account is not None:
            if account.is_active:
                # Create a new session for this user
                login(request, account)

                serialized = AccountSerializer(account)
                # return JSON of account object
                # to store this information in the browser
                return Response(serialized.data)
            else:
                return Response({
                    'status': 'Unauthorized',
                    'manage': 'This account has been disabled'
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            return Response({
                'status': 'Unauthorized',
                'manage': 'Username/password combination invalid'
            }, status=status.HTTP_401_UNAUTHORIZED)


# Only authenticated users can hit this endpoint
class LogoutView(views.APIView):
    permissions_classes = (permissions.IsAuthenticated,)

    # Just logout with with logout Django method
    def post(self, request, format=None):
        logout(request)
        return Response({}, status=status.HTTP_204_NO_CONTENT)
