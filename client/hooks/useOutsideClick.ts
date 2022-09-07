import React from "react";

export const useOutsideClick = (
  elementRef: React.MutableRefObject<any>,
  handler: Function,
  isAttached = true
) => {
  React.useEffect(() => {
    if (!isAttached) return;
    const handleClick = (e: Event) => {
      if (!elementRef.current) return;
      if (!elementRef.current.contains(e.target)) {
        handler();
      }
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [isAttached, elementRef, handler]);
};
