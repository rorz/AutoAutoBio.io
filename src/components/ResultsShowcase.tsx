import { Download, Play, Star, ShoppingCart, Podcast, Share, RefreshCw, Check } from "lucide-react";
import { useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import AutobiographyPage from "./AutobiographyPage";
import { AutobiographyData } from "./InputWizard";

interface ResultsShowcaseProps {
  autobiography: AutobiographyData | null;
  onGenerateAnother: () => void;
}

const ResultsShowcase = ({ autobiography, onGenerateAnother }: ResultsShowcaseProps) => {
  const [showBook, setShowBook] = useState(false);

  if (!autobiography) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading autobiography...</p>
      </div>
    );
  }

  const autobiographyPages = [
    // Cover
    `MY STORY\n\nA Life Worth Living\n\n\n\n\n\nAn Autobiography`,
    // Table of Contents
    `TABLE OF CONTENTS\n\n` + autobiography.sections.map((section, index) =>
      `${section.title} ...................... ${index * 10 + 3}`
    ).join('\n'),
    // Chapters
    ...autobiography.sections.map(section =>
      `${section.title}\n${section.timeframe}\n\n${section.content}`
    )
  ];

  const totalPages = autobiographyPages.length;

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
                  <button
                    onClick={() => setShowBook(true)}
                    className="w-32 h-48 bg-white rounded-lg shadow-2xl mx-auto mb-4 flex items-center justify-center transform rotate-3 hover:rotate-0 hover:scale-110 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="text-black text-center p-4">
                      <div className="text-xs font-bold mb-2 group-hover:text-blue-600 transition-colors">MY STORY</div>
                      <div className="text-[8px] leading-tight group-hover:text-blue-500 transition-colors">A Life Worth Living</div>
                      <div className="text-[6px] text-gray-500 mt-2 group-hover:text-blue-400 transition-colors">Click to Read</div>
                    </div>
                  </button>
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">{totalPages} Pages</div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-600 mb-4">
                  Your complete life story, professionally written and ready for publication.
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setShowBook(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center"
                  >
                    📖 Read Book
                  </button>
                  <button className="w-full bg-black hover:bg-gray-800 text-white py-3 px-4 rounded-md transition-colors flex items-center justify-center">
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </button>
                </div>
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
              <a
                href="https://sellercentral.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fmario%2Fua%2Forbis-welcome%2Fregional%2Fnode%2Fwelcome%2Frender%3Fpassthrough%252Faccount%3Dfba_soa%26passthrough%252FmarketplaceID%3DATVPDKIKX0DER%26passthrough%252FsuperSource%3DOAR%26ref_%3Dsdus_blog_apl_rp_h%26passthrough%252FinitialSessionID%3D132-5210665-6996562%26passthrough%252Fld%3DNSGoogle%26passthrough%252FpageName%3DUS%253ASD%253Ablog%252Famazon-product-listings%26productTier%3DFBA%253ASILVER%26productType%3DFulfillmentByAmazon%253ASellOnAmazon%26marketplaceId%3DATVPDKIKX0DER%26language%3Den_US%26ingressMarketplace%3DATVPDKIKX0DER%26marketplace%3DATVPDKIKX0DER%26primaryMarketplace%3DATVPDKIKX0DER&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_sw_signup_us&openid.mode=checkid_setup&intercept=false&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ssoResponse=eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.q0PID-I-Ce2MdtWjvN2X6H7DZ4LrqJsijsHgJMYJiof3glz9qsw51g.yHO_2CS2jrCTi-eQ.M46cngkTgni-8mGO1fOTq6eADTeO7a-LMqoudtRUQni9IEYNIE8KHIiCrfYOPMFWPDrN3Fmo9DQOWTTm3eF45pI0Pp1FCcfjUzbfcUWW7U5K3FZENUHHtT3VqpjZvg8_svRNDPAXswENlxDwqo2N-FfrC5gXm3NzCrMrrTUyAX2rsj6VTR3TSmyoUnXW1t6hwAD2nP-KyVQ.y5ggwVpG-5qRFLoxKG--SQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <button className="w-full border-2 border-yellow-400 text-yellow-600 py-2 px-4 rounded-md hover:bg-yellow-50 transition-colors flex items-center justify-center">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  View Listing
                </button>
              </a>
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
              <h3 className="text-3xl font-black mb-4">IS THE AUTOBIOGRAPHY CORRECT?</h3>
              <p className="text-lg text-gray-600 mb-6">
                Review the generated content. If you&apos;d like to try again, you can generate a new version.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={onGenerateAnother}
                  className="bg-gray-200 hover:bg-gray-300 text-black px-8 py-3 rounded-md text-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <RefreshCw className="w-5 h-5 mr-2" />
                  Generate Another
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors flex items-center justify-center">
                  <Check className="w-5 h-5 mr-2" />
                  Looks Perfect!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative max-w-4xl max-h-[90vh] overflow-hidden">
            <button
              onClick={() => setShowBook(false)}
              className="absolute -top-12 -right-12 z-10 bg-white text-black px-4 py-2 rounded-full hover:bg-gray-200 transition-colors shadow-lg"
            >
              ✕ Close
            </button>
            <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white p-4 text-center">
                <h2 className="text-2xl font-bold">📖 Your Complete Autobiography</h2>
                <p className="text-blue-200 mt-1">Click and drag to turn pages</p>
              </div>
              <div className="p-4 flex justify-center">
                <HTMLFlipBook
                  width={600}
                  height={800}
                  size="stretch"
                  minWidth={600}
                  maxWidth={800}
                  minHeight={500}
                  maxHeight={700}
                  maxShadowOpacity={0.5}
                  showCover={true}
                  mobileScrollSupport={false}
                  onFlip={(e) => {
                    console.log('Current page: ' + e.data);
                  }}
                  className="autobiography-flipbook"
                  style={{}}
                  startPage={0}
                  drawShadow={true}
                  flippingTime={1000}
                  usePortrait={true}
                  startZIndex={0}
                  autoSize={true}
                  clickEventForward={true}
                  useMouseEvents={true}
                  swipeDistance={30}
                  showPageCorners={true}
                  disableFlipByClick={false}
                >
                  {autobiographyPages.map((content, index) => (
                    <AutobiographyPage
                      key={index}
                      content={content}
                      pageNumber={index + 1}
                      isFirstPage={index === 0}
                      isTableOfContents={index === 1}
                    />
                  ))}
                </HTMLFlipBook>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsShowcase;