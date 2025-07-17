"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputWizard from "@/components/InputWizard";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import ResultsShowcase from "@/components/ResultsShowcase";

export default function Home() {
  const [currentView, setCurrentView] = useState<'hero' | 'input' | 'processing' | 'results'>('hero');
  const [userInput, setUserInput] = useState(null);

  const handleGetStarted = () => {
    setCurrentView('input');
  };

  const handleInputComplete = (data: any) => {
    setUserInput(data);
    setCurrentView('processing');
  };

  const handleProcessingComplete = () => {
    setCurrentView('results');
  };

  const handleBackToInput = () => {
    setCurrentView('hero');
  };

  if (currentView === 'input') {
    return (
      <InputWizard 
        onBack={handleBackToInput}
        onComplete={handleInputComplete}
      />
    );
  }

  if (currentView === 'processing') {
    return (
      <ProcessingPipeline 
        onComplete={handleProcessingComplete}
      />
    );
  }

  if (currentView === 'results') {
    return <ResultsShowcase />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
    </div>
  );
}
