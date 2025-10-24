import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "@/components/site/Layout";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import SignUp from "@/pages/SignUp";
import Team from "@/pages/Team";
import FAQ from "@/pages/FAQ";
import Lessons from "@/pages/Lessons";
import Checkout from "@/pages/Checkout";
import Success from "@/pages/Success";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Index />} />
              <Route path="contact" element={<Contact />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="about" element={<About />} />
              <Route path="cart" element={<Cart />} />
              <Route path="team" element={<Team />} />
              <Route path="faq" element={<FAQ />} />
              <Route path="lessons" element={<Lessons />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="success" element={<Success />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </TooltipProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
