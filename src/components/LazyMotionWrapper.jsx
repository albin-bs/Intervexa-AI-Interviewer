import { LazyMotion, domAnimation } from "framer-motion";

export default function LazyMotionWrapper({ children }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
