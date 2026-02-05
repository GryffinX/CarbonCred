import math

class BusinessTravelEmissionModel:
    """
    Business Travel Emissions & Reduction Engine.
    Calculates Scope 3 (Category 6) emissions from flight data.
    """
    
    def __init__(self):
        # Emission Factors (kg CO2e per passenger-km) - Illustrative Standard Factors
        # Logic: Business class has higher emissions due to larger space/weight ratios.
        self.flight_factors = {
            "Economy": 0.15,
            "PremiumEconomy": 0.23,
            "Business": 0.45,
            "First": 0.60
        }
        
        # Reduction Benchmarks (for Credit Generation)
        self.mode_factors = {
            "Flight_ShortHaul": 0.25, # High intensity for short hops
            "Train_Electric": 0.04,   # Low intensity
            "Video_Conference": 0.00  # Zero travel emissions
        }

    def calculate_distance(self, origin_coords, dest_coords):
        """
        Helper: Haversine formula to calculate distance between airport coordinates.
        Input: Tuples (lat, lon)
        """
        R = 6371  # Earth radius in km
        lat1, lon1 = math.radians(origin_coords[0]), math.radians(origin_coords[1])
        lat2, lon2 = math.radians(dest_coords[0]), math.radians(dest_coords[1])
        
        dlat = lat2 - lat1
        dlon = lon2 - lon1
        
        a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
        c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
        
        return R * c

    def process_flight_invoice(self, invoice_data):
        """
        PHASE 1 & 2: Ingests flight invoices/CSV data to estimate Ground Truth emissions.
        """
        # 1. Parse Data Inputs
        origin = invoice_data.get("origin_coords") # Ex: (28.5562, 77.1000) - DEL
        dest = invoice_data.get("dest_coords")     # Ex: (19.0902, 72.8628) - BOM
        seat_class = invoice_data.get("flight_class", "Economy")
        
        # 2. Calculate Distance (Phase 1 Logic)
        distance_km = self.calculate_distance(origin, dest)
        
        # 3. Apply Emission Factors (Phase 2 Ground Truth)
        factor = self.flight_factors.get(seat_class, 0.15)
        
        # Uplift factor for non-direct routing/takeoff-landing intensity (standard 8%)
        uplift = 1.08 
        
        total_emissions_kg = distance_km * factor * uplift
        
        return {
            "trip_id": invoice_data.get("invoice_id"),
            "distance_km": round(distance_km, 2),
            "seat_class": seat_class,
            "ai_estimated_co2_kg": round(total_emissions_kg, 2)
        }

    def calculate_reduction_credit(self, scenario):
        """
        🟢 REDUCTION MODEL (Credit Generation)
        Estimates CO2 avoided by choosing a greener alternative.
        
        Logic: Baseline (what usually happens) - Actual (what happened) = Credit
        """
        distance = scenario['distance_km']
        baseline_mode = scenario['baseline_mode'] # e.g., "Flight_ShortHaul"
        actual_mode = scenario['actual_mode']     # e.g., "Train_Electric" or "Video_Conference"
        
        # Calculate Baseline Emissions (The "Business As Usual" case)
        baseline_co2 = distance * self.mode_factors.get(baseline_mode, 0.25)
        
        # Calculate Actual Emissions
        actual_co2 = distance * self.mode_factors.get(actual_mode, 0.0)
        
        # Avoided Emissions (The Credit)
        avoided_co2 = baseline_co2 - actual_co2
        
        if avoided_co2 < 0:
            return "No Credit (Actual emissions were higher than baseline)"
            
        return {
            "scenario": f"{baseline_mode} replaced by {actual_mode}",
            "baseline_co2_kg": round(baseline_co2, 2),
            "actual_co2_kg": round(actual_co2, 2),
            "carbon_credits_generated_kg": round(avoided_co2, 2)
        }

# --- USAGE SIMULATION ---
travel_model = BusinessTravelEmissionModel()

# 1. Emission Estimation (The Audit Side)
# Data Input: Flight Invoice CSV row
flight_data = {
    "invoice_id": "INV-FLY-998",
    "origin_coords": (28.5562, 77.1000), # Delhi
    "dest_coords": (51.4700, -0.4543),   # London Heathrow
    "flight_class": "Business"
}

audit_result = travel_model.process_flight_invoice(flight_data)
print(f"✈️  Flight Audit Result: {audit_result}")

# 2. Reduction Credit Calculation (The "Green" Side)
# Scenario: Executives took a train (500km) instead of a short-haul flight
reduction_scenario = {
    "distance_km": 500,
    "baseline_mode": "Flight_ShortHaul",
    "actual_mode": "Train_Electric"
}

credit_result = travel_model.calculate_reduction_credit(reduction_scenario)
print(f"🟢 Reduction Credit Result: {credit_result}")