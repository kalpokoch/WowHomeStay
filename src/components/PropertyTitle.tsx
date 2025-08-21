import { Share, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const PropertyTitle = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <h1 className="text-2xl md:text-3xl font-semibold text-airbnb-gray">
        The Bhowmick's Bungalow Shoroma
      </h1>
      
      <div className="flex items-center gap-3">
        <Button variant="outline-gray" size="sm" className="flex items-center gap-2">
          <Share className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        
        <Button variant="outline-gray" size="sm" className="flex items-center gap-2">
          <Heart className="h-4 w-4" />
          <span className="hidden sm:inline">Save</span>
        </Button>
      </div>
    </div>
  );
};

export default PropertyTitle;