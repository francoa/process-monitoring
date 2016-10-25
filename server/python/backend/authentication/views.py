from django.shortcuts import render
from rest_framework import permissions, viewsets, status, response
from authentication.models import Account
from authentication.serializers import AccountSerializer
from authentication.permissions import IsAccountOwner


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
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
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
            return response.Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        return response.Response({
            'status': 'Bad request',
            'manage': 'Account could not be created with received data'
        }, status=status.HTTP_400_BAD_REQUEST)
