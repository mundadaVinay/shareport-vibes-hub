
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SectionHeading from "@/components/ui/SectionHeading";
import ListingCard from "@/components/ui/ListingCard";
import { currentUser, getListingsByType } from "@/services/mockData";
import { 
  Camera, 
  CalendarClock, 
  Package2, 
  Star, 
  Share2, 
  Check, 
  Clock, 
  AlertTriangle,
  Bell,
  Settings,
  Heart,
  MessageCircle,
  ShieldCheck
} from "lucide-react";

const ProfilePage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { activeRentals, activeShares } = currentUser;
  const myListingsData = getListingsByType('rebuy').slice(0, 3);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-1">
          <Card className="glass-card mb-6">
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="relative">
                  <Avatar className="h-20 w-20 border-2 border-shareport-purple">
                    <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                    <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost" className="absolute -bottom-1 -right-1 rounded-full bg-shareport-purple text-white hover:bg-shareport-purple-dark">
                        <Camera size={14} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update profile picture</DialogTitle>
                        <DialogDescription>
                          Upload a new profile picture to make your profile stand out.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Label htmlFor="picture">Upload Image</Label>
                        <Input id="picture" type="file" className="mt-2" />
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button className="purple-gradient">Upload</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIsEditingProfile(!isEditingProfile)}>
                  {isEditingProfile ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
              <CardTitle className="mt-4">{currentUser.name}</CardTitle>
              <CardDescription>{currentUser.college}</CardDescription>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <CalendarClock size={14} className="mr-1" />
                <span>Member since {formatDate(currentUser.memberSince)}</span>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <Star size={12} className="mr-1 text-yellow-500" /> 4.9 Rating
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <Package2 size={12} className="mr-1" /> 12 Listings
                </Badge>
                <Badge variant="secondary" className="bg-gray-100 text-gray-700 hover:bg-gray-200">
                  <ShieldCheck size={12} className="mr-1" /> Verified
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-6">
              {isEditingProfile ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={currentUser.name} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue={currentUser.email} className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="college">College</Label>
                    <Input id="college" defaultValue={currentUser.college} className="mt-1" />
                  </div>
                  <Button className="w-full purple-gradient">Save Changes</Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <p>{currentUser.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">College</label>
                    <p>{currentUser.college}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">About</label>
                    <p className="text-sm text-gray-600">
                      Student at Stanford, looking to share resources and find good deals on campus!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start" size="lg">
              <MessageCircle className="mr-2 h-4 w-4" />
              Messages
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Heart className="mr-2 h-4 w-4" />
              Saved Listings
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
            <Button variant="outline" className="w-full justify-start" size="lg">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>

        {/* Right Column - Listings & Activity */}
        <div className="md:col-span-2">
          <Tabs defaultValue="active">
            <TabsList className="w-full justify-start h-12 p-1 bg-gray-100 mb-6">
              <TabsTrigger value="active" className="flex-1">Active Items</TabsTrigger>
              <TabsTrigger value="mylistings" className="flex-1">My Listings</TabsTrigger>
              <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
            </TabsList>

            {/* Active Items Tab */}
            <TabsContent value="active" className="space-y-8">
              <div>
                <SectionHeading 
                  title="Currently Renting" 
                  subtitle="Items you're currently renting from others" 
                />
                {activeRentals.length > 0 ? (
                  <div className="space-y-4">
                    {activeRentals.map((rental) => (
                      <Card key={rental.id} className="glass-card overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4 h-40 md:h-auto">
                            <img 
                              src={rental.images[0]} 
                              alt={rental.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex justify-between">
                              <h3 className="font-semibold text-lg">{rental.title}</h3>
                              <Badge className="bg-shareport-blue/90 text-gray-900">Renting</Badge>
                            </div>
                            <div className="flex items-center mt-2 mb-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={rental.owner.avatar} />
                              </Avatar>
                              <span className="text-sm text-gray-600">From {rental.owner.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mt-4">
                              <div className="flex items-center">
                                <Clock size={16} className="mr-1" />
                                <span>Return by Apr 15, 2025</span>
                              </div>
                              <div className="flex items-center">
                                <Check size={16} className="mr-1 text-green-500" />
                                <span>Paid through Apr 15</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button size="sm">Extend Rental</Button>
                              <Button size="sm" variant="outline">Message Owner</Button>
                              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-500">Report Issue</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 bg-gray-50 border border-dashed text-center">
                    <p className="text-gray-500">You're not renting any items right now.</p>
                    <Button className="mt-4" variant="outline">Browse Items to Rent</Button>
                  </Card>
                )}
              </div>

              <Separator />

              <div>
                <SectionHeading 
                  title="Active Shares" 
                  subtitle="Subscriptions and services you're currently sharing" 
                />
                {activeShares.length > 0 ? (
                  <div className="space-y-4">
                    {activeShares.map((share) => (
                      <Card key={share.id} className="glass-card overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-1/4 h-40 md:h-auto">
                            <img 
                              src={share.images[0]} 
                              alt={share.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="flex-1 p-5">
                            <div className="flex justify-between">
                              <h3 className="font-semibold text-lg">{share.title}</h3>
                              <Badge className="bg-shareport-peach/90 text-gray-900">Sharing</Badge>
                            </div>
                            <div className="flex items-center mt-2 mb-2">
                              <Avatar className="h-6 w-6 mr-2">
                                <AvatarImage src={share.owner.avatar} />
                              </Avatar>
                              <span className="text-sm text-gray-600">With {share.owner.name}</span>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm mt-4">
                              <div className="flex items-center">
                                <Share2 size={16} className="mr-1" />
                                <span>Active subscription</span>
                              </div>
                              <div className="flex items-center">
                                <Check size={16} className="mr-1 text-green-500" />
                                <span>Paid through May 10</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-4">
                              <Button size="sm">Access Details</Button>
                              <Button size="sm" variant="outline">Message Owner</Button>
                              <Button size="sm" variant="outline" className="text-red-500 hover:text-red-500">Cancel Share</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <Card className="p-6 bg-gray-50 border border-dashed text-center">
                    <p className="text-gray-500">You're not sharing any subscriptions right now.</p>
                    <Button className="mt-4" variant="outline">Find Sharing Opportunities</Button>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* My Listings Tab */}
            <TabsContent value="mylistings">
              <div className="flex justify-between items-center mb-6">
                <SectionHeading 
                  title="My Listings" 
                  subtitle="Items and services you've posted on SharePort" 
                  className="mb-0"
                />
                <Button className="purple-gradient">New Listing</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myListingsData.map((listing, index) => (
                  <ListingCard key={listing.id} listing={listing} index={index} />
                ))}

                <Card className="flex flex-col items-center justify-center p-8 h-full border-dashed border-2 border-gray-200 bg-gray-50">
                  <div className="rounded-full p-4 bg-gray-100 mb-4">
                    <Plus className="h-6 w-6 text-gray-500" />
                  </div>
                  <h3 className="font-medium mb-2">Create a new listing</h3>
                  <p className="text-sm text-gray-500 text-center mb-4">
                    Sell, rent or share something with your college community.
                  </p>
                  <Button variant="outline">Add New Listing</Button>
                </Card>
              </div>
            </TabsContent>

            {/* History Tab */}
            <TabsContent value="history">
              <SectionHeading 
                title="Transaction History" 
                subtitle="Your past rentals, sales, and shares" 
              />
              
              <Card className="p-6 mb-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">MacBook Charger</h3>
                      <p className="text-sm text-gray-500">Rented for 1 week</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$15.00</p>
                      <p className="text-sm text-gray-500">Mar 10, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">Statistics Textbook</h3>
                      <p className="text-sm text-gray-500">Sold</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$45.00</p>
                      <p className="text-sm text-gray-500">Feb 28, 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div>
                      <h3 className="font-semibold">Spotify Premium</h3>
                      <p className="text-sm text-gray-500">Shared for 3 months</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$15.00</p>
                      <p className="text-sm text-gray-500">Jan 15 - Apr 15, 2025</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="text-center">
                <Button variant="outline">View Full Transaction History</Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

// Plus icon component
const Plus = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </svg>
);

export default ProfilePage;
