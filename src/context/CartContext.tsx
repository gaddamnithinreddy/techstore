import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { toast } from 'sonner';
import { gsap } from 'gsap';

// Types
export interface Product {
  id: string;
  name: string;
  price: number;
  images?: string[]; // Changed from 'image' to 'images' and made optional
  image?: string;    // Keep for backward compatibility
  category?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  quantity?: number;
  color?: string;
  model3d?: string; // 3D model path
}

interface CartItem extends Product {
  quantity: number;
  color?: string;
}

interface WishlistItem extends Product {}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: Product, quantity?: number, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  isInCart: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  wishlistCount: number;
  checkout: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provider component
export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // Load cart and wishlist from localStorage on initialization
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parsing saved cart:', e);
      }
    }
    
    if (savedWishlist) {
      try {
        setWishlistItems(JSON.parse(savedWishlist));
      } catch (e) {
        console.error('Error parsing saved wishlist:', e);
      }
    }
  }, []);

  // Save cart and wishlist to localStorage when they change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Calculate totals
  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlistItems.length;

  // Check if product is in cart
  const isInCart = (productId: string) => {
    return cartItems.some(item => item.id === productId);
  };

  // Add to cart with animation
  const addToCart = (product: Product, quantity = 1, color?: string) => {
    // Make sure the product has an image property for compatibility
    const productWithImage = {
      ...product,
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
    };

    setCartItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => item.id === productWithImage.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast.success(`Updated quantity for ${productWithImage.name}`, {
          description: `New quantity: ${updatedItems[existingItemIndex].quantity}`,
        });
        
        return updatedItems;
      } else {
        // Add new item
        toast.success(`Added ${productWithImage.name} to cart`, {
          description: `Quantity: ${quantity}`,
        });
        
        // More elaborate cart icon animation
        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
          gsap.timeline()
            .to(cartIcon, { scale: 1.4, duration: 0.2, ease: "power2.out" })
            .to(cartIcon, { scale: 1, duration: 0.3, ease: "elastic.out(1.2, 0.5)" });
            
          // Create flying element animation
          const productElement = document.querySelector(`[data-product-id="${productWithImage.id}"]`);
          if (productElement) {
            const rect = productElement.getBoundingClientRect();
            const flyingItem = document.createElement('div');
            flyingItem.style.position = 'fixed';
            flyingItem.style.zIndex = '9999';
            flyingItem.style.left = `${rect.left + rect.width / 2}px`;
            flyingItem.style.top = `${rect.top + rect.height / 2}px`;
            flyingItem.style.width = '20px';
            flyingItem.style.height = '20px';
            flyingItem.style.borderRadius = '50%';
            flyingItem.style.backgroundColor = 'var(--primary)';
            document.body.appendChild(flyingItem);
            
            const cartRect = cartIcon.getBoundingClientRect();
            gsap.to(flyingItem, {
              x: cartRect.left - rect.left,
              y: cartRect.top - rect.top,
              scale: 0.2,
              opacity: 0.7,
              duration: 0.8,
              ease: "power3.in",
              onComplete: () => {
                document.body.removeChild(flyingItem);
              }
            });
          }
        }
        
        return [...prevItems, { ...productWithImage, quantity, color }];
      }
    });
  };

  // Remove from cart
  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from cart`);
      }
      
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Update cart item quantity
  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.success('Cart cleared');
  };

  // Add to wishlist
  const addToWishlist = (product: Product) => {
    // Make sure the product has an image property for compatibility
    const productWithImage = {
      ...product,
      image: product.image || (product.images && product.images.length > 0 ? product.images[0] : ''),
    };

    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productWithImage.id);
      
      if (existingItem) {
        // Remove if already exists (toggle behavior)
        toast.success(`Removed ${productWithImage.name} from wishlist`);
        return prevItems.filter(item => item.id !== productWithImage.id);
      } else {
        // Add new item
        toast.success(`Added ${productWithImage.name} to wishlist`);
        
        // Animate wishlist icon
        const wishlistIcon = document.querySelector('.wishlist-icon');
        if (wishlistIcon) {
          gsap.timeline()
            .to(wishlistIcon, { scale: 1.4, rotation: 20, duration: 0.2, ease: "power2.out" })
            .to(wishlistIcon, { scale: 1, rotation: 0, duration: 0.3, ease: "elastic.out(1.2, 0.5)" });
        }
        
        return [...prevItems, productWithImage];
      }
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      
      if (itemToRemove) {
        toast.success(`Removed ${itemToRemove.name} from wishlist`);
      }
      
      return prevItems.filter(item => item.id !== productId);
    });
  };

  // Check if product is in wishlist
  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  // Checkout function
  const checkout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Simulate checkout process
    toast.success('Processing your order...', { duration: 2000 });
    
    setTimeout(() => {
      toast.success('Order confirmed!', { 
        description: `Order total: $${cartTotal.toFixed(2)}`, 
        duration: 5000 
      });
      
      // Clear cart after successful checkout
      setCartItems([]);
    }, 2000);
  };

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    isInCart,
    cartTotal,
    cartCount,
    wishlistCount,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Custom hook to use the cart context
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
