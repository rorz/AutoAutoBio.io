import Image from 'next/image';

const ComingSoonSection = () => {
  return (
    <section className="py-20 z-10 w-full flex justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 bg-gray-900/50 p-8 rounded-lg max-w-4xl">
        <div className="w-full md:w-1/3">
          <img
            src="https://m.media-amazon.com/images/I/41fZeDndoOL._SL500_.jpg"
            alt="The Diary of a CEO with Steven Bartlett"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-2/3 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-4">Coming Soon...</h2>
          <p className="text-xl">
            Create your own episode of 'The Diary of a CEO'. 
            Upload your story, and we'll transform it into a podcast with Steven Bartlett as your host.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComingSoonSection; 