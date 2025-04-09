
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import FeaturedSlider from "@/components/ui/FeaturedSlider";
import ListingCard from "@/components/ui/ListingCard";
import CategoryCard from "@/components/ui/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";
import { 
  getFeaturedListings, 
  getListingsByType, 
  getCategoriesByType 
} from "@/services/mockData";
import { Badge } from "@/components/ui/badge";
import { Filter, TrendingUp, MapPin } from "lucide-react";

const Index = () => {
  const [featuredListings, setFeaturedListings] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setFeaturedListings(getFeaturedListings());
      setIsLoaded(true);
    }, 300);
  }, []);

  const buyCategoriesData = getCategoriesByType('buy');
  const rentCategoriesData = getCategoriesByType('rent');
  const shareCategoriesData = getCategoriesByType('share');

  const buyListingsData = getListingsByType('buy').slice(0, 4);
  const rentListingsData = getListingsByType('rent').slice(0, 4);
  const shareListingsData = getListingsByType('share').slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Featured Slider */}
      <section className="container mx-auto px-4 pt-4 pb-10">
        <div className={`transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <FeaturedSlider listings={featuredListings} />
        </div>
      </section>

      {/* Main Category Navigation Tabs */}
      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="buy" className="w-full">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <TabsList className="h-12 p-1 bg-gray-100/80 backdrop-blur-sm">
              <TabsTrigger value="buy" className="h-10 px-8 text-base">Buy</TabsTrigger>
              <TabsTrigger value="rent" className="h-10 px-8 text-base">Rent</TabsTrigger>
              <TabsTrigger value="share" className="h-10 px-8 text-base">Share</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-3 mt-4 md:mt-0">
              <Button variant="outline" size="sm" className="gap-1.5">
                <Filter size={16} />
                Filters
              </Button>
              <Button variant="outline" size="sm" className="gap-1.5">
                <MapPin size={16} />
                Manipal Jaipur
              </Button>
            </div>
          </div>

          {/* Buy Content */}
          <TabsContent value="buy" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {buyCategoriesData.map((category, index) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                />
              ))}
            </div>

            <SectionHeading 
              title="Latest Buy Listings" 
              subtitle="Browse quality pre-owned items from students at your college"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {buyListingsData.map((listing, index) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  index={index}
                />
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="purple-gradient">
                <Link to="/buy">View All Buy Listings</Link>
              </Button>
            </div>
          </TabsContent>

          {/* Rent Content */}
          <TabsContent value="rent" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {rentCategoriesData.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                />
              ))}
            </div>

            <SectionHeading 
              title="Available for Rent" 
              subtitle="Why buy when you can rent? Find items available for temporary use"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {rentListingsData.map((listing, index) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  index={index}
                />
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="bg-shareport-blue text-gray-900 hover:bg-shareport-blue/90">
                <Link to="/rent">View All Rental Listings</Link>
              </Button>
            </div>
          </TabsContent>

          {/* Share Content */}
          <TabsContent value="share" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {shareCategoriesData.map((category) => (
                <CategoryCard 
                  key={category.id} 
                  category={category} 
                />
              ))}
            </div>

            <SectionHeading 
              title="Share & Split Costs" 
              subtitle="Connect with others to share subscriptions, rides, and group purchases"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              {shareListingsData.map((listing, index) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing} 
                  index={index}
                />
              ))}
            </div>

            <div className="text-center">
              <Button asChild className="bg-shareport-peach text-gray-900 hover:bg-shareport-peach/90">
                <Link to="/share">View All Sharing Opportunities</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Trending & Recommendations */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-gradient-to-r from-shareport-purple-soft to-shareport-pink/70 rounded-2xl p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <SectionHeading 
              title="Trending in Your College" 
              subtitle="Popular items and shares at Manipal University Jaipur" 
              className="mb-0 md:mb-0"
            />
            <div className="flex items-center mt-4 md:mt-0">
              <Badge variant="secondary" className="gap-1 bg-white/80 backdrop-blur-sm py-1.5 mr-2">
                <TrendingUp size={14} />
                Trending now
              </Badge>
              <Button variant="ghost" className="bg-white/50 hover:bg-white/80">
                View all
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getFeaturedListings().slice(0, 4).map((listing, index) => (
              <ListingCard 
                key={listing.id} 
                listing={listing} 
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-sm border border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to join the community?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            List your items for buy, rent out your belongings, or find people to share subscription costs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button className="purple-gradient">Create Listing</Button>
            <Button variant="outline">Browse More</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
