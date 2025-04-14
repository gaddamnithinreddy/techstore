import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from 'react';
import ErrorBoundary from "./components/ErrorBoundary";
import Layout from "./components/Layout";
import { CartProvider } from "./context/CartContext";
import { useEffect } from "react";
import { AnimatePresence } from 'framer-motion';
import LoadingSpinner from "@/components/LoadingSpinner";

// Lazy load components
const Index = lazy(() => import("./pages/Index"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Account = lazy(() => import("./pages/Account"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Configure React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// ScrollHandler component that handles scrolling to top on every route change
const ScrollHandler = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Use window.scroll instead of scrollTo to ensure better compatibility
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
    
    // Clear any existing toasts when route changes
    sessionStorage.setItem('hasShownWelcome', 'true');
  }, [pathname]);
  
  return null;
};

// Loading component
const PageLoader = () => (
  <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
    <LoadingSpinner size="lg" />
  </div>
);

// Entry point
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          {/* Single toast provider */}
          <Toaster />
          <BrowserRouter>
            <ScrollHandler />
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={
                    <Suspense fallback={<PageLoader />}>
                      <Index />
                    </Suspense>
                  } />
                  <Route path="/products" element={
                    <Suspense fallback={<PageLoader />}>
                      <Products />
                    </Suspense>
                  } />
                  <Route path="/product/:id" element={
                    <Suspense fallback={<PageLoader />}>
                      <ProductDetail />
                    </Suspense>
                  } />
                  <Route path="/cart" element={
                    <Suspense fallback={<PageLoader />}>
                      <Cart />
                    </Suspense>
                  } />
                  <Route path="/about" element={
                    <Suspense fallback={<PageLoader />}>
                      <About />
                    </Suspense>
                  } />
                  <Route path="/contact" element={
                    <Suspense fallback={<PageLoader />}>
                      <Contact />
                    </Suspense>
                  } />
                  <Route path="/account" element={
                    <Suspense fallback={<PageLoader />}>
                      <Account />
                    </Suspense>
                  } />
                  <Route path="/wishlist" element={
                    <Suspense fallback={<PageLoader />}>
                      <Wishlist />
                    </Suspense>
                  } />
                  <Route path="*" element={
                    <Suspense fallback={<PageLoader />}>
                      <NotFound />
                    </Suspense>
                  } />
                </Route>
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
