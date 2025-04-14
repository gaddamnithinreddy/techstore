
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CompareFeaturesSection = () => {
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

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <span className="px-4 py-1 text-sm rounded-full bg-primary/20 text-primary font-semibold mb-4 inline-block">COMPARISON</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How We Compare to Others
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            See why TechTrove is the superior choice for your tech shopping needs
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden">
          <div className="grid grid-cols-3 p-4 border-b border-white/10 bg-white/5">
            <div className="text-left font-medium">Features</div>
            <div className="text-center font-medium text-primary">TechTrove</div>
            <div className="text-center font-medium text-gray-400">Competitors</div>
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
              <p className="text-white font-medium">Experience the TechTrove difference today!</p>
              <Button className="bg-primary hover:bg-primary/90">
                Start Shopping Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareFeaturesSection;
