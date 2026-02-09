import { useEffect, RefObject } from "react";

export function useMagnetic(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const strength = 20;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      el.style.setProperty("--magnet-x", `${x / strength}`);
      el.style.setProperty("--magnet-y", `${y / strength}`);
    };

    const onLeave = () => {
      el.style.setProperty("--magnet-x", `0`);
      el.style.setProperty("--magnet-y", `0`);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [ref]);
}
