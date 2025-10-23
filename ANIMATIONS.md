# 🎨 Sistema de Animações - Life Digital

Este documento descreve o sistema de animações implementado no projeto usando **Framer Motion** e **Lottie**.

## 📦 Dependências Instaladas

- `framer-motion` - Biblioteca de animações para React
- `lottie-react` - Player para animações Lottie

## 🛠️ Componentes de Animação

### 1. PageTransition

Wrapper para animações de transição entre páginas.

**Localização**: `src/components/animations/PageTransition.tsx`

**Variantes disponíveis**:
- `fade`: Fade in/out simples
- `slide`: Desliza horizontalmente
- `scale`: Escala com fade

**Uso**:
```tsx
import { PageTransition } from "@/components/animations/PageTransition";

export default function MyPage() {
  return (
    <PageTransition variant="fade">
      <div>Conteúdo da página</div>
    </PageTransition>
  );
}
```

### 2. AnimatedButton

Botão com animações de hover e tap.

**Localização**: `src/components/animations/AnimatedButton.tsx`

**Props**:
- `enableHover` (default: true): Ativa animação de hover
- `enableTap` (default: true): Ativa animação de tap
- Todas as props do componente `Button`

**Uso**:
```tsx
import { AnimatedButton } from "@/components/animations/AnimatedButton";

<AnimatedButton onClick={handleClick}>
  Clique aqui
</AnimatedButton>
```

### 3. LottiePlayer

Player para animações Lottie.

**Localização**: `src/components/animations/LottiePlayer.tsx`

**Props**:
- `animationData`: Objeto JSON da animação
- `loop` (default: true): Loop da animação
- `autoplay` (default: true): Iniciar automaticamente
- `className`: Classes CSS customizadas
- `onComplete`: Callback quando a animação termina

**Uso**:
```tsx
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import loadingAnimation from "@/assets/lottie/loading.json";

<LottiePlayer 
  animationData={loadingAnimation}
  loop={true}
  className="w-32 h-32"
/>
```

## 📄 Páginas Animadas

### Welcome (`/`)
- Logo com scale bounce
- Heading com fade + slide
- Feature cards com stagger
- CTA button com hover/tap

### Auth (`/auth`)
- Logo com spring scale
- Form com fade + slide
- Transição scale ao entrar

### Dashboard (`/dashboard`)
- Header fade from top
- Sections com stagger
- Action buttons com hover/tap
- Cards animados

### NovaSimulacao (`/nova-simulacao`)
- Header slide
- Form fade in
- Submit button com hover/tap

### Historico (`/historico`)
- Header fade
- Lista com stagger (delay baseado no índice)
- Cards com hover scale

## 🎯 Mobile Navigation

**Animações implementadas**:
- Ícones escalam quando ativos
- Indicador animado (layoutId="activeTab")
- Transições suaves com spring physics

## 🎬 Framer Motion - Uso Direto

Para animações customizadas, use o Framer Motion diretamente:

```tsx
import { motion } from "framer-motion";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Conteúdo animado
</motion.div>
```

### Propriedades Comuns

- `initial`: Estado inicial
- `animate`: Estado final
- `exit`: Estado ao sair (requer AnimatePresence)
- `transition`: Configuração da transição
- `whileHover`: Animação no hover
- `whileTap`: Animação ao clicar
- `layoutId`: Para animações de layout compartilhadas

## 🎨 Lottie Animations

### Onde Encontrar Animações

1. [LottieFiles](https://lottiefiles.com/) - Milhares de animações gratuitas
2. [Lordicon](https://lordicon.com/) - Ícones animados
3. [LottieFlow](https://lottieflow.com/) - Editor online

### Animações Recomendadas

Coloque arquivos .json em `src/assets/lottie/`:

- `loading.json` - Spinner de carregamento
- `success.json` - Checkmark de sucesso
- `celebration.json` - Confete para aprovações
- `document-upload.json` - Upload de documentos
- `empty-state.json` - Estado vazio
- `error.json` - Indicador de erro

### Exemplo Completo

```tsx
import { useState } from "react";
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import successAnimation from "@/assets/lottie/success.json";

function MyComponent() {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
  };

  return (
    <div>
      {showSuccess && (
        <LottiePlayer 
          animationData={successAnimation}
          loop={false}
          autoplay={true}
          className="w-48 h-48"
          onComplete={() => setShowSuccess(false)}
        />
      )}
    </div>
  );
}
```

## ♿ Acessibilidade

### Reduced Motion Support

Um hook personalizado detecta a preferência do usuário:

**Localização**: `src/hooks/use-reduced-motion.ts`

**Uso**:
```tsx
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function MyComponent() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      animate={{ 
        opacity: 1, 
        y: prefersReducedMotion ? 0 : 20 
      }}
    >
      Conteúdo
    </motion.div>
  );
}
```

## 🎭 AnimatePresence no App

O `App.tsx` foi configurado com `AnimatePresence` para transições entre rotas:

```tsx
<AnimatePresence mode="wait">
  <Routes location={location} key={location.pathname}>
    {/* Rotas */}
  </Routes>
</AnimatePresence>
```

Isso permite que as páginas tenham animações de entrada e saída.

## 📊 Performance

### Otimizações Implementadas

1. **Will-change**: Automaticamente aplicado pelo Framer Motion
2. **Reduced Motion**: Detecta preferências do usuário
3. **Lazy Loading**: Animações Lottie podem ser lazy loaded
4. **Hardware Acceleration**: Transformações CSS otimizadas

### Boas Práticas

- Use `transform` e `opacity` para melhor performance
- Evite animar `width`, `height`, `top`, `left`
- Prefira `scale` ao invés de `width/height`
- Use `layoutId` para animações de layout compartilhadas

## 🚀 Próximos Passos

Para adicionar mais animações:

1. **Skeleton Loading**: Adicionar estados de loading animados
2. **Gestures**: Implementar swipe, drag, pinch
3. **Page Indicators**: Dots animados para carrosséis
4. **Progress Bars**: Barras de progresso animadas
5. **Notifications**: Toast com entrada/saída animadas
6. **Modals**: Overlay com backdrop blur animado

## 📚 Recursos

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Framer Motion Examples](https://www.framer.com/motion/examples/)
- [Lottie Files](https://lottiefiles.com/)
- [Motion One](https://motion.dev/) - Alternativa leve
