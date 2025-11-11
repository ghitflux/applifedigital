from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, Simulation
from app.schemas import SimulationCreate, SimulationResponse

class StatusUpdate(BaseModel):
    status: str

router = APIRouter()

@router.post("", response_model=SimulationResponse, status_code=201)
async def create_simulation(
    simulation_data: SimulationCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Calculate values
    monthly_rate = simulation_data.interest_rate / 100
    installment_value = (
        simulation_data.requested_amount * monthly_rate *
        (1 + monthly_rate) ** simulation_data.installments
    ) / ((1 + monthly_rate) ** simulation_data.installments - 1)

    total_amount = installment_value * simulation_data.installments

    new_simulation = Simulation(
        user_id=current_user.id,
        simulation_type=simulation_data.simulation_type,
        requested_amount=simulation_data.requested_amount,
        installments=simulation_data.installments,
        interest_rate=simulation_data.interest_rate,
        installment_value=round(installment_value, 2),
        total_amount=round(total_amount, 2)
    )

    db.add(new_simulation)
    db.commit()
    db.refresh(new_simulation)

    return new_simulation

@router.get("", response_model=List[SimulationResponse])
async def get_simulations(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Simulation).filter(Simulation.user_id == current_user.id).all()

@router.get("/{simulation_id}", response_model=SimulationResponse)
async def get_simulation(
    simulation_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    simulation = db.query(Simulation).filter(
        Simulation.id == simulation_id,
        Simulation.user_id == current_user.id
    ).first()

    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    return simulation

@router.put("/{simulation_id}/status", response_model=SimulationResponse)
async def update_simulation_status(
    simulation_id: str,
    status_data: StatusUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    simulation = db.query(Simulation).filter(
        Simulation.id == simulation_id,
        Simulation.user_id == current_user.id
    ).first()

    if not simulation:
        raise HTTPException(status_code=404, detail="Simulation not found")

    # Validate status
    valid_statuses = ['pending', 'approved', 'rejected']
    if status_data.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {', '.join(valid_statuses)}")

    simulation.status = status_data.status
    db.commit()
    db.refresh(simulation)

    return simulation
