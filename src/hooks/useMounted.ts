import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * useMounted Hook
 * Restituisce true una volta che il componente è montato lato client.
 * Utilizza useSyncExternalStore per evitare setState sincroni e prevenire errori di hydration.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
