from django.db import models
import uuid
from django.conf import settings

# Create your models here.

class CarbonTransaction(models.Model):
    TRANSACTION_TYPES = (
        ("earn", "Credits Earned"),
        ("buy","Credits Bought"),
        ("sell", "Credits Sold"),
        ("retire", "Credits Retired"),
        ("expire", "Credits Expired"),
        ("adjust", "Admin Adjustment"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="transactions",
        help_text="Organization whose wallet balance changes."
    )

    amount = models.DecimalField(
        max_digits=12,
        decimal_places=2,
        help_text="Positive = credits added, Negative = credits deducted."
    )

    transaction_type = models.CharField(
        max_length=10,
        choices=TRANSACTION_TYPES
    )

    description = models.TextField(blank=True, null=True)

    reference_id = models.CharField(
        max_length=255,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.user.email} | {self.transaction_type} | {self.amount}"
    
class HashLedgerEntry(models.Model):
    EVENT_TYPES = (
        ("MINT", "Mint Credit"),
        ("TRADE","Transfer Credit"),
        ("RETIRE", "Retire Credit"),
    )

    credit_id = models.UUIDField(
        default=uuid.uuid4,
        db_index=True,
    )

    event_type = models.CharField(
        max_length=10,
        choices=EVENT_TYPES
    )

    from_entity = models.CharField(max_length=255)
    to_entity = models.CharField(max_length=255)

    timestamp = models.DateTimeField(auto_now_add=True)

    metadata = models.JSONField()

    prev_hash = models.CharField(max_length=64)
    hash = models.CharField(max_length=64, unique=True)

    class Meta:
        ordering = ["id"]


    def __str__(self):
        return f"{self.event.type} | {self.credit_id} | {self.hash[:10]}"
    
    def save(self, *args, **kwargs):
        if self.pk is not None:
            raise Exception("Ledger is append-only. Updates are not allowed.")
        super.save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        raise Exception("Ledger entries cannot be deleted.")
    
from django.conf import settings
from django.db import models


class EmissionReport(models.Model):

    QUARTERS = (
        ("Q1", "Quarter 1"),
        ("Q2", "Quarter 2"),
        ("Q3", "Quarter 3"),
        ("Q4", "Quarter 4"),
    )

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="emission_reports"
    )

    year = models.IntegerField()
    quarter = models.CharField(max_length=2, choices=QUARTERS)

    electricity_kwh = models.FloatField()

    diesel_liters = models.FloatField(default=0)
    petrol_liters = models.FloatField(default=0)
    natural_gas_m3 = models.FloatField(default=0)

    flight_km = models.FloatField(default=0)
    car_km = models.FloatField(default=0)

    waste_kg = models.FloatField(default=0)
    recycled_waste_kg = models.FloatField(default=0)

    estimated_emissions_kg = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ("user", "year", "quarter")

    def __str__(self):
        return f"{self.user} - {self.year} {self.quarter}"


class ReductionProjectData(models.Model):

    project = models.OneToOneField(
        "CarbonProject",
        on_delete=models.CASCADE,
        related_name="reduction_data"
    )

    solar_capacity_kw = models.FloatField(null=True, blank=True)
    annual_generation_kwh = models.FloatField(null=True, blank=True)

    baseline_energy_kwh = models.FloatField(null=True, blank=True)
    post_project_energy_kwh = models.FloatField(null=True, blank=True)

    waste_recycled_kg = models.FloatField(null=True, blank=True)

    estimated_reduction_kg = models.FloatField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reduction data for {self.project.title}"
