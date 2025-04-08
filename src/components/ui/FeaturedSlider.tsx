
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Listing } from "@/services/mockData";
import { Link } from "react-router-dom";

interface FeaturedSliderProps {
  listings: Listing[];
}

const FeaturedSlider: React.FC<FeaturedSliderProps> = ({ listings }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  
  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  const goToPrevSlide = () => {
    const newIndex = currentIndex === 0 ? listings.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  };

  const goToNextSlide = () => {
    const newIndex = currentIndex === listings.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  };

  useEffect(() => {
    const startAutoPlay = () => {
      autoPlayRef.current = setInterval(() => {
        goToNextSlide();
      }, 5000);
    };

    startAutoPlay();

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [currentIndex, listings.length]);

  const pauseAutoPlay = () => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const resumeAutoPlay = () => {
    pauseAutoPlay();
    autoPlayRef.current = setInterval(goToNextSlide, 5000);
  };

  if (listings.length === 0) {
    return null;
  }

  const currentListing = listings[currentIndex];

  return (
    <div 
      className="relative w-full h-[500px] overflow-hidden rounded-xl mt-6"
      onMouseEnter={pauseAutoPlay}
      onMouseLeave={resumeAutoPlay}
    >
      {/* Slide background */}
      {listings.map((listing, index) => (
        <div
          key={listing.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7)), url(${listing.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      ))}

      {/* Slider content */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-16 text-white">
        <div 
          className={`transition-all duration-500 transform ${
            isTransitioning ? "translate-y-8 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <div className="inline-block mb-4 px-3 py-1 bg-shareport-purple/90 text-white text-sm font-medium rounded-full">
            {currentListing.type === 'rebuy' ? 'Rebuy' : currentListing.type === 'rent' ? 'Rent' : 'Share'}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-3">{currentListing.title}</h2>
          <p className="text-white/80 mb-6 max-w-2xl line-clamp-2">{currentListing.description}</p>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center">
              <img
                src={currentListing.owner.avatar}
                alt={currentListing.owner.name}
                className="w-10 h-10 rounded-full mr-3 border-2 border-white"
              />
              <div>
                <p className="font-medium">{currentListing.owner.name}</p>
                <p className="text-sm text-white/70">{currentListing.location}</p>
              </div>
            </div>
            <div className="text-2xl font-bold">
              ${currentListing.price}
              {currentListing.type !== 'rebuy' && currentListing.duration && (
                <span className="text-sm font-normal">/{currentListing.duration.toLowerCase().replace('per ', '')}</span>
              )}
            </div>
            <Link 
              to={`/listing/${currentListing.id}`} 
              className="inline-block px-6 py-3 bg-white text-shareport-purple-dark font-semibold rounded-lg hover:bg-shareport-purple hover:text-white transition-colors"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center mt-8 space-x-2">
          {listings.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex ? "bg-white w-8" : "bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        onClick={goToPrevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 text-white hover:bg-black/50 rounded-full w-10 h-10"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={goToNextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 text-white hover:bg-black/50 rounded-full w-10 h-10"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </Button>
    </div>
  );
};

export default FeaturedSlider;
