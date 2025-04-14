
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10, // Reduced from 20 to 10 for subtler animation
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4, // Reduced from 0.5 to 0.4
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -10, // Reduced from -20 to -10
    transition: {
      duration: 0.2, // Reduced from 0.3 to 0.2
    },
  },
};

const PageTransition = ({ children, className = "" }: PageTransitionProps) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
