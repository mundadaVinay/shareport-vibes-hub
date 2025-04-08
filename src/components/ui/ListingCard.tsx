import { Link } from "react-router-dom";
import { Heart, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Listing } from "@/services/mockData";

interface ListingCardProps {
  listing: Listing;
  className?: string;
  index?: number;
}

const ListingCard: React.FC<ListingCardProps> = ({ listing, className, index = 0 }) => {
  const formatPrice = () => {
    if (listing.type === 'buy') {
      return `₹${listing.price}`;
    } else if (listing.type === 'rent' || listing.type === 'share') {
      return `₹${listing.price}${listing.duration ? `/${listing.duration.toLowerCase().replace('per ', '')}` : ''}`;
    }
  };

  const getBadgeLabel = () => {
    switch (listing.type) {
      case 'buy':
        return 'Buy';
      case 'rent':
        return 'Rent';
      case 'share':
        return 'Share';
      default:
        return '';
    }
  };

  const getBadgeColor = () => {
    switch (listing.type) {
      case 'buy':
        return 'bg-shareport-purple/90 text-white';
      case 'rent':
        return 'bg-shareport-blue/90 text-gray-900';
      case 'share':
        return 'bg-shareport-peach/90 text-gray-900';
      default:
        return '';
    }
  };

  return (
    <div 
      className={cn(
        "glass-card overflow-hidden hover-scale animate-slide-up", 
        className
      )}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={listing.images[0]}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getBadgeColor()}`}>
            {getBadgeLabel()}
          </span>
        </div>
        <Button 
          variant="outline" 
          size="icon" 
          className="absolute top-2 right-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
        >
          <Heart className="h-4 w-4 text-gray-600" />
        </Button>
      </div>
      <div className="p-4">
        <Link to={`/listing/${listing.id}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-shareport-purple transition-colors line-clamp-1">
            {listing.title}
          </h3>
        </Link>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-shareport-purple">
            {formatPrice()}
          </span>
          {listing.condition && (
            <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
              {listing.condition}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPin size={14} className="mr-1" />
          <span className="truncate">{listing.location}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <img
                    src={listing.owner.avatar}
                    alt={listing.owner.name}
                    className="w-7 h-7 rounded-full mr-2 object-cover border border-white"
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{listing.owner.name} ({listing.owner.rating}★)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-sm truncate">{listing.owner.name}</span>
          </div>
          <div className="flex items-center text-xs text-gray-500">
            <Clock size={12} className="mr-1" />
            <time dateTime={listing.createdAt}>
              {new Date(listing.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
