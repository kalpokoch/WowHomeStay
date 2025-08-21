import { Star, Sparkles, CheckCircle, Key, MessageCircle, MapPin, DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const ReviewsSection = () => {
  const overallRating = 5.0;
  const totalReviews = 4;

  const ratings = [
    { category: "Cleanliness", score: 4.8, icon: Sparkles },
    { category: "Accuracy", score: 4.8, icon: CheckCircle },
    { category: "Check-in", score: 5.0, icon: Key },
    { category: "Communication", score: 4.5, icon: MessageCircle },
    { category: "Location", score: 4.8, icon: MapPin },
    { category: "Value", score: 5.0, icon: DollarSign },
  ];

  const ratingDistribution = [
    { stars: 5, count: 4 },
    { stars: 4, count: 0 },
    { stars: 3, count: 0 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  return (
    <div className="pb-8 border-b border-airbnb-gray-light">
      <div className="flex items-center gap-2 mb-8">
        <Star className="h-6 w-6 fill-airbnb-pink text-airbnb-pink" />
        <h3 className="text-xl font-semibold">{overallRating} · {totalReviews} reviews</h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Overall Rating Breakdown */}
        <div className="space-y-3">
          <h4 className="font-medium mb-4">Overall rating</h4>
          {ratingDistribution.map((rating) => (
            <div key={rating.stars} className="flex items-center gap-3">
              <span className="text-sm w-4">{rating.stars}</span>
              <Progress 
                value={(rating.count / totalReviews) * 100} 
                className="flex-1 h-2"
              />
              <span className="text-sm text-airbnb-gray/70 w-4">{rating.count}</span>
            </div>
          ))}
        </div>

        {/* Category Ratings */}
        <div className="grid grid-cols-2 gap-4">
          {ratings.map((rating, index) => {
            const IconComponent = rating.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center">
                <IconComponent className="h-6 w-6 text-airbnb-pink mb-2" />
                <div className="text-sm text-airbnb-gray/70 mb-1">{rating.category}</div>
                <div className="font-semibold">{rating.score}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-warm-brown">R</span>
            </div>
            <div>
              <p className="font-medium">Rajesh</p>
              <p className="text-sm text-airbnb-gray/70">August 2025</p>
            </div>
          </div>
          <p className="text-sm text-airbnb-gray/80">
            Exceptional hospitality! The traditional meals prepared by Arita were absolutely delicious. 
            The 150-year-old bungalow has so much character and charm.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-warm rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold text-warm-brown">P</span>
            </div>
            <div>
              <p className="font-medium">Priya</p>
              <p className="text-sm text-airbnb-gray/70">July 2025</p>
            </div>
          </div>
          <p className="text-sm text-airbnb-gray/80">
            Beautiful property with lush green surroundings. The room was clean and comfortable. 
            Arita is a wonderful host who made our stay memorable.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;