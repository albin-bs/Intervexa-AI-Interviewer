import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Skip if:
    // 1. Hash exists (anchor links)
    // 2. User came from back button (preserves scroll position)
    if (hash || window.history.state?.scrollRestoration === 'manual') {
      return;
    }
    
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
