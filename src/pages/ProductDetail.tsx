import { useEffect, useState, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ShoppingCart, Heart, Share2, ChevronRight, ArrowLeft, Star, Truck, ShieldCheck, CreditCard, RotateCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductViewer3D from '@/components/ProductViewer3D';
import { toast } from 'sonner';
import { useCart } from '@/context/CartContext';

const products = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    rating: 4.8,
    reviewCount: 124,
    description: 'Experience superior sound quality with our Premium Wireless Headphones. Featuring advanced noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions for extended wear.',
    features: [
      'Active Noise Cancellation',
      'Hi-Fi Sound Quality',
      '40-Hour Battery Life',
      'Quick Charge Technology',
      'Bluetooth 5.2 Connectivity',
      'Memory Foam Ear Cushions',
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
    ],
    colors: ['Black', 'Silver', 'Blue'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/headphones.gltf',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 449.99,
    rating: 4.6,
    reviewCount: 89,
    description: 'The next generation of smart watches is here. Monitor your health, track your fitness, and stay connected with the Smart Watch Series X featuring a crystal clear always-on display and 3-day battery life.',
    features: [
      'Always-On Retina Display',
      'Advanced Health Monitoring',
      'Water Resistant to 50 meters',
      'GPS + Cellular',
      'Up to 3-day Battery Life',
      'ECG and Blood Oxygen Apps',
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Black', 'Silver', 'Gold'],
    isInStock: true,
    isNew: true,
    category: 'Wearables',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    rating: 4.5,
    reviewCount: 78,
    description: "Take your music anywhere with this premium portable Bluetooth speaker. With 24 hours of battery life, waterproof design, and immersive 360° sound, you'll never want to leave home without it.",
    features: [
      '360° Sound Technology',
      'IPX7 Waterproof Rating',
      '24-Hour Battery Life',
      'Bluetooth 5.1',
      'Built-in Microphone',
      'Shockproof Design',
    ],
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    ],
    colors: ['Black', 'Blue', 'Red'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/speaker.gltf',
  },
  {
    id: '4',
    name: 'Noise-Cancelling Earbuds',
    price: 199.99,
    rating: 4.6,
    reviewCount: 92,
    description: 'Immerse yourself in sound with these premium noise-cancelling earbuds. Featuring active noise cancellation, transparency mode, and 8 hours of battery life with an additional 24 hours from the charging case.',
    features: [
      'Active Noise Cancellation',
      'Transparency Mode',
      '8-Hour Battery Life',
      'Wireless Charging Case',
      'IPX4 Water Resistance',
      'Touch Controls',
    ],
    images: [
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    ],
    colors: ['White', 'Black', 'Navy'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/earbuds.gltf',
  },
  {
    id: '5',
    name: 'Premium Smartphone XZ1',
    price: 899.99,
    rating: 4.7,
    reviewCount: 145,
    description: 'The latest flagship smartphone with cutting-edge features including a 6.7-inch AMOLED display, 5G connectivity, 108MP camera system, and all-day battery life.',
    features: [
      '6.7" AMOLED 120Hz Display',
      '108MP Camera System',
      '5G Connectivity',
      '4500mAh Battery',
      'Water & Dust Resistant (IP68)',
      'Fast Charging & Wireless Charging',
    ],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2504&q=80',
      'https://images.unsplash.com/photo-1617997455863-9a5e80bd3e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Midnight Black', 'Silver', 'Ocean Blue'],
    isInStock: true,
    isNew: false,
    category: 'Smartphones',
    model3d: '/models/smartphone.gltf',
  },
  {
    id: '6',
    name: 'Pro Tablet 12.9"',
    price: 799.99,
    rating: 4.8,
    reviewCount: 112,
    description: 'The ultimate tablet for creativity and productivity. Features a stunning 12.9-inch Liquid Retina XDR display, powerful processor, and support for the latest stylus technology.',
    features: [
      '12.9" Liquid Retina XDR display',
      'All-day battery life',
      'Support for Pro Stylus',
      'Face ID for secure authentication',
      'Four-speaker audio',
      'USB-C connectivity',
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    ],
    colors: ['Space Gray', 'Silver', 'Gold'],
    isInStock: true,
    isNew: false,
    category: 'Tablets',
    model3d: '/models/tablet.gltf',
  },
  {
    id: '7',
    name: 'Virtual Reality Headset',
    price: 499.99,
    rating: 4.5,
    reviewCount: 67,
    description: 'Step into immersive virtual worlds with our high-resolution VR headset. Featuring 4K resolution per eye, inside-out tracking, and comfortable ergonomics for extended sessions.',
    features: [
      '4K resolution per eye',
      'Inside-out tracking',
      'Wireless design',
      'Integrated audio',
      'Adjustable IPD',
      'Comfortable ergonomics',
    ],
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1525459571112-58891e4f3228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Black', 'White'],
    isInStock: true,
    isNew: false,
    category: 'Virtual Reality',
    model3d: '/models/vr.gltf',
  },
  {
    id: '8',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    rating: 4.8,
    reviewCount: 124,
    description: 'Experience superior sound quality with our Premium Wireless Headphones. Featuring advanced noise cancellation, 40-hour battery life, and ultra-comfortable ear cushions for extended wear.',
    features: [
      'Active Noise Cancellation',
      'Hi-Fi Sound Quality',
      '40-Hour Battery Life',
      'Quick Charge Technology',
      'Bluetooth 5.2 Connectivity',
      'Memory Foam Ear Cushions',
    ],
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1577174881658-0f30ed549adc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=388&q=80',
    ],
    colors: ['Black', 'Silver', 'Blue'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/headphones.gltf',
  },
  {
    id: '9',
    name: 'Smart Watch Series X',
    price: 449.99,
    rating: 4.6,
    reviewCount: 89,
    description: 'The next generation of smart watches is here. Monitor your health, track your fitness, and stay connected with the Smart Watch Series X featuring a crystal clear always-on display and 3-day battery life.',
    features: [
      'Always-On Retina Display',
      'Advanced Health Monitoring',
      'Water Resistant to 50 meters',
      'GPS + Cellular',
      'Up to 3-day Battery Life',
      'ECG and Blood Oxygen Apps',
    ],
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Black', 'Silver', 'Gold'],
    isInStock: true,
    isNew: false,
    category: 'Wearables',
  },
  {
    id: '10',
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    rating: 4.5,
    reviewCount: 78,
    description: "Take your music anywhere with this premium portable Bluetooth speaker. With 24 hours of battery life, waterproof design, and immersive 360° sound, you'll never want to leave home without it.",
    features: [
      '360° Sound Technology',
      'IPX7 Waterproof Rating',
      '24-Hour Battery Life',
      'Bluetooth 5.1',
      'Built-in Microphone',
      'Shockproof Design',
    ],
    images: [
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
      'https://images.unsplash.com/photo-1589256469067-ea99122bbdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    ],
    colors: ['Black', 'Blue', 'Red'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/speaker.gltf',
  },
  {
    id: '11',
    name: 'Noise-Cancelling Earbuds',
    price: 199.99,
    rating: 4.6,
    reviewCount: 92,
    description: 'Immerse yourself in sound with these premium noise-cancelling earbuds. Featuring active noise cancellation, transparency mode, and 8 hours of battery life with an additional 24 hours from the charging case.',
    features: [
      'Active Noise Cancellation',
      'Transparency Mode',
      '8-Hour Battery Life',
      'Wireless Charging Case',
      'IPX4 Water Resistance',
      'Touch Controls',
    ],
    images: [
      'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f44?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    ],
    colors: ['White', 'Black', 'Navy'],
    isInStock: true,
    isNew: false,
    category: 'Audio',
    model3d: '/models/earbuds.gltf',
  },
  {
    id: '12',
    name: 'Premium Smartphone XZ1',
    price: 899.99,
    rating: 4.7,
    reviewCount: 145,
    description: 'The latest flagship smartphone with cutting-edge features including a 6.7-inch AMOLED display, 5G connectivity, 108MP camera system, and all-day battery life.',
    features: [
      '6.7" AMOLED 120Hz Display',
      '108MP Camera System',
      '5G Connectivity',
      '4500mAh Battery',
      'Water & Dust Resistant (IP68)',
      'Fast Charging & Wireless Charging',
    ],
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2504&q=80',
      'https://images.unsplash.com/photo-1617997455863-9a5e80bd3e4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Midnight Black', 'Silver', 'Ocean Blue'],
    isInStock: true,
    isNew: false,
    category: 'Smartphones',
    model3d: '/models/smartphone.gltf',
  },
  {
    id: '13',
    name: 'Pro Tablet 12.9"',
    price: 799.99,
    rating: 4.8,
    reviewCount: 112,
    description: 'The ultimate tablet for creativity and productivity. Features a stunning 12.9-inch Liquid Retina XDR display, powerful processor, and support for the latest stylus technology.',
    features: [
      '12.9" Liquid Retina XDR display',
      'All-day battery life',
      'Support for Pro Stylus',
      'Face ID for secure authentication',
      'Four-speaker audio',
      'USB-C connectivity',
    ],
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
      'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    ],
    colors: ['Space Gray', 'Silver', 'Gold'],
    isInStock: true,
    isNew: false,
    category: 'Tablets',
    model3d: '/models/tablet.gltf',
  },
  {
    id: '14',
    name: 'Virtual Reality Headset',
    price: 499.99,
    rating: 4.5,
    reviewCount: 67,
    description: 'Step into immersive virtual worlds with our high-resolution VR headset. Featuring 4K resolution per eye, inside-out tracking, and comfortable ergonomics for extended sessions.',
    features: [
      '4K resolution per eye',
      'Inside-out tracking',
      'Wireless design',
      'Integrated audio',
      'Adjustable IPD',
      'Comfortable ergonomics',
    ],
    images: [
      'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1525459571112-58891e4f3228?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    ],
    colors: ['Black', 'White'],
    isInStock: true,
    isNew: false,
    category: 'Virtual Reality',
    model3d: '/models/vr.gltf',
  },
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<typeof products[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [view, setView] = useState<'2d' | '3d'>('2d');
  const [relatedProducts, setRelatedProducts] = useState<typeof products>([]);
  const navigate = useNavigate();
  const { addToCart, addToWishlist, isInWishlist, isInCart } = useCart();
  const mainContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        
        const related = products
          .filter(p => p.id !== id && p.category === foundProduct.category)
          .slice(0, 4);
        setRelatedProducts(related);
      }
      setIsLoading(false);
    }, 800);
  }, [id]);
  
  useEffect(() => {
    if (!isLoading && product && mainContentRef.current) {
      gsap.fromTo(
        mainContentRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        '.thumbnail-image',
        { opacity: 0, scale: 0.9 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.4, 
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.3
        }
      );
      
      gsap.fromTo(
        '.feature-item',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          duration: 0.3, 
          stagger: 0.1,
          ease: 'power2.out',
          delay: 0.5
        }
      );
      
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }, [isLoading, product]);
  
  useEffect(() => {
    if (view === '3d') {
      gsap.fromTo(
        '.viewer-3d',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    } else {
      gsap.fromTo(
        '.product-gallery',
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [view]);
  
  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      ...product,
      color: selectedColor,
      image: product.images[0]
    }, quantity);
    
    const button = document.querySelector('.add-to-cart-btn');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };
  
  const handleBuyNow = () => {
    if (!product) return;
    
    addToCart({
      ...product,
      color: selectedColor,
      image: product.images[0]
    }, quantity);
    
    const button = document.querySelector('.buy-now-btn');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
    
    toast.success('Proceeding to checkout...', { duration: 2000 });
    
    setTimeout(() => {
      navigate('/cart');
    }, 500);
  };
  
  const handleAddToWishlist = () => {
    if (!product) return;
    
    addToWishlist({
      ...product,
      color: selectedColor,
      image: product.images[0]
    });
    
    const button = document.querySelector('.wishlist-btn');
    if (button) {
      gsap.fromTo(
        button,
        { scale: 1 },
        { scale: 0.95, duration: 0.1, yoyo: true, repeat: 1, ease: 'power2.inOut' }
      );
    }
  };
  
  const shareProduct = () => {
    if (!product) return;
    
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      })
      .then(() => toast.success('Shared successfully!'))
      .catch(() => toast.error('Sharing failed'));
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => toast.success('Link copied to clipboard!'))
        .catch(() => toast.error('Failed to copy link'));
    }
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-20 h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="pt-24 pb-20 container mx-auto px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="text-neutral-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products">
          <Button className="bg-primary hover:bg-primary/90 text-white">
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <div className="flex items-center text-sm text-neutral-500 mb-6">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight size={16} className="mx-2" />
          <Link 
            to={`/products?category=${product.category}`} 
            className="hover:text-primary transition-colors"
          >
            {product.category}
          </Link>
          <ChevronRight size={16} className="mx-2" />
          <span className="text-neutral-800">{product.name}</span>
        </div>
        
        <div ref={mainContentRef} className="flex flex-col lg:flex-row gap-10">
          <div className="w-full lg:w-1/2">
            <div className="flex bg-neutral-100 rounded-lg p-1 mb-4 w-fit">
              <button
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  view === '2d' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-500'
                }`}
                onClick={() => setView('2d')}
              >
                Photos
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm transition-colors ${
                  view === '3d' ? 'bg-white shadow-sm text-neutral-800' : 'text-neutral-500'
                }`}
                onClick={() => setView('3d')}
              >
                3D View
              </button>
            </div>
            
            {view === '2d' ? (
              <div className="product-gallery">
                <div className="bg-neutral-50 rounded-lg overflow-hidden mb-4 aspect-square">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                
                <div className="grid grid-cols-4 gap-4">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`thumbnail-image aspect-square rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === index 
                          ? 'border-primary scale-105 shadow-md'
                          : 'border-transparent hover:border-neutral-200'
                      }`}
                      onClick={() => setSelectedImage(index)}
                    >
                      <img
                        src={image}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="viewer-3d bg-neutral-50 rounded-lg overflow-hidden">
                <ProductViewer3D 
                  productId={product.id} 
                  modelPath={product.model3d}
                />
              </div>
            )}
          </div>
          
          <div className="w-full lg:w-1/2 product-main">
            <div className="flex items-center mb-2">
              <span className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                {product.category}
              </span>
              {product.isInStock ? (
                <span className="ml-3 text-sm text-green-600 flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                  In Stock
                </span>
              ) : (
                <span className="ml-3 text-sm text-red-500 flex items-center">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-1"></span>
                  Out of Stock
                </span>
              )}
              
              {product.isNew && (
                <span className="ml-3 text-sm font-medium bg-orange-100 text-orange-600 px-3 py-1 rounded-full animate-pulse">
                  NEW
                </span>
              )}
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={i < Math.floor(product.rating) ? '#FFD700' : 'none'}
                    stroke={i < Math.floor(product.rating) ? '#FFD700' : '#CBD5E0'}
                    className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-neutral-600">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
            
            <div className="text-3xl font-bold text-primary mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <p className="text-neutral-700 mb-6">
              {showMore 
                ? product.description 
                : `${product.description.slice(0, 150)}${product.description.length > 150 ? '...' : ''}`}
              {product.description.length > 150 && (
                <button
                  className="ml-2 text-primary font-medium hover:underline"
                  onClick={() => setShowMore(!showMore)}
                >
                  {showMore ? 'Show less' : 'Read more'}
                </button>
              )}
            </p>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 mb-2">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-10 h-10 rounded-full transition-all flex items-center justify-center ${
                      selectedColor === color
                        ? 'ring-2 ring-primary ring-offset-2'
                        : ''
                    }`}
                    style={{ 
                      backgroundColor: color.toLowerCase().replace(/\s+/g, ''),
                      border: ['white', 'silver', 'gold'].includes(color.toLowerCase()) ? '1px solid #e2e8f0' : 'none',
                    }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Color ${color}`}
                  >
                    {selectedColor === color && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.5 6L5 7.5L8.5 4" stroke={['white', 'silver', 'gold'].includes(color.toLowerCase()) ? '#333' : '#fff'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium text-neutral-700 mb-2">Quantity</h3>
              <div className="flex items-center w-32 h-10">
                <button
                  className="w-10 h-full border border-neutral-200 flex items-center justify-center rounded-l-md text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="h-full w-12 border-y border-neutral-200 text-center focus:outline-none text-neutral-800"
                />
                <button
                  className="w-10 h-full border border-neutral-200 flex items-center justify-center rounded-r-md text-neutral-600 hover:bg-neutral-50"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                className={`add-to-cart-btn flex-1 py-6 text-base flex items-center justify-center gap-2 ${
                  isInCart(product.id)
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-primary hover:bg-primary/90 text-white'
                }`}
                onClick={handleAddToCart}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}
              </Button>
              
              <Button 
                className="buy-now-btn flex-1 bg-secondary hover:bg-secondary/90 text-white py-6 text-base flex items-center justify-center gap-2"
                onClick={handleBuyNow}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Buy Now
              </Button>
              
              <Button 
                variant="outline" 
                className={`wishlist-btn border-primary w-14 h-14 p-0 flex items-center justify-center ${
                  isInWishlist(product.id) 
                  ? 'bg-red-50 text-red-500'
                  : 'text-primary hover:bg-primary/10'
                }`}
                onClick={handleAddToWishlist}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart 
                  className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500' : ''}`} 
                />
              </Button>
            </div>
            
            <div className="bg-neutral-50 rounded-lg p-6 mb-6">
              <h3 className="font-medium mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="feature-item flex items-start">
                    <div className="mr-3 text-primary mt-1">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7 13L10 16L17 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-neutral-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center border-t border-neutral-200 pt-4">
              <span className="text-neutral-600 mr-4">Share:</span>
              <div className="flex space-x-2">
                <button 
                  className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-700 hover:bg-neutral-200 transition-colors"
                  onClick={shareProduct}
                  aria-label="Share this product"
                >
                  <Share2 size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(relatedProduct => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:translate-y-[-5px] hover:shadow-md"
                >
                  <div className="relative h-48">
                    <img 
                      src={relatedProduct.images[0]} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover"
                    />
                    {relatedProduct.isNew && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-md">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-neutral-900 mb-1">{relatedProduct.name}</h3>
                    <p className="text-primary font-semibold">${relatedProduct.price.toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-12">
          <Link to="/products" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-2" />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
