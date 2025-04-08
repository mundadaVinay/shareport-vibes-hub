
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Heart, 
  Share, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Star, 
  Calendar, 
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SectionHeading from "@/components/ui/SectionHeading";
import ListingCard from "@/components/ui/ListingCard";
import { getListingById, getRelatedListings } from "@/services/mockData";
import { useToast } from "@/hooks/use-toast";

const ListingDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<any>(null);
  const [relatedListings, setRelatedListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Fetch listing by ID
    if (id) {
      setLoading(true);
      const foundListing = getListingById(id);
      if (foundListing) {
        setListing(foundListing);
        setRelatedListings(getRelatedListings(foundListing, 3));
        
        // Simulate loading delay
        setTimeout(() => {
          setLoading(false);
        }, 300);
      } else {
        setLoading(false);
      }
    }
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? listing.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === listing.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      toast({
        title: "Message Sent",
        description: `Your message to ${listing.owner.name} has been sent!`,
      });
      setMessage("");
    }
  };

  const handleSaveItem = () => {
    toast({
      title: "Item Saved",
      description: "This item has been added to your saved list.",
    });
  };

  // Calculate badge style based on listing type
  const getBadgeStyle = () => {
    switch (listing?.type) {
      case 'rebuy':
        return "bg-shareport-purple/90 text-white";
      case 'rent':
        return "bg-shareport-blue/90 text-gray-900";
      case 'share':
        return "bg-shareport-peach/90 text-gray-900";
      default:
        return "";
    }
  };

  // Format price display
  const formatPrice = () => {
    if (!listing) return "";
    
    if (listing.type === 'rebuy') {
      return `$${listing.price}`;
    } else if (listing.type === 'rent' || listing.type === 'share') {
      return `$${listing.price}${listing.duration ? `/${listing.duration.toLowerCase().replace('per ', '')}` : ''}`;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded max-w-md mx-auto mb-4"></div>
          <div className="h-4 bg-gray-200 rounded max-w-sm mx-auto"></div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Listing Not Found</h2>
        <p className="text-gray-600 mb-6">The listing you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column - Images and Details */}
        <div className="lg:w-2/3">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm mb-4">
            <Link to="/" className="text-gray-500 hover:text-shareport-purple">Home</Link>
            <span className="mx-2">/</span>
            <Link to={`/${listing.type}`} className="text-gray-500 hover:text-shareport-purple capitalize">
              {listing.type}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium truncate">{listing.title}</span>
          </div>

          {/* Image Gallery */}
          <div className="relative overflow-hidden rounded-xl mb-8 bg-gray-100">
            <div className="aspect-[4/3] relative">
              <img
                src={listing.images[currentImageIndex]}
                alt={`${listing.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Image Navigation */}
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handlePrevImage}
                  className="rounded-full bg-black/30 text-white hover:bg-black/50"
                >
                  <ChevronLeft />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={handleNextImage}
                  className="rounded-full bg-black/30 text-white hover:bg-black/50"
                >
                  <ChevronRight />
                </Button>
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded-md">
                {currentImageIndex + 1} / {listing.images.length}
              </div>
            </div>
            
            {/* Thumbnail Row */}
            {listing.images.length > 1 && (
              <div className="flex p-2 gap-2 overflow-x-auto">
                {listing.images.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 flex-shrink-0 rounded overflow-hidden border-2 ${
                      index === currentImageIndex ? "border-shareport-purple" : "border-transparent"
                    }`}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Listing Details */}
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <Badge className={`mr-2 ${getBadgeStyle()}`}>
                {listing.type === 'rebuy' ? 'Rebuy' : listing.type === 'rent' ? 'Rent' : 'Share'}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={14} className="mr-1" />
                <span>Listed on {new Date(listing.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            
            <h1 className="text-2xl lg:text-3xl font-bold mb-2">{listing.title}</h1>
            
            <div className="flex items-center mb-4">
              <MapPin size={16} className="text-gray-500 mr-1" />
              <span className="text-gray-600">{listing.location}</span>
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-2xl font-bold text-shareport-purple">{formatPrice()}</div>
              {listing.condition && (
                <Badge variant="outline" className="border-gray-200 text-gray-700">
                  Condition: {listing.condition}
                </Badge>
              )}
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-semibold mb-4">About this item</h2>
            <p className="text-gray-700 mb-6 whitespace-pre-line">{listing.description}</p>

            {/* Additional details based on listing type */}
            {listing.type === 'rent' && (
              <div className="flex items-center p-4 bg-shareport-blue/10 rounded-lg mb-6">
                <Calendar className="h-8 w-8 text-shareport-blue mr-3" />
                <div>
                  <h3 className="font-medium">Rental Information</h3>
                  <p className="text-sm text-gray-600">
                    This item is available for rent at {formatPrice()}. Security deposit may be required.
                  </p>
                </div>
              </div>
            )}

            {listing.type === 'share' && (
              <div className="flex items-center p-4 bg-shareport-peach/20 rounded-lg mb-6">
                <Share className="h-8 w-8 text-shareport-purple-dark mr-3" />
                <div>
                  <h3 className="font-medium">Sharing Details</h3>
                  <p className="text-sm text-gray-600">
                    Join this sharing arrangement at {formatPrice()}. The owner will provide access details after confirmation.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              <Button 
                className={`${
                  listing.type === 'rebuy' 
                    ? 'purple-gradient' 
                    : listing.type === 'rent'
                    ? 'bg-shareport-blue text-gray-900 hover:bg-shareport-blue/90'
                    : 'bg-shareport-peach text-gray-900 hover:bg-shareport-peach/90'
                }`}
              >
                {listing.type === 'rebuy' ? 'Buy Now' : listing.type === 'rent' ? 'Rent This Item' : 'Join This Share'}
              </Button>
              <Button variant="outline" onClick={handleSaveItem}>
                <Heart size={16} className="mr-2" />
                Save
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline">
                      <Share size={16} className="mr-2" />
                      Share
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Share this listing with friends</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="icon" className="rounded-full">
                    <AlertTriangle size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Report this listing</DialogTitle>
                    <DialogDescription>
                      If this listing violates community guidelines or seems suspicious, please let us know.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <Textarea 
                      placeholder="Please describe the issue with this listing..." 
                      className="min-h-[100px]"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Report Listing</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Related Listings */}
          <div className="mt-10">
            <SectionHeading 
              title="You might also like" 
              subtitle={`Similar items in ${listing.location}`} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedListings.map((relatedListing, index) => (
                <ListingCard key={relatedListing.id} listing={relatedListing} index={index} />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Seller Info and Contact */}
        <div className="lg:w-1/3">
          <div className="sticky top-24">
            {/* Seller Card */}
            <Card className="glass-card mb-6">
              <CardHeader>
                <CardTitle className="text-lg">About the {listing.type === 'rebuy' ? 'Seller' : 'Owner'}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={listing.owner.avatar} alt={listing.owner.name} />
                    <AvatarFallback>{listing.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium">{listing.owner.name}</h3>
                    <div className="flex items-center text-sm">
                      <Star size={14} className="text-yellow-500 mr-1" />
                      <span>{listing.owner.rating} Rating</span>
                    </div>
                  </div>
                </div>
                <Button className="w-full">View Profile</Button>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="bg-gray-50 mb-6">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <Info size={18} className="text-shareport-purple mr-2" />
                  <CardTitle className="text-sm">Safety Tips</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-sm text-gray-600">
                <ul className="space-y-2 list-disc pl-5">
                  <li>Meet in public places for exchanges</li>
                  <li>Verify the item before making payment</li>
                  <li>Use SharePort messaging for all communications</li>
                  <li>Report suspicious activity immediately</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MessageSquare size={18} className="mr-2" />
                  Message {listing.owner.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder={`Hi ${listing.owner.name}, I'm interested in your ${listing.title}...`}
                  className="min-h-[120px] mb-3 resize-none"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleSendMessage} className="w-full purple-gradient" disabled={!message.trim()}>
                  <Send size={14} className="mr-2" />
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailsPage;
