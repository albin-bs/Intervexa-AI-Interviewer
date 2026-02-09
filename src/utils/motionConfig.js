import { useReducedMotion } from "framer-motion";

export const usemConfig = () => {
  const prefersReducedm = useReducedMotion();

  return {
    initial: prefersReducedm ? { opacity: 1 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: prefersReducedm ? { duration: 0 } : { duration: 0.6 },
  };
};
