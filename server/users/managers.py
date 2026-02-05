from django.contrib.auth.models import BaseUserManager
from django.core.exceptions import ValidationError

class CustomUserManager(BaseUserManager):
    def create_user(
            self,
            user,
            email,
            username, 
            organization_name,
            website,
            country,
            password=None,
            **extra_fields
    ):
        if not email:
            raise ValueError("Email is required")
        if not organization_name or not website:
            raise ValueError("Organization name and website are required")
        email = self.normalize_email(email)

        if self.model.objects.filter(
            organization_name__iexact=organization_name.strip(),
            website__iexact=website.strip()
        ).exists():
            raise ValidationError("An account with this organization already exists.")
        
        user=self.model(
            email=email,
            username=username,
            organization_name=organization_name,
            website=website.strip(),
            country=country,
            **extra_fields
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(
            self,
            email,
            username,
            organization_name,
            website,
            country,
            password=None,
            **extra_fields
    ):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_verified", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")  
        
        return self.create_user(
            email,
            username,
            organization_name,
            website,
            country,
            password,
            **extra_fields
        )