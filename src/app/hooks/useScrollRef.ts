import { useCallback, useRef } from 'react';

export function useScrollRef<T>(
  onIntersect: (entry: IntersectionObserverEntry) => T,
) {
  const scrollObserver = useRef<IntersectionObserver>(null);

  const observedRef = useCallback(
    (node: HTMLButtonElement) => {
      if (scrollObserver.current) scrollObserver.current.disconnect();

      scrollObserver.current = new IntersectionObserver((entries) => {
        // IIFE defined to avoid the constraints of the callback function, which cannot be async
        if (entries[0].isIntersecting) {
          onIntersect(entries[0]);
        }
      });

      if (node) scrollObserver.current.observe(node);
    },
    [onIntersect],
  );

  return observedRef;
}
