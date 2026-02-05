def validate_electricity_input(data):
    """
    Validates input data for electricity emission calculation.
    This runs BEFORE any AI logic.
    """

    required_fields = ["kwh", "state", "period"]

    # 1. Check required fields
    for field in required_fields:
        if field not in data:
            raise ValueError(f"Missing required field: {field}")

    # 2. Validate kWh
    if not isinstance(data["kwh"], (int, float)):
        raise ValueError("kwh must be a number")

    if data["kwh"] <= 0:
        raise ValueError("kwh must be greater than zero")

    # 3. Validate state
    if not isinstance(data["state"], str) or not data["state"].strip():
        raise ValueError("state must be a non-empty string")

    # 4. Validate period
    if not isinstance(data["period"], str) or not data["period"].strip():
        raise ValueError("period must be a non-empty string")

    return True
