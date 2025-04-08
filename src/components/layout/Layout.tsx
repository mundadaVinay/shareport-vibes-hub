
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToast } from "@/hooks/use-toast";

const Layout = () => {
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => {
      setIsLoaded(true);
      toast({
        title: "Welcome to SharePort!",
        description: "Connect, share, and save with your college community.",
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
