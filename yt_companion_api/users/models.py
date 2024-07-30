from django.db import models
from django.contrib.auth.models import AbstractUser
from users.mixins import UUIDMixin
from users.constants import DEFAULT_DP



class CustomUser(AbstractUser, UUIDMixin):
    password = models.CharField(max_length=128, null=True, blank=True)
    email = models.EmailField(null=False, unique=False)
    # username = models.CharField(null=True, blank=True, unique=True, max_length=20)
    full_name = models.CharField(max_length=200, null=True)
    image_url = models.URLField(max_length=500, null=False, blank=False, default=DEFAULT_DP)
    created_at = models.DateTimeField(auto_now_add=True, editable=False, null=True)
    updated_at = models.DateTimeField(auto_now=True, editable=False, null=True)
    firebase_id = models.CharField(max_length=255, null=True, unique=True)
    # role = models.CharField(max_length=50, null=True, blank=True, choices=ROLE_CHOICES)
    
    def __str__(self) -> str:
        return f"{self.id} | {self.email}"
