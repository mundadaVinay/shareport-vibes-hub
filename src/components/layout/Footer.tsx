
import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full purple-gradient flex items-center justify-center">
                <span className="text-white font-bold">S</span>
              </div>
              <span className="font-bold text-xl text-gradient">SharePort</span>
            </Link>
            <p className="mt-4 text-gray-600 text-sm">
              The platform for college students to rebuy, rent, and share items, services, and subscriptions.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-shareport-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-shareport-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-shareport-purple transition-colors">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-shareport-purple">Home</Link></li>
              <li><Link to="/rebuy" className="text-gray-600 hover:text-shareport-purple">Rebuy</Link></li>
              <li><Link to="/rent" className="text-gray-600 hover:text-shareport-purple">Rent</Link></li>
              <li><Link to="/share" className="text-gray-600 hover:text-shareport-purple">Share</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-shareport-purple">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-shareport-purple">Safety Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-shareport-purple">Community Guidelines</a></li>
              <li><a href="#" className="text-gray-600 hover:text-shareport-purple">Contact Us</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-600 text-sm mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-l-md rounded-r-none border-r-0 focus:ring-0"
              />
              <Button className="rounded-l-none purple-gradient">
                <Send size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">© 2025 SharePort. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-500 hover:text-shareport-purple">Terms</a>
            <a href="#" className="text-sm text-gray-500 hover:text-shareport-purple">Privacy</a>
            <a href="#" className="text-sm text-gray-500 hover:text-shareport-purple">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
