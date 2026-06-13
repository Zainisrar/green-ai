import { useState } from 'react';
import { useNavigationState } from './useNavigationState';

export const useInteractiveZIndex = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isNavigationOpen } = useNavigationState();

  // Only apply z-index when navigation is closed AND mouse is hovering
  const getZIndexClass = () => {
    return (!isNavigationOpen && isHovered) ? 'z-[9999999999999]' : '';
  };

  const getContainerProps = () => ({
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
    className: `${getZIndexClass()} flex relative`
  });

  return {
    isHovered,
    isNavigationOpen,
    getZIndexClass,
    getContainerProps
  };
};