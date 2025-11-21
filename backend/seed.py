#!/usr/bin/env python3
"""
Seed script to populate the database with fake data for testing
"""
import os
import sys
import uuid
from datetime import datetime, timedelta
import random
from decimal import Decimal

# Add the backend folder to the path
sys.path.insert(0, os.path.dirname(__file__))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from app.core.config import settings
from app.core.database import Base
from app.models import (
    User,
    UserProfile,
    Simulation,
    MarginConsultation,
    Document,
    Notification,
    ActivityLog
)
from passlib.context import CryptContext

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Names for fake data
FIRST_NAMES = [
    "João", "Maria", "Pedro", "Ana", "Carlos",
    "Patricia", "Felipe", "Sandra", "Bruno", "Juliana"
]
LAST_NAMES = [
    "Silva", "Santos", "Oliveira", "Costa", "Ferreira",
    "Gomes", "Martins", "Sousa", "Alves", "Rocha"
]

COMPANIES = [
    "Empresa A", "Empresa B", "Tech Solutions",
    "Consultoria XYZ", "Serviços Gerais", "Manufacturing Inc"
]

NOTIFICATION_TYPES = ["info", "success", "warning", "error"]

SIMULATION_STATUSES = ["pending", "approved", "rejected"]

def generate_fake_person():
    """Generate a fake person data"""
    first_name = random.choice(FIRST_NAMES)
    last_name = random.choice(LAST_NAMES)

    return {
        "name": f"{first_name} {last_name}",
        "email": f"{first_name.lower()}.{last_name.lower()}@example.com".replace(" ", ""),
        "cpf": f"{random.randint(10000000, 99999999)}",
        "phone": f"(11) 9{random.randint(10000000, 99999999)}"
    }

def create_users(db: Session):
    """Create test users"""
    # Check if users already exist
    existing_users = db.query(User).all()
    if existing_users:
        print(f"[INFO] Found {len(existing_users)} existing users")
        return existing_users

    users = []
    # Create test user with simple password
    test_password = "password123"[:72]  # Bcrypt max 72 bytes

    # Create primary test user
    user = User(
        id=uuid.uuid4(),
        email="user@example.com",
        password_hash=pwd_context.hash(test_password),
        name="Test User",
        cpf="12345678900",
        phone="(11) 999999999"
    )
    db.add(user)
    users.append(user)
    print(f"[✓] Created user: user@example.com")

    # Create 2 more test users
    for i in range(2):
        person = generate_fake_person()
        user = User(
            id=uuid.uuid4(),
            email=person["email"],
            password_hash=pwd_context.hash(test_password),
            name=person["name"],
            cpf=person["cpf"],
            phone=person["phone"]
        )
        db.add(user)
        users.append(user)
        print(f"[✓] Created user: {person['email']}")

    db.commit()
    return users

def create_user_profiles(db: Session, users: list):
    """Create user profiles"""
    for user in users:
        # Check if profile exists
        profile = db.query(UserProfile).filter(UserProfile.user_id == user.id).first()
        if profile:
            print(f"[INFO] User profile already exists for {user.email}")
            continue

        profile = UserProfile(
            id=uuid.uuid4(),
            user_id=user.id,
            birthdate=datetime(1990, 5, 15),
            address_street=f"Rua {random.randint(1, 1000)}",
            address_number=str(random.randint(1, 999)),
            address_complement="Apto 101",
            address_neighborhood="Centro",
            address_city="São Paulo",
            address_state="SP",
            address_zipcode=f"{random.randint(10000, 99999)}-{random.randint(100, 999)}"
        )
        db.add(profile)
        print(f"[✓] Created profile for: {user.name}")

    db.commit()

