import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Check, X, Zap, Palette, TrendingUp, MousePointerClick, Award, Headphones, MessageCircle, Brain, Globe, ShieldCheck, Eye, Clock, RefreshCw, Users, Image, Play, Smartphone, Watch, Laptop, Maximize } from 'lucide-react';
import DifferentFeatures from '@/components/DifferentFeatures';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [activeARDemo, setActiveARDemo] = useState(0);

  const arDemos = [
    {
      title: "Smart Watch Try-On",
      description: "See how different watch models look on your wrist",
      icon: Watch,
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1528&q=80"
    },
    {
      title: "Headphones Preview",
      description: "Try different headphone styles virtually",
      icon: Headphones,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
    },
    {
      title: "Smartphone AR Visualization",
      description: "Place new phones in your space to compare sizes",
      icon: Smartphone,
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1529&q=80"
    },
    {
      title: "Laptop Room Placement",
      description: "See how a new laptop looks on your desk",
      icon: Laptop,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveARDemo(prev => (prev + 1) % arDemos.length);
    }, 4000);
    
    const tl = gsap.timeline();
    tl.fromTo('.page-title', 
      { y: -30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
    )
    .fromTo('.about-section', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'power2.out' },
      '-=0.3'
    );
    
    gsap.utils.toArray('.about-section').forEach((section: any, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
        animation: gsap.fromTo(section, 
          { y: 50, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
        )
      });
    });
    
    gsap.to(".ar-demo-slider", {
      scrollTrigger: {
        trigger: ".ar-section",
        start: "top 70%",
        toggleActions: "play none none none"
      },
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    });
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(interval);
    };
  }, [arDemos.length]);
  
  const handleTryARClick = () => {
    toast({
      title: "AR Experience",
      description: "Opening AR experience for " + arDemos[activeARDemo].title,
      variant: "default",
      action: {
        label: "Learn More",
        onClick: () => window.location.href = '/products',
      },
    });
  };
  
  const features = [
    { name: "AI Recommendations", techtrove: true, competitors: false },
    { name: "Customizable Interface", techtrove: true, competitors: false },
    { name: "Live Price Tracking", techtrove: true, competitors: true },
    { name: "Interactive 3D Products", techtrove: true, competitors: false },
    { name: "Rewards Program", techtrove: true, competitors: true },
    { name: "Voice Shopping", techtrove: true, competitors: false },
    { name: "AR Try-On Technology", techtrove: true, competitors: false },
    { name: "Expert Chat Support", techtrove: true, competitors: true },
    { name: "Social Shopping", techtrove: true, competitors: false },
    { name: "Visual Search", techtrove: true, competitors: false },
  ];
  
  const additionalFeatures = [
    {
      title: "Voice Shopping",
      icon: Headphones,
      description: "Use voice commands to search, filter, and purchase products hands-free"
    },
    {
      title: "AR Try-On",
      icon: Image,
      description: "Virtually try products before buying using your camera"
    },
    {
      title: "Live Expert Chat",
      icon: MessageCircle,
      description: "Connect with product specialists for personalized advice"
    },
    {
      title: "Smart Search",
      icon: Brain,
      description: "AI-powered search that understands natural language queries"
    },
    {
      title: "Global Inventory",
      icon: Globe,
      description: "Access products from international markets with automatic currency conversion"
    },
    {
      title: "Price Match Guarantee",
      icon: ShieldCheck,
      description: "Automatic refunds if we or competitors drop prices after your purchase"
    },
  ];
  
  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-6">
        <h1 className="page-title text-3xl md:text-4xl font-bold mb-2">
          About MorphicStore
        </h1>
        <p className="text-neutral-600 mb-12 max-w-2xl">
          Discover the story behind our brand and our mission to provide premium tech products.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="about-section">
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <p className="text-neutral-700 mb-4">
                Founded in 2022, MorphicStore was born from a passion for making cutting-edge technology accessible to everyone. 
                What started as a small online shop has grown into a trusted destination for tech enthusiasts.
              </p>
              <p className="text-neutral-700">
                Our team of dedicated experts carefully curates every product to ensure we offer only the highest quality devices and accessories that enhance your daily life.
              </p>
            </div>
          </div>
          
          <div className="about-section">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <div className="bg-white rounded-lg shadow-md p-6 h-full">
              <p className="text-neutral-700 mb-4">
                At MorphicStore, we believe technology should be intuitive, reliable, and beautiful. Our mission is to provide products that seamlessly integrate into your lifestyle while offering exceptional performance.
              </p>
              <p className="text-neutral-700">
                We're committed to outstanding customer service, sustainable business practices, and staying at the forefront of technological innovation.
              </p>
            </div>
          </div>
        </div>
        
        <div className="about-section mb-16">
          <DifferentFeatures />
        </div>
        
        <div className="about-section bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-8 mb-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 transform transition-transform hover:scale-105">
              <h3 className="font-medium text-lg mb-2">Quality</h3>
              <p className="text-neutral-600">We rigorously test every product to ensure it meets our high standards.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 transform transition-transform hover:scale-105">
              <h3 className="font-medium text-lg mb-2">Innovation</h3>
              <p className="text-neutral-600">We continuously search for products that push the boundaries of what's possible.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 transform transition-transform hover:scale-105">
              <h3 className="font-medium text-lg mb-2">Sustainability</h3>
              <p className="text-neutral-600">We're committed to reducing our environmental impact through responsible practices.</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6 transform transition-transform hover:scale-105">
              <h3 className="font-medium text-lg mb-2">Community</h3>
              <p className="text-neutral-600">We value our customers and strive to build lasting relationships.</p>
            </div>
          </div>
        </div>
        
        <div className="about-section mb-16 ar-section">
          <div className="bg-gradient-to-b from-slate-900/80 to-slate-800 rounded-xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative overflow-hidden h-[500px] md:h-auto">
                {arDemos.map((demo, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ${activeARDemo === index ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                      backgroundImage: `url(${demo.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative w-full h-full">
                        <div className="absolute top-1/4 left-1/3 w-16 h-16 border-2 border-dashed border-primary/60 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                        <div className="absolute bottom-1/3 right-1/3 w-24 h-24 border-2 border-dashed border-secondary/60 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-secondary rounded-full"></div>
                        </div>
                        
                        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
                        
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="w-20 h-20 border-4 border-primary/40 rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
                  {arDemos.map((_, index) => (
                    <button 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${activeARDemo === index ? 'bg-primary w-6' : 'bg-white/50'}`}
                      onClick={() => setActiveARDemo(index)}
                      aria-label={`View AR demo ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full z-10">
                  <div className="flex items-center gap-2">
                    {React.createElement(arDemos[activeARDemo].icon, { size: 16, className: "text-primary" })}
                    <span className="text-white text-sm font-medium">{arDemos[activeARDemo].title}</span>
                  </div>
                </div>
                
                <button className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm p-2 rounded-full z-10 text-white/80 hover:text-white">
                  <Maximize size={16} />
                </button>
              </div>
              
              <div className="p-10 md:p-12">
                <div className="text-center md:text-left">
                  <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">VIRTUAL TRY-ON</span>
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                    Try Before You Buy with AR
                  </h2>
                  <p className="text-white/70 mb-8">
                    Use augmented reality to see how products look in your space or on yourself before purchasing.
                    Our advanced AR technology provides realistic visualizations for confident buying decisions.
                  </p>
                  
                  <div className="mb-8 bg-white/5 p-4 rounded-lg backdrop-blur-sm">
                    <p className="text-white/60 text-sm mb-2">Currently viewing:</p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        {React.createElement(arDemos[activeARDemo].icon, { size: 20, className: "text-primary" })}
                      </div>
                      <div className="text-left">
                        <h3 className="text-white font-medium">{arDemos[activeARDemo].title}</h3>
                        <p className="text-white/70 text-sm">{arDemos[activeARDemo].description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8 text-left">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-white/90">Virtual try-on for wearable tech</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-white/90">Place furniture and devices in your room</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-white/90">Share AR snapshots with friends for opinions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                        <Check size={14} className="text-primary" />
                      </div>
                      <p className="text-white/90">Compare multiple products side by side</p>
                    </div>
                  </div>
                  
                  <Button 
                    className="bg-primary hover:bg-primary/90 text-white"
                    onClick={handleTryARClick}
                  >
                    <Play size={16} className="mr-2" />
                    Try AR Experience
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-section mb-16">
          <div className="text-center mb-12">
            <span className="px-4 py-1 text-sm rounded-full bg-secondary/20 text-secondary font-semibold mb-4 inline-block">INNOVATION</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Next-Gen Shopping Experience
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore cutting-edge features that transform how you discover and shop for technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {additionalFeatures.map((feature, index) => (
              <Card key={index} className="bg-white hover:shadow-md transition-all hover:scale-105">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                    {React.createElement(feature.icon, { size: 24, className: "text-primary" })}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="about-section mb-16">
          <div className="text-center mb-12">
            <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">COMPARISON</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Compare to Others
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto">
              See why TechTrove is the superior choice for your tech shopping needs
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl border border-primary/10 overflow-hidden shadow-md">
            <div className="grid grid-cols-3 p-4 border-b border-primary/10 bg-white/5">
              <div className="text-left font-medium">Features</div>
              <div className="text-center font-medium text-primary">TechTrove</div>
              <div className="text-center font-medium text-gray-500">Competitors</div>
            </div>
            
            {features.map((feature, index) => (
              <div key={index} className={`grid grid-cols-3 p-4 ${index % 2 === 1 ? 'bg-white/5' : ''}`}>
                <div className="text-left">{feature.name}</div>
                <div className="text-center">
                  {feature.techtrove ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-primary/20 rounded-full">
                      <Check size={14} className="text-primary" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500/20 rounded-full">
                      <X size={14} className="text-red-500" />
                    </span>
                  )}
                </div>
                <div className="text-center">
                  {feature.competitors ? (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-gray-500/20 rounded-full">
                      <Check size={14} className="text-gray-400" />
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center w-6 h-6 bg-red-500/20 rounded-full">
                      <X size={14} className="text-red-500" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            
            <div className="p-6 bg-gradient-to-r from-primary/20 to-primary/5 border-t border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <p className="font-medium">Experience the TechTrove difference today!</p>
                <Button className="bg-primary hover:bg-primary/90">
                  <Link to="/products">Start Shopping Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-section mb-16">
          <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-neutral-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="CEO" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">Alex Morgan</h3>
                <p className="text-primary text-sm mb-3">Founder & CEO</p>
                <p className="text-neutral-600">Tech enthusiast with over 15 years of experience in consumer electronics.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-neutral-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80" 
                  alt="CTO" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">Sarah Chen</h3>
                <p className="text-primary text-sm mb-3">Chief Technology Officer</p>
                <p className="text-neutral-600">Former software engineer with a passion for cutting-edge gadgets.</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-neutral-200 relative overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="CMO" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-lg">Michael Torres</h3>
                <p className="text-primary text-sm mb-3">Head of Product</p>
                <p className="text-neutral-600">Product design specialist focused on user experience and innovation.</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="about-section text-center">
          <h2 className="text-2xl font-semibold mb-6">Join Our Journey</h2>
          <p className="text-neutral-700 max-w-2xl mx-auto mb-8">
            We're just getting started, and we'd love for you to be part of our story. 
            Browse our products, subscribe to our newsletter, or get in touch with our team.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <Link to="/products">Explore Products</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
