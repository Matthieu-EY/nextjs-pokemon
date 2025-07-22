import { useCallback, useRef } from 'react';

export function useScrollRef<T>(
  onIntersect: (entry: IntersectionObserverEntry) => T,
  isLoading?: () => boolean,
) {
  const scrollObserver = useRef<IntersectionObserver>(null);

  const observedRef = useCallback(
    (node: HTMLButtonElement) => {
      if (isLoading?.()) return;

      if (scrollObserver.current) scrollObserver.current.disconnect();

      scrollObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          onIntersect(entries[0]);
        }
      });

      if (node) scrollObserver.current.observe(node);
    },
    [onIntersect, isLoading],
  );

  return observedRef;
}
