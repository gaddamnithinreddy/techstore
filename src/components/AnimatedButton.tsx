
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  icon?: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const AnimatedButton = ({
  children,
  variant = 'default',
  size = 'default',
  icon,
  className,
  onClick,
  ...props
}: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Map our variants to Button's variants
  const mapVariant = () => {
    switch (variant) {
      case 'primary':
        return 'default';
      case 'secondary':
        return 'secondary';
      default:
        return variant;
    }
  };
  
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Button
        variant={mapVariant()}
        size={size}
        className={cn(
          "relative overflow-hidden transition-all", 
          isHovered ? "shadow-md" : "",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        {...props}
      >
        {icon && (
          <motion.span 
            className="mr-2 inline-flex"
            animate={isHovered ? { x: [0, -2, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            {icon}
          </motion.span>
        )}
        
        <motion.span
          animate={isHovered ? { scale: [1, 1.03, 1] } : {}}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.span>
        
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-white opacity-10"
            initial={{ scale: 0, borderRadius: "100%" }}
            animate={{ scale: 2, borderRadius: "100%" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </Button>
    </motion.div>
  );
};

export default AnimatedButton;
