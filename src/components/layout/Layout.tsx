
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useToast } from "@/hooks/use-toast";
import ThemeSwitcher from "../ui/ThemeSwitcher";

const Layout = () => {
  const { toast } = useToast();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for system preference or saved theme
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    
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
      <div className="fixed bottom-6 right-6 z-50">
        <ThemeSwitcher />
      </div>
      <main className={`flex-1 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
