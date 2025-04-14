
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { 
  Zap, 
  Palette, 
  TrendingUp, 
  MousePointerClick, 
  Award,
  Headphones,
  MessageCircle,
  Image,
  ShoppingCart,
  ShieldCheck,
  Brain,
  Globe,
  Clock,
  Users,
  Eye,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FeaturesCircleProps {
  activeFeature: number;
  onFeatureClick: (index: number) => void;
  className?: string;
}

const FeaturesCircle = ({ activeFeature, onFeatureClick, className = '' }: FeaturesCircleProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null);
  
  // Features array with icons and details
  const features = [
    {
      title: "AI Recommendations",
      icon: Zap,
      color: "#8b5cf6",
      description: "Smart personalized product suggestions"
    },
    {
      title: "Customizable Interface",
      icon: Palette,
      color: "#8b5cf6", 
      description: "Adapt the UI to your preferences"
    },
    {
      title: "Live Price Tracking",
      icon: TrendingUp,
      color: "#8b5cf6",
      description: "Real-time price monitoring and alerts"
    },
    {
      title: "Interactive Products",
      icon: MousePointerClick,
      color: "#8b5cf6",
      description: "Try before you buy with 3D demos"
    },
    {
      title: "Rewards Program",
      icon: Award,
      color: "#8b5cf6",
      description: "Earn points with every purchase"
    },
    {
      title: "Voice Shopping",
      icon: Headphones,
      color: "#8b5cf6",
      description: "Shop using just your voice commands"
    },
    {
      title: "Expert Chat",
      icon: MessageCircle,
      color: "#8b5cf6",
      description: "Connect with product specialists instantly"
    },
    {
      title: "AR Try-On",
      icon: Image,
      color: "#8b5cf6",
      description: "Virtual try-on with augmented reality"
    },
    {
      title: "Advanced Search",
      icon: Brain,
      color: "#8b5cf6",
      description: "AI-powered search and recommendations"
    },
    {
      title: "Global Shopping",
      icon: Globe,
      color: "#8b5cf6",
      description: "Access products from international markets"
    }
  ];
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Clear any existing animations
    gsap.killTweensOf(containerRef.current.children);
    
    // Position features in a circle
    const radius = 230; // Circle radius
    const totalFeatures = features.length;
    const angleStep = (2 * Math.PI) / totalFeatures;
    
    features.forEach((_, index) => {
      const angle = index * angleStep;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const opacity = index === activeFeature ? 1 : 0.5;
      const scale = index === activeFeature ? 1.2 : 0.8;
      const zIndex = index === activeFeature ? 10 : 1;
      
      gsap.to(containerRef.current!.children[index], {
        x,
        y,
        opacity: hoveredFeature === null ? opacity : (index === hoveredFeature ? 1 : 0.3),
        scale: (hoveredFeature === index || activeFeature === index) ? 1.2 : 0.8,
        duration: 0.8,
        ease: "power2.out",
        zIndex
      });
    });
    
    // Animate active feature
    gsap.to(containerRef.current.children[activeFeature], { 
      scale: 1.2, 
      opacity: 1, 
      duration: 0.5, 
      ease: "back.out(1.7)" 
    });
    
  }, [activeFeature, features.length, hoveredFeature]);
  
  // Decorative elements that float around
  const renderDecorations = () => {
    const dots = [];
    const colors = ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'];
    
    for (let i = 0; i < 25; i++) {
      const size = Math.floor(Math.random() * 6) + 4;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = Math.random() * 5;
      
      dots.push(
        <div 
          key={i}
          className="absolute rounded-full animate-floating opacity-30"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: color,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${5 + Math.random() * 5}s`
          }}
        />
      );
    }
    
    return dots;
  };
  
  return (
    <div 
      className={`relative w-full h-full flex items-center justify-center ${className}`}
    >
      {/* Decorative elements */}
      {renderDecorations()}
      
      {/* Central icon */}
      <div className="absolute z-20 w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
        <ShoppingCart size={40} className="text-primary" />
        <div className="absolute -inset-4 border-2 border-primary/30 rounded-full animate-ping"></div>
      </div>
      
      {/* Feature showcase */}
      <div 
        ref={containerRef} 
        className="relative h-full w-full"
        style={{ transform: 'translate(-50%, -50%)', transformOrigin: 'center center' }}
      >
        {features.map((feature, index) => (
          <div 
            key={index}
            className={`absolute top-1/2 left-1/2 w-48 flex flex-col items-center text-center transition-all duration-300 cursor-pointer
              ${index === activeFeature ? 'z-10' : 'z-1'}`}
            onClick={() => onFeatureClick(index)}
            onMouseEnter={() => setHoveredFeature(index)}
            onMouseLeave={() => setHoveredFeature(null)}
          >
            <div 
              className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300
                ${index === activeFeature ? 'bg-primary' : 'bg-white/10'}`}
            >
              <feature.icon 
                size={32} 
                className={`${index === activeFeature ? 'text-white' : 'text-white/70'}`} 
              />
            </div>
            <h3 className={`text-lg font-bold mb-1 transition-all duration-300
              ${index === activeFeature ? 'text-white' : 'text-white/70'}`}>
              {feature.title}
            </h3>
            <p className={`text-sm transition-all duration-300
              ${index === activeFeature ? 'text-white/90' : 'text-white/50'}`}>
              {feature.description}
            </p>
          </div>
        ))}
      </div>
      
      {/* Circular rotating line animation */}
      <div className="absolute inset-0 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100">
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.2)" 
            strokeWidth="0.5" 
            strokeDasharray="5,5"
            className="rotate-animation"
            style={{ transformOrigin: "center", animation: "rotate 30s linear infinite" }}
          />
          <circle 
            cx="50" 
            cy="50" 
            r="35" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.15)" 
            strokeWidth="0.5"
            className="rotate-animation-reverse" 
            style={{ transformOrigin: "center", animation: "rotate-reverse 20s linear infinite" }}
          />
          <circle 
            cx="50" 
            cy="50" 
            r="25" 
            fill="none" 
            stroke="rgba(139, 92, 246, 0.25)" 
            strokeWidth="1"
            strokeDasharray="2,4"
            className="rotate-animation" 
            style={{ transformOrigin: "center", animation: "rotate 15s linear infinite" }}
          />
        </svg>
      </div>
      
      {/* Feature detail panel */}
      <div className="absolute bottom-4 left-0 right-0 mx-auto max-w-xs">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs text-white/70 border-white/20 hover:bg-white/10"
          onClick={() => window.open('#feature-details', '_self')}
        >
          View All Features
        </Button>
      </div>
    </div>
  );
};

export default FeaturesCircle;
