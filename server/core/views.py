from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import CarbonProject, ReductionProjectData, EmissionReport
from .serializers import (
    CarbonProjectSerializer,
    ReductionProjectDataSerializer,
    EmissionReportSerializer
)

from core.services.verification_service import (
    verify_reduction_project,
    verify_emission_report,
    get_marketplace_credits,
    buy_credit,
    retire_credit,
    get_user_owned_credits,
    get_user_retired_credits,
)

# ==============================
# PROJECT SUBMISSION
# ==============================

@api_view(["POST"])
def submit_project(request):
    serializer = CarbonProjectSerializer(data=request.data)

    if serializer.is_valid():
        project = serializer.save()
        return Response({"message": "Project created", "project_id": project.id})

    return Response(serializer.errors)


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


# ==============================
# MARKETPLACE
# ==============================

@api_view(["GET"])
def marketplace_credits(request):
    credits = get_marketplace_credits()
    return Response({"available_credits": credits[:50]})


@api_view(["POST"])
def buy_credit_api(request):
    credit_id = request.data.get("credit_id")
    buyer_id = request.data.get("buyer_id")

    buy_credit(credit_id, buyer_id)

    return Response({"message": "Credit purchased"})


# ==============================
# DASHBOARD / WALLET
# ==============================

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def dashboard_api(request):
    user_id = str(request.user.id)

    owned = get_user_owned_credits(user_id)
    retired = get_user_retired_credits(user_id)

    return Response({
        "owned_credits": len(owned),
        "retired_credits": len(retired),
        "wallet_balance": len(owned) - len(retired)
    })


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def my_credits_api(request):
    user_id = str(request.user.id)
    credits = get_user_owned_credits(user_id)

    return Response({"credits": credits})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def retire_credit_api(request):
    credit_id = request.data.get("credit_id")

    retire_credit(credit_id, str(request.user.id))

    return Response({"message": "Credit retired successfully"})


# ==============================
# EMISSION VERIFICATION API
# ==============================

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def verify_emissions_api(request):
    report_id = request.data.get("report_id")

    result = verify_emission_report(report_id)

    return Response(result)
