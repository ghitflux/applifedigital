import Lottie, { LottieComponentProps } from "lottie-react";
import { cn } from "@/lib/utils";

interface LottiePlayerProps {
  animationData: any;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  onComplete?: () => void;
}

export function LottiePlayer({
  animationData,
  loop = true,
  autoplay = true,
  className,
  onComplete,
}: LottiePlayerProps) {
  return (
    <div className={cn("w-full h-full flex items-center justify-center", className)}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        onComplete={onComplete}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
