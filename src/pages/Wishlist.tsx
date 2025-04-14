
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { 
  Heart, 
  ShoppingCart, 
  Trash2, 
  ChevronRight, 
  ShoppingBag 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart, isInCart } = useCart(); // Changed from wishlist to wishlistItems
  const [animatingItems, setAnimatingItems] = useState<string[]>([]);
  
  useEffect(() => {
    // Page entrance animation
    const tl = gsap.timeline();
    tl.fromTo('.page-title', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.wishlist-content', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );
    
    // Animate wishlist items
    gsap.fromTo('.wishlist-item', 
      { y: 30, opacity: 0 }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.4, 
        stagger: 0.1, 
        ease: 'power2.out',
        delay: 0.3
      }
    );
  }, []);
  
  // Handle removing item from wishlist with animation
  const handleRemoveItem = (id: string) => {
    if (animatingItems.includes(id)) return;
    
    setAnimatingItems([...animatingItems, id]);
    
    gsap.to(`#wishlist-item-${id}`, {
      x: -30,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        removeFromWishlist(id);
        setAnimatingItems(animatingItems.filter(item => item !== id));
        toast.success('Item removed from wishlist');
      }
    });
  };
  
  // Handle adding item to cart with animation
  const handleAddToCart = (product: any) => {
    if (isInCart(product.id)) {
      toast('Item already in cart');
      return;
    }
    
    const itemElement = document.querySelector(`#wishlist-item-${product.id} .product-image`);
    if (!itemElement) return;
    
    const cartIcon = document.querySelector('.cart-icon');
    if (!cartIcon) return;
    
    // Get positions for animation
    const itemRect = itemElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();
    
    // Create a clone for animation
    const clone = itemElement.cloneNode(true) as HTMLElement;
    document.body.appendChild(clone);
    
    // Style the clone
    Object.assign(clone.style, {
      position: 'fixed',
      top: `${itemRect.top}px`,
      left: `${itemRect.left}px`,
      width: `${itemRect.width}px`,
      height: `${itemRect.height}px`,
      zIndex: '100',
      transition: 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      pointerEvents: 'none'
    });
    
    // Animate the clone
    setTimeout(() => {
      Object.assign(clone.style, {
        transform: 'scale(0.2)',
        top: `${cartRect.top}px`,
        left: `${cartRect.left}px`,
        opacity: '0'
      });
      
      // Add to cart and remove clone
      setTimeout(() => {
        addToCart(product);
        document.body.removeChild(clone);
        toast.success('Item added to cart');
      }, 600);
    }, 10);
  };
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="page-title text-3xl md:text-4xl font-bold mb-2">
          My Wishlist
        </h1>
        <p className="text-neutral-600 mb-8 max-w-2xl">
          Items you've saved for later. Add them to cart when you're ready to purchase.
        </p>
        
        <div className="wishlist-content">
          {wishlistItems.length > 0 ? (
            <div className="space-y-6">
              {/* Grid for desktop, list for mobile */}
              <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
                {wishlistItems.map((product) => (
                  <div 
                    key={product.id}
                    id={`wishlist-item-${product.id}`}
                    className="wishlist-item group flex bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="w-1/3 bg-neutral-100 relative overflow-hidden">
                      <Link to={`/product/${product.id}`}>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="product-image w-full h-full object-cover transition-transform group-hover:scale-105"
                        />
                      </Link>
                      <button 
                        className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white hover:text-red-600 transition-colors"
                        onClick={() => handleRemoveItem(product.id)}
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="w-2/3 p-4 flex flex-col justify-between">
                      <div>
                        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-medium mb-1">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-neutral-500 mb-2">{product.category}</p>
                        <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button 
                          className={`flex items-center gap-2 ${
                            isInCart(product.id)
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-primary hover:bg-primary/90'
                          }`}
                          onClick={() => handleAddToCart(product)}
                        >
                          <ShoppingCart size={16} />
                          <span>{isInCart(product.id) ? 'In Cart' : 'Add to Cart'}</span>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => handleRemoveItem(product.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile view */}
              <div className="md:hidden space-y-4">
                {wishlistItems.map((product) => (
                  <div 
                    key={product.id}
                    id={`wishlist-item-${product.id}`}
                    className="wishlist-item bg-white rounded-lg shadow-sm overflow-hidden"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="w-20 h-20 bg-neutral-100 rounded overflow-hidden relative">
                        <Link to={`/product/${product.id}`}>
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="product-image w-full h-full object-cover"
                          />
                        </Link>
                      </div>
                      <div className="flex-1">
                        <Link to={`/product/${product.id}`} className="hover:text-primary transition-colors">
                          <h3 className="font-medium">{product.name}</h3>
                        </Link>
                        <p className="text-sm text-neutral-500">{product.category}</p>
                        <p className="text-primary font-medium">${product.price.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex border-t border-neutral-100">
                      <button 
                        className={`flex-1 py-2 flex justify-center items-center gap-2 ${
                          isInCart(product.id)
                          ? 'text-green-600'
                          : 'text-primary'
                        }`}
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={16} />
                        <span>{isInCart(product.id) ? 'In Cart' : 'Add to Cart'}</span>
                      </button>
                      <div className="w-px bg-neutral-100"></div>
                      <button 
                        className="flex-1 py-2 flex justify-center items-center gap-2 text-red-500"
                        onClick={() => handleRemoveItem(product.id)}
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 flex justify-center">
                <Button asChild>
                  <Link to="/products" className="flex items-center gap-2">
                    <ShoppingBag size={16} />
                    Browse More Products
                  </Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 bg-neutral-50 rounded-lg">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-neutral-100 rounded-full mb-4">
                <Heart className="text-neutral-400" size={32} />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Start saving items you love to your wishlist and find them all in one place.
              </p>
              <Button asChild className="bg-primary hover:bg-primary/90">
                <Link to="/products" className="flex items-center gap-2">
                  <ShoppingBag size={16} />
                  Browse Products
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
