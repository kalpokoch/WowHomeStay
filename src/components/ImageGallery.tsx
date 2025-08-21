import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";

// Import generated images
import livingRoomImg from "@/assets/living-room.jpg";
import exteriorNightImg from "@/assets/exterior-night.jpg";
import bedroomGreenImg from "@/assets/bedroom-green.jpg";
import bedroomGalleryImg from "@/assets/bedroom-gallery.jpg";
import bathroomImg from "@/assets/bathroom.jpg";

const images = [
  { id: 1, src: livingRoomImg, alt: "Living room with traditional furniture" },
  { id: 2, src: exteriorNightImg, alt: "Night exterior view" },
  { id: 3, src: bedroomGalleryImg, alt: "Bedroom with photo gallery wall" },
  { id: 4, src: bedroomGreenImg, alt: "Bedroom with green bedding" },
  { id: 5, src: bathroomImg, alt: "Modern bathroom" },
];

const ImageGallery = () => {
  const navigate = useNavigate();
  const [hoveredImage, setHoveredImage] = useState<number | null>(null);

  const handleShowAllPhotos = () => {
    navigate("/photos");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-8">
      {/* Main large image */}
      <div 
        className="md:col-span-2 relative group cursor-pointer"
        onMouseEnter={() => setHoveredImage(1)}
        onMouseLeave={() => setHoveredImage(null)}
      >
        <img
          src={images[0].src}
          alt={images[0].alt}
          className={`w-full h-full object-cover transition-all duration-300 ${
            hoveredImage === 1 ? "brightness-90 scale-105" : ""
          }`}
        />
      </div>

      {/* Grid of smaller images */}
      <div className="md:col-span-2 grid grid-cols-2 gap-2">
        {images.slice(1).map((image, index) => (
          <div
            key={image.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredImage(image.id)}
            onMouseLeave={() => setHoveredImage(null)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className={`w-full h-full object-cover transition-all duration-300 ${
                hoveredImage === image.id ? "brightness-90 scale-105" : ""
              }`}
            />
            
            {/* Show all photos button on last image */}
            {index === 3 && (
              <div className="absolute inset-0 bg-black/30 flex items-end justify-end p-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShowAllPhotos}
                  className="bg-white text-airbnb-gray border-airbnb-gray-light hover:shadow-elegant z-10"
                >
                  <LayoutGrid className="h-4 w-4 mr-2" />
                  Show all photos
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;