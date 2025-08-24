import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import generated images
import livingRoomImg from "@/assets/living-room.jpg";
import exteriorNightImg from "@/assets/exterior-night.jpg";
import bedroomGreenImg from "@/assets/bedroom-green.jpg";
import bedroomGalleryImg from "@/assets/bedroom-gallery.jpg";
import bathroomImg from "@/assets/bathroom.jpg";

const images = [
  { id: 1, src: livingRoomImg, alt: "Living room with traditional furniture and warm lighting" },
  { id: 2, src: exteriorNightImg, alt: "Night exterior view of the bungalow" },
  { id: 3, src: bedroomGalleryImg, alt: "Bedroom with photo gallery wall" },
  { id: 4, src: bedroomGreenImg, alt: "Bedroom with green bedding and traditional decor" },
  { id: 5, src: bathroomImg, alt: "Modern clean bathroom" },
];

const PhotoGallery = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goBack = () => navigate("/");

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
      else if (e.key === "Escape") goBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col text-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={goBack}
          className="text-white hover:bg-white/10"
          aria-label="Close"
        >
          <X className="h-6 w-6" />
        </Button>

        <h1 className="text-lg font-medium">
          {currentImageIndex + 1} / {images.length}
        </h1>

        <div className="w-10" />
      </div>

      {/* Viewer (ensures bottom strip is never pushed out) */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center overflow-hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevImage}
          className="absolute left-6 text-white hover:bg-white/10 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>

        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className="max-w-full max-h-full object-contain select-none"
          draggable={false}
        />

        <Button
          variant="ghost"
          size="icon"
          onClick={nextImage}
          className="absolute right-6 text-white hover:bg-white/10 z-10"
          aria-label="Next image"
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Thumbnail strip (reserved height, pinned visually to bottom) */}
      <div className="shrink-0 px-6 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex gap-3 justify-center overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setCurrentImageIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-200 ${
                index === currentImageIndex
                  ? "ring-2 ring-white opacity-100"
                  : "opacity-60 hover:opacity-90"
              }`}
              aria-label={`Go to image ${index + 1}`}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;
