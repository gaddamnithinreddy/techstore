
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Sparkles, 
  Gift, 
  Bell, 
  Star, 
  ArrowRight, 
  CalendarClock 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const WhatsNewSection = () => {
  const [selectedTab, setSelectedTab] = useState('features');
  
  const tabs = [
    { id: 'features', label: 'New Features' },
    { id: 'offers', label: 'Special Offers' },
    { id: 'upcoming', label: 'Coming Soon' },
  ];
  
  const features = [
    {
      title: "AI Shopping Assistant",
      description: "Get personalized recommendations and help finding the perfect products with our new AI assistant.",
      icon: Sparkles,
      color: "from-purple-500 to-blue-500",
      badge: "NEW"
    },
    {
      title: "Flash Deals",
      description: "Limited-time offers with countdown timers. Get up to 70% off on select products!",
      icon: Gift,
      color: "from-pink-500 to-orange-500",
      badge: "HOT"
    },
    {
      title: "Smart Notifications",
      description: "Set alerts for price drops, restocks, and exclusive deals on products you're interested in.",
      icon: Bell,
      color: "from-blue-500 to-cyan-500",
      badge: "POPULAR"
    },
    {
      title: "Enhanced Rewards",
      description: "Our rewards program now offers double points on weekends and special member-only perks.",
      icon: Star,
      color: "from-yellow-400 to-amber-500",
      badge: "UPDATED"
    }
  ];
  
  const offers = [
    {
      title: "First Purchase Discount",
      description: "Get 20% off your first order with code WELCOME20",
      valid: "Valid until June 30, 2025"
    },
    {
      title: "Tech Bundle Deals",
      description: "Buy a laptop and get headphones at half price",
      valid: "Limited time offer"
    },
    {
      title: "Free Premium Shipping",
      description: "Free express shipping on orders over $100",
      valid: "No expiration date"
    }
  ];
  
  const upcoming = [
    {
      title: "Group Shopping Rooms",
      description: "Shop together with friends in real-time virtual sessions",
      date: "Coming July 2025"
    },
    {
      title: "Product Unboxing AR",
      description: "Experience the unboxing in AR before you purchase",
      date: "Coming August 2025"
    },
    {
      title: "Tech Trade-in Program",
      description: "Trade your old devices for credit towards new purchases",
      date: "Coming September 2025"
    }
  ];
  
  const renderContent = () => {
    switch(selectedTab) {
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all hover:scale-105"
                onClick={() => {
                  toast({
                    title: `${feature.title} activated!`,
                    description: "You can now explore this new feature.",
                    variant: "default",
                    action: {
                      label: "Try Now",
                      onClick: () => console.log(`Trying ${feature.title}`),
                    },
                  });
                }}
              >
                <div className={`bg-gradient-to-r ${feature.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <div className="flex items-center mb-3">
                  <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                  {feature.badge && (
                    <Badge variant="outline" className="ml-2 text-xs font-bold border-primary/30 text-primary bg-primary/10">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <p className="text-white/70 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        );
      
      case 'offers':
        return (
          <div className="grid grid-cols-1 gap-4">
            {offers.map((offer, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{offer.title}</h3>
                  <p className="text-white/70 text-sm mb-2">{offer.description}</p>
                  <p className="text-xs text-white/50">{offer.valid}</p>
                </div>
                <Button 
                  size="sm" 
                  className="bg-primary hover:bg-primary/90 whitespace-nowrap"
                  onClick={() => {
                    navigator.clipboard.writeText('WELCOME20');
                    toast({
                      title: "Discount code copied!",
                      description: "Use it at checkout for special savings.",
                      variant: "default",
                    });
                  }}
                >
                  {index === 0 ? "Copy Code" : "Claim Now"}
                </Button>
              </motion.div>
            ))}
          </div>
        );
      
      case 'upcoming':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcoming.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4">
                  <CalendarClock className="text-primary" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-3">{item.title}</h3>
                <p className="text-white/70 text-sm mb-4">{item.description}</p>
                <p className="text-xs font-medium text-primary">{item.date}</p>
                
                <Button 
                  variant="outline"
                  size="sm"
                  className="mt-4 border-white/10 text-white/70 hover:bg-white/10 w-full"
                  onClick={() => {
                    toast({
                      title: "Reminder set!",
                      description: `We'll notify you when ${item.title} launches.`,
                      variant: "default",
                    });
                  }}
                >
                  Get Notified
                </Button>
              </motion.div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return (
    <section id="whats-new" className="py-24 bg-gradient-to-b from-slate-800 to-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">WHAT'S NEW</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Latest Updates at TechTrove
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover our newest features, offers, and upcoming innovations
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white/5 backdrop-blur-sm rounded-full p-1 border border-white/10">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedTab === tab.id
                      ? 'bg-primary text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="min-h-[400px]">
            {renderContent()}
          </div>
          
          <div className="mt-10 text-center">
            <Button 
              className="bg-white/10 text-white hover:bg-white/20 group"
              onClick={() => window.open('/updates', '_self')}
            >
              View All Updates
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
