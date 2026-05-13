import { useEffect } from "react";

export function useReveal() {
  useEffect(() => {
    const handleScroll = () => {
      document.querySelectorAll(".reveal:not(.visible)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
          el.classList.add("visible");
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
}
