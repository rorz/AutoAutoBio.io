import { ArrowRight, BookOpen, Mic } from "lucide-react";
import ThreeBackground from "./ThreeBackground";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      <ThreeBackground />
      
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <div className="mb-12">
            <h1 className="text-8xl md:text-9xl font-bold tracking-tighter mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent animate-crystal-shine">
              YOUR LIFE
            </h1>
            <div className="flex items-center justify-center space-x-8 mb-8">
              <div className="w-20 h-3 bg-gradient-to-r from-red-500 to-pink-500 rounded-full animate-glow-pulse"></div>
              <ArrowRight className="w-10 h-10 text-blue-400 animate-float" />
              <div className="w-20 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-glow-pulse" style={{animationDelay: '1s'}}></div>
              <ArrowRight className="w-10 h-10 text-purple-400 animate-float" style={{animationDelay: '1s'}} />
              <div className="w-20 h-3 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-glow-pulse" style={{animationDelay: '2s'}}></div>
            </div>
            <h2 className="text-5xl md:text-7xl font-light mb-12 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              BESTSELLER
            </h2>
          </div>
          
          <p className="text-xl md:text-2xl font-light mb-16 max-w-4xl mx-auto leading-relaxed text-gray-300">
            Transform your memories into a complete multimedia autobiography. 
            Our elite AI pipeline creates your book, audiobook, marketing materials, 
            and even sets up podcast interviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center mb-20">
            <div className="flex items-center space-x-4 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl shadow-2xl hover:bg-white/20 transition-all duration-300 group">
              <BookOpen className="w-10 h-10 text-blue-400 group-hover:text-blue-300 transition-colors" />
              <span className="font-mono font-semibold text-lg text-white">FULL MANUSCRIPT</span>
            </div>
            <div className="flex items-center space-x-4 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl shadow-2xl hover:bg-white/20 transition-all duration-300 group" style={{animationDelay: '1s'}}>
              <Mic className="w-10 h-10 text-red-400 group-hover:text-red-300 transition-colors" />
              <span className="font-mono font-semibold text-lg text-white">AI NARRATION</span>
            </div>
            <div className="flex items-center space-x-4 backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl shadow-2xl hover:bg-white/20 transition-all duration-300 group" style={{animationDelay: '2s'}}>
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded transform rotate-45 group-hover:rotate-90 transition-transform duration-300"></div>
              <span className="font-mono font-semibold text-lg text-white">BOOK DEAL READY</span>
            </div>
          </div>
          
          <button 
            onClick={onGetStarted}
            className="backdrop-blur-md bg-gradient-to-r from-blue-600/90 to-purple-600/90 hover:from-blue-500/90 hover:to-purple-500/90 border border-white/30 text-white px-16 py-8 text-2xl font-bold rounded-xl transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-blue-500/25 flex items-center justify-center mx-auto"
          >
            START YOUR AUTOBIOGRAPHY
            <ArrowRight className="ml-3 w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;