def create_simulations(db: Session, users: list):
    """Create test simulations"""
    simulations = []

    for user in users:
        # Check if simulations already exist for this user
        existing = db.query(Simulation).filter(Simulation.user_id == user.id).all()
        if existing:
            print(f"[INFO] User {user.email} already has {len(existing)} simulations")
            simulations.extend(existing)
            continue

        # Create 2-4 simulations per user
        num_simulations = random.randint(2, 4)

        for i in range(num_simulations):
            requested_amount = Decimal(str(round(random.uniform(10000, 100000), 2)))
            installments = random.choice([12, 24, 36, 48, 60])
            interest_rate = Decimal(str(round(random.uniform(1, 10), 2)))

            # Calculate installment value (simple formula)
            monthly_rate = float(interest_rate) / 100
            if monthly_rate == 0:
                installment_value = float(requested_amount) / installments
            else:
                installment_value = (
                    float(requested_amount) * monthly_rate *
                    (1 + monthly_rate) ** installments
                ) / ((1 + monthly_rate) ** installments - 1)

            total_amount = Decimal(str(round(float(requested_amount) + (installment_value * installments - float(requested_amount)), 2)))

            # Vary creation dates
            days_ago = random.randint(1, 60)
            created_at = datetime.utcnow() - timedelta(days=days_ago)

            simulation = Simulation(
                id=uuid.uuid4(),
                user_id=user.id,
                simulation_type=random.choice(["consignado", "pessoal"]),
                requested_amount=requested_amount,
                installments=installments,
                interest_rate=interest_rate,
                installment_value=Decimal(str(round(installment_value, 2))),
                total_amount=total_amount,
                status=random.choice(SIMULATION_STATUSES),
                created_at=created_at
            )
            db.add(simulation)
            simulations.append(simulation)
            print(f"[✓] Created simulation: {user.name} - R$ {requested_amount}")

    db.commit()
    return simulations

def create_margin_consultations(db: Session, users: list):
    """Create test margin consultations"""
    for user in users:
        # Create 3-5 margin consultations per user (simulating monthly history)
        num_consultations = random.randint(3, 5)

        # Check if consultations already exist
        existing = db.query(MarginConsultation).filter(
            MarginConsultation.user_id == user.id
        ).all()
        if existing:
            print(f"[INFO] User {user.email} already has {len(existing)} margin consultations")
            continue

        base_total = Decimal(str(round(random.uniform(5000, 30000), 2)))

        for i in range(num_consultations):
            # Vary dates (going back in time)
            days_ago = i * 30 + random.randint(0, 5)
            consulted_at = datetime.utcnow() - timedelta(days=days_ago)

            # Vary margins over time
            total_margin = base_total + Decimal(str(random.randint(-1000, 1000)))
            used_margin = Decimal(str(round(random.uniform(0, float(total_margin) * 0.6), 2)))
            available_margin = total_margin - used_margin

            consultation = MarginConsultation(
                id=uuid.uuid4(),
                user_id=user.id,
                available_margin=available_margin,
                used_margin=used_margin,
                total_margin=total_margin,
                employer=random.choice(COMPANIES),
                employment_type="CLT",
                consulted_at=consulted_at
            )
            db.add(consultation)
            print(f"[✓] Created margin consultation: {user.name} - R$ {available_margin:.2f} disponível")

    db.commit()

def create_notifications(db: Session, users: list):
    """Create test notifications"""
    notification_templates = {
        "success": [
            ("Documento Aprovado", "Seu documento foi aprovado com sucesso!"),
            ("Simulação Concluída", "Sua simulação foi processada com sucesso."),
            ("Margem Atualizada", "Sua margem de crédito foi atualizada."),
        ],
        "warning": [
            ("Documento Pendente", "Você tem documentos pendentes de análise."),
            ("Ação Necessária", "Atualize seus dados para continuar."),
            ("Margem Baixa", "Sua margem disponível está diminuindo."),
        ],
        "info": [
            ("Nova Simulação", "Você pode criar uma nova simulação."),
            ("Atualização", "Houve atualizações no sistema."),
            ("Dica", "Confira novas oportunidades de crédito."),
        ],
        "error": [
            ("Erro no Processamento", "Houve um erro ao processar sua solicitação."),
            ("Falha na Operação", "A operação não pôde ser completada."),
        ]
    }

    for user in users:
        # Check if notifications already exist for this user
        existing = db.query(Notification).filter(Notification.user_id == user.id).all()
        if existing:
            print(f"[INFO] User {user.email} already has {len(existing)} notifications")
            continue

        # Create notifications for each type
        notification_count = 0
        for notif_type, templates in notification_templates.items():
            # Create 2-3 notifications per type
            for i in range(random.randint(2, 3)):
                title, message = random.choice(templates)

                # Vary dates
                days_ago = random.randint(0, 30)
                created_at = datetime.utcnow() - timedelta(days=days_ago)

                notification = Notification(
                    id=uuid.uuid4(),
                    user_id=user.id,
                    title=title,
                    message=message,
                    type=notif_type,
                    is_read=random.choice([True, False, False, False]),  # 75% unread
                    created_at=created_at
                )
                db.add(notification)
                notification_count += 1

        print(f"[✓] Created {notification_count} notifications for: {user.name}")
        db.commit()

