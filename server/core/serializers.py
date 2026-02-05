from rest_framework import serializers
from .models import CarbonProject, ReductionProjectData, EmissionReport


class CarbonProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonProject
        fields = "__all__"

class ReductionProjectDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReductionProjectData
        fields = [
            "project",
            "solar_capacity_kw",
            "annual_generation_kwh",
            "baseline_energy_kwh",
            "post_project_energy_kwh",
            "waste_recycled_kg",
        ]


class EmissionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionReport
        fields = "__all__"
