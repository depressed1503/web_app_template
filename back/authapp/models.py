from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    user_permissions = models.ManyToManyField(
        to='auth.Permission',
        related_name='custom_users',
        blank=True,
    )
    custom_groups = models.ManyToManyField(
        to='auth.Group',
        related_name='custom_users',
        blank=True,
    )
    username = None   # обязательно
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]
    email = models.EmailField(unique=True, verbose_name="Почта")
    middle_name = models.CharField(default='', max_length=255, verbose_name='Отчество', null=True, blank=True)
