from django.contrib.auth import authenticate
from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["id", "username", "email", "first_name", "last_name"]


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(
            username=data.get("username"),
            password=data.get("password")
        )
        if not user:
            raise serializers.ValidationError("Неверные данные для входа")
        data["user"] = user
        return data

class RegistrationSerializer(serializers.ModelSerializer):
    # входные поля
    last_name = serializers.CharField(max_length=150)
    first_name = serializers.CharField(max_length=150)
    middle_name = serializers.CharField(max_length=150, allow_blank=True, required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ("first_name", "last_name", "middle_name", "email", "password")

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data["password"])
        return CustomUser.objects.create(**validated_data)