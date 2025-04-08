
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Filter, Search, SlidersHorizontal, X, Users } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SectionHeading from "@/components/ui/SectionHeading";
import ListingCard from "@/components/ui/ListingCard";
import CategoryCard from "@/components/ui/CategoryCard";
import { getListingsByType, getCategoriesByType } from "@/services/mockData";

const ShareCategoryPage = () => {
  const [shareListings, setShareListings] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [paymentFrequency, setPaymentFrequency] = useState<string[]>([]);
  const [participantCount, setParticipantCount] = useState("");
  
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryFromUrl = queryParams.get("category") || "";

  useEffect(() => {
    // If category is provided in URL, select it
    if (categoryFromUrl) {
      setSelectedCategory(categoryFromUrl);
    }

    // Simulate data loading
    setIsLoading(true);
    setTimeout(() => {
      setShareListings(getListingsByType("share"));
      setCategories(getCategoriesByType("share"));
      setIsLoading(false);
    }, 300);
  }, [categoryFromUrl]);

  const togglePaymentFrequency = (value: string) => {
    setPaymentFrequency((prev) => 
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setPriceRange({ min: "", max: "" });
    setSelectedCategory("");
    setSortBy("newest");
    setPaymentFrequency([]);
    setParticipantCount("");
  };

  // Mobile filter panel toggle
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeading 
        title="Share & Split Costs" 
        subtitle="Connect with others to share subscriptions, rides, and group purchases" 
      />
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Panel - Desktop */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filters
                </span>
                <Button variant="ghost" size="sm" onClick={resetFilters} className="text-xs h-8">
                  Reset
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Category Filter */}
              <div>
                <Label className="font-medium mb-2 block">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="font-medium mb-2 block">Price Range</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* Payment Frequency */}
              <div>
                <Label className="font-medium mb-2 block">Payment Frequency</Label>
                <div className="space-y-2">
                  {["One Time", "Weekly", "Monthly", "Semesterly", "Yearly"].map((item) => (
                    <div key={item} className="flex items-center">
                      <Checkbox 
                        id={`frequency-${item}`}
                        checked={paymentFrequency.includes(item)}
                        onCheckedChange={() => togglePaymentFrequency(item)}
                        className="mr-2"
                      />
                      <Label htmlFor={`frequency-${item}`} className="text-sm cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participant Count */}
              <div>
                <Label className="font-medium mb-2 block">Participants</Label>
                <Select
                  value={participantCount}
                  onValueChange={setParticipantCount}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any number</SelectItem>
                    <SelectItem value="1">1 spot available</SelectItem>
                    <SelectItem value="2">2+ spots available</SelectItem>
                    <SelectItem value="3">3+ spots available</SelectItem>
                    <SelectItem value="4">4+ spots available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <Label className="font-medium mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-shareport-peach text-gray-900 hover:bg-shareport-peach/90">Apply Filters</Button>
            </CardContent>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {/* Search and Mobile Filter Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="search" 
                placeholder="Search sharing opportunities..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden flex items-center"
              onClick={toggleFilter}
            >
              <SlidersHorizontal size={16} className="mr-2" />
              Filters
            </Button>
          </div>

          {/* Feature Banner */}
          <div className="rounded-xl overflow-hidden bg-gradient-to-r from-shareport-purple-soft to-shareport-pink p-6 mb-8 flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Start a Group Share</h3>
              <p className="text-gray-800 max-w-lg">
                Create your own sharing group for subscriptions, rides, or bulk purchases and split costs with others.
              </p>
            </div>
            <Button className="bg-white hover:bg-white/90 text-shareport-purple">
              <Users size={16} className="mr-2" />
              Create Group
            </Button>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {categories.map((category: any) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
              />
            ))}
          </div>

          {/* Listings Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <Card key={item} className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : shareListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {shareListings.map((listing: any, index) => (
                <ListingCard 
                  key={listing.id} 
                  listing={listing}
                  index={index} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No sharing opportunities found</h3>
              <p className="text-gray-600 mb-6">No matching shares found with the current filters.</p>
              <Button onClick={resetFilters}>Reset Filters</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden flex justify-end">
          <div className="w-80 bg-white h-full overflow-y-auto animate-slide-left">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold">Filters</h3>
              <Button variant="ghost" size="icon" onClick={toggleFilter}>
                <X size={20} />
              </Button>
            </div>
            <div className="p-4 space-y-6">
              {/* Filters content - Same as desktop but with mobile IDs */}
              {/* Category Filter */}
              <div>
                <Label className="font-medium mb-2 block">Category</Label>
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map((category: any) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div>
                <Label className="font-medium mb-2 block">Price Range</Label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                    className="w-1/2"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* Payment Frequency */}
              <div>
                <Label className="font-medium mb-2 block">Payment Frequency</Label>
                <div className="space-y-2">
                  {["One Time", "Weekly", "Monthly", "Semesterly", "Yearly"].map((item) => (
                    <div key={item} className="flex items-center">
                      <Checkbox 
                        id={`mobile-frequency-${item}`}
                        checked={paymentFrequency.includes(item)}
                        onCheckedChange={() => togglePaymentFrequency(item)}
                        className="mr-2"
                      />
                      <Label htmlFor={`mobile-frequency-${item}`} className="text-sm cursor-pointer">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Participant Count */}
              <div>
                <Label className="font-medium mb-2 block">Participants</Label>
                <Select
                  value={participantCount}
                  onValueChange={setParticipantCount}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Any number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any number</SelectItem>
                    <SelectItem value="1">1 spot available</SelectItem>
                    <SelectItem value="2">2+ spots available</SelectItem>
                    <SelectItem value="3">3+ spots available</SelectItem>
                    <SelectItem value="4">4+ spots available</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Sort By */}
              <div>
                <Label className="font-medium mb-2 block">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price_low">Price: Low to High</SelectItem>
                    <SelectItem value="price_high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="w-1/2" onClick={resetFilters}>
                  Reset
                </Button>
                <Button className="w-1/2 bg-shareport-peach text-gray-900" onClick={toggleFilter}>
                  Apply
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareCategoryPage;
