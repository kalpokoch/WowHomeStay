import { Star, CheckCircle, Home, Calendar, Wifi, Car, Snowflake, Shield, Flame } from "lucide-react";
import { Card } from "@/components/ui/card";

const PropertyDetails = () => {
  const features = [
    {
      icon: CheckCircle,
      title: "Exceptional check-in experience",
      description: "Recent guests gave the check-in process a 5-star rating.",
    },
    {
      icon: Home,
      title: "Room in a bed and breakfast",
      description: "Your own room in a home, plus access to shared spaces.",
    },
    {
      icon: Calendar,
      title: "Free cancellation before 12:00 pm on 21 Aug",
      description: "Get a full refund if you change your mind.",
    },
  ];

  const amenities = [
    { icon: Shield, label: "Lock on bedroom door" },
    { icon: Wifi, label: "WiFi" },
    { icon: Car, label: "Free parking on premises" },
    { icon: Snowflake, label: "Air conditioning" },
    { icon: Shield, label: "Carbon monoxide alarm" },
    { icon: Flame, label: "Smoke alarm" },
  ];

  return (
    <div className="space-y-8">
      {/* Property Info */}
      <div className="pb-8 border-b border-airbnb-gray-light">
        <h2 className="text-xl font-semibold mb-2">Room in Tezpur, India</h2>
        <p className="text-airbnb-gray/70 mb-4">1 bed · Private attached bathroom</p>
        
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-airbnb-pink text-airbnb-pink" />
            <span className="font-medium">5.0</span>
          </div>
          <button className="text-airbnb-gray underline hover:no-underline">
            4 reviews
          </button>
        </div>

        {/* Host Info */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-warm rounded-full flex items-center justify-center">
            <span className="text-lg font-semibold text-warm-brown">A</span>
          </div>
          <div>
            <p className="font-medium">Hosted by Arita</p>
            <p className="text-sm text-airbnb-gray/70">Superhost · 6 years hosting</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-6 pb-8 border-b border-airbnb-gray-light">
        {features.map((feature, index) => (
          <div key={index} className="flex gap-4">
            <feature.icon className="h-6 w-6 text-airbnb-gray flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-medium mb-1">{feature.title}</h3>
              <p className="text-sm text-airbnb-gray/70">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* About */}
      <div className="pb-8 border-b border-airbnb-gray-light">
        <h3 className="text-xl font-semibold mb-4">About this place</h3>
        <p className="text-airbnb-gray/80 leading-relaxed">
          You won't want to leave this charming, one-of-a-kind place. The Bhowmick's Bungalow is 
          a 150 year old bungalow which is located in the heart of the town. The vintage house is 
          beautifully and meticulously designed to give the guest a feel of a comfort living in an 
          bungalow. The property is filled with green foliage and blooms which leaves the guests 
          with a feel of freshness and rejuvenation. Traditional family cusine meals are served to 
          the guest curated by the lady of the house.
        </p>
      </div>

      {/* Amenities */}
      <div className="pb-8 border-b border-airbnb-gray-light">
        <h3 className="text-xl font-semibold mb-6">What this place offers</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-4">
              <amenity.icon className="h-5 w-5 text-airbnb-gray" />
              <span className="text-airbnb-gray">{amenity.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;