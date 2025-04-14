
import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, CreditCard, Truck, ShieldCheck, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { toast } from 'sonner';

const Cart = () => {
  const { cartItems, removeFromCart, updateCartItemQuantity, clearCart, cartTotal, checkout } = useCart();
  const cartRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    document.title = 'Shopping Cart | MorphicStore';
    
    // Entry animation
    gsap.fromTo(
      '.cart-header',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
    
    gsap.fromTo(
      '.cart-item',
      { x: -20, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      }
    );
    
    gsap.fromTo(
      '.cart-summary',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.4 }
    );
  }, []);
  
  // Animation when removing items
  const handleRemoveItem = (id: string, name: string) => {
    const itemElement = document.getElementById(`cart-item-${id}`);
    
    if (itemElement) {
      gsap.to(itemElement, {
        x: -100,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          removeFromCart(id);
        }
      });
    } else {
      removeFromCart(id);
    }
  };
  
  const handleQuantityChange = (id: string, newQuantity: number) => {
    // Don't allow quantities below 1
    if (newQuantity < 1) return;
    
    // Animate the quantity change
    const quantityElement = document.getElementById(`quantity-${id}`);
    if (quantityElement) {
      gsap.fromTo(
        quantityElement,
        { scale: 1 },
        { scale: 1.2, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
    
    updateCartItemQuantity(id, newQuantity);
  };
  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Animate checkout button
    gsap.to('.checkout-button', {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    });
    
    // Show checkout loading state
    toast.loading('Processing your order...', { id: 'checkout' });
    
    // Simulate checkout process
    setTimeout(() => {
      toast.dismiss('checkout');
      
      // Animate cart items out
      gsap.to('.cart-item', {
        x: -50,
        opacity: 0,
        stagger: 0.05,
        duration: 0.3,
        onComplete: () => {
          // Call the checkout function from context
          checkout();
          
          // Success message and redirect with animation
          toast.success('Order placed successfully!', { 
            icon: <CheckCircle className="text-green-500" />,
            duration: 5000
          });
          
          // Show order summary animation before redirecting
          const orderSummary = document.createElement('div');
          orderSummary.className = 'order-success fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50';
          orderSummary.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-full text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle size={32} class="text-green-500" />
              </div>
              <h2 class="text-2xl font-bold mb-2">Order Confirmed!</h2>
              <p class="text-neutral-600 mb-4">Thank you for your purchase.</p>
              <p class="font-medium mb-6">Order Total: $${(cartTotal * 1.1).toFixed(2)}</p>
              <button class="w-full bg-primary text-white rounded-md py-3">Continue Shopping</button>
            </div>
          `;
          
          document.body.appendChild(orderSummary);
          
          gsap.fromTo(
            orderSummary.querySelector('div'),
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' }
          );
          
          // Remove the summary after a delay and redirect
          setTimeout(() => {
            document.body.removeChild(orderSummary);
            navigate('/products');
          }, 3000);
        }
      });
    }, 2000);
  };
  
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <div className="cart-header mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <div className="flex items-center text-sm text-neutral-500">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-800">Cart</span>
          </div>
        </div>
        
        <div ref={cartRef} className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            {cartItems.length > 0 ? (
              <>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
                  <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-neutral-50 text-sm font-medium text-neutral-600">
                    <div className="col-span-6">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-2 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                  </div>
                  
                  {cartItems.map((item) => (
                    <div 
                      key={item.id} 
                      id={`cart-item-${item.id}`}
                      className="cart-item grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b border-neutral-100 items-center"
                    >
                      {/* Product */}
                      <div className="col-span-1 md:col-span-6">
                        <div className="flex items-center gap-4">
                          <Link to={`/product/${item.id}`} className="shrink-0 relative group">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-20 h-20 object-cover rounded-md transition-transform duration-300 group-hover:scale-105"
                            />
                            {/* Quick view overlay */}
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-md">
                              <span className="text-white text-xs bg-primary/90 backdrop-blur-sm px-2 py-1 rounded">
                                View
                              </span>
                            </div>
                          </Link>
                          <div>
                            <Link 
                              to={`/product/${item.id}`}
                              className="font-medium text-neutral-800 hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                            {item.color && (
                              <p className="text-sm text-neutral-500 mt-1">
                                Color: <span className="font-medium">{item.color}</span>
                              </p>
                            )}
                            <button
                              onClick={() => handleRemoveItem(item.id, item.name)}
                              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1 mt-2 transition-colors"
                            >
                              <Trash2 size={14} />
                              <span>Remove</span>
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="col-span-1 md:col-span-2 text-center">
                        <div className="md:hidden text-sm text-neutral-500 mb-1">Price:</div>
                        <div className="font-medium">${item.price.toFixed(2)}</div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                        <div className="flex items-center">
                          <div className="md:hidden text-sm text-neutral-500 mr-3 mt-1">Quantity:</div>
                          <div className="flex items-center border border-neutral-200 rounded-md">
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <div 
                              id={`quantity-${item.id}`}
                              className="w-12 text-center font-medium py-1 focus:outline-none"
                            >
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Total */}
                      <div className="col-span-1 md:col-span-2 text-center">
                        <div className="md:hidden text-sm text-neutral-500 mb-1">Total:</div>
                        <div className="font-medium text-primary">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between">
                  <Link 
                    to="/products" 
                    className="flex items-center gap-2 text-primary font-medium hover:underline"
                  >
                    <ShoppingBag size={18} />
                    <span>Continue Shopping</span>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 border-red-200"
                    onClick={() => {
                      // Animate the cart items out
                      gsap.to('.cart-item', {
                        x: -50,
                        opacity: 0,
                        stagger: 0.05,
                        duration: 0.3,
                        onComplete: () => clearCart()
                      });
                    }}
                  >
                    <Trash2 size={16} className="mr-2" />
                    Clear Cart
                  </Button>
                </div>
              </>
            ) : (
              <div className="cart-empty bg-white rounded-lg shadow-sm p-10 text-center">
                <div className="flex justify-center mb-4 animate-bounce">
                  <ShoppingBag size={64} className="text-neutral-300" />
                </div>
                <h2 className="text-2xl font-medium mb-3">Your cart is empty</h2>
                <p className="text-neutral-500 mb-6">
                  Looks like you haven't added any products to your cart yet.
                </p>
                <Link to="/products">
                  <Button className="bg-primary hover:bg-primary/90 text-white">
                    Start Shopping
                  </Button>
                </Link>
              </div>
            )}
          </div>
          
          {/* Cart Summary */}
          {cartItems.length > 0 && (
            <div className="lg:w-1/3">
              <div className="cart-summary bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>{cartTotal > 50 ? 'Free' : '$4.99'}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Tax</span>
                    <span>${(cartTotal * 0.1).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">${((cartTotal * 1.1) + (cartTotal > 50 ? 0 : 4.99)).toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Button 
                    className="checkout-button w-full bg-primary hover:bg-primary/90 text-white py-6 text-base flex items-center justify-center gap-2"
                    onClick={handleCheckout}
                  >
                    <CreditCard size={18} />
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </Button>
                  
                  <Button 
                    variant="secondary"
                    className="w-full py-6 text-base flex items-center justify-center gap-2"
                    onClick={() => navigate('/products')}
                  >
                    <ShoppingBag size={18} />
                    <span>Continue Shopping</span>
                  </Button>
                  
                  <div className="flex items-center justify-center text-sm text-neutral-500 mt-4">
                    <Truck size={16} className="mr-2" />
                    <span>Free shipping on all orders over $50</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h3 className="font-medium mb-3">We Accept</h3>
                  <div className="flex gap-2">
                    <div className="bg-neutral-100 rounded p-2 flex items-center justify-center w-14 h-8">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                        alt="Visa" 
                        className="h-4 object-contain"
                      />
                    </div>
                    <div className="bg-neutral-100 rounded p-2 flex items-center justify-center w-14 h-8">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
                        alt="Mastercard" 
                        className="h-4 object-contain"
                      />
                    </div>
                    <div className="bg-neutral-100 rounded p-2 flex items-center justify-center w-14 h-8">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/196/196539.png" 
                        alt="PayPal" 
                        className="h-4 object-contain"
                      />
                    </div>
                    <div className="bg-neutral-100 rounded p-2 flex items-center justify-center w-14 h-8">
                      <img 
                        src="https://cdn-icons-png.flaticon.com/512/5968/5968144.png" 
                        alt="Apple Pay" 
                        className="h-4 object-contain"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Trust badges */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <h3 className="font-medium mb-3">Secure Shopping</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-neutral-50 rounded p-3 flex flex-col items-center text-center">
                      <ShieldCheck size={20} className="text-primary mb-1" />
                      <span className="text-xs">Secure Payment</span>
                    </div>
                    <div className="bg-neutral-50 rounded p-3 flex flex-col items-center text-center">
                      <Truck size={20} className="text-primary mb-1" />
                      <span className="text-xs">Fast Delivery</span>
                    </div>
                    <div className="bg-neutral-50 rounded p-3 flex flex-col items-center text-center">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary mb-1">
                        <path d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-xs">Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
