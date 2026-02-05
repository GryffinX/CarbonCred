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