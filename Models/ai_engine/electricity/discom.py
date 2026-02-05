from datetime import datetime
from datetime import timedelta


def validate_discom_bill(discom_data):
    """
    Step 1:
    Validates structure and sanity of DISCOM bill data.
    """

    required_fields = [
        "meter_number",
        "billing_period_start",
        "billing_period_end",
        "kwh_billed",
        "discom_name",
        "invoice_id"
    ]

    for field in required_fields:
        if field not in discom_data:
            raise ValueError(f"Missing DISCOM field: {field}")

    if discom_data["kwh_billed"] <= 0:
        raise ValueError("DISCOM kWh must be greater than zero")

    # Validate date formats
    try:
        start = datetime.fromisoformat(discom_data["billing_period_start"])
        end = datetime.fromisoformat(discom_data["billing_period_end"])
    except Exception:
        raise ValueError("Invalid date format in DISCOM bill")

    if start >= end:
        raise ValueError("Invalid DISCOM billing period")

    return True


def check_meter_and_continuity(discom_bills):
    """
    Step 2:
    Checks meter number consistency and billing period continuity
    across multiple DISCOM bills.
    """

    if len(discom_bills) < 2:
        return {
            "status": "insufficient_data",
            "explanation": "At least 2 DISCOM bills required for continuity check"
        }

    # Sort bills by billing_period_start
    bills = sorted(
        discom_bills,
        key=lambda x: x["billing_period_start"]
    )

    base_meter = bills[0]["meter_number"]
    issues = []

    for i in range(1, len(bills)):
        prev = bills[i - 1]
        curr = bills[i]

        # Meter consistency check
        if curr["meter_number"] != base_meter:
            issues.append({
                "type": "meter_mismatch",
                "expected": base_meter,
                "found": curr["meter_number"],
                "invoice_id": curr["invoice_id"]
            })

        prev_end = datetime.fromisoformat(prev["billing_period_end"])
        curr_start = datetime.fromisoformat(curr["billing_period_start"])

        # Continuity check (allow 1-day gap)
        if curr_start != prev_end + timedelta(days=1):
            issues.append({
                "type": "billing_gap",
                "previous_invoice": prev["invoice_id"],
                "current_invoice": curr["invoice_id"],
                "expected_start": (prev_end + timedelta(days=1)).isoformat(),
                "found_start": curr_start.isoformat()
            })

    if issues:
        return {
            "status": "issues_detected",
            "issues": issues
        }

    return {
        "status": "continuous",
        "explanation": "Meter number consistent and billing periods continuous"
    }

def compare_kwh_with_ai(discom_bill, ai_input):
    """
    Step 3:
    Compares DISCOM billed kWh with AI-reported kWh for the same period.
    """

    discom_kwh = discom_bill["kwh_billed"]
    ai_kwh = ai_input["kwh"]

    deviation_percent = round(
        ((ai_kwh - discom_kwh) / discom_kwh) * 100,
        2
    )

    abs_dev = abs(deviation_percent)

    if abs_dev <= 3:
        status = "within_tolerance"
        risk_level = "low"
    elif abs_dev <= 7:
        status = "minor_deviation"
        risk_level = "medium"
    else:
        status = "major_deviation"
        risk_level = "high"

    return {
        "discom_kwh": discom_kwh,
        "ai_reported_kwh": ai_kwh,
        "deviation_percent": deviation_percent,
        "status": status,
        "risk_level": risk_level,
        "explanation": (
            "AI-reported electricity consumption compared "
            "against DISCOM billed consumption"
        )
    }

def detect_kwh_anomalies(discom_bills):
    """
    Step 4:
    Detects abnormal kWh trends across multiple DISCOM bills.
    """

    if len(discom_bills) < 3:
        return {
            "status": "insufficient_data",
            "explanation": "At least 3 months of data required for trend analysis"
        }

    # Sort by start date
    bills = sorted(
        discom_bills,
        key=lambda x: x["billing_period_start"]
    )

    anomalies = []

    for i in range(1, len(bills)):
        prev_kwh = bills[i - 1]["kwh_billed"]
        curr_kwh = bills[i]["kwh_billed"]

        change_percent = round(
            ((curr_kwh - prev_kwh) / prev_kwh) * 100,
            2
        )

        abs_change = abs(change_percent)

        if abs_change <= 20:
            level = "normal"
        elif abs_change <= 40:
            level = "suspicious"
        else:
            level = "anomalous"

        if level != "normal":
            anomalies.append({
                "from_invoice": bills[i - 1]["invoice_id"],
                "to_invoice": bills[i]["invoice_id"],
                "change_percent": change_percent,
                "severity": level
            })

    if anomalies:
        return {
            "status": "anomalies_detected",
            "anomalies": anomalies
        }

    return {
        "status": "stable",
        "explanation": "No abnormal kWh trends detected across billing periods"
    }

def aggregate_discom_trust(
    continuity_result,
    kwh_comparison_result,
    trend_result
):
    """
    Step 5:
    Aggregates all DISCOM verification signals into a single trust verdict.
    """

    reasons = []
    risk_score = 0

    # STEP 2: Meter & continuity
    if continuity_result["status"] == "issues_detected":
        risk_score += 40
        reasons.append("Meter inconsistency or billing gaps detected")

    # STEP 3: AI vs DISCOM kWh
    if kwh_comparison_result["risk_level"] == "medium":
        risk_score += 15
        reasons.append("Moderate deviation between AI and DISCOM kWh")
    elif kwh_comparison_result["risk_level"] == "high":
        risk_score += 30
        reasons.append("High deviation between AI and DISCOM kWh")

    # STEP 4: Trend anomalies
    if trend_result["status"] == "anomalies_detected":
        for anomaly in trend_result["anomalies"]:
            if anomaly["severity"] == "suspicious":
                risk_score += 10
            elif anomaly["severity"] == "anomalous":
                risk_score += 20
                reasons.append("Abnormal kWh trend detected")

    # Cap risk score
    risk_score = min(risk_score, 100)

    if risk_score <= 20:
        trust_level = "high"
    elif risk_score <= 50:
        trust_level = "medium"
    else:
        trust_level = "low"

    return {
        "discom_trust_score": 100 - risk_score,
        "trust_level": trust_level,
        "risk_score": risk_score,
        "reasons": reasons if reasons else ["No DISCOM risk factors detected"]
    }
