import { useEffect, useState } from "react";

export const useTemporaryFlag = (duration: number = 3000) => {
    const [flag, setFlag] = useState(false);
  
    const activate = () => {
      setFlag(true);
    };
  
    useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => setFlag(false), duration);
        return () => clearTimeout(timer); // Cleanup on unmount or re-run
      }
    }, [flag, duration]);
  
    return { flag, activate };
  };