import { useEffect, useRef } from "react";

export function useOutsideClick(handler){
    const windowRef = useRef();

    useEffect(() => {
      function handleClick(e: MouseEvent) {
        if (windowRef.current && !windowRef.current.contains(e.target)) {
          console.log('Click outside' , e.target);
          handler();
        }
      }
  
      document.addEventListener('click', handleClick, true);
  
      return () => document.removeEventListener('click', handleClick, true);
    }, [handler]);

    return windowRef;
}