def create_documents(db: Session, users: list):
    """Create test documents"""
    document_types = ["rg", "cpf", "comprovante_residencia", "contracheque", "extrato_bancario"]
    document_statuses = ["pending", "approved", "rejected"]

    for user in users:
        # Check if documents already exist
        existing = db.query(Document).filter(Document.user_id == user.id).all()
        if existing:
            print(f"[INFO] User {user.email} already has {len(existing)} documents")
            continue

        # Create 3-5 documents per user
        num_documents = random.randint(3, 5)

        for i in range(num_documents):
            doc_type = random.choice(document_types)

            # Vary dates
            days_ago = random.randint(0, 30)
            uploaded_at = datetime.utcnow() - timedelta(days=days_ago)

            document = Document(
                id=uuid.uuid4(),
                user_id=user.id,
                document_type=doc_type,
                file_name=f"{doc_type}_{user.id.hex[:8]}.pdf",
                file_url=f"https://storage.example.com/documents/{doc_type}_{user.id.hex[:8]}.pdf",
                file_size=random.randint(100000, 5000000),
                status=random.choice(document_statuses),
                uploaded_at=uploaded_at
            )
            db.add(document)

        db.commit()
        print(f"[✓] Created {num_documents} documents for: {user.name}")

def create_activity_logs(db: Session, users: list):
    """Create test activity logs"""
    actions = [
        "login",
        "create_simulation",
        "consult_margin",
        "upload_document",
        "update_profile",
        "view_notification"
    ]

    for user in users:
        # Check if activity logs already exist
        existing = db.query(ActivityLog).filter(ActivityLog.user_id == user.id).all()
        if existing:
            print(f"[INFO] User {user.email} already has {len(existing)} activity logs")
            continue

        # Create 10-20 activity logs per user
        num_activities = random.randint(10, 20)

        for i in range(num_activities):
            action = random.choice(actions)
            days_ago = random.randint(0, 30)
            created_at = datetime.utcnow() - timedelta(days=days_ago)

            activity = ActivityLog(
                id=uuid.uuid4(),
                user_id=user.id,
                action=action,
                description=f"User performed {action}",
                extra_metadata={"action": action, "timestamp": str(created_at)},
                created_at=created_at
            )
            db.add(activity)

        db.commit()
        print(f"[✓] Created {num_activities} activity logs for: {user.name}")

def main():
    """Main function to seed the database"""
    print("=" * 60)
    print("DATABASE SEEDING SCRIPT")
    print("=" * 60)

    # Create engine
    engine = create_engine(settings.DATABASE_URL, echo=False)
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()

    try:
        print(f"\n[→] Connecting to database: {settings.DATABASE_URL}")

        # Create tables if they don't exist
        Base.metadata.create_all(bind=engine)
        print("[✓] Database tables created/verified")

        print("\n[→] Creating data...")

        # Create data in order
        users = create_users(db)
        print()

        create_user_profiles(db, users)
        print()

        simulations = create_simulations(db, users)
        print()

        create_margin_consultations(db, users)
        print()

        create_notifications(db, users)
        print()

        create_documents(db, users)
        print()

        create_activity_logs(db, users)
        print()

        print("=" * 60)
        print("[✓] SEEDING COMPLETED SUCCESSFULLY!")
        print("=" * 60)
        print("\nTest users created:")
        for user in users:
            print(f"  • Email: {user.email}")
            print(f"    Password: password123")
            print()

    except Exception as e:
        print(f"\n[✗] ERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
    finally:
        db.close()

if __name__ == "__main__":
    main()
