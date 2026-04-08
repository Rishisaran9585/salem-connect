import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Categories from "./pages/Categories";
import CategoryPage from "./pages/CategoryPage";
import BusinessDetail from "./pages/BusinessDetail";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import About from "./pages/About";
import SearchResults from "./pages/SearchResults";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBusinesses from "./pages/admin/AdminBusinesses";
import AdminPending from "./pages/admin/AdminPending";
import AdminCategories from "./pages/admin/AdminCategories";
import AdminContacts from "./pages/admin/AdminContacts";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminHero from "./pages/admin/AdminHero";
import AdminSettings from "./pages/admin/AdminSettings";
import ScrollToTop from "./components/layout/ScrollToTop";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/business/:slug" element={<BusinessDetail />} />

          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="hero" element={<AdminHero />} />
            <Route path="businesses" element={<AdminBusinesses />} />
            <Route path="businesses/pending" element={<AdminPending />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
