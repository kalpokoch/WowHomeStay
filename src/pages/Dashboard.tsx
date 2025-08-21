import Header from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Home, Database } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8 mt-20">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-airbnb-gray mb-2">Tenant Management Dashboard</h1>
          <p className="text-airbnb-gray/70">Manage your property bookings and tenant information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Current Tenants Card */}
          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-airbnb-pink/10 rounded-lg">
                <Users className="h-6 w-6 text-airbnb-pink" />
              </div>
              <div>
                <h3 className="font-semibold text-airbnb-gray">Current Tenants</h3>
                <p className="text-sm text-airbnb-gray/70">Active stays</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-airbnb-gray mb-2">2</div>
            <p className="text-sm text-airbnb-gray/70">Currently checked in</p>
          </Card>

          {/* Upcoming Bookings Card */}
          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-warm-gold/10 rounded-lg">
                <Calendar className="h-6 w-6 text-warm-gold" />
              </div>
              <div>
                <h3 className="font-semibold text-airbnb-gray">Upcoming Bookings</h3>
                <p className="text-sm text-airbnb-gray/70">Next 30 days</p>
              </div>
            </div>
            <div className="text-2xl font-bold text-airbnb-gray mb-2">5</div>
            <p className="text-sm text-airbnb-gray/70">Confirmed reservations</p>
          </Card>

          {/* Property Status Card */}
          <Card className="p-6 shadow-elegant">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-warm-brown/10 rounded-lg">
                <Home className="h-6 w-6 text-warm-brown" />
              </div>
              <div>
                <h3 className="font-semibold text-airbnb-gray">Property Status</h3>
                <p className="text-sm text-airbnb-gray/70">Availability</p>
              </div>
            </div>
            <div className="text-lg font-bold text-green-600 mb-2">Available</div>
            <p className="text-sm text-airbnb-gray/70">Ready for new guests</p>
          </Card>
        </div>

        {/* Database Integration Section */}
        <Card className="p-8 shadow-elegant border-2 border-dashed border-airbnb-gray-light">
          <div className="text-center">
            <div className="p-4 bg-airbnb-gray/5 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
              <Database className="h-10 w-10 text-airbnb-gray/50" />
            </div>
            <h3 className="text-xl font-semibold text-airbnb-gray mb-2">MongoDB Integration</h3>
            <p className="text-airbnb-gray/70 mb-6 max-w-md mx-auto">
              Connect your MongoDB database to manage tenant information, bookings, and property data. 
              This section will be populated once the database is configured.
            </p>
            <div className="space-y-4">
              <Button variant="airbnb" className="mr-4">
                Configure Database
              </Button>
              <Button variant="outline-gray">
                View Documentation
              </Button>
            </div>
          </div>
        </Card>

        {/* Placeholder Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 shadow-elegant">
            <h3 className="font-semibold text-airbnb-gray mb-4">Recent Check-ins</h3>
            <div className="space-y-3">
              <div className="p-3 bg-airbnb-gray/5 rounded-lg">
                <p className="text-sm text-airbnb-gray/70">No recent check-ins</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-elegant">
            <h3 className="font-semibold text-airbnb-gray mb-4">Upcoming Departures</h3>
            <div className="space-y-3">
              <div className="p-3 bg-airbnb-gray/5 rounded-lg">
                <p className="text-sm text-airbnb-gray/70">No upcoming departures</p>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;