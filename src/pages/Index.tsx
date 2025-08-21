import Header from "@/components/Header";
import PropertyTitle from "@/components/PropertyTitle";
import ImageGallery from "@/components/ImageGallery";
import PropertyDetails from "@/components/PropertyDetails";
import ReviewsSection from "@/components/ReviewsSection";
import BookingCard from "@/components/BookingCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        <PropertyTitle />
        <ImageGallery />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {/* Main content */}
          <div className="lg:col-span-2">
            <PropertyDetails />
            <ReviewsSection />
          </div>
          
          {/* Booking card */}
          <div className="lg:col-span-1">
            <BookingCard />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
