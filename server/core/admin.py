from django.contrib import admin
from .models import CarbonTransaction, HashLedgerEntry
# Register your models here.

admin.site.register(CarbonTransaction)
admin.site.register(HashLedgerEntry)