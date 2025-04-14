import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Filter, ArrowUpDown, Grid3X3, List, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import PageTransition from '@/components/PageTransition';

const allProducts = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Audio',
    isNew: true,
    isFeatured: true,
    model3d: '/models/headphones.gltf',
  },
  {
    id: '2',
    name: 'Smart Watch Series X',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1399&q=80',
    category: 'Wearables',
    isFeatured: true,
    model3d: '/models/smartwatch.gltf',
  },
  {
    id: '3',
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'Audio',
    isNew: true,
    model3d: '/models/speaker.gltf',
  },
  {
    id: '4',
    name: 'Noise-Cancelling Earbuds',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?q=80&w=3089&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Audio',
    model3d: '/models/earbuds.gltf',
  },
  {
    id: '5',
    name: 'Smart Home Hub',
    price: 159.99,
    image: 'https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Smart Home',
    isNew: true,
    model3d: '/models/smarthome.gltf',
  },
  {
    id: '6',
    name: 'Wireless Gaming Mouse',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
    category: 'Peripherals',
    model3d: '/models/mouse.gltf',
  },
  {
    id: '7',
    name: 'Ultra-Slim Laptop',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
    category: 'Computers',
    isFeatured: true,
    model3d: '/models/laptop.gltf',
  },
  {
    id: '8',
    name: 'Wireless Charging Pad',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1384&q=80',
    category: 'Accessories',
    isNew: true,
    model3d: '/models/charger.gltf',
  },
  {
    id: '9',
    name: 'Professional DSLR Camera',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1164&q=80',
    category: 'Photography',
    isFeatured: true,
    model3d: '/models/camera.gltf',
  },
  {
    id: '10',
    name: 'Smart Fitness Tracker',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1629339837617-7069ce9e7f6b?q=80&w=2825&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Wearables',
    isNew: true,
    model3d: '/models/fitnesstracker.gltf',
  },
  {
    id: '11',
    name: 'Mechanical Gaming Keyboard',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Peripherals',
    model3d: '/models/keyboard.gltf',
  },
  {
    id: '12',
    name: 'Curved Gaming Monitor',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1588200908342-23b585c03e26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    category: 'Peripherals',
    isFeatured: true,
    model3d: '/models/monitor.gltf',
  },
  {
    id: '13',
    name: 'Premium Smartphone XZ1',
    price: 899.99,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2504&q=80',
    category: 'Smartphones',
    isFeatured: true,
    model3d: '/models/smartphone.gltf',
  },
  {
    id: '14',
    name: 'Pro Tablet 12.9"',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80',
    category: 'Tablets',
    isNew: true,
    model3d: '/models/tablet.gltf',
  },
  {
    id: '15',
    name: 'Virtual Reality Headset',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Virtual Reality',
    isFeatured: true,
    model3d: '/models/vr.gltf',
  },
  {
    id: '16',
    name: 'Smart LED TV 65"',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'TVs',
    isNew: true,
    model3d: '/models/tv.gltf',
  },
  {
    id: '17',
    name: 'Drone with 4K Camera',
    price: 599.99,
    image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    category: 'Drones',
    isFeatured: true,
    model3d: '/models/drone.gltf',
  },
  {
    id: '18',
    name: 'Electric Scooter',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1604357209793-fca5dca89f97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80',
    category: 'Mobility',
    isNew: true,
    model3d: '/models/scooter.gltf',
  },
  {
    id: '19',
    name: 'Smart Refrigerator',
    price: 1899.99,
    image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Smart Home',
    isFeatured: false,
    model3d: '/models/refrigerator.gltf',
  },
  {
    id: '20',
    name: 'Robotic Vacuum Cleaner',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    category: 'Smart Home',
    isNew: true,
    model3d: '/models/vacuum.gltf',
  },
];

