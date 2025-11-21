from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from uuid import UUID

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    user_id: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    cpf: Optional[str] = None
    phone: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    name: str
    cpf: Optional[str] = None
    phone: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    name: Optional[str] = None
    phone: Optional[str] = None

class UserResponse(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        from_attributes = True

# Simulation Schemas
class SimulationCreate(BaseModel):
    simulation_type: str
    requested_amount: float
    installments: int
    interest_rate: float

class SimulationResponse(BaseModel):
    id: UUID
    user_id: UUID
    simulation_type: str
    requested_amount: float
    installments: int
    interest_rate: float
    installment_value: float
    total_amount: float
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

# Document Schemas
class DocumentUpload(BaseModel):
    document_type: str
    simulation_id: Optional[UUID] = None

class DocumentResponse(BaseModel):
    id: UUID
    user_id: UUID
    document_type: str
    file_name: str
    file_url: str
    status: str
    created_at: Optional[datetime] = None
    uploaded_at: datetime

    class Config:
        from_attributes = True

# Margin Schemas
class MarginResponse(BaseModel):
    id: UUID
    user_id: UUID
    available_margin: Optional[float]
    used_margin: Optional[float]
    total_margin: Optional[float]
    employer: Optional[str]
    employment_type: Optional[str]
    consulted_at: datetime

    class Config:
        from_attributes = True

# Notification Schemas
class NotificationResponse(BaseModel):
    id: UUID
    title: str
    message: str
    type: str
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True
