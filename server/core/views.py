from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import CarbonProject, ReductionProjectData, EmissionReport
from .serializers import (
    CarbonProjectSerializer,
    ReductionProjectDataSerializer,
    EmissionReportSerializer
)

from core.services.verification_service import (
    verify_reduction_project,
    verify_emission_report
)


@api_view(["POST"])
def submit_project(request):

    project_serializer = CarbonProjectSerializer(data=request.data)

    if project_serializer.is_valid():
        project = project_serializer.save()

        return Response({
            "message": "Project created",
            "project_id": project.id
        })

    return Response(project_serializer.errors)

@api_view(["POST"])
def add_reduction_data(request):

    serializer = ReductionProjectDataSerializer(data=request.data)

    if serializer.is_valid():
        data = serializer.save()

        reduction_kg = verify_reduction_project(data.project.id)

        return Response({
            "message": "Project verified",
            "reduction_kg": reduction_kg
        })

    return Response(serializer.errors)

@api_view(["POST"])
def upload_emissions(request):

    serializer = EmissionReportSerializer(data=request.data)

    if serializer.is_valid():
        report = serializer.save()

        result = verify_emission_report(report.id)

        return Response(result)

    return Response(serializer.errors)



