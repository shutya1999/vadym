"use client";
import { useEffect } from "react";

export function useResponsiveLayout(containerRef) {
  useEffect(() => {
    const adjustContentLayout = () => {
      const screenWidth = window.innerWidth;

      if (containerRef.current) {
        if (screenWidth >= 1440) {
          const padding = (screenWidth - 1116) / 2;
          containerRef.current.style.maxWidth = "1116px";
          containerRef.current.style.margin = "0 auto";
          containerRef.current.style.paddingLeft = `${padding}px`;
          containerRef.current.style.paddingRight = `${padding}px`;
        } else {
          containerRef.current.style.maxWidth = "100%";
          containerRef.current.style.margin = "0";
        }
      }
    };

    adjustContentLayout();
    window.addEventListener("resize", adjustContentLayout);

    return () => {
      window.removeEventListener("resize", adjustContentLayout);
    };
  }, [containerRef]);
}
