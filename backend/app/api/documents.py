from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from typing import List
import uuid
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, Document
from app.schemas import DocumentResponse

router = APIRouter()

@router.post("", response_model=DocumentResponse, status_code=201)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = "general",
    simulation_id: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # In production, upload to S3/Cloudinary
    # For now, just save metadata
    file_url = f"/uploads/{uuid.uuid4()}_{file.filename}"

    new_document = Document(
        user_id=current_user.id,
        simulation_id=simulation_id if simulation_id else None,
        document_type=document_type,
        file_name=file.filename,
        file_url=file_url,
        file_size=0  # Would be file.size in real upload
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return new_document

@router.get("", response_model=List[DocumentResponse])
async def get_documents(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    return db.query(Document).filter(Document.user_id == current_user.id).all()
