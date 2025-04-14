
import { useState, useRef, useEffect } from 'react';
import FeaturesCircle from './FeaturesCircle';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const DifferentFeatures = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const navigate = useNavigate();
  
  // Image for the section background
  const bgImage = "public/lovable-uploads/d36230e0-5418-4def-b7c5-e6d43ac212ca.png";
  
  useEffect(() => {
    // Auto-rotate features every 3 seconds
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 10);
    }, 3000);
    
    // Animation for section elements
    if (sectionRef.current && headingRef.current && subheadingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: -50 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      gsap.fromTo(
        subheadingRef.current,
        { opacity: 0, y: -30 },
        { 
          opacity: 1, 
          y: 0,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
      
      // Animate the feature circle container
      gsap.fromTo(
        ".feature-showcase",
        { opacity: 0, scale: 0.95 },
        { 
          opacity: 1, 
          scale: 1,
          duration: 1,
          delay: 0.5,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            toggleActions: "play none none none"
          }
        }
      );
    }
    
    return () => clearInterval(interval);
  }, []);
  
  const handleFeatureClick = (index: number) => {
    setActiveFeature(index);
    
    // Show toast when a feature is clicked
    toast({
      title: "Feature Selected",
      description: `You selected the feature: ${getFeatureName(index)}`,
      variant: "default",
      action: {
        label: "Learn More",
        onClick: () => navigate(`/feature/${index}`),
      },
    });
  };
  
  const getFeatureName = (index: number) => {
    const featureNames = [
      "AI Recommendations",
      "Customizable Interface",
      "Live Price Tracking",
      "Interactive Products",
      "Rewards Program",
      "Voice Shopping",
      "Expert Chat",
      "AR Try-On",
      "Advanced Search",
      "Global Shopping"
    ];
    
    return featureNames[index];
  };
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 relative overflow-hidden" 
    >
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-primary/5 z-0"></div>
      {bgImage && (
        <div className="absolute inset-0 bg-cover bg-center z-0 opacity-20" style={{ backgroundImage: `url(${bgImage})` }}></div>
      )}
      <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-0"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="px-4 py-1 text-sm rounded-full bg-secondary/20 text-secondary font-semibold mb-4 inline-block animate-pulse">REVOLUTIONARY</span>
          <h2 ref={headingRef} className="text-3xl md:text-5xl font-bold mb-6 text-white">
            What Makes Us <span className="text-primary">Different</span>
          </h2>
          <p ref={subheadingRef} className="text-white/70 max-w-2xl mx-auto text-lg">
            Discover the unique features that set TechTrove apart from other e-commerce platforms
          </p>
        </div>
        
        {/* Centered feature showcase */}
        <div className="flex justify-center items-center">
          <div className="feature-showcase relative w-full max-w-3xl mx-auto h-[600px] rounded-xl overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-10 flex items-center justify-center border border-white/10 backdrop-blur-sm shadow-2xl">
            <FeaturesCircle 
              activeFeature={activeFeature} 
              onFeatureClick={handleFeatureClick} 
            />
            
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-10 right-10 w-40 h-40 bg-primary/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-10 left-10 w-60 h-60 bg-secondary/10 rounded-full blur-xl"></div>
              
              {/* Additional visual elements */}
              <div className="absolute top-1/4 left-1/4 w-20 h-20 bg-primary/5 rounded-full blur-lg animate-pulse"></div>
              <div className="absolute bottom-1/3 right-1/4 w-16 h-16 bg-secondary/5 rounded-full blur-lg animate-pulse" style={{animationDelay: "1s"}}></div>
            </div>
            
            {/* Feature name display */}
            <div className="absolute bottom-8 left-0 right-0 text-center">
              <div className="bg-black/30 backdrop-blur-sm mx-auto max-w-max px-6 py-2 rounded-full">
                <p className="text-white font-medium">{getFeatureName(activeFeature)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Instructions text */}
        <p className="text-white/50 text-center mt-6 text-sm animate-pulse">
          Click on a feature node or wait for auto-rotation
        </p>
      </div>
    </section>
  );
};

export default DifferentFeatures;
