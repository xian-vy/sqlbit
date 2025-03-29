import { useState, useEffect, useCallback } from 'react';

export const useScreenSize = () => {
  const [screenWidth, setScreenWidth] = useState<number | null>(null);

  const handleResize = useCallback(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return screenWidth;
};