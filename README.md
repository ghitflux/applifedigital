# App Life Digital - Mobile App 📱

Aplicativo mobile nativo (Android/iOS) para simulação de crédito consignável com backend FastAPI.

## 🚀 Tecnologias

### Frontend Mobile
- **Expo** ~51.0.0 - Framework React Native
- **React Native** 0.74.5
- **TypeScript** ~5.3.0
- **Expo Router** - Navegação file-based
- **React Query** - Gerenciamento de estado e cache
- **Expo Camera** - Captura de fotos
- **Expo Document Picker** - Seleção de documentos
- **Expo Notifications** - Push notifications
- **Expo Local Authentication** - Biometria (FaceID/TouchID)

### Backend API
- **FastAPI** 0.109.0 - Framework Python
- **SQLAlchemy** 2.0.25 - ORM
- **PostgreSQL 16** - Banco de dados
- **JWT** - Autenticação
- **Uvicorn** - ASGI server

### Infrastructure
- **Docker & Docker Compose** - Orquestração
- **Prisma** - ORM alternativo (mobile)
- **pgAdmin** - Gerenciamento de banco

## 📋 Pré-requisitos

- **Node.js** 18+ ([instalar com nvm](https://github.com/nvm-sh/nvm))
- **Python** 3.11+
- **Docker** e **Docker Compose**
- **Expo CLI**: `npm install -g expo-cli`
- **iOS**: Xcode (apenas macOS)
- **Android**: Android Studio

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <YOUR_GIT_URL>
cd applifedigital
git checkout claude/mobile-native-rewrite-011CUoNJBLQNakaZpxHnuDwy
```

### 2. Instale as dependências do mobile

```bash
npm install
```

### 3. Instale as dependências do backend

```bash
cd backend
pip install -r requirements.txt
cd ..
```

### 4. Configure as variáveis de ambiente

```bash
cp .env.example .env
cd backend && cp .env.example .env && cd ..
```

### 5. Inicie todos os serviços com Docker

```bash
docker-compose up -d
```

Isso iniciará:
- **PostgreSQL 16** na porta `5432`
- **Backend FastAPI** na porta `8000`
- **pgAdmin** na porta `5050` (http://localhost:5050)

**Credenciais pgAdmin:**
- Email: `admin@applife.com`
- Senha: `admin`

### 6. Configure o banco de dados (Prisma - opcional)

```bash
npm run db:generate
npm run db:push
```

### 7. Inicie o app mobile

```bash
npm start
```

Opções:
- Pressione `a` → Android Emulator
- Pressione `i` → iOS Simulator (macOS)
- Escaneie QR code → Expo Go no celular

## 📱 Comandos Disponíveis

### Mobile
```bash
npm start              # Inicia Expo dev server
npm run android        # Abre no Android
npm run ios            # Abre no iOS
npm test               # Executa testes Jest
npm run lint           # Verifica código com ESLint
npm run typecheck      # Verifica tipos TypeScript
```

### Backend
```bash
cd backend
uvicorn app.main:app --reload  # Inicia API FastAPI
```

### Database
```bash
npm run db:generate    # Gera Prisma Client
npm run db:push        # Sincroniza schema
npm run db:studio      # Abre Prisma Studio
```

### Docker
```bash
docker-compose up -d           # Inicia todos os serviços
docker-compose down            # Para todos os serviços
docker-compose logs backend    # Ver logs do backend
docker-compose logs postgres   # Ver logs do PostgreSQL
docker-compose restart backend # Reinicia o backend
```

## 🏗️ Estrutura do Projeto

```
applifedigital/
├── app/                          # Expo Router (Mobile)
│   ├── (auth)/                  # Autenticação
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/                  # Navegação principal
│   │   ├── dashboard.tsx
│   │   ├── simulacoes.tsx
│   │   ├── historico.tsx
│   │   ├── perfil.tsx
│   │   └── notificacoes.tsx
│   ├── screens/                 # Telas extras
│   │   ├── nova-simulacao.tsx
│   │   ├── resultado-simulacao.tsx
│   │   ├── consultar-margem.tsx
│   │   ├── enviar-documento.tsx
│   │   ├── dados-pessoais.tsx
│   │   ├── meus-documentos.tsx
│   │   ├── seguranca-privacidade.tsx
│   │   └── ajuda-suporte.tsx
│   ├── _layout.tsx              # Layout raiz
│   └── index.tsx                # Tela de boas-vindas
│
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   ├── hooks/                   # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useCamera.ts
│   │   ├── useDocumentPicker.ts
│   │   ├── useNotifications.ts
│   │   └── useBiometric.ts
│   ├── services/                # Serviços (API)
│   │   └── api.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── utils/                   # Utilitários
│   │   └── formatters.ts
│   └── constants/               # Constantes
│       └── theme.ts
│
├── backend/                     # Backend FastAPI
│   ├── app/
│   │   ├── api/                # Endpoints
│   │   │   ├── auth.py
│   │   │   ├── users.py
│   │   │   ├── simulations.py
│   │   │   ├── documents.py
│   │   │   ├── margins.py
│   │   │   └── notifications.py
│   │   ├── core/               # Configurações
│   │   │   ├── config.py
│   │   │   ├── database.py
│   │   │   └── security.py
│   │   ├── models/             # SQLAlchemy models
│   │   │   └── __init__.py
│   │   ├── schemas/            # Pydantic schemas
│   │   │   └── __init__.py
│   │   └── main.py             # App FastAPI
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env.example
│
├── docker/
│   └── init-db/
│       └── 01-init.sql         # Schema inicial
│
├── __tests__/                  # Testes
│   └── smoke.test.tsx
│
├── prisma/
│   └── schema.prisma           # Prisma schema
│
├── docker-compose.yml          # Orquestração Docker
├── package.json
├── tsconfig.json
├── jest.config.js
├── .eslintrc.js
└── README.md
```

## 🗄️ API Endpoints (FastAPI)

Base URL: `http://localhost:8000`

### Autenticação
- `POST /api/v1/auth/register` - Registrar usuário
- `POST /api/v1/auth/login` - Login (retorna JWT)

### Usuários
- `GET /api/v1/users/me` - Dados do usuário atual
- `PUT /api/v1/users/me` - Atualizar usuário

### Simulações
- `POST /api/v1/simulations` - Criar simulação
- `GET /api/v1/simulations` - Listar simulações do usuário
- `GET /api/v1/simulations/{id}` - Detalhes da simulação

### Margem
- `POST /api/v1/margins` - Consultar margem
- `GET /api/v1/margins` - Histórico de consultas

### Documentos
- `POST /api/v1/documents` - Upload de documento
- `GET /api/v1/documents` - Listar documentos do usuário

### Notificações
- `GET /api/v1/notifications` - Listar notificações
- `PUT /api/v1/notifications/{id}/read` - Marcar como lida

**Swagger Docs**: http://localhost:8000/docs

## 🗄️ Schema do Banco de Dados

- **users** - Usuários do sistema
- **user_profiles** - Perfis/dados pessoais
- **simulations** - Simulações de crédito
- **margin_consultations** - Consultas de margem
- **documents** - Documentos enviados
- **notifications** - Notificações
- **activity_log** - Log de atividades

Ver: `prisma/schema.prisma` ou `docker/init-db/01-init.sql`

## 🎨 Features Nativas Implementadas

### 📷 Câmera
```typescript
import { useCamera } from '@/hooks/useCamera';

const { requestPermission, takePicture } = useCamera();
```

### 📄 Seleção de Documentos
```typescript
import { useDocumentPicker } from '@/hooks/useDocumentPicker';

const { pickDocument } = useDocumentPicker();
```

### 🔔 Push Notifications
```typescript
import { useNotifications } from '@/hooks/useNotifications';

const { sendPushNotification } = useNotifications();
```

### 🔐 Autenticação Biométrica
```typescript
import { useBiometric } from '@/hooks/useBiometric';

const { isAvailable, authenticate } = useBiometric();
```

## 🧪 Testes

### Executar testes
```bash
npm test                 # Testes unitários (Jest)
npm run lint             # Linter (ESLint)
npm run typecheck        # Verificar tipos (TypeScript)
```

### Smoke Tests
```bash
npm test -- smoke.test.tsx
```

## 🎨 Design System

Baseado no iOS Human Interface Guidelines:

- **Cores primárias**: `#007AFF` (azul), `#34C759` (verde), `#FF3B30` (vermelho)
- **Tipografia**: San Francisco (iOS), Roboto (Android)
- **Espaçamentos**: 4, 8, 16, 24, 32px
- **Border Radius**: 8, 12, 16, 24px

Ver: `src/constants/theme.ts`

## 🔐 Autenticação

### Fluxo
1. **Login/Registro** → Recebe JWT token
2. Token salvo no `SecureStore` (criptografado)
3. Token enviado em todas as requisições (Bearer)
4. **Logout** → Token removido

### Biometria (Opcional)
- FaceID (iOS)
- TouchID (iOS/Android)
- Impressão digital (Android)

## 🚧 Desenvolvimento

### Adicionar nova tela
```bash
# Crie em app/screens/nome-tela.tsx
touch app/screens/minha-tela.tsx
```

### Adicionar novo endpoint
```bash
# Crie em backend/app/api/recurso.py
touch backend/app/api/meu_recurso.py
```

### Hot Reload
- **Mobile**: Automático (Fast Refresh)
- **Backend**: Automático (--reload)

## 📦 Build para Produção

### Mobile (EAS Build)
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar projeto
eas build:configure

# Build Android
eas build --platform android

# Build iOS
eas build --platform ios
```

### Backend
```bash
# Build Docker
docker build -t applife-backend ./backend

# Deploy (exemplo Railway/Heroku)
# Configure DATABASE_URL e SECRET_KEY nas variáveis de ambiente
```

## 🐛 Troubleshooting

### Erro ao conectar no banco
```bash
docker ps                         # Verificar containers
docker-compose logs postgres      # Ver logs
docker-compose restart postgres   # Reiniciar
```

### Erro no Expo
```bash
expo start -c                     # Limpar cache
rm -rf node_modules && npm install
```

### Erro no Backend
```bash
docker-compose logs backend       # Ver logs
docker-compose restart backend    # Reiniciar
```

### Erro de TypeScript
```bash
npm run typecheck                 # Verificar erros
```

## 📄 Licença

Projeto privado - App Life Digital

## 👥 Contribuidores

Desenvolvido para gestão de crédito consignável.

---

**Versão**: 1.0.0
**Última atualização**: 2025

Para mais informações, consulte a documentação da API em http://localhost:8000/docs
