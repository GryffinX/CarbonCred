class FuelEmissionModel:
    """
    Fuel Consumption & Generator Efficiency Engine.
    Calculates Scope 1 emissions from Diesel, Petrol, and LPG.
    """
    
    def __init__(self):
        # Phase 2: Emission Factor Database (kg CO2e per unit) 
        # Standard factors (e.g., DEFRA/IPCC)
        self.fuel_factors = {
            "Diesel": 2.68,   # kg CO2 per Litre
            "Petrol": 2.31,   # kg CO2 per Litre
            "LPG": 1.51,      # kg CO2 per Litre
            "NaturalGas": 1.8 # kg CO2 per m3
        }
        
        # Benchmarks for Anomaly Detection (Phase 1 AI checks) 
        # Expected efficiency ranges
        self.efficiency_benchmarks = {
            "Diesel_Generator_Industrial": (3.0, 4.0), # kWh generated per Litre
            "Fleet_Truck_Heavy": (2.5, 4.0)            # km per Litre
        }

    def process_fuel_evidence(self, invoice_data, usage_log):
        """
        Phase 1 & 3: Cross-verifies Invoice (Financial) vs Usage Log (Operational).
        Inputs:
            invoice_data: {liters_bought, fuel_type, invoice_id}
            usage_log: {hours_run, odometer_km, fuel_consumed_log}
        """
        # 1. Extract Data
        qty_bought = invoice_data.get('liters_bought')
        qty_logged = usage_log.get('fuel_consumed_log')
        fuel_type = invoice_data.get('fuel_type')
        
        # 2. Integrity Check (Phase 3 logic: Fuel quantity vs Claimed usage) 
        # Allow small tolerance for tank level differences
        if abs(qty_bought - qty_logged) > (qty_bought * 0.05):
            return {
                "status": "FLAG",
                "reason": f"Mismatch: Bought {qty_bought}L but Logged {qty_logged}L",
                "risk_score": 80
            }
            
        # 3. Calculate Scope 1 Emissions (Phase 2 Ground Truth) 
        factor = self.fuel_factors.get(fuel_type, 0)
        total_emissions = qty_bought * factor
        
        return {
            "status": "VERIFIED",
            "fuel_type": fuel_type,
            "total_liters": qty_bought,
            "ai_calculated_co2_kg": round(total_emissions, 2)
        }

    def analyze_efficiency(self, usage_data):
        """
        AI-assisted checks (Phase 0/1): Detects anomalies in machine specs vs logs. 
        """
        asset_type = usage_data.get("asset_type") # e.g., "Diesel_Generator_Industrial"
        output = usage_data.get("output_value")   # e.g., 500 kWh produced
        fuel_used = usage_data.get("fuel_used")   # e.g., 200 Liters
        
        # Calculate actual efficiency
        if fuel_used == 0: return "Error: Zero fuel"
        actual_efficiency = output / fuel_used
        
        # Compare against Industry Benchmarks
        min_eff, max_eff = self.efficiency_benchmarks.get(asset_type, (0, 0))
        
        if actual_efficiency < min_eff:
            # Low efficiency suggests fuel theft or poor maintenance (Risk++)
            return {
                "alert": "Low Efficiency - Potential Fuel Leak/Theft", 
                "metric": f"{actual_efficiency} unit/L (Expected > {min_eff})"
            }
            
        return {"status": "Normal Operation", "efficiency": round(actual_efficiency, 2)}

    def calculate_reduction_credit(self, scenario):
        """
        🟢 REDUCTION MODEL (Credit Generation)
        Calculates CO2 avoided by switching to cleaner fuels or electrification.
        """
        energy_amount = scenario['energy_required'] # e.g., 1000 kWh needed
        baseline_fuel = scenario['baseline_fuel']   # e.g., "Diesel"
        new_source = scenario['new_source']         # e.g., "Solar_Hybrid" or "Biodiesel"
        
        # 1. Baseline Emissions (The "Dirty" Scenario)
        # Assume standard generator efficiency of 3.3 kWh/L for Diesel
        baseline_liters_needed = energy_amount / 3.3
        baseline_emissions = baseline_liters_needed * self.fuel_factors['Diesel']
        
        # 2. Project Emissions (The "Clean" Scenario)
        if new_source == "Solar_Hybrid":
            project_emissions = 0 # Direct zero emissions
        elif new_source == "Biodiesel":
            # Biodiesel (B100) often rated ~0.4 kg CO2/L (lifecycle) vs 2.68 for Diesel
            project_liters_needed = energy_amount / 3.0 # Slightly lower efficiency
            project_emissions = project_liters_needed * 0.4 
        else:
            project_emissions = baseline_emissions # No change
            
        # 3. Credit Calculation
        avoided_co2 = baseline_emissions - project_emissions
        
        return {
            "scenario": f"Switch {baseline_fuel} -> {new_source}",
            "baseline_co2_kg": round(baseline_emissions, 2),
            "project_co2_kg": round(project_emissions, 2),
            "credits_generated": round(avoided_co2, 2)
        }

# --- USAGE SIMULATION ---
fuel_ai = FuelEmissionModel()

# 1. Processing Invoices & Logs (Audit Check)
# Data: Invoice says 1000L Diesel purchased. Log says generator ran 20 hours at 50L/hr.
invoice_input = {"liters_bought": 1000, "fuel_type": "Diesel", "invoice_id": "INV-FUEL-001"}
log_input = {"fuel_consumed_log": 1000, "hours_run": 20}

audit_result = fuel_ai.process_fuel_evidence(invoice_input, log_input)
print(f"⛽ Fuel Audit Result: {audit_result}")

# 2. Efficiency Check (Anomaly Detection)
# Data: Generator produced 3000 kWh using 1000 Liters (Efficiency = 3.0 kWh/L)
machine_data = {
    "asset_type": "Diesel_Generator_Industrial",
    "output_value": 3000, # kWh
    "fuel_used": 1000     # Liters
}
efficiency_check = fuel_ai.analyze_efficiency(machine_data)
print(f"⚙️  Efficiency Check: {efficiency_check}")

# 3. Reduction Credit (Green Project)
# Data: Replacing a Diesel Generator (needs 1000 kWh) with Solar
green_project = {
    "energy_required": 1000, # kWh
    "baseline_fuel": "Diesel",
    "new_source": "Solar_Hybrid"
}
credit_result = fuel_ai.calculate_reduction_credit(green_project)
print(f"🟢 Credit Generation: {credit_result}")