const categories = [
  'All',
  'Audio',
  'Wearables',
  'Smart Home',
  'Peripherals',
  'Computers',
  'Accessories',
  'Photography',
  'Smartphones',
  'Tablets',
  'Virtual Reality',
  'TVs',
  'Drones',
  'Mobility',
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortOption, setSortOption] = useState('featured');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, addToWishlist, isInCart, isInWishlist } = useCart();
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      gsap.fromTo(
        '.page-title',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
      );
      
      gsap.fromTo(
        '.filter-section',
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, delay: 0.1, ease: 'power2.out' }
      );
    }
  }, [isLoading]);
  
  useEffect(() => {
    let result = [...allProducts];
    
    if (selectedCategory !== 'All') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    if (sortOption === 'price-low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      result.sort((a, b) => (a.isNew ? -1 : 1) - (b.isNew ? -1 : 1));
    } else if (sortOption === 'alphabetical') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'bestsellers') {
      result.sort((a, b) => (a.isFeatured ? -1 : 1) - (b.isFeatured ? -1 : 1));
    }
    
    setFilteredProducts(result);
    
    if (!isLoading) {
      gsap.fromTo(
        '.product-card',
        { opacity: 0, y: 15 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.3, 
          stagger: 0.05,
          ease: 'power2.out',
          clearProps: "all"
        }
      );
    }
  }, [selectedCategory, sortOption, isLoading]);
  
  const handleCategorySelect = (category: string) => {
    setIsLoading(true);
    setSelectedCategory(category);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };
  
  if (isLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen">
        <div className="container mx-auto px-6">
          <div className="animate-pulse">
            <div className="h-10 bg-neutral-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-neutral-200 rounded w-2/4 mb-8"></div>
            
            <div className="h-12 bg-neutral-200 rounded mb-8"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="h-64 bg-neutral-200"></div>
                  <div className="p-4">
                    <div className="h-5 bg-neutral-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-neutral-200 rounded w-1/4 mb-4"></div>
                    <div className="h-10 bg-neutral-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <PageTransition>
      <div className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          <h1 className="page-title text-3xl md:text-4xl font-bold mb-2">
            Shop All Products
          </h1>
          <p className="text-neutral-600 mb-8">
            Discover our collection of premium tech products
          </p>
          
          <div className="filter-section flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="hidden md:flex space-x-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-white shadow-md transform scale-105'
                      : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                  }`}
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </button>
              ))}
            </div>
            
            <Button
              variant="outline"
              className="md:hidden flex items-center gap-2"
              onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
            >
              <Filter size={18} />
              <span>Filter & Sort</span>
            </Button>
            
            <div className="flex items-center gap-3">
              <div className="bg-neutral-100 p-1 rounded-md flex">
                <button 
                  className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-neutral-500'}`}
                  onClick={() => setViewMode('grid')}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-white shadow-sm' : 'text-neutral-500'}`}
                  onClick={() => setViewMode('list')}
                  aria-label="List view"
                >
                  <List size={18} />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <ArrowUpDown size={18} className="text-neutral-500" />
                <select
                  className="border border-neutral-200 rounded-md py-2 px-3 bg-white text-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="bestsellers">Best Sellers</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="newest">Newest</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
          
          {isMobileFilterOpen && (
            <div className="md:hidden mb-6 p-4 bg-neutral-50 rounded-lg animate-fade-in">
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-neutral-700 border border-neutral-200'
                    }`}
                    onClick={() => handleCategorySelect(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  image={product.image}
                  isNew={product.isNew}
                  isFeatured={product.isFeatured}
                  category={product.category}
                  model3d={product.model3d}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="product-card flex flex-col sm:flex-row bg-white rounded-lg shadow-sm overflow-hidden transform transition-transform hover:shadow-md">
                  <div className="sm:w-1/3 relative">
                    {(product.isNew || product.isFeatured) && (
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-2">
                        {product.isNew && (
                          <span className="bg-primary text-white text-xs px-2 py-1 rounded-md animate-pulse">
                            NEW
                          </span>
                        )}
                        {product.isFeatured && (
                          <span className="bg-secondary text-white text-xs px-2 py-1 rounded-md">
                            FEATURED
                          </span>
                        )}
                      </div>
                    )}
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 sm:h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="sm:w-2/3 p-4 sm:p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium text-neutral-900 mb-1 hover:text-primary transition-colors">
                            <Link to={`/product/${product.id}`}>
                              {product.name}
                            </Link>
                          </h3>
                          <p className="text-neutral-500 mb-3">{product.category}</p>
                        </div>
                        <p className="text-primary font-semibold text-lg">${product.price.toFixed(2)}</p>
                      </div>
                      <p className="text-neutral-600 mb-4">
                        Experience premium quality and cutting-edge technology with this amazing product.
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className={`flex-1 flex items-center justify-center gap-2 ${
                          isInCart(product.id)
                          ? 'bg-green-600 hover:bg-green-700 text-white'
                          : 'bg-primary hover:bg-primary/90 text-white'
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(product);
                        }}
                      >
                        <ShoppingCart size={16} />
                        <span>{isInCart(product.id) ? 'Added to Cart' : 'Add to Cart'}</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className={`flex items-center justify-center gap-1 ${
                          isInWishlist(product.id)
                          ? 'text-red-500 bg-red-50 border-red-200'
                          : ''
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          addToWishlist(product);
                        }}
                      >
                        <Heart size={16} className={isInWishlist(product.id) ? 'fill-red-500' : ''} />
                      </Button>
                      <Link 
                        to={`/product/${product.id}`}
                        className="btn-secondary flex items-center justify-center gap-1 px-4"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-neutral-600 mb-6">
                Try changing your filter or search criteria
              </p>
              <Button 
                onClick={() => handleCategorySelect('All')}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Products;
