from rest_framework import permissions


# Pretty basic permissions
class IsAccountOwner(permissions.BasePermission):
    def has_object_permission(self, request, view, account):
        # If this request is associate with an account
        if request.user:
            # Check if account is the same as the user of request
            return account == request.user
        # In any other case
        return False
