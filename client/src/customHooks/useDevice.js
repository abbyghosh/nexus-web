import { useEffect, useState } from "react";
import debounce from "lodash.debounce";

function useDevice() {
  /* const mobileSize = 480; */
  const mobileSize = 600;
  const tabletSize = 768;

  const [isMobile, setIsMobile] = useState();
  const [isTablet, setIsTablet] = useState();
  const [isDesktop, setIsDesktop] = useState();

  const handleWindowResize = () => {
    const width = window.innerWidth;
    setIsMobile(width <= mobileSize);
    setIsTablet(width > mobileSize && width <= tabletSize && !width <= mobileSize);
    setIsDesktop(width > tabletSize);
  };

  useEffect(() => {
    handleWindowResize();
    // Debounce
    let timeoutId = null;
    const resizeListener = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => handleWindowResize(), 150);
    };
    window.addEventListener("resize", resizeListener);

    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, []);

  /* const savedDebounced = useCallback(
    debounce(() => handleWindowResize(), 100),
    []
  );

  useEffect(() => {
    handleWindowResize();
    window.addEventListener("resize", savedDebounced);
    return () => {
      window.removeEventListener("resize", savedDebounced);
    };
  }, []); */

  return { isMobile, isTablet, isDesktop };
}

export default useDevice;
