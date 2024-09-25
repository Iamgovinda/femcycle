from rest_framework import serializers, status
from rest_framework.exceptions import APIException


class CustomValidationError(APIException):
    status_code = status.HTTP_400_BAD_REQUEST
    default_code = "invalid"

    def __init__(self, detail=None, code=None):
        if not isinstance(detail, dict):
            raise serializers.ValidationError("Invalid Input")
        self.detail = detail
