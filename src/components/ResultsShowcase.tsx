import { Download, Play, Star, ShoppingCart, Podcast, Share } from "lucide-react";

const ResultsShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-black mb-4 tracking-tight">YOUR AUTOBIOGRAPHY</h1>
          <h2 className="text-3xl font-light text-gray-600">IS READY!</h2>
          <div className="flex justify-center mt-6">
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <Star className="w-6 h-6 text-yellow-400 fill-current" />
              <span className="ml-2 font-semibold">Bestseller Quality</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="border-4 border-black shadow-2xl overflow-hidden rounded-lg">
            <div className="bg-black text-white p-6">
              <h3 className="text-2xl font-black">📖 COMPLETE MANUSCRIPT</h3>
            </div>
            <div className="p-0">
              <div className="relative h-80 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-32 h-48 bg-white rounded-lg shadow-2xl mx-auto mb-4 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-300">
                    <div className="text-black text-center p-4">
                      <div className="text-xs font-bold mb-2">MY STORY</div>
                      <div className="text-[8px] leading-tight">A Life Worth Living</div>
                    </div>
                  </div>
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">287 Pages</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Your complete life story, professionally written and ready for publication.
                </p>
                <button className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <div className="border-4 border-red-500 shadow-2xl rounded-lg">
            <div className="bg-red-500 text-white p-6">
              <h3 className="text-2xl font-black">🎧 AUDIOBOOK NARRATION</h3>
            </div>
            <div className="p-6">
              <div className="bg-gray-100 rounded-lg p-6 mb-4">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <Play className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Chapter 1: The Beginning</h4>
                    <p className="text-sm text-gray-600">Narrated in your voice</p>
                  </div>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2 mb-2">
                  <div className="bg-red-500 h-2 rounded-full w-1/3"></div>
                </div>
                <p className="text-xs text-gray-600">12:34 / 45:67</p>
              </div>
              <button className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                <Play className="w-4 h-4 mr-2" />
                Play Sample
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="border-2 border-yellow-400 rounded-lg">
            <div className="bg-yellow-400 text-black p-4">
              <h3 className="text-lg font-black">🛒 AMAZON READY</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Complete Amazon listing with description, keywords, and categories.
              </p>
              <button className="w-full border-2 border-yellow-400 text-yellow-600 py-2 px-4 rounded-md hover:bg-yellow-50 transition-colors flex items-center justify-center">
                <ShoppingCart className="w-4 h-4 mr-2" />
                View Listing
              </button>
            </div>
          </div>

          <div className="border-2 border-blue-500 rounded-lg">
            <div className="bg-blue-500 text-white p-4">
              <h3 className="text-lg font-black">🎙️ PODCAST READY</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Steven Bartlett interview prep and talking points ready.
              </p>
              <button className="w-full border-2 border-blue-500 text-blue-600 py-2 px-4 rounded-md hover:bg-blue-50 transition-colors flex items-center justify-center">
                <Podcast className="w-4 h-4 mr-2" />
                Interview Prep
              </button>
            </div>
          </div>

          <div className="border-2 border-green-500 rounded-lg">
            <div className="bg-green-500 text-white p-4">
              <h3 className="text-lg font-black">📈 MARKETING KIT</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-4">
                Social media assets, press release, and promotional materials.
              </p>
              <button className="w-full border-2 border-green-500 text-green-600 py-2 px-4 rounded-md hover:bg-green-50 transition-colors flex items-center justify-center">
                <Share className="w-4 h-4 mr-2" />
                Download Kit
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="border-4 border-black shadow-2xl inline-block rounded-lg bg-white">
            <div className="p-8">
              <h3 className="text-3xl font-black mb-4">READY TO PUBLISH?</h3>
              <p className="text-lg text-gray-600 mb-6">
                Your autobiography is complete and ready for the world to read.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors">
                  Publish on Amazon
                </button>
                <button className="border-2 border-black text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-50 transition-colors">
                  Share with Friends
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsShowcase;