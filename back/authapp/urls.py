from django.urls import path
from .views import LoginView, LogoutView, MeView, GetCSRF, RegistrationView

urlpatterns = [
    path("csrf/", GetCSRF.as_view(), name="csrf"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegistrationView.as_view(), name="register"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path("me/", MeView.as_view(), name="me"),
]
