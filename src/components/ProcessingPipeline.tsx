import { useState, useEffect } from "react";
import { Loader2, BookOpen, Mic, Image, Podcast, ShoppingCart } from "lucide-react";

interface ProcessingPipelineProps {
  onComplete: () => void;
}

const ProcessingPipeline = ({ onComplete }: ProcessingPipelineProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const steps = [
    {
      title: "ANALYZING YOUR STORY",
      subtitle: "AI is processing your life narrative",
      icon: <Loader2 className="w-8 h-8 animate-spin" />,
      duration: 3000
    },
    {
      title: "GENERATING MANUSCRIPT",
      subtitle: "Creating your complete autobiography",
      icon: <BookOpen className="w-8 h-8" />,
      duration: 4000
    },
    {
      title: "VOICE SYNTHESIS",
      subtitle: "Preparing audiobook narration",
      icon: <Mic className="w-8 h-8" />,
      duration: 3000
    },
    {
      title: "CREATING VISUALS",
      subtitle: "Designing book cover and marketing materials",
      icon: <Image className="w-8 h-8" />,
      duration: 2000
    },
    {
      title: "PODCAST PREPARATION",
      subtitle: "Setting up Steven Bartlett interview",
      icon: <Podcast className="w-8 h-8" />,
      duration: 2000
    },
    {
      title: "AMAZON LISTING",
      subtitle: "Preparing for book distribution",
      icon: <ShoppingCart className="w-8 h-8" />,
      duration: 2000
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
            return 0;
          } else {
            clearInterval(timer);
            setTimeout(onComplete, 1000);
            return 100;
          }
        }
        return prev + 2;
      });
    }, steps[currentStep]?.duration / 50 || 100);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-red-500 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-32 bg-yellow-400 animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-blue-500 rounded-full animate-bounce"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-6xl font-black mb-8 tracking-tight">
            PROCESSING
          </h1>
          
          <div className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-lg p-8 mb-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black">
                {steps[currentStep]?.icon}
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold">{steps[currentStep]?.title}</h2>
                <p className="text-gray-300">{steps[currentStep]?.subtitle}</p>
              </div>
            </div>
            
            <div className="w-full bg-white/20 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-300 mt-2">{Math.round(progress)}% complete</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                  index < currentStep
                    ? 'bg-green-500/20 border-green-500 text-green-400'
                    : index === currentStep
                    ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                    : 'bg-white/5 border-white/20 text-gray-500'
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-wide">
                  {step.title.split(' ')[0]}
                </div>
                {index < currentStep && <div className="text-green-400 text-xs mt-1">✓ Complete</div>}
                {index === currentStep && <div className="text-blue-400 text-xs mt-1">Processing...</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessingPipeline;