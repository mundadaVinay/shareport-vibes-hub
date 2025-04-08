
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import ListingDetailsPage from "./pages/ListingDetailsPage";
import RebuyCategoryPage from "./pages/RebuyCategoryPage";
import RentCategoryPage from "./pages/RentCategoryPage";
import ShareCategoryPage from "./pages/ShareCategoryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="listing/:id" element={<ListingDetailsPage />} />
            <Route path="rebuy" element={<RebuyCategoryPage />} />
            <Route path="rent" element={<RentCategoryPage />} />
            <Route path="share" element={<ShareCategoryPage />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
