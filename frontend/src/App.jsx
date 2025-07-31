import { Route, Routes, useLocation } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Home from "./Pages/Home";
import { useEffect } from "react";
import { useState } from "react";
import AboutPage from "./Pages/About";
import Footer from "./Components/Footer";
import Shop from "./Pages/Shop";
import MenuPage from "./Pages/MenuPage";
import ScrollToTop from "./Components/ScrollToTop";
import Loader from "./Components/Loader";
import GalleryPage from "./Pages/GalleryPage";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import Reservation from "./Pages/Reservation";
import FAQ from "./Pages/FAQ";
import MyAccount from "./Pages/MyAccount";
import Contact from "./Pages/Contact";
import BlogPage from "./Pages/BlogPage";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // Shorter & smoother
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1d3557", // dark blue (or any color)
            color: "#fff", // white text
          },
          success: {
            iconTheme: {
              primary: "#4ade80", // green
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171", // red
              secondary: "#fff",
            },
          },
        }}
      />
      {loading && <Loader />}
      <NavBar />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/account" element={<MyAccount />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
