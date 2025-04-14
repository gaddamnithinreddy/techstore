import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { toast } from "@/hooks/use-toast";
import ThreeJSHero from "@/components/ThreeJSHero";
import ProductCard from "@/components/ProductCard";
import InteractiveProductViewer from "@/components/InteractiveProductViewer";
import WhatsNewSection from "@/components/WhatsNewSection";
import { 
  ArrowRight, 
  ShoppingBag, 
  Sparkles, 
  Star, 
  BarChart4, 
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  ArrowDown,
  MousePointerClick,
  Check,
  Play,
  Crown,
  Award,
  Gift,
  Eye
} from 'lucide-react';
import { gsap } from "gsap";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const products = [
  {
    id: "product1",
    name: "Premium Wireless Headphones",
    price: 299.99,
    images: [
      "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1488&q=80",
    ],
    isFeatured: true,
  },
  {
    id: "product2",
    name: "Smart Watch Series X",
    price: 449.99,
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    ],
    isNew: true,
  },
  {
    id: "product3",
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1636&q=80",
    ],
    isNew: true,
  },
  {
    id: "product4",
    name: "Professional DSLR Camera",
    price: 799.99,
    images: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isFeatured: true,
  },
  {
    id: "product5",
    name: "Ultra-Thin Laptop Pro",
    price: 1299.99,
    images: [
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isFeatured: true,
  },
  {
    id: "product6",
    name: "Smart Home Assistant",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    ],
    isNew: true,
  },
  {
    id: "product7",
    name: "VR Gaming Headset",
    price: 399.99,
    images: [
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    ],
    isNew: true,
  },
  {
    id: "product8",
    name: "Drone with 4K Camera",
    price: 649.99,
    images: [
      "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isFeatured: true,
  },
  {
    id: "product9",
    name: "Noise-Cancelling Earbuds",
    price: 179.99,
    images: [
      "https://images.unsplash.com/photo-1626379616459-b2ce1d9decbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    ],
    isNew: true,
  },
  {
    id: "product10",
    name: "Ultra-Wide Gaming Monitor",
    price: 549.99,
    images: [
      "https://images.unsplash.com/photo-1616763355548-1b606f439f86?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    ],
    isFeatured: true,
  },
  {
    id: "product11",
    name: "Mechanical Keyboard",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1176&q=80",
    ],
    isNew: true,
  },
  {
    id: "product12",
    name: "Smart Fitness Tracker",
    price: 129.99,
    images: [
      "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    ],
    isFeatured: true,
  }
];

const categories = [
  {
    name: "Headphones",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    count: 24
  },
  {
    name: "Smartphones",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1529&q=80",
    count: 42
  },
  {
    name: "Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    count: 15
  },
  {
    name: "Cameras",
    image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
    count: 18
  },
];

const testimonials = [
  {
    name: "James Wilson",
    role: "Tech Enthusiast",
    text: "TechTrove has the most impressive collection of gadgets I've seen. Their customer service is exceptional and shipping is always fast!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    name: "Sarah Thompson",
    role: "Professional Photographer",
    text: "The quality of products is outstanding. I purchased a DSLR camera and it arrived perfectly packaged with all accessories. Will shop again!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Michael Chen",
    role: "Software Developer",
    text: "As someone who works in tech, I appreciate the detailed specifications and honest reviews. TechTrove has become my go-to store for all my gadget needs.",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg"
  }
];

const colorThemes = [
  { name: "Purple", primary: "#8b5cf6", secondary: "#c4b5fd" },
  { name: "Blue", primary: "#2563eb", secondary: "#93c5fd" },
  { name: "Green", primary: "#10b981", secondary: "#a7f3d0" },
  { name: "Red", primary: "#ef4444", secondary: "#fca5a5" },
  { name: "Orange", primary: "#f97316", secondary: "#fed7aa" },
];

const Index = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hasToastShown, setHasToastShown] = useState(false);
  const [colorTheme, setColorTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('techtrove-theme');
      return savedTheme ? JSON.parse(savedTheme) : colorThemes[0];
    } catch (error) {
      console.error("Error parsing theme from localStorage:", error);
      return colorThemes[0];
    }
  });
  const [showTrending, setShowTrending] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const trendingRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const featuredProducts = products.filter(product => product.isFeatured).slice(0, 3);
  
  const trendingProducts = [
    {
      name: "Quantum Pro Earbuds",
      price: 129.99,
      change: "+12%",
      positive: true
    },
    {
      name: "UltraSlim 4K Monitor",
      price: 349.99,
      change: "+8%",
      positive: true
    },
    {
      name: "PowerCore Ultra Battery",
      price: 89.99,
      change: "-3%",
      positive: false
    },
    {
      name: "CrystalCam Security System",
      price: 199.99,
      change: "+15%",
      positive: true
    },
    {
      name: "SmartHome Controller Hub",
      price: 149.99,
      change: "+5%",
      positive: true
    }
  ];

  const handleQuickView = (product) => {
    setQuickViewProduct(product);
    setQuickViewOpen(true);
  };

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', colorTheme.primary);
    document.documentElement.style.setProperty('--secondary', colorTheme.secondary);
    
    try {
      localStorage.setItem('techtrove-theme', JSON.stringify(colorTheme));
    } catch (error) {
      console.error("Error saving theme to localStorage:", error);
    }
  }, [colorTheme]);

  useEffect(() => {
    // Only run once per component mount
    if (!hasToastShown) {
      // Check session storage first
      const hasShownWelcome = sessionStorage.getItem('hasShownWelcome');
      
      if (!hasShownWelcome) {
        // Add a delay before showing toast
        const timer = setTimeout(() => {
          toast({
            title: "Welcome to TechTrove!",
            description: "Explore our latest tech products and exclusive deals.",
            action: {
              label: "Shop Now",
              onClick: () => window.scrollTo({ top: document.getElementById('featured-products')?.offsetTop, behavior: 'smooth' }),
            },
            duration: 5000,
          });
          
          // Mark as shown in session storage and local state
          sessionStorage.setItem('hasShownWelcome', 'true');
          setHasToastShown(true);
        }, 1000);
        
        return () => clearTimeout(timer);
      } else {
        // Already shown in this session
        setHasToastShown(true);
      }
    }
  }, [hasToastShown]); // Only depend on this flag

  useEffect(() => {
    // Pre-load section elements to prevent white flash
    const sections = document.querySelectorAll('.animate-on-scroll');
    sections.forEach((section) => {
      section.classList.add('opacity-0');
    });
    
    setIsLoaded(true);

    setTimeout(() => {
      setShowTrending(true);
      if (trendingRef.current) {
        gsap.fromTo(
          trendingRef.current,
          { y: -50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
        );
      }
    }, 3000);

    const tl = gsap.timeline();
    tl.fromTo(
      ".hero-title",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(
        ".hero-subtitle",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".hero-cta",
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.6"
      )
      .fromTo(
        ".featured-slider",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        "-=0.4"
      );

    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredProducts.length);
    }, 5000);

    // Improved scroll animation function with debounce to prevent white flash
    let scrollTimeout: number | undefined;
    const animateOnScroll = () => {
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
      
      scrollTimeout = window.setTimeout(() => {
        const scrollY = window.scrollY;
        const sections = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const sectionHeight = (section as HTMLElement).offsetHeight;
          
          // Load sections before they come into view to prevent white flash
          if (scrollY > sectionTop - windowHeight - 300) {
            // Pre-load the section
            section.classList.add('opacity-20'); 
          }
          
          // Fully animate when properly in viewport
          if (scrollY > sectionTop - windowHeight + sectionHeight / 4) {
            section.classList.add('animated');
            section.classList.remove('opacity-0', 'opacity-20');
            section.classList.add('opacity-100');
          }
        });
        
        if (heroSectionRef.current) {
          const scrollPosition = window.scrollY;
          const parallaxElements = heroSectionRef.current.querySelectorAll('.parallax');
          
          parallaxElements.forEach((element, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = -scrollPosition * speed;
            gsap.to(element, {
              y: yPos,
              ease: "none",
              duration: 0.3
            });
          });
        }
      }, 10); // Small timeout for performance
    };

    window.addEventListener('scroll', animateOnScroll);
    // Run once on initial load
    animateOnScroll();

    return () => {
      window.removeEventListener("scroll", () => {});
      window.removeEventListener('scroll', animateOnScroll);
      clearInterval(slideInterval);
      if (scrollTimeout) {
        window.clearTimeout(scrollTimeout);
      }
    };
  }, [featuredProducts.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
      {/* Quick View Dialog */}
      <Dialog open={quickViewOpen} onOpenChange={setQuickViewOpen}>
        <DialogContent className="max-w-4xl">
          {quickViewProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl">{quickViewProduct.name}</DialogTitle>
                <DialogDescription>
                  Quick preview of this product
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={quickViewProduct.images[0]} 
                    alt={quickViewProduct.name} 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">{quickViewProduct.name}</h2>
                  <p className="text-2xl font-bold text-primary mb-4">${quickViewProduct.price.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                    ))}
                    <span className="text-muted-foreground text-sm ml-2">(24 reviews)</span>
                  </div>
                  <p className="text-muted-foreground mb-6">
                    Experience premium quality with our {quickViewProduct.name}. This product features cutting-edge technology and elegant design.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      className="bg-primary hover:bg-primary/90 text-white"
                      onClick={() => window.location.href = `/product/${quickViewProduct.id}`}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-primary/60 text-primary hover:bg-primary/10"
                      onClick={() => {
                        toast({
                          title: "Added to cart!",
                          description: `${quickViewProduct.name} has been added to your cart.`,
                          variant: "default"
                        });
                      }}
                    >
                      <ShoppingBag className="mr-2" size={16} />
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {showTrending && (
        <div 
          ref={trendingRef}
          className="fixed top-16 left-0 right-0 z-50 bg-gradient-to-r from-primary/10 via-primary/20 to-primary/10 backdrop-blur-md border-b border-primary/20"
        >
          <div className="container mx-auto py-2 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ArrowRight size={18} className="text-primary" />
                <span className="text-sm font-medium">Live Price Tracking</span>
              </div>
              <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
                {trendingProducts.map((product, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span className="text-xs">{product.name}</span>
                    <span className="text-xs font-semibold">${product.price}</span>
                    <span className={`text-xs ${product.positive ? 'text-green-500' : 'text-red-500'}`}>
                      {product.change}
                    </span>
                  </div>
                ))}
              </div>
              <button 
                className="text-xs text-primary/70 hover:text-primary"
                onClick={() => setShowTrending(false)}
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <section ref={heroSectionRef} className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 to-slate-800 pt-36">
        <div className="absolute inset-0 opacity-30">
          <ThreeJSHero />
        </div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="parallax absolute top-1/4 left-1/5 w-24 h-24 rounded-full bg-purple-500 opacity-10 blur-xl"></div>
          <div className="parallax absolute bottom-1/3 right-1/4 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-xl"></div>
          <div className="parallax absolute top-1/2 right-1/5 w-20 h-20 rounded-full bg-pink-500 opacity-10 blur-xl"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-center mt-20">
          <h1 className="hero-title text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            <span className="text-primary">Tech</span>
            <span className="text-white">Store</span>
            <span className="block mt-2 text-2xl md:text-3xl font-normal text-white/80">Premium Tech Marketplace</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto">
            Discover the latest innovations in technology with our premium selection of gadgets and devices.
          </p>
          
          <div className="max-w-md mx-auto mb-8 p-3 rounded-full bg-white/10 backdrop-blur-sm">
            <div className="flex justify-center gap-2">
              {colorThemes.map((theme) => (
                <button
                  key={theme.name}
                  onClick={() => setColorTheme(theme)}
                  className={`w-8 h-8 rounded-full transition-transform ${colorTheme.name === theme.name ? 'scale-110 ring-2 ring-white' : 'opacity-80 hover:opacity-100'}`}
                  style={{ backgroundColor: theme.primary }}
                  title={`${theme.name} Theme`}
                >
                  <span className="sr-only">{theme.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button
              size="lg"
              className="hero-cta bg-primary hover:bg-primary/90 text-white"
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById("featured-products")?.offsetTop,
                  behavior: "smooth",
                });
                
                gsap.fromTo(
                  ".product-card",
                  { scale: 0.98 },
                  { 
                    scale: 1, 
                    duration: 0.5, 
                    stagger: 0.1,
                    ease: "elastic.out(1, 0.5)"
                  }
                );
              }}
            >
              <ShoppingBag className="mr-2" size={16} />
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="hero-cta bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border-white/20"
              onClick={() => {
                window.scrollTo({
                  top: document.getElementById("interactive-product")?.offsetTop,
                  behavior: "smooth",
                });
              }}
            >
              <MousePointerClick className="mr-2" size={16} />
              Try Interactive Demo
            </Button>
          </div>
          
          <div className="featured-slider max-w-5xl mx-auto">
            <div className="relative overflow-hidden rounded-xl" ref={sliderRef}>
              <div 
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {featuredProducts.map((product, index) => (
                  <div key={index} className="min-w-full">
                    <div className="glass p-8 rounded-2xl backdrop-blur-xl bg-white/5 border border-white/10">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="w-full md:w-1/2 overflow-hidden rounded-lg">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="w-full md:w-1/2 text-left">
                          <span className="inline-block px-3 py-1 bg-primary/20 text-primary text-sm font-medium rounded-full mb-4">
                            {product.isNew ? 'NEW ARRIVAL' : 'FEATURED'}
                          </span>
                          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{product.name}</h2>
                          <p className="text-white/70 mb-4">Experience the latest innovation in technology with our premium products.</p>
                          <div className="flex items-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={18} className="text-yellow-500 fill-yellow-500" />
                            ))}
                            <span className="text-white/70 text-sm ml-2">(24 reviews)</span>
                          </div>
                          <p className="text-2xl font-bold text-primary mb-6">${product.price.toFixed(2)}</p>
                          <div className="flex flex-wrap gap-3">
                            <Button 
                              className="bg-primary hover:bg-primary/90 text-white"
                              onClick={() => {
                                window.location.href = `/product/${product.id}`;
                              }}
                            >
                              View Details
                            </Button>
                            <Button 
                              onClick={() => handleQuickView(product)}
                              variant="outline" 
                              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
                            >
                              <Eye className="mr-2" size={16} />
                              Quick View
                            </Button>
                            <Button 
                              variant="outline" 
                              className="border-white/20 bg-black text-white hover:bg-black/80"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                
                                const button = e.currentTarget;
                                gsap.fromTo(
                                  button,
                                  { scale: 1 },
                                  { 
                                    scale: 0.95, 
                                    duration: 0.1, 
                                    yoyo: true, 
                                    repeat: 1,
                                    onComplete: () => {
                                      toast({
                                        title: "Added to cart!",
                                        description: `${product.name} has been added to your cart.`,
                                        variant: "default"
                                      });
                                    }
                                  }
                                );
                              }}
                            >
                              <ShoppingBag className="mr-2" size={16} />
                              Add to Cart
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6 gap-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentSlide === index 
                        ? 'bg-primary scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
              
              <button 
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                onClick={() => setCurrentSlide((prev) => (prev === 0 ? featuredProducts.length - 1 : prev - 1))}
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full"
                onClick={() => setCurrentSlide((prev) => (prev === featuredProducts.length - 1 ? 0 : prev + 1))}
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
        
        <button 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-colors animate-bounce"
          onClick={() => {
            window.scrollTo({
              top: document.getElementById("interactive-product")?.offsetTop,
              behavior: "smooth",
            });
          }}
          aria-label="Scroll down"
        >
          <ArrowDown size={24} />
        </button>
      </section>

      <section id="featured-products" className="py-20 bg-gradient-to-b from-slate-800 to-slate-900 text-white animate-on-scroll opacity-0 transition-all duration-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">FEATURED</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Best Tech Products
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Explore our carefully curated collection of premium tech gadgets
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                isNew={product.isNew}
                isFeatured={product.isFeatured}
                onQuickView={() => handleQuickView(product)}
                showQuickView={true}
              />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button 
              className="bg-primary hover:bg-primary/90 text-white"
              onClick={() => window.location.href = '/products'}
            >
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section id="interactive-product" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900 text-white animate-on-scroll opacity-0 transition-all duration-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">INTERACTIVE</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Experience Products in 3D
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Interact with our products in a whole new dimension. Rotate, zoom, and explore details like never before.
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto">
            <InteractiveProductViewer productId="product1" />
          </div>
        </div>
      </section>

      <WhatsNewSection />

      <section className="py-24 bg-gradient-to-b from-slate-900 to-primary/5 animate-on-scroll opacity-0 transition-all duration-1000">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <span className="px-4 py-1 text-sm rounded-full bg-secondary/20 text-secondary font-semibold mb-4 inline-block">REWARDS</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              TechTrove Rewards Program
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Earn points with every purchase and unlock exclusive benefits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-white hover:transform hover:scale-105 transition-all">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Star size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Silver Tier</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Earn 1 point per $1 spent</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Early access to sales</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Free standard shipping</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Birthday rewards</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-primary/30 to-secondary/30 backdrop-blur-sm rounded-xl p-8 border border-primary/30 text-white transform scale-105 shadow-lg">
              <div className="bg-white/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Gold Tier</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-white" />
                  <p className="text-white/90">Earn 2 points per $1 spent</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-white" />
                  <p className="text-white/90">All Silver benefits</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-white" />
                  <p className="text-white/90">Exclusive monthly offers</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-white" />
                  <p className="text-white/90">Free expedited shipping</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-white" />
                  <p className="text-white/90">Extended return window</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-8 border border-white/10 text-white hover:transform hover:scale-105 transition-all">
              <div className="bg-primary/20 w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Crown size={32} className="text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Platinum Tier</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Earn 3 points per $1 spent</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">All Gold benefits</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Priority customer service</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Exclusive events & products</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Free premium shipping</p>
                </div>
                <div className="flex items-center gap-2">
                  <Check size={16} className="text-primary" />
                  <p className="text-white/80">Double points on special days</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
