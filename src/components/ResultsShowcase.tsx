import { Download, Play, Star, ShoppingCart, Podcast, Share } from "lucide-react";
import { useState } from "react";
import HTMLFlipBook from 'react-pageflip';
import AutobiographyPage from "./AutobiographyPage";

const ResultsShowcase = () => {
  const [showBook, setShowBook] = useState(false);

  const autobiographyPages = [
    // Cover
    `MY STORY
    A Life Worth Living
    
    
    
    
    
    An Autobiography`,
    
    // Table of Contents
    `TABLE OF CONTENTS
    
    Chapter 1: The Beginning ...................... 3
    Chapter 2: Growing Up ......................... 12
    Chapter 3: Finding My Path ................... 23
    Chapter 4: Love and Loss ..................... 34
    Chapter 5: Career Milestones ................. 45
    Chapter 6: Life Lessons ...................... 56
    Chapter 7: Family and Friends ................ 67
    Chapter 8: Challenges Overcome ............... 78
    Chapter 9: Dreams Realized ................... 89
    Chapter 10: Looking Forward .................. 98
    
    Epilogue ..................................... 105`,
    
    // Chapter 1
    `CHAPTER 1
    The Beginning
    
    Every story has a beginning, and mine started on a crisp autumn morning in a small town where everyone knew everyone. I was born into a world that was both simple and complex, where the smell of fresh bread from the local bakery mixed with the dreams of a generation ready to change the world.
    
    My earliest memories are painted in the golden hues of childhood wonder. The creaking floorboards of our family home, the way sunlight streamed through the kitchen window during breakfast, and the sound of my mother's laughter echoing through the halls—these are the moments that shaped my foundation.
    
    Growing up wasn't just about the big milestones; it was about the small, seemingly insignificant moments that, when woven together, created the tapestry of who I would become.`,
    
    // Chapter 2
    `CHAPTER 2
    Growing Up
    
    School days were a mix of excitement and anxiety. I remember my first day of kindergarten, clutching my mother's hand as we walked through those imposing double doors. The classroom smelled of crayons and possibility.
    
    Mrs. Henderson, my first teacher, had a way of making every child feel special. She taught us that learning wasn't just about memorizing facts—it was about curiosity, about asking questions, and about never being afraid to make mistakes.
    
    Those formative years taught me resilience. When I struggled with math, I learned that perseverance could overcome any challenge. When I excelled in creative writing, I discovered that words had power—the power to inspire, to comfort, and to change minds.
    
    The playground was my first taste of social dynamics, where friendships were forged and broken over games of tag and shared lunches.`,
    
    // Chapter 3
    `CHAPTER 3
    Finding My Path
    
    High school brought new challenges and opportunities. It was during these years that I began to understand who I was and who I wanted to become. The world seemed full of infinite possibilities, and I was determined to explore them all.
    
    I joined the debate team, where I learned the art of persuasion and the importance of research. I participated in the school musical, discovering a love for performance that would stay with me throughout my life. I volunteered at the local hospital, where I witnessed both the fragility and strength of the human spirit.
    
    These experiences weren't just extracurricular activities—they were the building blocks of my character. Each challenge I faced, each success I celebrated, and each failure I learned from contributed to the person I was becoming.
    
    College applications loomed large, but I was ready for the next chapter.`,
    
    // Chapter 4
    `CHAPTER 4
    Love and Loss
    
    Life has a way of teaching us its most profound lessons through the experiences of love and loss. In my early twenties, I experienced both in ways that would forever change my perspective on what truly matters.
    
    I met Sarah during my sophomore year of college. She had a laugh that could light up any room and a way of seeing the world that challenged my assumptions. Our love story wasn't a fairy tale—it was better because it was real, complete with disagreements, growth, and the kind of deep connection that only comes from truly knowing another person.
    
    But life also brought loss. The passing of my grandfather taught me about grief, about the importance of cherishing every moment, and about the legacy we leave behind. His final words to me were simple: "Live fully, love deeply, and never stop learning."
    
    These experiences of love and loss taught me empathy, resilience, and the importance of human connection.`,
    
    // Chapter 5
    `CHAPTER 5
    Career Milestones
    
    My professional journey began with uncertainty but evolved into a path of purpose and fulfillment. My first job was far from glamorous—long hours, modest pay, and tasks that seemed disconnected from my bigger dreams.
    
    But I learned that every job, no matter how small, teaches valuable lessons. I learned about teamwork, about the satisfaction of hard work, and about the importance of treating everyone with respect and dignity.
    
    The breakthrough came when I decided to take a risk and pursue my passion project. It wasn't easy—there were countless late nights, financial stress, and moments of doubt. But there were also moments of triumph, recognition, and the incredible feeling of knowing that I was making a difference.
    
    Success wasn't just about the accolades or the financial rewards. It was about the people I met along the way, the problems I helped solve, and the impact I was able to make on the world around me.`,
    
    // Chapter 6
    `CHAPTER 6
    Life Lessons
    
    If I could distill everything I've learned into a few key principles, they would be these: authenticity matters more than perfection, relationships are more valuable than achievements, and growth never stops.
    
    I learned that failure isn't the opposite of success—it's a stepping stone to success. Every setback taught me something new about myself, about resilience, and about the importance of getting back up when life knocks you down.
    
    I discovered that happiness isn't a destination—it's a way of traveling. It's found in the small moments: a conversation with a friend, a beautiful sunset, a job well done, or the simple pleasure of a good book.
    
    Most importantly, I learned that life is not about having all the answers. It's about being comfortable with questions, embracing uncertainty, and finding meaning in the journey itself.`,
    
    // Epilogue
    `EPILOGUE
    
    As I write these final words, I'm struck by how much has changed since that first chapter began. The small town where I grew up seems both distant and ever-present, a reminder of where I came from and how far I've traveled.
    
    This autobiography isn't just my story—it's a testament to the power of perseverance, the importance of relationships, and the endless capacity for growth that exists within all of us.
    
    To anyone reading this: your story matters. Your experiences, your challenges, your triumphs—they all contribute to the rich tapestry of human experience. Don't wait for the perfect moment to start living fully. The perfect moment is now.
    
    The best chapters of my story are still being written, and I hope the same is true for you.
    
    With gratitude for the journey,
    [Your Name]`
  ];

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
                  <div className="bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold">287 Pages</div>
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
              <h3 className="text-3xl font-black mb-4">READY TO PUBLISH?</h3>
              <p className="text-lg text-gray-600 mb-6">
                Your autobiography is complete and ready for the world to read.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://sellercentral.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fsellercentral.amazon.com%2Fmario%2Fua%2Forbis-welcome%2Fregional%2Fnode%2Fwelcome%2Frender%3Fpassthrough%252Faccount%3Dfba_soa%26passthrough%252FmarketplaceID%3DATVPDKIKX0DER%26passthrough%252FsuperSource%3DOAR%26ref_%3Dsdus_blog_apl_rp_h%26passthrough%252FinitialSessionID%3D132-5210665-6996562%26passthrough%252Fld%3DNSGoogle%26passthrough%252FpageName%3DUS%253ASD%253Ablog%252Famazon-product-listings%26productTier%3DFBA%253ASILVER%26productType%3DFulfillmentByAmazon%253ASellOnAmazon%26marketplaceId%3DATVPDKIKX0DER%26language%3Den_US%26ingressMarketplace%3DATVPDKIKX0DER%26marketplace%3DATVPDKIKX0DER%26primaryMarketplace%3DATVPDKIKX0DER&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_sw_signup_us&openid.mode=checkid_setup&intercept=false&language=en_US&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&ssoResponse=eyJ6aXAiOiJERUYiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiQTI1NktXIn0.q0PID-I-Ce2MdtWjvN2X6H7DZ4LrqJsijsHgJMYJiof3glz9qsw51g.yHO_2CS2jrCTi-eQ.M46cngkTgni-8mGO1fOTq6eADTeO7a-LMqoudtRUQni9IEYNIE8KHIiCrfYOPMFWPDrN3Fmo9DQOWTTm3eF45pI0Pp1FCcfjUzbfcUWW7U5K3FZENUHHtT3VqpjZvg8_svRNDPAXswENlxDwqo2N-FfrC5gXm3NzCrMrrTUyAX2rsj6VTR3TSmyoUnXW1t6hwAD2nP-KyVQ.y5ggwVpG-5qRFLoxKG--SQ"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded-md text-lg font-semibold transition-colors">
                    Publish on Amazon
                  </button>
                </a>
                <button className="border-2 border-black text-black px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-50 transition-colors">
                  Share with Friends
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
                >
                  <AutobiographyPage content="" pageNumber={1} isFirstPage={true} />
                  <AutobiographyPage content="" pageNumber={2} isTableOfContents={true} />
                  {autobiographyPages.slice(2).map((content, index) => (
                    <AutobiographyPage 
                      key={index + 3} 
                      content={content} 
                      pageNumber={index + 3} 
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