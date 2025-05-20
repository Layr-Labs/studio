import { useEffect, useRef, type RefObject } from 'react';

export function useScrollToBottom<T extends HTMLElement>(): [
  RefObject<T>,
  RefObject<T>,
] {
  const containerRef = useRef<T>(null);
  const endRef = useRef<T>(null);

  useEffect(() => {
    const container = containerRef.current;
    const end = endRef.current;

    if (container && end) {
      const observer = new MutationObserver(() => {
        // Only auto-scroll if user is already near the bottom (within 100px)
        const isNearBottom = 
          container.scrollHeight - container.scrollTop - container.clientHeight < 100;
          
        if (isNearBottom) {
          end.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
      });

      observer.observe(container, {
        childList: true,
        subtree: true,
        attributes: false, // Don't trigger on attribute changes
        characterData: false, // Don't trigger on text content changes
      });

      return () => observer.disconnect();
    }
  }, []);

  return [containerRef, endRef];
}
