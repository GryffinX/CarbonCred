from core.models import CarbonProject, ReductionProjectData, HashLedgerEntry, EmissionReport
import uuid
import hashlib

def calculate_reduction(reduction_data: ReductionProjectData) -> float:
    
    if reduction_data.solar_capacity_kw and reduction_data.annual_generation_kwh:
        return reduction_data.annual_generation_kwh * 0.7

    if reduction_data.baseline_energy_kwh and reduction_data.post_project_energy_kwh:
        saved_energy = reduction_data.baseline_energy_kwh - reduction_data.post_project_energy_kwh
        return max(saved_energy * 0.5, 0)

    if reduction_data.waste_recycled_kg:
        return reduction_data.waste_recycled_kg * 0.8

    return 0

def verify_reduction_project(project_id: int):

    project = CarbonProject.objects.get(id=project_id)

    if project.submission_type != "reduction":
        return

    reduction_data = project.reduction_data

    reduction_kg = calculate_reduction(reduction_data)

    reduction_data.estimated_reduction_kg = reduction_kg
    reduction_data.save()

    project.estimated_reduction_kg = reduction_kg
    project.ai_status = "approved"
    project.save()

    mint_credits_for_project(project.id)

    return reduction_kg

def get_last_hash():
    last_entry = HashLedgerEntry.objects.order_by("-created_at").first()
    return last_entry.hash if last_entry else "GENESIS"

def generate_hash(data_string: str) -> str:
    return hashlib.sha256(data_string.encode()).hexdigest()

def create_ledger_entry(event_type, credit_id, from_entity, to_entity, metadata):

    prev_hash = get_last_hash()

    data_string = f"{event_type}{credit_id}{from_entity}{to_entity}{metadata}{prev_hash}"

    new_hash = generate_hash(data_string)

    HashLedgerEntry.objects.create(
        event_type=event_type,
        credit_id=credit_id,
        from_entity=from_entity,
        to_entity=to_entity,
        metadata=metadata,
        prev_hash=prev_hash,
        hash=new_hash
    )

def mint_credits_for_project(project_id: int):

    project = CarbonProject.objects.get(id=project_id)

    reduction_kg = int(project.estimated_reduction_kg or 0)

    if reduction_kg <= 0:
        return 0

    minted = 0

    for _ in range(reduction_kg):
        credit_id = str(uuid.uuid4())

        create_ledger_entry(
            event_type="MINT",
            credit_id=credit_id,
            from_entity=str(project.user.id),
            to_entity="MARKET",
            metadata={"project_id": project.id}
        )

        minted += 1

    return minted

def calculate_emissions(report: EmissionReport) -> float:

    electricity_emissions = report.electricity_kwh * 0.7

    diesel_emissions = report.diesel_liters * 2.6
    petrol_emissions = report.petrol_liters * 2.3
    gas_emissions = report.natural_gas_m3 * 2.0

    flight_emissions = report.flight_km * 0.15
    car_emissions = report.car_km * 0.21

    waste_emissions = report.waste_kg * 0.5
    recycling_offset = report.recycled_waste_kg * 0.3

    total = (
        electricity_emissions
        + diesel_emissions
        + petrol_emissions
        + gas_emissions
        + flight_emissions
        + car_emissions
        + waste_emissions
        - recycling_offset
    )

    return max(total, 0)

def calculate_verification_score(report: EmissionReport) -> int:

    score = 0

    if report.electricity_kwh > 0:
        score += 25
    if report.diesel_liters > 0 or report.petrol_liters > 0 or report.natural_gas_m3 > 0:
        score += 25
    if report.flight_km > 0 or report.car_km > 0:
        score += 25
    if report.waste_kg > 0:
        score += 25

    return score

def verify_emission_report(report_id: int):

    report = EmissionReport.objects.get(id=report_id)

    emissions_kg = calculate_emissions(report)
    report.estimated_emissions_kg = emissions_kg
    report.save()

    verification_score = calculate_verification_score(report)

    return {
        "emissions_kg": emissions_kg,
        "verification_score": verification_score
    }
