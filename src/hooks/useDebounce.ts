import { useCallback, useEffect, useRef, useState } from 'react';

export const useDebounce = (func: any, wait = 800) => {
  let timer = useRef<any>();
  return useCallback(
    (...args: any) => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
        func(...args);
      }, wait);
    },
    [func, wait],
  );
};

export const useDebounceValue = <T extends unknown>(value: T, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
