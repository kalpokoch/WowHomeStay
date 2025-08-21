import { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-white shadow-elegant border-b border-airbnb-gray-light transition-all duration-300 ${
        isVisible ? "animate-slide-down" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            className="w-8 h-8 text-airbnb-pink"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 1c2 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.114 12.54 7.1 14.836l.145.341c.667 1.591-.066 3.426-1.671 4.174l-.302.134C23.502 26.12 19.776 27 16 27s-7.502-.88-10.556-2.221l-.302-.134c-1.605-.748-2.338-2.583-1.671-4.174l.145-.341c.986-2.296 5.146-11.006 7.1-14.836l.533-1.025C12.537 1.963 14 1 16 1z"/>
          </svg>
          <span className="ml-2 text-xl font-bold text-airbnb-pink">WOW</span>
        </div>
        
        <Button variant="outline-gray" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default Header;