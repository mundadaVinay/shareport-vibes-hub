
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Search, ShoppingBag, Home, Calendar, Share2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass py-2 shadow-sm" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full vibrant-gradient flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="font-bold text-xl text-gradient-vibrant">SharePort</span>
        </Link>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          <NavLink to="/" icon={<Home size={18} />} label="Home" />
          <NavLink to="/rebuy" icon={<ShoppingBag size={18} />} label="Buy" />
          <NavLink to="/rent" icon={<Calendar size={18} />} label="Rent" />
          <NavLink to="/share" icon={<Share2 size={18} />} label="Share" />
          <Link 
            to="/create-listing"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-primary shadow-lg hover:shadow-primary/40 transition-all duration-300 transform hover:scale-105 ml-2"
            aria-label="Create Listing"
          >
            <Plus size={20} className="text-white" />
          </Link>
        </nav>

        {/* Search + Profile - Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="relative w-60">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              type="search" 
              placeholder="Search in SharePort..." 
              className="pl-10 pr-4 py-2 rounded-full bg-white/10 hover:bg-white/20 focus:bg-white/30 transition-colors border-0 focus:ring-1 focus:ring-primary"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary/10">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100" alt="User" />
                  <AvatarFallback className="bg-primary text-white">JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>My Listings</DropdownMenuItem>
              <DropdownMenuItem>Notifications</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Trigger */}
        <Button 
          variant="ghost" 
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 glass py-4 px-6 flex flex-col space-y-4 md:hidden animate-slide-left">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                type="search" 
                placeholder="Search in SharePort..." 
                className="pl-10 pr-4 py-2 rounded-full bg-white/10 border-0"
              />
            </div>
            
            <Link to="/" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/rebuy" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
              <ShoppingBag size={20} />
              <span>Buy</span>
            </Link>
            <Link to="/rent" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
              <Calendar size={20} />
              <span>Rent</span>
            </Link>
            <Link to="/share" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
              <Share2 size={20} />
              <span>Share</span>
            </Link>
            <Link to="/create-listing" className="flex items-center space-x-2 p-2 rounded-md bg-primary text-white hover:bg-primary/90">
              <Plus size={20} />
              <span>Create Listing</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-2 p-2 rounded-md hover:bg-white/10">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

// NavLink component for desktop navigation
const NavLink = ({ to, icon, label, className = "" }: { to: string; icon: React.ReactNode; label: string; className?: string }) => {
  const location = useLocation();
  const isActive = location.pathname === to || (to !== "/" && location.pathname.startsWith(to));

  return (
    <Link 
      to={to} 
      className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
        isActive 
        ? "bg-primary text-white shadow-md" 
        : "hover:bg-white/10"
      } ${className}`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

export default Navbar;
