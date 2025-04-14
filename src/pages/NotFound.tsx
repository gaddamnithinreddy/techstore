
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // Animate 404 elements
    tl.fromTo('.error-code', 
      { y: -50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.5)' }
    )
    .fromTo('.error-text', 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo('.error-description', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    )
    .fromTo('.error-action', 
      { y: 20, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      '-=0.2'
    );
    
    // Create floating animation for the 404 digits
    gsap.to('.digit', {
      y: 15,
      duration: 2,
      stagger: 0.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-neutral-100 px-6">
      <div className="text-center max-w-lg">
        <h1 className="error-code flex justify-center text-8xl md:text-9xl font-bold text-primary mb-6">
          <span className="digit inline-block">4</span>
          <span className="digit inline-block">0</span>
          <span className="digit inline-block">4</span>
        </h1>
        <p className="error-text text-2xl md:text-3xl font-semibold mb-4 text-neutral-800">
          Oops! Page not found
        </p>
        <p className="error-description text-neutral-600 mb-8">
          The page you are looking for doesn't exist or has been moved.
          <br />Let's get you back on track.
        </p>
        <div className="error-action flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Go Back
          </Button>
          <Button asChild className="w-full sm:w-auto bg-primary hover:bg-primary/90">
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
