import { useSyncExternalStore } from "react";

/**
 * useMediaQuery Hook
 * Rileva media query reattivamente lato client in modo compatibile con SSR.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      if (typeof window === "undefined") return () => {};
      const media = window.matchMedia(query);
      media.addEventListener("change", callback);
      return () => media.removeEventListener("change", callback);
    },
    () => {
      if (typeof window === "undefined") return false;
      return window.matchMedia(query).matches;
    },
    () => false // Server-side rendering fallback
  );
}
