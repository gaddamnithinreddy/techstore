
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart, Heart, User, Search } from 'lucide-react';
import { gsap } from 'gsap';
import { useCart } from '@/context/CartContext';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const { cartCount, wishlistCount } = useCart();
  
  const links = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Animate cart counter when cartCount changes
  useEffect(() => {
    if (cartCount > 0) {
      const cartCounter = document.querySelector('.cart-counter');
      if (cartCounter) {
        gsap.fromTo(
          cartCounter,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [cartCount]);
  
  // Animate wishlist counter when wishlistCount changes
  useEffect(() => {
    if (wishlistCount > 0) {
      const wishlistCounter = document.querySelector('.wishlist-counter');
      if (wishlistCounter) {
        gsap.fromTo(
          wishlistCounter,
          { scale: 0.5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' }
        );
      }
    }
  }, [wishlistCount]);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);
  
  // Toggle search field
  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    }
  };
  
  // Handle search submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // In a real app, navigate to search results page
      console.log(`Searching for: ${searchQuery}`);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-sm py-4'
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-neutral-900">
            Tech Store
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative text-neutral-700 hover:text-primary transition-colors ${
                  location.pathname === link.path ? 'font-medium text-primary' : ''
                }`}
              >
                {link.name}
                {location.pathname === link.path && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded"></span>
                )}
              </Link>
            ))}
          </nav>
          
          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <button 
              className="text-neutral-700 hover:text-primary transition-colors focus:outline-none"
              onClick={toggleSearch}
              aria-label="Search"
            >
              <Search size={22} />
            </button>
            
            {/* User Account */}
            <Link 
              to="/account" 
              className="text-neutral-700 hover:text-primary transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User size={22} />
            </Link>
            
            {/* Wishlist */}
            <Link 
              to="/wishlist" 
              className="wishlist-icon text-neutral-700 hover:text-primary transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={22} />
              {wishlistCount > 0 && (
                <span className="wishlist-counter absolute -top-2 -right-2 bg-secondary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            {/* Shopping Cart */}
            <Link 
              to="/cart" 
              className="cart-icon text-neutral-700 hover:text-primary transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="cart-counter absolute -top-2 -right-2 bg-primary text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {/* Mobile Menu Button */}
            <button
              className="text-neutral-700 hover:text-primary transition-colors md:hidden focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div 
          className={`mt-4 transition-all duration-300 overflow-hidden ${
            searchOpen ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              id="search-input"
              type="text"
              placeholder="Search for products..."
              className="w-full p-3 border border-neutral-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-500 hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
          </form>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      <div 
        className={`fixed top-0 right-0 w-64 h-full bg-white z-40 transform transition-transform duration-300 ease-in-out shadow-xl md:hidden ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Menu</h2>
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-700 hover:text-primary transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`py-2 border-b border-neutral-100 ${
                  location.pathname === link.path ? 'text-primary font-medium' : 'text-neutral-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 space-y-4">
            <Link 
              to="/account" 
              className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <User size={20} />
              <span>My Account</span>
            </Link>
            
            <Link 
              to="/wishlist" 
              className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Heart size={20} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-secondary text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                  {wishlistCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/cart" 
              className="flex items-center gap-3 text-neutral-700 hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <ShoppingCart size={20} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
