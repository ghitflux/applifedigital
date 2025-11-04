# App Life Digital - Mobile App

Aplicativo mobile nativo (Android/iOS) para simulação de crédito consignável.

## 🚀 Tecnologias

- **Expo** ~51.0.0 - Framework React Native
- **React Native** 0.74.5
- **TypeScript** ~5.3.0
- **Expo Router** - Navegação file-based
- **React Query** - Gerenciamento de estado e cache
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL 16** - Banco de dados
- **Docker** - Orquestração de serviços

## 📋 Pré-requisitos

- Node.js 18+ ([instalar com nvm](https://github.com/nvm-sh/nvm))
- npm ou yarn
- Docker e Docker Compose
- Expo CLI: `npm install -g expo-cli`
- Para desenvolvimento iOS: Xcode (macOS)
- Para desenvolvimento Android: Android Studio

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <YOUR_GIT_URL>
cd applifedigital
git checkout mobile-native-rewrite
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` se necessário (as configurações padrão devem funcionar).

### 4. Inicie o banco de dados (Docker)

```bash
docker-compose up -d
```

Isso irá iniciar:
- PostgreSQL 16 na porta 5432
- pgAdmin na porta 5050 (http://localhost:5050)

**Credenciais do pgAdmin:**
- Email: admin@applife.com
- Senha: admin

### 5. Configure o banco de dados

```bash
# Gerar o Prisma Client
npm run db:generate

# Aplicar as migrations (sincronizar schema com o banco)
npm run db:push
```

### 6. Inicie o app

```bash
npm start
```

Isso abrirá o Expo Dev Tools no navegador. A partir daí você pode:
- Pressionar `a` para abrir no Android Emulator
- Pressionar `i` para abrir no iOS Simulator (macOS apenas)
- Escanear o QR code com o app Expo Go no seu celular

## 📱 Comandos disponíveis

```bash
# Desenvolvimento
npm start              # Inicia o Expo dev server
npm run android        # Abre no Android
npm run ios            # Abre no iOS (macOS apenas)

# Banco de dados
npm run db:generate    # Gera o Prisma Client
npm run db:push        # Sincroniza schema com o banco
npm run db:studio      # Abre Prisma Studio (GUI para o banco)

# Docker
docker-compose up -d           # Inicia os containers
docker-compose down            # Para os containers
docker-compose logs postgres   # Ver logs do PostgreSQL
```

## 📂 Estrutura do Projeto

```
applifedigital/
├── app/                    # Expo Router (file-based routing)
│   ├── (auth)/            # Grupo de rotas de autenticação
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/            # Rotas com tab navigation
│   │   ├── dashboard.tsx
│   │   ├── simulacoes.tsx
│   │   ├── historico.tsx
│   │   └── perfil.tsx
│   ├── _layout.tsx        # Layout raiz
│   └── index.tsx          # Tela inicial (Welcome)
│
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Loading.tsx
│   ├── hooks/            # Custom hooks
│   │   └── useAuth.ts
│   ├── services/         # Serviços (API, etc)
│   │   └── api.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Funções utilitárias
│   │   └── formatters.ts
│   └── constants/        # Constantes (theme, etc)
│       └── theme.ts
│
├── prisma/
│   └── schema.prisma     # Schema do banco de dados
│
├── docker/
│   └── init-db/          # Scripts de inicialização do DB
│       └── 01-init.sql
│
├── docker-compose.yml    # Configuração do Docker
├── package.json
├── tsconfig.json
├── babel.config.js
└── app.json             # Configuração do Expo
```

## 🗄️ Schema do Banco de Dados

O banco possui as seguintes tabelas:

- **users** - Usuários do sistema
- **user_profiles** - Perfis/dados pessoais
- **simulations** - Simulações de crédito
- **margin_consultations** - Consultas de margem
- **documents** - Documentos enviados
- **notifications** - Notificações
- **activity_log** - Log de atividades

Ver detalhes em `prisma/schema.prisma` ou `docker/init-db/01-init.sql`.

## 🎨 Design System

O app usa um design system baseado no iOS Human Interface Guidelines:

- **Cores**: Ver `src/constants/theme.ts`
- **Componentes**: Baseados no design nativo iOS/Android
- **Navegação**: Tab bar inferior + stack navigation

## 🔐 Autenticação

O app usa `expo-secure-store` para armazenar tokens de forma segura. O fluxo básico:

1. Login/Registro → Recebe token da API
2. Token é salvo no SecureStore
3. Token é enviado em todas as requisições (header Authorization)
4. Logout → Token é removido

**TODO**: Implementar backend/API para autenticação real.

## 🚧 Próximos Passos

### Backend (TODO)
- [ ] Criar API REST com Node.js/Express ou NestJS
- [ ] Implementar autenticação JWT
- [ ] Criar endpoints para simulações
- [ ] Criar endpoints para documentos (upload S3/Cloudinary)
- [ ] Integrar com serviços de consulta de margem

### Features Mobile
- [ ] Migrar todas as 16 telas do protótipo web
- [ ] Implementar formulários de simulação
- [ ] Upload de documentos (expo-image-picker + expo-document-picker)
- [ ] Push notifications (expo-notifications)
- [ ] Câmera para documentos (expo-camera)
- [ ] Biometria (expo-local-authentication)

### DevOps
- [ ] CI/CD com GitHub Actions
- [ ] Builds EAS (Expo Application Services)
- [ ] Deploy nas stores (Google Play + App Store)

## 📝 Convenções de Código

- Use **TypeScript** para tudo
- Componentes em **PascalCase** (ex: `Button.tsx`)
- Hooks em **camelCase** prefixados com `use` (ex: `useAuth.ts`)
- Arquivos de configuração em **kebab-case** quando necessário
- Sempre use **interfaces** para props de componentes
- Prefira **function** sobre `const` para componentes React

## 🐛 Troubleshooting

### Erro ao conectar no banco
- Verifique se o Docker está rodando: `docker ps`
- Verifique os logs: `docker-compose logs postgres`
- Recrie os containers: `docker-compose down && docker-compose up -d`

### Erro no Expo
- Limpe o cache: `expo start -c`
- Reinstale dependências: `rm -rf node_modules && npm install`

### Erro no Prisma
- Regenere o client: `npm run db:generate`
- Verifique a conexão: `npm run db:studio`

## 📄 Licença

Projeto privado - App Life Digital

## 👥 Equipe

Desenvolvido para gestão de crédito consignável.
