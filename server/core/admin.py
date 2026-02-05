from django.contrib import admin
from .models import CarbonTransaction, HashLedgerEntry, CarbonProject, EmissionReport, ReductionProjectData
# Register your models here.

admin.site.register(CarbonTransaction)
admin.site.register(HashLedgerEntry)
admin.site.register(CarbonProject)
admin.site.register(EmissionReport)
admin.site.register(ReductionProjectData)

