from rest_framework import serializers
from .models import CarbonProject, ReductionProjectData, EmissionReport


class CarbonProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = CarbonProject
        fields = "__all__"

class ReductionProjectDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReductionProjectData
        fields = "__all__"

class EmissionReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmissionReport
        fields = "__all__"
