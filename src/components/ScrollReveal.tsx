
import { useRef, useEffect, ReactNode } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
}

const ScrollReveal = ({
  children,
  className = "",
  direction = 'up',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  // Use only the supported options from UseInViewOptions
  const isInView = useInView(ref, { 
    once,
    amount: threshold // 'amount' is the equivalent to 'threshold' in framer-motion
  });
  
  // Define animation variants based on direction
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: { opacity: 0, y: 30 }, // Reduced from 50 to 30
          visible: { opacity: 1, y: 0 }
        };
      case 'down':
        return {
          hidden: { opacity: 0, y: -30 }, // Reduced from -50 to -30
          visible: { opacity: 1, y: 0 }
        };
      case 'left':
        return {
          hidden: { opacity: 0, x: 30 }, // Reduced from 50 to 30
          visible: { opacity: 1, x: 0 }
        };
      case 'right':
        return {
          hidden: { opacity: 0, x: -30 }, // Reduced from -50 to -30
          visible: { opacity: 1, x: 0 }
        };
      case 'none':
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
      default:
        return {
          hidden: { opacity: 0, y: 30 },
          visible: { opacity: 1, y: 0 }
        };
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [controls, isInView, once]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      transition={{ 
        duration: duration, 
        delay: delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
