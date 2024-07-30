# Third Party Imports
from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.exceptions import ValidationError


User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    def to_representation(self, instance):
        created_at = (
            int(instance.created_at.timestamp()) if instance.created_at else None
        )
        updated_at = (
            int(instance.updated_at.timestamp()) if instance.updated_at else None
        )
        data = super().to_representation(instance)

        # Update time in epoch
        data["created_at"] = created_at
        data["updated_at"] = updated_at
        return data

    def validate(self, attributes):
        try:
            if not attributes:
                raise ValidationError("No attributes provided")
            for key, value in attributes.items():
                if value is None:
                    raise ValidationError(f"{key} cannot be None")
            return super().validate(attributes)
        except Exception as e:
            raise e

    class Meta:
        model = User
        fields = [
            "id",
            "full_name",
            "email",
            "image_url",
            "is_active",
            "created_at",
            "updated_at",
            "firebase_id",
        ]


class UserInvoiceListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "image_url",
            "full_name",
        ]
