import { Sparkles } from "lucide-react";

const Header = () => {
  return (
    <header className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white py-8 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-32 h-32 crystal-3d animate-rotate-3d">
          <div className="crystal-face transform-gpu" style={{transform: 'rotateY(0deg) translateZ(16px)'}}></div>
          <div className="crystal-face transform-gpu" style={{transform: 'rotateY(90deg) translateZ(16px)'}}></div>
          <div className="crystal-face transform-gpu" style={{transform: 'rotateY(180deg) translateZ(16px)'}}></div>
          <div className="crystal-face transform-gpu" style={{transform: 'rotateY(270deg) translateZ(16px)'}}></div>
        </div>
        <div className="absolute top-20 right-10 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-float"></div>
        <div className="absolute bottom-0 right-0 w-40 h-20 bg-gradient-to-l from-blue-500 to-purple-600 transform -rotate-12 translate-x-10 translate-y-10 animate-glow-pulse"></div>
        <div className="absolute top-1/2 left-1/3 w-8 h-8 bg-gradient-to-br from-pink-400 to-red-500 transform rotate-45 animate-crystal-shine"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-16 h-16 glass-effect flex items-center justify-center transform rotate-45 crystal-3d animate-float">
              <Sparkles className="w-8 h-8 text-blue-400 transform -rotate-45 animate-crystal-shine" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                AutoAutoBio
              </h1>
              <h2 className="text-xl font-mono font-medium -mt-1 text-gray-300">.io</h2>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="text-right glass-effect px-6 py-3 rounded-lg">
              <p className="text-sm font-mono font-medium text-blue-300">ELITE AI PIPELINE</p>
              <p className="text-xs opacity-70 font-mono">YOUR LIFE → BESTSELLER</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;