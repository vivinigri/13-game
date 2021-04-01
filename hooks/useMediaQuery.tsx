import { useDimensions } from '@react-native-community/hooks';
import { useState, useEffect } from 'react';

// variable left for reference
// eslint-disable-next-line
const DESKTOP_BREAKPOINT = 1024;
const TABLET_BREAKPOINT = 768;
const PORTRAIT_SIDE_MENU_WIDTH = 300;
const LANDSCAPE_SIDE_MENU_WIDTH = 375;

export const useMediaQuery = () => {
  const width = useDimensions().window.width;
  const height = useDimensions().window.height;

  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(
    width >= TABLET_BREAKPOINT
  );
  const [isMobile, setIsMobile] = useState(width < TABLET_BREAKPOINT);

  useEffect(() => {
    setIsTabletOrDesktop(width >= TABLET_BREAKPOINT);
    setIsMobile(width < TABLET_BREAKPOINT);
  }, [width]);

  return {
    isTabletOrDesktop,
    isMobile,
    width,
    height,
    sideMenuWidth: isMobile
      ? PORTRAIT_SIDE_MENU_WIDTH
      : LANDSCAPE_SIDE_MENU_WIDTH,
  };
};
