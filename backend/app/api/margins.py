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

@router.get("/current", response_model=dict)
async def get_current_margin(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get current margin data with history for the logged-in user"""
    margins = db.query(MarginConsultation).filter(
        MarginConsultation.user_id == current_user.id
    ).order_by(MarginConsultation.consulted_at.desc()).all()

    if not margins:
        # Return default empty margin data
        return {
            "available_margin": 0,
            "total_margin": 0,
            "used_margin": 0,
            "employer": None,
            "employment_type": None,
            "history": []
        }

    # Get current (most recent) margin
    current = margins[0]

    # Build history from all consultations
    history = [
        {
            "date": m.consulted_at.strftime("%b %Y").capitalize(),
            "value": float(m.available_margin) if m.available_margin else 0,
            "status": "current" if i == 0 else "past"
        }
        for i, m in enumerate(margins)
    ]

    return {
        "available_margin": float(current.available_margin) if current.available_margin else 0,
        "total_margin": float(current.total_margin) if current.total_margin else 0,
        "used_margin": float(current.used_margin) if current.used_margin else 0,
        "employer": current.employer,
        "employment_type": current.employment_type,
        "history": history
    }

@router.get("", response_model=List[MarginResponse])
async def get_margins(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(MarginConsultation).filter(
        MarginConsultation.user_id == current_user.id
    ).order_by(MarginConsultation.consulted_at.desc()).all()
