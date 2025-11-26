from django.contrib.auth import login, logout
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from .serializers import LoginSerializer, UserSerializer


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


class LogoutView(APIView):
    """
    Logout
    """
    def post(self, request):
        logout(request)
        return Response({"detail": "logged out"})


class MeView(APIView):
    """
    Текущий пользователь
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(UserSerializer(request.user).data)
