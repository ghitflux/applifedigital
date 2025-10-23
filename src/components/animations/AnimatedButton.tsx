import { motion, HTMLMotionProps } from "framer-motion";
import { Button, ButtonProps } from "@/components/ui/button";
import { forwardRef } from "react";

interface AnimatedButtonProps extends ButtonProps {
  enableHover?: boolean;
  enableTap?: boolean;
}

export const AnimatedButton = forwardRef<HTMLButtonElement, AnimatedButtonProps>(
  ({ children, enableHover = true, enableTap = true, ...props }, ref) => {
    return (
      <motion.div
        whileHover={enableHover ? { scale: 1.02 } : undefined}
        whileTap={enableTap ? { scale: 0.98 } : undefined}
        transition={{ duration: 0.2 }}
      >
        <Button ref={ref} {...props}>
          {children}
        </Button>
      </motion.div>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
