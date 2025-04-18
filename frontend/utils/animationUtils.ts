/**
 * Animation utility functions for the Goat Farming Guide
 * This is a placeholder file to resolve import errors from the previous application
 */

// Basic fade-in animation
export const fadeIn = (element: HTMLElement, duration: number = 500): void => {
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in-out`;
  
  // Trigger reflow
  void element.offsetWidth;
  
  element.style.opacity = '1';
};

// Basic fade-out animation
export const fadeOut = (element: HTMLElement, duration: number = 500): Promise<void> => {
  return new Promise(resolve => {
    element.style.opacity = '1';
    element.style.transition = `opacity ${duration}ms ease-in-out`;
    
    // Trigger reflow
    void element.offsetWidth;
    
    element.style.opacity = '0';
    
    setTimeout(resolve, duration);
  });
};

// Simple slide-in animation
export const slideIn = (element: HTMLElement, direction: 'left' | 'right' | 'top' | 'bottom' = 'left', distance: number = 50, duration: number = 500): void => {
  const directionMap = {
    left: { property: 'transform', value: `translateX(-${distance}px)` },
    right: { property: 'transform', value: `translateX(${distance}px)` },
    top: { property: 'transform', value: `translateY(-${distance}px)` },
    bottom: { property: 'transform', value: `translateY(${distance}px)` }
  };
  
  const { property, value } = directionMap[direction];
  
  element.style[property as any] = value;
  element.style.opacity = '0';
  element.style.transition = `${property} ${duration}ms ease-out, opacity ${duration}ms ease-in-out`;
  
  // Trigger reflow
  void element.offsetWidth;
  
  element.style[property as any] = 'translate(0)';
  element.style.opacity = '1';
};

// Animation for page transitions
export const pageTransition = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

// Animation for staggered list items
export const staggeredAnimation = (delay: number = 0.1) => ({
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      staggerChildren: delay
    }
  }
});

// Animation for list items
export const listItemAnimation = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};