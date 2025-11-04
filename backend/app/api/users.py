from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User
from app.schemas import UserResponse, UserUpdate

router = APIRouter()

@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_me(
    user_data: UserUpdate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_data.name:
        current_user.name = user_data.name
    if user_data.phone:
        current_user.phone = user_data.phone

    db.commit()
    db.refresh(current_user)
    return current_user
