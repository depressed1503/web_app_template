from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import LoginSerializer, ProfileSerializer, UserSerializer, RegistrationSerializer


class GetCSRF(APIView):
    """
    Выдаёт CSRF-токен.
    SPA дергает это при старте.
    """
    def get(self, request):
        return Response({"csrfToken": get_token(request)})


class LoginView(APIView):
    """
    Login через session auth
    """
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data["user"]
        login(request, user)
        return Response({"detail": "ok", "user": UserSerializer(user).data})


class RegistrationView(APIView):
    """
    Регистрация пользователя.
    Поля: f, i, o, email, password
    После регистрации — сразу логин.
    """

    def post(self, request):
        serializer = RegistrationSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        user = serializer.save()  # создание пользователя
        login(request, user)      # логиним сразу после регистрации

        return Response(
            {
                "detail": "ok",
                "user": UserSerializer(user).data
            },
            status=status.HTTP_201_CREATED
        )

class LogoutView(APIView):
    """
    Logout
    """
    def post(self, request):
        logout(request)
        return Response({"detail": "logged out"})

class ProfileView(APIView):
    """
    GET — возвращает профиль
    PUT — обновляет профиль
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = ProfileSerializer(request.user)
        return Response(serializer.data)

    def put(self, request):
        serializer = ProfileSerializer(
            request.user, 
            data=request.data, 
            partial=True  # можно обновлять частично
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)