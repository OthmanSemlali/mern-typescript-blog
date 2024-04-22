


import { useEffect, useState, useCallback } from "react";
import { debounce } from "../lib/helpers";

function ScrollToTop({ readTime }: { readTime: string }) {
  console.log('readTime', readTime);

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible(window.scrollY > 500);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, []);

  useEffect(() => {
    const debouncedToggleVisibility = debounce(toggleVisibility, 100);

    window.addEventListener("scroll", debouncedToggleVisibility);

    return () => {
      window.removeEventListener("scroll", debouncedToggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className="fixed bg-red-300 cursor-pointer right-5 bottom-5">
      {parseInt(readTime) > 5 && isVisible && (
        <div onClick={scrollToTop}>
          <h3>Go up!</h3>
        </div>
      )}
    </div>
  );
}


export default ScrollToTop;
