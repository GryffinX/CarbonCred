from ai_engine.electricity.schema import validate_electricity_input


def calculate_base_emission(data):
    """
    Step 3:
    Converts electricity consumption (kWh)
    into base CO2 emissions (kg).
    """

    # 1. Validate input first (MANDATORY)
    validate_electricity_input(data)

    # 2. India average grid emission factor
    # kg CO2 per kWh
    EMISSION_FACTOR = 0.708

    # 3. Core calculation
    kwh = data["kwh"]
    emission_kg = kwh * EMISSION_FACTOR

    # 4. Return clean, explainable output
    return {
        "calculated_emission_kg": round(emission_kg, 2),
        "emission_factor_used": EMISSION_FACTOR,
        "method": "india_grid_average_v1"
    }

def calculate_ai_emission_range(data):
    """
    Step 4:
    Generates an AI emission range around the base emission.
    """

    base_result = calculate_base_emission(data)
    base_emission = base_result["calculated_emission_kg"]

    # Uncertainty tolerance (±7%)
    TOLERANCE = 0.07

    lower = base_emission * (1 - TOLERANCE)
    upper = base_emission * (1 + TOLERANCE)

    return {
        "calculated_emission_kg": base_emission,
        "ai_emission_range": {
            "lower": round(lower, 2),
            "upper": round(upper, 2)
        },
        "model_version": "electricity_range_v1",
        "explanation": "Calculated using India grid emission factor with ±7% uncertainty"
    }

def authenticate_auditor_emission(data, auditor_emission_kg):
    """
    Step 5:
    Compares auditor-reported emission
    against AI-generated emission range.
    """

    ai_result = calculate_ai_emission_range(data)
    lower = ai_result["ai_emission_range"]["lower"]
    upper = ai_result["ai_emission_range"]["upper"]

    # Check if auditor value lies within AI range
    if lower <= auditor_emission_kg <= upper:
        status = "within_ai_range"
        risk = "low"
    else:
        status = "outside_ai_range"
        risk = "high"

    deviation_percent = (
        (auditor_emission_kg - ai_result["calculated_emission_kg"])
        / ai_result["calculated_emission_kg"]
    ) * 100

    return {
        "auditor_emission_kg": auditor_emission_kg,
        "ai_range": {
            "lower": lower,
            "upper": upper
        },
        "status": status,
        "risk_level": risk,
        "deviation_percent": round(deviation_percent, 2),
        "model_version": "electricity_auth_v1",
        "explanation": "Auditor value compared against AI emission range"
    }

def generate_risk_score(data, auditor_emission_kg):
    """
    Step 6:
    Converts auditor deviation into a numeric risk score (0–100).
    """

    auth_result = authenticate_auditor_emission(data, auditor_emission_kg)

    deviation = abs(auth_result["deviation_percent"])

    # Base risk logic (simple & explainable)
    if deviation <= 5:
        risk_score = 10
    elif deviation <= 10:
        risk_score = 30
    elif deviation <= 20:
        risk_score = 60
    else:
        risk_score = 85

    return {
        "risk_score": risk_score,
        "risk_level": auth_result["risk_level"],
        "deviation_percent": auth_result["deviation_percent"],
        "model_version": "electricity_risk_v1",
        "explanation": "Risk score derived from auditor deviation against AI emission range"
    }

def run_electricity_ai(data, auditor_emission_kg):
    """
    Step 7:
    Master entry-point for electricity AI.
    This is the ONLY function the backend should call.
    """

    base = calculate_base_emission(data)
    ai_range = calculate_ai_emission_range(data)
    auth = authenticate_auditor_emission(data, auditor_emission_kg)
    risk = generate_risk_score(data, auditor_emission_kg)

    return {
        "input": {
            "kwh": data["kwh"],
            "state": data["state"],
            "period": data["period"]
        },
        "base_emission": base,
        "ai_emission_analysis": ai_range,
        "auditor_authentication": auth,
        "risk_assessment": risk,
        "ai_engine_version": "electricity_engine_v1"
    }
