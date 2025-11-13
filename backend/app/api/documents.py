from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, Body
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
import uuid
from app.core.database import get_db
from app.api.auth import get_current_user
from app.models import User, Document
from app.schemas import DocumentResponse

router = APIRouter()

class DocumentMetadata(BaseModel):
    document_type: str
    file_name: str
    file_url: str
    file_size: int
    simulation_id: Optional[str] = None

@router.post("", response_model=DocumentResponse, status_code=201)
async def create_document(
    document_data: DocumentMetadata,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Create a document with metadata (for mobile app uploads to external storage)"""
    new_document = Document(
        user_id=current_user.id,
        simulation_id=document_data.simulation_id if document_data.simulation_id else None,
        document_type=document_data.document_type,
        file_name=document_data.file_name,
        file_url=document_data.file_url,
        file_size=document_data.file_size
    )

    db.add(new_document)
    db.commit()
    db.refresh(new_document)

    return new_document

@router.post("/upload", response_model=DocumentResponse, status_code=201)
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = "general",
    simulation_id: str = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload a document file directly (for web uploads)"""
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
