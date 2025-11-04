# Backend FastAPI - App Life Digital

API REST para o aplicativo mobile de crédito consignável.

## 🚀 Tecnologias

- **FastAPI** 0.109.0
- **SQLAlchemy** 2.0.25
- **PostgreSQL** 16
- **JWT** (python-jose)
- **Bcrypt** (passlib)
- **Uvicorn** - ASGI server

## 📦 Instalação

### Método 1: Docker (Recomendado)

```bash
# Na raiz do projeto
docker-compose up -d
```

### Método 2: Local

```bash
cd backend

# Criar ambiente virtual
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate  # Windows

# Instalar dependências
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env

# Editar .env com suas credenciais

# Iniciar servidor
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## 🔧 Configuração

### Variáveis de Ambiente (.env)

```env
DATABASE_URL=postgresql://applife:applife_password@localhost:5432/applife_db
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=10080
```

### Gerar SECRET_KEY

```bash
openssl rand -hex 32
```

## 📚 API Endpoints

### Autenticação

#### Registrar Usuário
```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senhaSegura123",
  "cpf": "123.456.789-00",
  "phone": "(11) 98765-4321"
}
```

#### Login
```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senhaSegura123"
}

# Resposta
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### Usuários (Requer autenticação)

#### Obter Dados do Usuário
```http
GET /api/v1/users/me
Authorization: Bearer {token}
```

#### Atualizar Usuário
```http
PUT /api/v1/users/me
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "João Silva Santos",
  "phone": "(11) 99999-9999"
}
```

### Simulações

#### Criar Simulação
```http
POST /api/v1/simulations
Authorization: Bearer {token}
Content-Type: application/json

{
  "simulation_type": "consignado",
  "requested_amount": 10000.00,
  "installments": 24,
  "interest_rate": 2.5
}

# Resposta
{
  "id": "uuid",
  "user_id": "uuid",
  "simulation_type": "consignado",
  "requested_amount": 10000.00,
  "installments": 24,
  "interest_rate": 2.5,
  "installment_value": 529.43,
  "total_amount": 12706.32,
  "status": "pending",
  "created_at": "2025-01-01T12:00:00"
}
```

#### Listar Simulações
```http
GET /api/v1/simulations
Authorization: Bearer {token}
```

#### Obter Simulação
```http
GET /api/v1/simulations/{simulation_id}
Authorization: Bearer {token}
```

### Margem

#### Consultar Margem
```http
POST /api/v1/margins
Authorization: Bearer {token}

# Resposta (mock data)
{
  "id": "uuid",
  "user_id": "uuid",
  "available_margin": 12000.00,
  "used_margin": 3000.00,
  "total_margin": 15000.00,
  "employer": "Empresa Exemplo",
  "employment_type": "CLT",
  "consulted_at": "2025-01-01T12:00:00"
}
```

#### Histórico de Consultas
```http
GET /api/v1/margins
Authorization: Bearer {token}
```

### Documentos

#### Upload de Documento
```http
POST /api/v1/documents
Authorization: Bearer {token}
Content-Type: multipart/form-data

file: [arquivo]
document_type: "rg"
simulation_id: "uuid" (opcional)
```

#### Listar Documentos
```http
GET /api/v1/documents
Authorization: Bearer {token}
```

### Notificações

#### Listar Notificações
```http
GET /api/v1/notifications
Authorization: Bearer {token}
```

#### Marcar como Lida
```http
PUT /api/v1/notifications/{notification_id}/read
Authorization: Bearer {token}
```

## 📖 Documentação Interativa

Acesse a documentação Swagger:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🧪 Testes

```bash
cd backend
pytest
```

## 🏗️ Estrutura

```
backend/
├── app/
│   ├── api/              # Endpoints
│   │   ├── auth.py
│   │   ├── users.py
│   │   ├── simulations.py
│   │   ├── documents.py
│   │   ├── margins.py
│   │   └── notifications.py
│   ├── core/             # Configurações
│   │   ├── config.py
│   │   ├── database.py
│   │   └── security.py
│   ├── models/           # SQLAlchemy models
│   ├── schemas/          # Pydantic schemas
│   └── main.py           # App FastAPI
├── requirements.txt
├── Dockerfile
└── .env.example
```

## 🔒 Segurança

- Senhas hasheadas com bcrypt
- JWT tokens com expiração
- CORS configurado
- Validação com Pydantic
- SQL Injection protegido (SQLAlchemy)

## 📝 Models

### User
- id (UUID)
- email (unique)
- password_hash
- name
- cpf (unique)
- phone
- timestamps

### Simulation
- id (UUID)
- user_id (FK)
- simulation_type
- requested_amount
- installments
- interest_rate
- installment_value (calculado)
- total_amount (calculado)
- status
- timestamps

### Document
- id (UUID)
- user_id (FK)
- simulation_id (FK, opcional)
- document_type
- file_name
- file_url
- file_size
- status
- uploaded_at

## 🚀 Deploy

### Docker

```bash
docker build -t applife-backend .
docker run -p 8000:8000 --env-file .env applife-backend
```

### Railway/Heroku

```bash
# Adicione Procfile:
web: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

## 📊 Monitoramento

Ver logs do container:
```bash
docker-compose logs -f backend
```

## 🐛 Debug

```bash
# Modo debug (com reload automático)
uvicorn app.main:app --reload --log-level debug
```

## 📄 Licença

Projeto privado - App Life Digital
