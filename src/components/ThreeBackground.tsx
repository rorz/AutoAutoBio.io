const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-32 h-2 bg-red-500 animate-pulse"></div>
      <div className="absolute top-1/3 right-1/3 w-2 h-32 bg-yellow-400 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/2 w-16 h-16 bg-blue-500 rounded-full animate-bounce"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full animate-float"></div>
      <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 transform rotate-45 animate-crystal-shine"></div>
    </div>
  );
};

export default ThreeBackground;