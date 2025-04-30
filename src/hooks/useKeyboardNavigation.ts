import { useEffect, useRef } from 'react';

interface KeyboardNavigationOptions {
  gridRef: React.RefObject<HTMLElement>;
  itemSelector: string;
  onSelect?: (element: HTMLElement) => void;
  columns?: number;
  loop?: boolean;
}

export function useKeyboardNavigation({
  gridRef,
  itemSelector,
  onSelect,
  columns = 4,
  loop = true
}: KeyboardNavigationOptions) {
  const currentIndex = useRef<number>(-1);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    function getItems(): HTMLElement[] {
      return Array.from(grid.querySelectorAll(itemSelector));
    }

    function focusItem(index: number) {
      const items = getItems();
      if (index >= 0 && index < items.length) {
        const item = items[index];
        item.focus();
        currentIndex.current = index;
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      const items = getItems();
      if (!items.length) return;

      let nextIndex = currentIndex.current;
      const rows = Math.ceil(items.length / columns);

      switch (event.key) {
        case 'ArrowRight':
          event.preventDefault();
          nextIndex = currentIndex.current + 1;
          if (nextIndex >= items.length) {
            nextIndex = loop ? 0 : items.length - 1;
          }
          break;

        case 'ArrowLeft':
          event.preventDefault();
          nextIndex = currentIndex.current - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? items.length - 1 : 0;
          }
          break;

        case 'ArrowDown':
          event.preventDefault();
          nextIndex = currentIndex.current + columns;
          if (nextIndex >= items.length) {
            if (loop) {
              nextIndex = nextIndex % items.length;
            } else {
              nextIndex = currentIndex.current;
            }
          }
          break;

        case 'ArrowUp':
          event.preventDefault();
          nextIndex = currentIndex.current - columns;
          if (nextIndex < 0) {
            if (loop) {
              nextIndex = items.length + nextIndex;
            } else {
              nextIndex = currentIndex.current;
            }
          }
          break;

        case 'Home':
          event.preventDefault();
          nextIndex = 0;
          break;

        case 'End':
          event.preventDefault();
          nextIndex = items.length - 1;
          break;

        case 'Enter':
        case ' ':
          event.preventDefault();
          if (currentIndex.current >= 0 && onSelect) {
            onSelect(items[currentIndex.current]);
          }
          return;
      }

      focusItem(nextIndex);
    }

    function handleFocus(event: FocusEvent) {
      const items = getItems();
      const target = event.target as HTMLElement;
      const index = items.indexOf(target);
      if (index >= 0) {
        currentIndex.current = index;
      }
    }

    grid.addEventListener('keydown', handleKeyDown);
    grid.addEventListener('focus', handleFocus, true);

    return () => {
      grid.removeEventListener('keydown', handleKeyDown);
      grid.removeEventListener('focus', handleFocus, true);
    };
  }, [gridRef, itemSelector, columns, loop, onSelect]);
}