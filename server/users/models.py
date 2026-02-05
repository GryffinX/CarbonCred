from django.db import models
from .managers import CustomUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
# Create your models here.


class User(AbstractBaseUser, PermissionsMixin):
    ROLE_CHOICES = (
        ("sme","Small/Medium Enterprise"),
        ("ngo","NGO"),
        ("org", "Large Organization"),
    )

    email = models.EmailField(unique=True)
    username = models.CharField(
        max_length=50,
        unique=True,
        help_text="Public handle used in URLs and profiles."
    )

    organization_name = models.CharField(max_length=255)
    website = models.URLField()
    country = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)

    carbon_balance = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        default=0.00
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default="sme")
    is_verified = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'organization_name', 'website', 'country']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
    
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['organization_name', 'website'],
                name='unique_organization_identity'
            )
        ]