import { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, Mic, FileText, Sparkles } from "lucide-react";

export interface UserInputData {
  basicInfo: {
    name: string;
    age: string;
    occupation: string;
    location: string;
  };
  lifeStory: string;
  keyMoments: string;
  audioFile: File | null;
}

interface InputWizardProps {
  onBack: () => void;
  onComplete: (data: UserInputData) => void;
}

const InputWizard = ({ onBack, onComplete }: InputWizardProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserInputData>({
    basicInfo: {
      name: "",
      age: "",
      occupation: "",
      location: ""
    },
    lifeStory: "",
    keyMoments: "",
    audioFile: null
  });

  const steps = [
    {
      title: "BASIC INFO",
      subtitle: "Tell us about yourself",
      icon: <FileText className="w-8 h-8" />
    },
    {
      title: "YOUR STORY",
      subtitle: "Share your life journey",
      icon: <Sparkles className="w-8 h-8" />
    },
    {
      title: "KEY MOMENTS",
      subtitle: "Highlight defining experiences",
      icon: <FileText className="w-8 h-8" />
    },
    {
      title: "VOICE SAMPLE",
      subtitle: "Upload audio for narration",
      icon: <Mic className="w-8 h-8" />
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData({ ...formData, audioFile: file });
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold mb-2">FULL NAME</label>
                <input
                  value={formData.basicInfo.name}
                  onChange={(e) => setFormData({
                    ...formData,
                    basicInfo: { ...formData.basicInfo, name: e.target.value }
                  })}
                  placeholder="Your full name"
                  className="w-full px-3 py-2 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">AGE</label>
                <input
                  value={formData.basicInfo.age}
                  onChange={(e) => setFormData({
                    ...formData,
                    basicInfo: { ...formData.basicInfo, age: e.target.value }
                  })}
                  placeholder="Your age"
                  className="w-full px-3 py-2 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">OCCUPATION</label>
                <input
                  value={formData.basicInfo.occupation}
                  onChange={(e) => setFormData({
                    ...formData,
                    basicInfo: { ...formData.basicInfo, occupation: e.target.value }
                  })}
                  placeholder="What do you do?"
                  className="w-full px-3 py-2 border-2 border-black rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-2">LOCATION</label>
                <input
                  value={formData.basicInfo.location}
                  onChange={(e) => setFormData({
                    ...formData,
                    basicInfo: { ...formData.basicInfo, location: e.target.value }
                  })}
                  placeholder="Where are you from?"
                  className="w-full px-3 py-2 border-2 border-black rounded-md"
                />
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div>
            <label className="block text-sm font-bold mb-4">TELL US YOUR STORY</label>
            <textarea
              value={formData.lifeStory}
              onChange={(e) => setFormData({ ...formData, lifeStory: e.target.value })}
              placeholder="Share your life journey, challenges, achievements, relationships, dreams..."
              rows={8}
              className="w-full px-3 py-2 border-2 border-black rounded-md resize-none"
            />
            <p className="text-sm text-gray-600 mt-2">The more detail you provide, the richer your autobiography will be.</p>
          </div>
        );
      case 2:
        return (
          <div>
            <label className="block text-sm font-bold mb-4">KEY LIFE MOMENTS</label>
            <textarea
              value={formData.keyMoments}
              onChange={(e) => setFormData({ ...formData, keyMoments: e.target.value })}
              placeholder="Describe pivotal moments: first job, meeting your partner, major decisions, turning points..."
              rows={8}
              className="w-full px-3 py-2 border-2 border-black rounded-md resize-none"
            />
          </div>
        );
      case 3:
        return (
          <div className="text-center">
            <div className="border-2 border-dashed border-black p-12 rounded-lg bg-gray-50">
              <Upload className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-bold mb-2">UPLOAD VOICE SAMPLE</h3>
              <p className="text-gray-600 mb-6">Upload an audio file so we can match your voice for the audiobook narration</p>
              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="audioUpload"
              />
              <button
                onClick={() => document.getElementById('audioUpload')?.click()}
                className="border-2 border-black px-4 py-2 rounded-md bg-white hover:bg-gray-50 transition-colors flex items-center justify-center mx-auto"
              >
                <Mic className="w-4 h-4 mr-2" />
                Choose Audio File
              </button>
              {formData.audioFile && (
                <p className="mt-4 text-sm font-semibold text-green-600">
                  ✓ {formData.audioFile.name} uploaded
                </p>
              )}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="mb-12">
          <div className="flex items-center space-x-4 mb-6">
            {steps.map((step, index) => (
              <div key={index} className="flex-1">
                <div className={`h-2 rounded-full ${index <= currentStep ? 'bg-black' : 'bg-gray-300'}`}></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between text-sm font-bold">
            {steps.map((step, index) => (
              <span key={index} className={index <= currentStep ? 'text-black' : 'text-gray-400'}>
                {step.title}
              </span>
            ))}
          </div>
        </div>

        <div className="border-4 border-black shadow-2xl bg-white rounded-lg overflow-hidden">
          <div className="bg-black text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black">
                {steps[currentStep].icon}
              </div>
              <div>
                <h2 className="text-3xl font-black">{steps[currentStep].title}</h2>
                <p className="text-gray-300">{steps[currentStep].subtitle}</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            {renderStepContent()}
          </div>
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className="border-2 border-black px-6 py-3 rounded-md bg-white hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-md transition-colors flex items-center"
          >
            {currentStep === steps.length - 1 ? 'Generate My Autobiography' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputWizard;