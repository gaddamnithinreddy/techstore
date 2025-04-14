import { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  CreditCard, 
  MapPin, 
  Bell, 
  LogOut,
  ChevronRight,
  Truck,
  Calendar,
  BarChart4,
  RefreshCw,
  Eye,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/context/CartContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Account = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { wishlistItems } = useCart();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [currentTrackingOrder, setCurrentTrackingOrder] = useState<string | null>(null);
  
  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo('.page-title', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.account-tab', 
      { x: -20, opacity: 0 }, 
      { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.account-content', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );
  }, []);
  
  const handleTabChange = (value: string) => {
    gsap.to('.account-content', { 
      opacity: 0, 
      y: 20, 
      duration: 0.3,
      onComplete: () => {
        setActiveTab(value);
        gsap.to('.account-content', { 
          opacity: 1, 
          y: 0, 
          duration: 0.5 
        });
      }
    });
  };
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    
    gsap.to('.profile-update-button', {
      scale: 1.05,
      duration: 0.2,
      ease: 'power1.out',
      onComplete: () => {
        gsap.to('.profile-update-button', {
          scale: 1,
          duration: 0.3,
          ease: 'elastic.out(1, 0.5)'
        });
      }
    });
    
    toast.success('Profile updated successfully!', {
      description: 'Your changes have been saved.'
    });
  };
  
  const handleOrderExpand = (orderId: string) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
      
      setTimeout(() => {
        gsap.fromTo(`#order-details-${orderId}`, 
          { height: 0, opacity: 0 }, 
          { height: 'auto', opacity: 1, duration: 0.4, ease: 'power2.out' }
        );
      }, 10);
    }
  };
  
  const handleTrackOrder = (orderId: string) => {
    setIsTracking(true);
    setCurrentTrackingOrder(orderId);
    
    setTimeout(() => {
      const trackingModal = document.querySelector('.tracking-modal');
      if (trackingModal) {
        trackingModal.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    
    toast.success('Loading tracking information...', {
      description: `Tracking order #${orderId}`
    });
  };
  
  const handleBuyAgain = (productName: string) => {
    toast.success(`Adding ${productName} to cart`, {
      description: 'Item has been added to your cart.'
    });
  };
  
  const handleLogout = () => {
    gsap.to('.logout-button', {
      x: 10,
      opacity: 0.5,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        toast('You have been logged out', {
          description: 'See you again soon!'
        });
      }
    });
  };
  
  const handleCloseTracking = () => {
    gsap.to('.tracking-modal', {
      y: 20,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setIsTracking(false);
        setCurrentTrackingOrder(null);
      }
    });
  };
  
  const orders = [
    {
      id: 'ORD-2023-4587',
      date: 'October 15, 2023',
      status: 'Delivered',
      statusColor: 'green',
      totalAmount: 299.99,
      items: [
        {
          id: 'item1',
          name: 'Premium Wireless Headphones',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
          price: 299.99,
          quantity: 1
        }
      ],
      shippingAddress: '123 Main St, Apt 4B, San Francisco, CA 94107',
      trackingNumber: 'TRK12345678',
      estimatedDelivery: 'October 18, 2023',
      trackingHistory: [
        { date: 'October 15, 2023', time: '09:15 AM', status: 'Order Placed', location: 'Online' },
        { date: 'October 15, 2023', time: '11:30 AM', status: 'Order Processed', location: 'Warehouse' },
        { date: 'October 16, 2023', time: '08:45 AM', status: 'Shipped', location: 'Distribution Center' },
        { date: 'October 17, 2023', time: '02:20 PM', status: 'In Transit', location: 'Local Facility' },
        { date: 'October 18, 2023', time: '10:05 AM', status: 'Out for Delivery', location: 'San Francisco, CA' },
        { date: 'October 18, 2023', time: '03:45 PM', status: 'Delivered', location: 'San Francisco, CA' }
      ]
    },
    {
      id: 'ORD-2023-3921',
      date: 'September 3, 2023',
      status: 'Delivered',
      statusColor: 'green',
      totalAmount: 449.99,
      items: [
        {
          id: 'item2',
          name: 'Smart Watch Series X',
          image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
          price: 449.99,
          quantity: 1
        }
      ],
      shippingAddress: '123 Main St, Apt 4B, San Francisco, CA 94107',
      trackingNumber: 'TRK98765432',
      estimatedDelivery: 'September 8, 2023',
      trackingHistory: [
        { date: 'September 3, 2023', time: '10:25 AM', status: 'Order Placed', location: 'Online' },
        { date: 'September 3, 2023', time: '02:30 PM', status: 'Order Processed', location: 'Warehouse' },
        { date: 'September 4, 2023', time: '09:15 AM', status: 'Shipped', location: 'Distribution Center' },
        { date: 'September 6, 2023', time: '01:40 PM', status: 'In Transit', location: 'Local Facility' },
        { date: 'September 7, 2023', time: '11:20 AM', status: 'Out for Delivery', location: 'San Francisco, CA' },
        { date: 'September 7, 2023', time: '04:15 PM', status: 'Delivered', location: 'San Francisco, CA' }
      ]
    },
    {
      id: 'ORD-2023-2876',
      date: 'August 17, 2023',
      status: 'Delivered',
      statusColor: 'green',
      totalAmount: 129.99,
      items: [
        {
          id: 'item3',
          name: 'Portable Bluetooth Speaker',
          image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80',
          price: 129.99,
          quantity: 1
        }
      ],
      shippingAddress: '123 Main St, Apt 4B, San Francisco, CA 94107',
      trackingNumber: 'TRK24681357',
      estimatedDelivery: 'August 22, 2023',
      trackingHistory: [
        { date: 'August 17, 2023', time: '03:45 PM', status: 'Order Placed', location: 'Online' },
        { date: 'August 18, 2023', time: '09:30 AM', status: 'Order Processed', location: 'Warehouse' },
        { date: 'August 19, 2023', time: '10:15 AM', status: 'Shipped', location: 'Distribution Center' },
        { date: 'August 20, 2023', time: '02:20 PM', status: 'In Transit', location: 'Local Facility' },
        { date: 'August 21, 2023', time: '09:45 AM', status: 'Out for Delivery', location: 'San Francisco, CA' },
        { date: 'August 21, 2023', time: '05:30 PM', status: 'Delivered', location: 'San Francisco, CA' }
      ]
    },
    {
      id: 'ORD-2023-1954',
      date: 'July 29, 2023',
      status: 'In Transit',
      statusColor: 'blue',
      totalAmount: 799.99,
      items: [
        {
          id: 'item4',
          name: 'Professional DSLR Camera',
          image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1476&q=80',
          price: 799.99,
          quantity: 1
        }
      ],
      shippingAddress: '123 Main St, Apt 4B, San Francisco, CA 94107',
      trackingNumber: 'TRK13579246',
      estimatedDelivery: 'Current Status: In Transit',
      trackingHistory: [
        { date: 'July 29, 2023', time: '11:30 AM', status: 'Order Placed', location: 'Online' },
        { date: 'July 30, 2023', time: '10:15 AM', status: 'Order Processed', location: 'Warehouse' },
        { date: 'July 31, 2023', time: '09:45 AM', status: 'Shipped', location: 'Distribution Center' },
        { date: 'August 2, 2023', time: '03:20 PM', status: 'In Transit', location: 'Regional Hub' }
      ]
    }
  ];
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="page-title text-3xl md:text-4xl font-bold mb-2">
          My Account
        </h1>
        <p className="text-neutral-600 mb-12 max-w-2xl">
          Manage your profile, orders, wishlist and account settings.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="font-medium">John Doe</h3>
                  <p className="text-neutral-500 text-sm">john.doe@example.com</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'profile' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('profile')}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'orders' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('orders')}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </button>
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'wishlist' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('wishlist')}
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <span className="ml-auto bg-primary text-white text-xs px-2 py-1 rounded-full">
                      {wishlistItems.length}
                    </span>
                  )}
                </button>
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'addresses' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('addresses')}
                >
                  <MapPin size={18} />
                  <span>Addresses</span>
                </button>
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'payment' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('payment')}
                >
                  <CreditCard size={18} />
                  <span>Payment Methods</span>
                </button>
                <button 
                  className={`account-tab w-full flex items-center gap-3 p-3 rounded-md transition-colors ${activeTab === 'settings' ? 'bg-primary/10 text-primary' : 'hover:bg-neutral-100'}`}
                  onClick={() => handleTabChange('settings')}
                >
                  <Settings size={18} />
                  <span>Settings</span>
                </button>
                
                <Separator className="my-4" />
                
                <button 
                  className="account-tab logout-button w-full flex items-center gap-3 p-3 rounded-md text-red-500 hover:bg-red-50 transition-colors"
                  onClick={handleLogout}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="lg:hidden">
            <Tabs value={activeTab} onValueChange={handleTabChange}>
              <TabsList className="grid grid-cols-3 sm:grid-cols-6">
                <TabsTrigger value="profile">
                  <span className="flex flex-col items-center gap-1">
                    <User size={16} />
                    <span className="text-xs">Profile</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="orders">
                  <span className="flex flex-col items-center gap-1">
                    <Package size={16} />
                    <span className="text-xs">Orders</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="wishlist">
                  <span className="flex flex-col items-center gap-1">
                    <Heart size={16} />
                    <span className="text-xs">Wishlist</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="addresses">
                  <span className="flex flex-col items-center gap-1">
                    <MapPin size={16} />
                    <span className="text-xs">Addresses</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="payment">
                  <span className="flex flex-col items-center gap-1">
                    <CreditCard size={16} />
                    <span className="text-xs">Payment</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <span className="flex flex-col items-center gap-1">
                    <Settings size={16} />
                    <span className="text-xs">Settings</span>
                  </span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="lg:col-span-3">
            <div className="account-content bg-white rounded-lg shadow-md p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
                  <form onSubmit={handleProfileUpdate}>
                    <div className="flex flex-col sm:flex-row gap-6 mb-6">
                      <div className="w-24 h-24 rounded-full bg-neutral-200 flex items-center justify-center relative mx-auto sm:mx-0 overflow-hidden group">
                        <User className="text-neutral-500 group-hover:scale-110 transition-transform" size={40} />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <button className="text-white">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 3C17.2626 2.73735 17.5744 2.52901 17.9176 2.38687C18.2608 2.24473 18.6286 2.17157 19 2.17157C19.3714 2.17157 19.7392 2.24473 20.0824 2.38687C20.4256 2.52901 20.7374 2.73735 21 3C21.2626 3.26264 21.471 3.57444 21.6131 3.9176C21.7553 4.26077 21.8284 4.62856 21.8284 5C21.8284 5.37143 21.7553 5.73923 21.6131 6.08239C21.471 6.42555 21.2626 6.73735 21 7L7.5 20.5L2 22L3.5 16.5L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div className="grow space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                            <Input id="firstName" defaultValue="John" className="focus:ring-primary focus:border-primary" />
                          </div>
                          <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                            <Input id="lastName" defaultValue="Doe" className="focus:ring-primary focus:border-primary" />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">Email Address</label>
                          <Input id="email" type="email" defaultValue="john.doe@example.com" className="focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">Phone Number</label>
                          <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" className="focus:ring-primary focus:border-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="font-medium text-lg mb-4 pt-4 border-t border-neutral-200">Change Password</h3>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-neutral-700 mb-1">Current Password</label>
                        <Input id="currentPassword" type="password" className="focus:ring-primary focus:border-primary" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="newPassword" className="block text-sm font-medium text-neutral-700 mb-1">New Password</label>
                          <Input id="newPassword" type="password" className="focus:ring-primary focus:border-primary" />
                        </div>
                        <div>
                          <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-1">Confirm New Password</label>
                          <Input id="confirmPassword" type="password" className="focus:ring-primary focus:border-primary" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button className="profile-update-button bg-primary hover:bg-primary/90">Save Changes</Button>
                    </div>
                  </form>
                </div>
              )}
              
              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">My Orders</h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <span>Filter by:</span>
                      <select className="text-sm border border-neutral-300 rounded-md p-1">
                        <option value="all">All Orders</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="overflow-hidden">
                        <div className="bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                          <div className="flex flex-col sm:flex-row justify-between mb-4">
                            <div>
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <p className="text-sm text-neutral-500">Placed on {order.date}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 flex items-center gap-2">
                              <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full bg-${order.statusColor}-100 text-${order.statusColor}-600`}>
                                {order.status}
                              </span>
                              <button 
                                onClick={() => handleOrderExpand(order.id)}
                                className="text-primary hover:text-primary/80"
                              >
                                <ChevronRight size={18} className={`transform transition-transform ${expandedOrder === order.id ? 'rotate-90' : ''}`} />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-4 mb-4">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex gap-4">
                                <div className="w-20 h-20 bg-neutral-200 rounded-md overflow-hidden">
                                  <img src={item.image} 
                                      className="w-full h-full object-cover" 
                                      alt={item.name} />
                                </div>
                                <div className="flex-grow">
                                  <h4 className="font-medium">{item.name}</h4>
                                  <p className="text-sm text-neutral-500">Qty: {item.quantity}</p>
                                  <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleTrackOrder(order.id)}>
                              <Truck size={14} />
                              <span>Track Order</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleOrderExpand(order.id)}>
                              <Eye size={14} />
                              <span>View Details</span>
                            </Button>
                            <Button variant="outline" size="sm" className="flex items-center gap-1" onClick={() => handleBuyAgain(order.items[0].name)}>
                              <RefreshCw size={14} />
                              <span>Buy Again</span>
                            </Button>
                          </div>
                          
                          {expandedOrder === order.id && (
                            <div id={`order-details-${order.id}`} className="mt-4 pt-4 border-t border-neutral-200 overflow-hidden" style={{ opacity: 0, height: 0 }}>
                              <h4 className="font-medium mb-3">Order Details</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <h5 className="text-sm font-medium text-neutral-700">Shipping Address</h5>
                                  <p className="text-sm text-neutral-600">{order.shippingAddress}</p>
                                </div>
                                <div>
                                  <h5 className="text-sm font-medium text-neutral-700">Payment Information</h5>
                                  <p className="text-sm text-neutral-600">Visa ending in 4242</p>
                                  <p className="text-sm text-neutral-600">Total: ${order.totalAmount.toFixed(2)}</p>
                                </div>
                              </div>
                              
                              <h5 className="text-sm font-medium text-neutral-700 mb-2">Order Summary</h5>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Total</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {order.items.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>{item.name}</TableCell>
                                      <TableCell>{item.quantity}</TableCell>
                                      <TableCell>${item.price.toFixed(2)}</TableCell>
                                      <TableCell>${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                  ))}
                                  <TableRow>
                                    <TableCell colSpan={3} className="text-right font-medium">Subtotal</TableCell>
                                    <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell colSpan={3} className="text-right font-medium">Shipping</TableCell>
                                    <TableCell>Free</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell colSpan={3} className="text-right font-medium">Total</TableCell>
                                    <TableCell className="font-bold">${order.totalAmount.toFixed(2)}</TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                              
                              <div className="mt-4">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="flex items-center gap-1"
                                >
                                  <FileText size={14} />
                                  <span>Download Invoice</span>
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {isTracking && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 tracking-modal">
                  <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[80vh] overflow-auto animate-fade-in">
                    <div className="p-6">
                      {orders.filter(order => order.id === currentTrackingOrder).map((order) => (
                        <div key={order.id}>
                          <div className="flex justify-between items-start mb-6">
                            <div>
                              <h3 className="text-xl font-semibold">Track Your Order</h3>
                              <p className="text-neutral-600">Order #{order.id}</p>
                            </div>
                            <button 
                              onClick={handleCloseTracking}
                              className="text-neutral-500 hover:text-neutral-800 transition-colors"
                            >
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </button>
                          </div>
                          
                          <div className="mb-6 flex flex-col md:flex-row gap-4">
                            <div className="flex-grow">
                              <div className="bg-primary/5 p-4 rounded-lg mb-4">
                                <h4 className="font-medium mb-2">Shipping Details</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-start gap-2">
                                    <Truck size={16} className="text-primary mt-0.5" />
                                    <div>
                                      <p className="font-medium">Tracking Number</p>
                                      <p className="text-neutral-600">{order.trackingNumber}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <MapPin size={16} className="text-primary mt-0.5" />
                                    <div>
                                      <p className="font-medium">Delivery Address</p>
                                      <p className="text-neutral-600">{order.shippingAddress}</p>
                                    </div>
                                  </div>
                                  <div className="flex items-start gap-2">
                                    <Calendar size={16} className="text-primary mt-0.5" />
                                    <div>
                                      <p className="font-medium">Estimated Delivery</p>
                                      <p className="text-neutral-600">{order.estimatedDelivery}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <h4 className="font-medium mb-2">Current Status</h4>
                                <div className={`p-3 rounded-lg ${order.status === 'Delivered' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                                  {order.status === 'Delivered' ? (
                                    <div className="flex items-center gap-2">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20 6L9 18M9 6L20 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                      </svg>
                                      <span>Your package has been delivered!</span>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <Truck size={18} />
                                      <span>Your package is on its way.</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            <div className="w-full md:w-1/3">
                              <div className="bg-neutral-50 p-4 rounded-lg">
                                <h4 className="font-medium mb-4">Order Summary</h4>
                                {order.items.map((item) => (
                                  <div key={item.id} className="flex gap-3 mb-3">
                                    <div className="w-16 h-16 bg-neutral-200 rounded overflow-hidden">
                                      <img 
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium">{item.name}</p>
                                      <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                                      <p className="text-sm">${item.price.toFixed(2)}</p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          <h4 className="font-medium mb-4">Tracking History</h4>
                          <div className="relative">
                            <div className="absolute left-[15px] top-0 h-full w-0.5 bg-neutral-200"></div>
                            
                            <div className="space-y-6">
                              {order.trackingHistory.map((event, index) => (
                                <div key={index} className="flex gap-4">
                                  <div className={`relative z-10 w-8 h-8 rounded-full ${index === 0 ? 'bg-primary' : 'bg-neutral-200'} flex items-center justify-center`}>
                                    {index === 0 ? (
                                      <span className="text-white text-xs">✓</span>
                                    ) : (
                                      <span className="text-neutral-500 text-xs">{index + 1}</span>
                                    )}
                                  </div>
                                  <div className="flex-1">
                                    <p className="font-medium">{event.status}</p>
                                    <p className="text-sm text-neutral-600">{event.location}</p>
                                    <p className="text-xs text-neutral-500">{event.date} at {event.time}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          <div className="mt-8 pt-4 border-t border-neutral-200 flex justify-between">
                            <Button variant="outline" size="sm" onClick={handleCloseTracking}>Close</Button>
                            <Button size="sm" className="bg-primary hover:bg-primary/90">Contact Support</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">My Wishlist</h2>
                  {wishlistItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {wishlistItems.map((item) => (
                        <div key={item.id} className="flex gap-4 bg-neutral-50 rounded-lg p-4 border border-neutral-200">
                          <div className="w-24 h-24 bg-neutral-200 rounded-md overflow-hidden">
                            <img src={item.image} 
                                 className="w-full h-full object-cover" 
                                 alt={item.name} />
                          </div>
                          <div className="flex-grow">
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-primary font-medium mb-2">${item.price.toFixed(2)}</p>
                            <div className="flex flex-wrap gap-2">
                              <Button size="sm" className="bg-primary hover:bg-primary/90">Add to Cart</Button>
                              <Button variant="outline" size="sm">Remove</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-neutral-50 rounded-lg">
                      <Heart className="mx-auto text-neutral-400 mb-4" size={48} />
                      <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
                      <p className="text-neutral-500 mb-6">Products you save to your wishlist will appear here</p>
                      <Button asChild className="bg-primary hover:bg-primary/90">
                        <a href="/products">Browse Products</a>
                      </Button>
                    </div>
                  )}
                </div>
              )}
              
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">My Addresses</h2>
                    <Button className="bg-primary hover:bg-primary/90">Add New Address</Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="border border-neutral-200 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">Default</span>
                      </div>
                      <h3 className="font-medium mb-1">Home</h3>
                      <p className="text-neutral-700">John Doe</p>
                      <p className="text-neutral-700">123 Main Street, Apt 4B</p>
                      <p className="text-neutral-700">San Francisco, CA 94107</p>
                      <p className="text-neutral-700">United States</p>
                      <p className="text-neutral-700">+1 (555) 123-4567</p>
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <h3 className="font-medium mb-1">Office</h3>
                      <p className="text-neutral-700">John Doe</p>
                      <p className="text-neutral-700">456 Market Street, Suite 10</p>
                      <p className="text-neutral-700">San Francisco, CA 94105</p>
                      <p className="text-neutral-700">United States</p>
                      <p className="text-neutral-700">+1 (555) 987-6543</p>
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Set as Default</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'payment' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <Button className="bg-primary hover:bg-primary/90">Add New Card</Button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white relative">
                      <div className="absolute top-4 right-4">
                        <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-white/20 backdrop-blur-sm">Default</span>
                      </div>
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <p className="text-sm opacity-80">Card Type</p>
                          <p className="font-medium">Visa</p>
                        </div>
                        <svg width="48" height="28" viewBox="0 0 48 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="48" height="28" rx="4" fill="white" fillOpacity="0.1"/>
                          <path d="M21.3339 14.6667H10.6672V5.33333H21.3339V14.6667Z" fill="white"/>
                          <path d="M11.1672 10C11.1672 8.16667 12.0006 6.5 13.3339 5.33333C12.3339 4.5 11.0006 4 9.50059 4C6.00059 4 3.16724 6.83333 3.16724 10.3333C3.16724 13.8333 6.00059 16.6667 9.50059 16.6667C11.0006 16.6667 12.3339 16.1667 13.3339 15.3333C12.0006 14.1667 11.1672 12.5 11.1672 10.6667V10Z" fill="white"/>
                        </svg>
                      </div>
                      <div className="mb-6">
                        <p className="text-sm opacity-80 mb-1">Card Number</p>
                        <p className="font-medium tracking-wider">•••• •••• •••• 4242</p>
                      </div>
                      <div className="flex justify-between">
                        <div>
                          <p className="text-sm opacity-80 mb-1">Card Holder</p>
                          <p className="font-medium">John Doe</p>
                        </div>
                        <div>
                          <p className="text-sm opacity-80 mb-1">Expires</p>
                          <p className="font-medium">09/25</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 bg-neutral-100 rounded flex items-center justify-center">
                            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect width="32" height="20" rx="2" fill="#E5E7EB"/>
                              <path d="M21.3339 14.6667H10.6672V5.33333H21.3339V14.6667Z" fill="#FF5F00"/>
                              <path d="M11.1672 10C11.1672 8.16667 12.0006 6.5 13.3339 5.33333C12.3339 4.5 11.0006 4 9.50059 4C6.00059 4 3.16724 6.83333 3.16724 10.3333C3.16724 13.8333 6.00059 16.6667 9.50059 16.6667C11.0006 16.6667 12.3339 16.1667 13.3339 15.3333C12.0006 14.1667 11.1672 12.5 11.1672 10.6667V10Z" fill="#EB001B"/>
                              <path d="M28.8339 10.3333C28.8339 13.8333 26.0006 16.6667 22.5006 16.6667C21.0006 16.6667 19.6672 16.1667 18.6672 15.3333C20.0006 14.1667 20.8339 12.5 20.8339 10.6667V10C20.8339 8.16667 20.0006 6.5 18.6672 5.33333C19.6672 4.5 21.0006 4 22.5006 4C26.0006 4 28.8339 6.83333 28.8339 10.3333Z" fill="#F79E1B"/>
                            </svg>
                          </div>
                          <div>
                            <p className="font-medium">Mastercard ending in 8912</p>
                            <p className="text-sm text-neutral-500">Expires 12/24</p>
                          </div>
                        </div>
                        <div>
                          <Button variant="ghost" size="sm">Set as Default</Button>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-neutral-200 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-lg mb-4">Notifications</h3>
                      <div className="space-y-4 bg-neutral-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Order Updates</p>
                            <p className="text-sm text-neutral-500">Receive notifications about your orders</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Product Updates</p>
                            <p className="text-sm text-neutral-500">Be the first to know about new products</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Promotions and Offers</p>
                            <p className="text-sm text-neutral-500">Receive emails about promotions and special offers</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Newsletter</p>
                            <p className="text-sm text-neutral-500">Subscribe to our weekly newsletter</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-4">Security</h3>
                      <div className="space-y-4 bg-neutral-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Two-Factor Authentication</p>
                            <p className="text-sm text-neutral-500">Add an extra layer of security to your account</p>
                          </div>
                          <Switch />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Login Notifications</p>
                            <p className="text-sm text-neutral-500">Get notified when there's a login from a new device</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-lg mb-4">Privacy</h3>
                      <div className="space-y-4 bg-neutral-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Data Collection</p>
                            <p className="text-sm text-neutral-500">Allow us to collect usage data to improve your experience</p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Personalized Ads</p>
                            <p className="text-sm text-neutral-500">Show ads based on your interests and browsing activity</p>
                          </div>
                          <Switch />
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-neutral-200">
                      <button className="text-red-500 hover:text-red-600 text-sm font-medium">Delete My Account</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
