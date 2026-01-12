import type { Slide } from '../../types';

interface HeroSlideProps {
  slide: Slide;
  onExploreClick: () => void;
  onDemoClick: () => void;
}

export default function HeroSlide({ slide, onExploreClick, onDemoClick }: HeroSlideProps) {
  return (
    <div className="relative w-full">
      {/* Background Image Section */}
      <div className="relative h-150 md:h-175 lg:h-240">
        <img
          src={slide.backgroundImage}
          alt={slide.imageAlt}
          className="w-full h-full object-cover object-[0%_20%]"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/60 via-black/40 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0">
          <div className="max-w-7xl mx-auto px-6 md:px-14 lg:px-20 h-full flex items-center">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10">
              {/* LEFT CONTENT */}
              <div className="flex-1 text-white z-10">
                {/* Heading */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight drop-shadow-lg">
                  {slide.heading}
                </h1>

                {/* Description */}
                {slide.description && (
                  <p className="text-white/90 mt-6 max-w-xl text-base md:text-lg drop-shadow-md">
                    {slide.description}
                  </p>
                )}

                {/* Buttons */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={onExploreClick}
                    className="px-8 py-4 rounded-full bg-purple-600 text-white font-semibold text-base md:text-lg cursor-pointer hover:bg-purple-700 transition shadow-xl hover:shadow-2xl transform hover:scale-105"
                  >
                    {slide.primaryButtonText}
                  </button>

                  {slide.secondaryButtonText && (
                    <button
                      onClick={onDemoClick}
                      className="px-8 py-4 rounded-full border-2 border-white text-white font-semibold text-base md:text-lg hover:bg-white hover:text-purple-600 transition shadow-xl cursor-pointer"
                    >
                      {slide.secondaryButtonText}
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT CONTENT - Badge */}
              {slide.showBadge && (
                <div className=" shrink-0 hidden lg:block absolute right-10 bottom-0 z-10">
                  <div className="relative w-56 h-56 xl:w-64 xl:h-64">
                    {/* Circular Badge */}
                    <div className="absolute inset-0 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center p-8 border-8 border-dashed border-purple-300 animate-spin-slow">
                      <div className="animate-spin-reverse">
                        <p className="text-yellow-500 font-black text-3xl xl:text-4xl uppercase text-center">Learn</p>
                        <p className="text-purple-600 font-black text-3xl xl:text-4xl uppercase text-center">With Us!</p>
                      </div>
                    </div>
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -right-4 text-5xl xl:text-6xl">⭐</div>
                    <div className="absolute -bottom-6 -right-6 text-4xl xl:text-5xl">🎨</div>
                    <div className="absolute -bottom-4 -left-6 text-4xl xl:text-5xl">✏️</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Wave SVG */}
        <div className="absolute -bottom-2 left-0 right-0 z-5">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
          </svg>
        </div>
      </div>


    </div>
  );
}
