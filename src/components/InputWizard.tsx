import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
import {
  generateAutobiographySections,
  getLifeEventsTimeline,
  getWritingStyleAnalysis,
} from "../ai/actions";
import { useState } from "react";

export interface AutobiographyData {
  sections: {
    title: string;
    timeframe: string;
    content: string;
  }[];
}

interface InputWizardProps {
  onBack: () => void;
  onComplete: (data: AutobiographyData) => void;
}

const InputWizard = ({ onBack, onComplete }: InputWizardProps) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Run research steps in parallel
      const [biographicalData, writingData] = await Promise.all([
        getLifeEventsTimeline(name.trim()),
        getWritingStyleAnalysis(name.trim()),
      ]);

      // Generate autobiography sections
      const autobiography = await generateAutobiographySections(
        name.trim(),
        biographicalData,
        writingData
      );

      onComplete(autobiography);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-yellow-50 py-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="border-4 border-black shadow-2xl bg-white rounded-lg overflow-hidden">
          <div className="bg-black text-white p-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center text-black">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl font-black">GENERATE AUTOBIOGRAPHY</h2>
                <p className="text-gray-300">
                  Enter a name to create an AI-generated autobiography
                </p>
              </div>
            </div>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter the person's name"
                  className="w-full px-4 py-3 border-2 border-black rounded-md text-lg"
                  disabled={isLoading}
                />
              </div>

              {error && (
                <div className="bg-red-50 border-2 border-red-200 text-red-800 px-4 py-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !name.trim()}
                className="w-full bg-black hover:bg-gray-800 text-white px-6 py-4 rounded-md transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating Autobiography...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Autobiography
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={onBack}
            className="border-2 border-black px-6 py-3 rounded-md bg-white hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default InputWizard;
