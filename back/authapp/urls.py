from django.urls import path
from .views import LoginView, LogoutView, GetCSRF, ProfileView, RegistrationView

urlpatterns = [
    path("csrf/", GetCSRF.as_view(), name="csrf"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegistrationView.as_view(), name="register"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("logout/", LogoutView.as_view(), name="logout"),
]
