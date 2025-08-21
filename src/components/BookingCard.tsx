import { useState, useEffect, useRef } from "react";
import { Calendar, Users, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

const BookingCard = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [guests, setGuests] = useState(1);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const [cardDimensions, setCardDimensions] = useState({ width: 0, left: 0 });
  const [cardHeight, setCardHeight] = useState(0);
  const [showMobileSheet, setShowMobileSheet] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const clearDates = () => {
    setDateRange(undefined);
  };

  const disabledDays = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  useEffect(() => {
    const calculateDimensions = () => {
      if (containerRef.current && cardRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const cardRect = cardRef.current.getBoundingClientRect();
        
        setCardDimensions({
          width: containerRect.width,
          left: containerRect.left + window.scrollX
        });
        setCardHeight(cardRect.height);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const shouldBeSticky = scrollPosition > 400;
      
      // Check if user is at bottom of page
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrolledToBottom = scrollPosition + windowHeight >= documentHeight - 100; // 100px buffer
      
      setIsAtBottom(scrolledToBottom);
      
      if (!isSticky && shouldBeSticky) {
        calculateDimensions();
      }
      
      setIsSticky(shouldBeSticky);
    };

    const handleResize = () => {
      calculateDimensions();
    };

    setTimeout(calculateDimensions, 100);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isSticky]);

  const pricePerNight = 2511;
  const nights = dateRange?.from && dateRange?.to 
    ? Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    : 0;
  const totalPrice = pricePerNight * nights;

  const stickyStyles = isSticky ? {
    position: 'fixed' as const,
    top: '6rem',
    left: `${cardDimensions.left}px`,
    width: `${cardDimensions.width}px`,
    zIndex: 40,
  } : {};

  // Mobile bottom sheet component
  const MobileBottomSheet = () => (
    <>
      {/* Backdrop */}
      {showMobileSheet && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
          onClick={() => setShowMobileSheet(false)}
        />
      )}
      
      {/* Bottom Sheet */}
      <div className={`
        fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 lg:hidden
        transform transition-transform duration-300 ease-in-out
        ${showMobileSheet ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* Handle bar */}
        <div className="flex justify-center py-3">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-airbnb-gray">
              ₹{nights > 0 ? totalPrice.toLocaleString() : pricePerNight.toLocaleString()}
            </span>
            <span className="text-airbnb-gray/70">
              {nights > 0 ? `for ${nights} night${nights > 1 ? 's' : ''}` : 'per night'}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMobileSheet(false)}
            className="p-2"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6 max-h-[70vh] overflow-y-auto">
          <p className="text-sm text-airbnb-gray/70 mb-6">Prices include all fees</p>
          
          <div className="space-y-4 mb-6">
            {/* Date Selection */}
            <div className="grid grid-cols-2 gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline-gray" 
                    className="h-14 flex-col items-start p-3 text-left"
                  >
                    <span className="text-xs font-medium text-airbnb-gray/70">CHECK-IN</span>
                    <span className="text-sm font-normal">
                      {dateRange?.from ? format(dateRange.from, "M/d/yyyy") : "Add date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-sm">Select dates</h4>
                      {dateRange && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearDates}
                          className="text-xs text-airbnb-gray/70 hover:text-airbnb-gray"
                        >
                          Clear dates
                        </Button>
                      )}
                    </div>
                    <CalendarComponent
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      className="pointer-events-auto"
                      disabled={disabledDays}
                    />
                  </div>
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline-gray" 
                    className="h-14 flex-col items-start p-3 text-left"
                  >
                    <span className="text-xs font-medium text-airbnb-gray/70">CHECKOUT</span>
                    <span className="text-sm font-normal">
                      {dateRange?.to ? format(dateRange.to, "M/d/yyyy") : "Add date"}
                    </span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <div className="p-3">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-sm">Select dates</h4>
                      {dateRange && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={clearDates}
                          className="text-xs text-airbnb-gray/70 hover:text-airbnb-gray"
                        >
                          Clear dates
                        </Button>
                      )}
                    </div>
                    <CalendarComponent
                      mode="range"
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={1}
                      className="pointer-events-auto"
                      disabled={disabledDays}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Guest Selection */}
            <Popover open={showGuestDropdown} onOpenChange={setShowGuestDropdown}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline-gray" 
                  className="w-full h-14 justify-between p-3 text-left"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-xs font-medium text-airbnb-gray/70">GUESTS</span>
                    <span className="text-sm font-normal">{guests} guest{guests > 1 ? 's' : ''}</span>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Guests</span>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline-gray"
                      size="sm"
                      onClick={() => setGuests(Math.max(1, guests - 1))}
                      disabled={guests <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{guests}</span>
                    <Button
                      variant="outline-gray"
                      size="sm"
                      onClick={() => setGuests(Math.min(8, guests + 1))}
                      disabled={guests >= 8}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <Button 
            variant="reserve" 
            size="xl" 
            className="w-full mb-4"
            disabled={!dateRange?.from || !dateRange?.to}
          >
            Reserve
          </Button>

          <p className="text-center text-sm text-airbnb-gray/70 mb-6">
            You won't be charged yet
          </p>

          {/* Price Breakdown */}
          {nights > 0 && (
            <div className="pt-6 border-t border-airbnb-gray-light space-y-2">
              <div className="flex justify-between text-sm">
                <span>₹{pricePerNight.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
        
        {/* Safe area for iOS */}
        <div className="pb-safe" />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Version */}
      <>
        {isSticky && (
          <div 
            style={{ height: `${cardHeight}px` }}
            className="lg:block hidden"
          />
        )}
        
        <div 
          ref={containerRef}
          className={`
            transition-all duration-500 ease-in-out hidden lg:block
            ${isSticky ? 'fixed' : 'relative'}
          `}
          style={stickyStyles}
        >
          <Card 
            ref={cardRef}
            className="p-6 shadow-booking-card border border-airbnb-gray-light w-full bg-white"
          >
            <div className="mb-6">
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-2xl font-semibold text-airbnb-gray">
                  ₹{nights > 0 ? totalPrice.toLocaleString() : pricePerNight.toLocaleString()}
                </span>
                <span className="text-airbnb-gray/70">
                  {nights > 0 ? `for ${nights} night${nights > 1 ? 's' : ''}` : 'per night'}
                </span>
              </div>
              <p className="text-sm text-airbnb-gray/70">Prices include all fees</p>
            </div>

            <div className="space-y-4 mb-6">
              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline-gray" 
                      className="h-14 flex-col items-start p-3 text-left"
                    >
                      <span className="text-xs font-medium text-airbnb-gray/70">CHECK-IN</span>
                      <span className="text-sm font-normal">
                        {dateRange?.from ? format(dateRange.from, "M/d/yyyy") : "Add date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-sm">Select dates</h4>
                        {dateRange && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearDates}
                            className="text-xs text-airbnb-gray/70 hover:text-airbnb-gray"
                          >
                            Clear dates
                          </Button>
                        )}
                      </div>
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                        disabled={disabledDays}
                      />
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button 
                      variant="outline-gray" 
                      className="h-14 flex-col items-start p-3 text-left"
                    >
                      <span className="text-xs font-medium text-airbnb-gray/70">CHECKOUT</span>
                      <span className="text-sm font-normal">
                        {dateRange?.to ? format(dateRange.to, "M/d/yyyy") : "Add date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <div className="p-3">
                      <div className="flex justify-between items-center mb-3">
                        <h4 className="font-medium text-sm">Select dates</h4>
                        {dateRange && (
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={clearDates}
                            className="text-xs text-airbnb-gray/70 hover:text-airbnb-gray"
                          >
                            Clear dates
                          </Button>
                        )}
                      </div>
                      <CalendarComponent
                        mode="range"
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        className="pointer-events-auto"
                        disabled={disabledDays}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guest Selection */}
              <Popover open={showGuestDropdown} onOpenChange={setShowGuestDropdown}>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline-gray" 
                    className="w-full h-14 justify-between p-3 text-left"
                  >
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-medium text-airbnb-gray/70">GUESTS</span>
                      <span className="text-sm font-normal">{guests} guest{guests > 1 ? 's' : ''}</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Guests</span>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline-gray"
                        size="sm"
                        onClick={() => setGuests(Math.max(1, guests - 1))}
                        disabled={guests <= 1}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{guests}</span>
                      <Button
                        variant="outline-gray"
                        size="sm"
                        onClick={() => setGuests(Math.min(8, guests + 1))}
                        disabled={guests >= 8}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <Button 
              variant="reserve" 
              size="xl" 
              className="w-full mb-4"
              disabled={!dateRange?.from || !dateRange?.to}
            >
              Reserve
            </Button>

            <p className="text-center text-sm text-airbnb-gray/70">
              You won't be charged yet
            </p>

            {/* Price Breakdown */}
            {nights > 0 && (
              <div className="mt-6 pt-6 border-t border-airbnb-gray-light space-y-2">
                <div className="flex justify-between text-sm">
                  <span>₹{pricePerNight.toLocaleString()} x {nights} night{nights > 1 ? 's' : ''}</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>
            )}
          </Card>
        </div>
      </>

      {/* Mobile Fixed Bottom Button */}
      <div className={`
        fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 lg:hidden
        transition-transform duration-300 ease-in-out
        ${isAtBottom ? 'translate-y-full' : 'translate-y-0'}
      `}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-airbnb-gray">
              ₹{nights > 0 ? totalPrice.toLocaleString() : pricePerNight.toLocaleString()}
            </span>
            <span className="text-sm text-airbnb-gray/70">
              {nights > 0 ? `for ${nights} night${nights > 1 ? 's' : ''}` : 'per night'}
            </span>
          </div>
          <Button
            variant="reserve"
            size="lg"
            onClick={() => setShowMobileSheet(true)}
            className="px-8"
          >
            Reserve
          </Button>
        </div>
        {/* Safe area for iOS */}
        <div className="pb-safe" />
      </div>

      {/* Mobile Bottom Sheet */}
      <MobileBottomSheet />
    </>
  );
};

export default BookingCard;
