"use client";

import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InputWizard, { AutobiographyData } from "@/components/InputWizard";
import ProcessingPipeline from "@/components/ProcessingPipeline";
import ResultsShowcase from "@/components/ResultsShowcase";
import ComingSoonSection from "@/components/ComingSoonSection";

export default function Home() {
  const [currentView, setCurrentView] = useState<'hero' | 'input' | 'results'>('hero');
  const [autobiographyData, setAutobiographyData] = useState<AutobiographyData | null>(null);

  const handleGetStarted = () => {
    setCurrentView('input');
  };

  const handleInputComplete = (data: AutobiographyData) => {
    setAutobiographyData(data);
    setCurrentView('results');
  };

  const handleBackToInput = () => {
    setCurrentView('hero');
  };

  const handleGenerateAnother = () => {
    setAutobiographyData(null);
    setCurrentView('input');
  };

  if (currentView === 'input') {
    return (
      <InputWizard
        onBack={handleBackToInput}
        onComplete={handleInputComplete}
      />
    );
  }

  if (currentView === 'results' && autobiographyData) {
    return <ResultsShowcase
      autobiography={autobiographyData}
      onGenerateAnother={handleGenerateAnother}
    />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <HeroSection onGetStarted={handleGetStarted} />
      <ComingSoonSection />
    </div>
  );
}
