
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  isNew?: boolean;
  isFeatured?: boolean;
  category?: string;
  model3d?: string;
  className?: string;
  onQuickView?: () => void;
  showQuickView?: boolean;
}

const ProductCard = ({ 
  id, 
  name, 
  price, 
  image, 
  isNew, 
  isFeatured, 
  category, 
  model3d, 
  className, 
  onQuickView,
  showQuickView = false
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useCart();
  
  // Fixed handleMouseMove to make more subtle movements and prevent jarring effects
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    
    // Reduced rotation values to make movement more subtle
    gsap.to(cardRef.current, {
      rotationY: x * 5, // Reduced from 10 to 5
      rotationX: -y * 5, // Reduced from 10 to 5
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: "center center", // Fixed transform origin
    });
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: x * 10, // Reduced from 20 to 10
        y: y * 10, // Reduced from 20 to 10
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };
  
  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.3, // Reduced duration for faster reset
      ease: 'power2.out', // Changed from elastic to power2 for less bouncing
    });
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        x: 0,
        y: 0,
        duration: 0.3, // Reduced duration
        ease: 'power2.out', // Changed from elastic to power2
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const button = e.currentTarget;
    gsap.fromTo(button, 
      { scale: 1 }, 
      { scale: 0.9, duration: 0.1, yoyo: true, repeat: 1 }
    );
    
    addToCart({ 
      id, 
      name, 
      price, 
      image, 
      category,
      isNew,
      isFeatured,
      model3d
    });
  };
  
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const heart = e.currentTarget;
    gsap.fromTo(heart, 
      { scale: 1 }, 
      { scale: 1.3, duration: 0.3, ease: "elastic.out(1, 0.3)" }
    );
    
    addToWishlist({ 
      id, 
      name, 
      price, 
      image, 
      category,
      isNew,
      isFeatured,
      model3d
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onQuickView) {
      onQuickView();
    } else {
      setQuickViewOpen(true);
    }
  };
  
  // Modified useEffect to ensure smoother initial loading
  useEffect(() => {
    if (cardRef.current) {
      // Immediate set to visible with no animation to ensure cards display properly
      gsap.set(cardRef.current, {
        opacity: 1,
        y: 0,
        clearProps: "all" // Clear all props to ensure no lingering animations
      });
    }
  }, []);
  
  return (
    <>
      <motion.div 
        ref={cardRef}
        className={`product-card group relative ${className || ''}`}
        data-product-id={id}
        initial={{ opacity: 1, y: 0 }} // Start visible with no animation
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ 
          y: -5,
          transition: { duration: 0.3 }
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => {
          setIsHovered(false);
          handleMouseLeave();
        }}
        onMouseMove={handleMouseMove}
        style={{ 
          transformStyle: "preserve-3d",
          transform: "perspective(1000px)",
          willChange: "transform" // Optimizes for transform changes
        }}
      >
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
          {isNew && (
            <motion.span 
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-primary text-white text-xs px-2 py-1 rounded-md animate-pulse"
            >
              NEW
            </motion.span>
          )}
          {isFeatured && (
            <motion.span 
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-secondary text-white text-xs px-2 py-1 rounded-md"
            >
              FEATURED
            </motion.span>
          )}
          {category && (
            <motion.span 
              initial={{ opacity: 1, x: 0 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/80 backdrop-blur-sm text-neutral-800 text-xs px-2 py-1 rounded-md"
            >
              {category}
            </motion.span>
          )}
        </div>
        
        <motion.button 
          className={`absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm transition-all duration-300`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isHovered ? 1 : 0, 
            y: isHovered ? 0 : -10 
          }}
          whileTap={{ scale: 1.3 }}
          onClick={handleToggleFavorite}
          aria-label={isInWishlist(id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-200 ${isInWishlist(id) ? 'fill-red-500 text-red-500' : 'text-neutral-400 hover:text-red-500'}`} 
          />
        </motion.button>
        
        {(showQuickView || !onQuickView) && (
          <motion.button
            onClick={handleQuickView}
            className={`absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 bg-white text-primary font-medium rounded-md px-3 py-1.5 shadow-sm flex items-center gap-1`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0, 
              y: isHovered ? 0 : 10 
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Eye size={16} />
            <span>Quick View</span>
          </motion.button>
        )}
        
        <Link to={`/product/${id}`} className="block overflow-hidden">
          <div className="relative overflow-hidden bg-neutral-50">
            <motion.img 
              ref={imageRef}
              src={image} 
              alt={name}
              className="product-image w-full h-64 object-cover"
              whileHover={{ scale: 1.05 }} // Reduced from 1.1 to 1.05
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
            <motion.div 
              className="absolute inset-0 bg-black bg-opacity-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 0.1 : 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </Link>
        
        <div className="card-content p-4 bg-white">
          <Link to={`/product/${id}`} className="block">
            <motion.h3 
              className="text-lg font-medium text-neutral-900 mb-1 hover:text-primary transition-colors duration-200"
              whileHover={{ x: 5 }}
            >
              {name}
            </motion.h3>
            <motion.p 
              className="text-primary font-semibold"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ${price.toFixed(2)}
            </motion.p>
          </Link>
          
          <div className="mt-4">
            <motion.button 
              className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md ${
                isInCart(id) 
                  ? 'bg-green-600 hover:bg-green-700 text-white' 
                  : 'bg-black hover:bg-black/90 text-white'
              }`}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {isInCart(id) ? (
                <>
                  <Check size={16} />
                  <span>Added to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
      
      {/* Quick View Dialog - Only shown if onQuickView is not provided */}
      {!onQuickView && (
        <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="text-2xl">{name}</DialogTitle>
              <DialogDescription>
                Quick preview of this product
              </DialogDescription>
            </DialogHeader>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div 
                className="rounded-lg overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image} 
                  alt={name} 
                  className="w-full h-auto object-cover"
                />
              </motion.div>
              <div>
                <motion.h2 
                  className="text-xl font-semibold mb-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  {name}
                </motion.h2>
                <motion.p 
                  className="text-2xl font-bold text-primary mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  ${price.toFixed(2)}
                </motion.p>
                <motion.div 
                  className="flex items-center gap-1 mb-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                  ))}
                  <span className="text-muted-foreground text-sm ml-2">(24 reviews)</span>
                </motion.div>
                <motion.p 
                  className="text-muted-foreground mb-6"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                >
                  Experience premium quality with our {name}. This product features cutting-edge technology and elegant design.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {isNew && (
                    <div className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4 mr-2">
                      NEW
                    </div>
                  )}
                  {isFeatured && (
                    <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-sm font-medium rounded-full mb-4">
                      FEATURED
                    </div>
                  )}
                </motion.div>
                <motion.div 
                  className="flex flex-wrap gap-3 mt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.location.href = `/product/${id}`}
                    >
                      View Details
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      className="border-primary/60 text-primary hover:bg-primary/10"
                      onClick={handleAddToCart}
                    >
                      <ShoppingCart className="mr-2" size={16} />
                      Add to Cart
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ProductCard;
