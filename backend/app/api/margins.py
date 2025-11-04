from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, MarginConsultation
from app.schemas import MarginResponse
import random

router = APIRouter()

@router.post("", response_model=MarginResponse, status_code=201)
async def consult_margin(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # In production, integrate with real margin consultation service
    # For now, return mock data
    total_margin = round(random.uniform(5000, 20000), 2)
    used_margin = round(random.uniform(0, total_margin * 0.5), 2)
    available_margin = round(total_margin - used_margin, 2)

    new_consultation = MarginConsultation(
        user_id=current_user.id,
        available_margin=available_margin,
        used_margin=used_margin,
        total_margin=total_margin,
        employer="Empresa Exemplo",
        employment_type="CLT"
    )

    db.add(new_consultation)
    db.commit()
    db.refresh(new_consultation)

    return new_consultation

@router.get("", response_model=List[MarginResponse])
async def get_margins(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(MarginConsultation).filter(
        MarginConsultation.user_id == current_user.id
    ).order_by(MarginConsultation.consulted_at.desc()).all()
