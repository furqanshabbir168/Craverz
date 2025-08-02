import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import ScrollToTop from "./Components/ScrollToTop";
import Loader from "./Components/Loader";
import { Toaster } from "react-hot-toast";
import { ShopContext } from "./Context/ShopContext";

// Public Pages
import Home from "./Pages/Home";
import AboutPage from "./Pages/About";
import Shop from "./Pages/Shop";
import MenuPage from "./Pages/MenuPage";
import GalleryPage from "./Pages/GalleryPage";
import Services from "./Pages/Services";
import Testimonials from "./Pages/Testimonials";
import Reservation from "./Pages/Reservation";
import FAQ from "./Pages/FAQ";
import Contact from "./Pages/Contact";
import BlogPage from "./Pages/BlogPage";
import MyAccount from "./Pages/MyAccount";

// Account Layout & Protected Pages
import AccountLayout from "./Components/AccountLayout";
import Dashboard from "./Components/DashBoard";
import Profile from "./Components/Profile";

// import more account pages here as needed

function App() {
  const location = useLocation();
  const { token, loadingToken } = useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  // Check if current route is /myaccount or its subroutes
  const isAccountRoute = location.pathname.startsWith("/myaccount");

  // Show loader on route change
  useEffect(() => {
    if (loadingToken) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 3000); // shorter loader
    return () => clearTimeout(timer);
  }, [location, loadingToken]);

  if (loadingToken) return null;

  return (
    <div>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1d3557",
            color: "#fff",
          },
          success: {
            iconTheme: {
              primary: "#4ade80",
              secondary: "#fff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f87171",
              secondary: "#fff",
            },
          },
        }}
      />

      {/* Loader */}
      {loading && <Loader />}

      {/* NavBar and Footer only on public routes */}
      {!isAccountRoute && <NavBar />}
      <ScrollToTop />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/reservations" element={<Reservation />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<BlogPage />} />

        {/* Auth Page (login/signup) */}
        {!token && <Route path="/account" element={<MyAccount />} />}

        {/* Protected Account Routes */}
        <Route
          path="/myaccount"
          element={token ? <AccountLayout /> : <Navigate to="/account" />}
        >
          <Route path="/myaccount/dashboard" element={<Dashboard/>}/>
          <Route path="/myaccount/profile" element={<Profile/>}/>
        </Route>
      </Routes>

      {/* Footer on public routes only */}
      {!isAccountRoute && <Footer />}
    </div>
  );
}

export default App;
