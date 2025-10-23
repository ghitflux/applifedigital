# Lottie Animations

Esta pasta contém as animações Lottie usadas no projeto.

## Como usar

1. Baixe animações de [LottieFiles](https://lottiefiles.com/) (arquivos .json)
2. Coloque os arquivos .json nesta pasta
3. Importe e use com o componente `LottiePlayer`:

```tsx
import { LottiePlayer } from "@/components/animations/LottiePlayer";
import animationData from "@/assets/lottie/your-animation.json";

<LottiePlayer 
  animationData={animationData}
  loop={true}
  autoplay={true}
  className="w-32 h-32"
/>
```

## Animações Recomendadas

- **loading.json**: Spinner de carregamento
- **success.json**: Checkmark animado para sucesso
- **celebration.json**: Confete para aprovações
- **document-upload.json**: Upload de documentos
- **empty-state.json**: Estado vazio para listas

## Recursos

- [LottieFiles](https://lottiefiles.com/) - Biblioteca de animações gratuitas
- [Lottie Creator](https://lottiefiles.com/creator) - Criar suas próprias animações
- [Documentação Lottie React](https://www.npmjs.com/package/lottie-react)
