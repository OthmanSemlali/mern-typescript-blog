export function formatDate(dateString: string ): string  {


        const dateObject = new Date(dateString);
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
        const formattedDate = dateObject.toLocaleDateString('en-US', options);
        return formattedDate;
 

}

export function handleContentLength(content: string): string {

    if (content.length > 100) {
        return content.substring(0, 100) + "..."
    }
    return content
}

export function debounce(func: Function, delay: number) {
    let timeoutId: any;
    return function (...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(null, args);
      }, delay);
    };
  }

  export  const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

  import { useEffect, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

function useDebouncedFunction<T extends AnyFunction>(func: T, delay: number) {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default useDebouncedFunction;
