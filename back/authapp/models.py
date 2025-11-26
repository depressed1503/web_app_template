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
