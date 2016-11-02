from django.contrib.auth import update_session_auth_hash
from rest_framework import serializers
from authentication.models import Account


# Serializer: format Django data to JSON
class AccountSerializer(serializers.ModelSerializer):
    # Password is not visible(readable) from the outside and is required only if the user provide a new one
    password = serializers.CharField(write_only=True, required=False)
    new_password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    # This subclass defines metadata the serializer requires to operate
    class Meta:
        # Specifies the model so only attributes of this model can be serialized
        model = Account
        # Here we specifies which attributes of the Account model should be serialized
        fields = ('id', 'username', 'manager', 'created_at', 'updated_at', 'password',
                  'new_password','confirm_password',)
        read_only_fields = ('created_at', 'updated_at')

        # Deserialization: process to convert JSON to Python Object
        # is handled by create and update methods
        # When creating a new object
        def create(self, validated_data):
            return Account.objects.create(**validated_data)

        # When an update is needed on an existing object
        def update(self, instance, validated_data):
            # Username and tagline can be updated
            instance.username = validated_data.get('username', instance.username)
            instance.manager = validated_data.get('manager', instance.manager)

            instance.save()

            new_password = validated_data.get('new_password', None)
            confirm_password = validated_data.get('confirm_password', None)

            if new_password and confirm_password and new_password == confirm_password:
                instance.set_password(new_password)
                instance.save()

            # Session authentication hash must be updated so user does not have
            # to login again
            update_session_auth_hash(self.context.get('request'), instance)

            return instance
