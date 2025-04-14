
import * as React from "react"

// Define breakpoints
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export interface DeviceSize {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile ?? false;
}

export function useDeviceSize(): DeviceSize {
  const [deviceSize, setDeviceSize] = React.useState<DeviceSize>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  React.useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      setDeviceSize({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
      });
    };

    window.addEventListener('resize', updateSize);
    updateSize(); // Initial check
    
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return deviceSize;
}

// Utility function to get a responsive value based on the current device size
export function getResponsiveValue<T>(options: {
  mobile?: T;
  tablet?: T;
  desktop?: T;
  defaultValue: T;
}): T {
  const { isMobile, isTablet, isDesktop } = useDeviceSize();
  
  if (isMobile && options.mobile !== undefined) return options.mobile;
  if (isTablet && options.tablet !== undefined) return options.tablet;
  if (isDesktop && options.desktop !== undefined) return options.desktop;
  
  return options.defaultValue;
}
