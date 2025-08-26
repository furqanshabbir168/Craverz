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
import AdminPage from "./Pages/AdminPage";

// Account Layout & Protected Pages
import AccountLayout from "./Components/AccountLayout";
import Dashboard from "./Components/DashBoard";
import Profile from "./Components/Profile";
import Cart from "./Components/Cart";
import NotFound from "./Components/NotFound";

// Admin Layout & Protected Pages
import AdminLayout from "./Components/AdminLayout";
import AdminDashboard from "./Components/AdminDashboard";
import AddFood from "./Components/AddFood";
import ListedFood from "./Components/ListedFood";
import Checkout from "./Components/Checkout";
import Orders from "./Components/Orders";
// import ManageUsers from "./Components/ManageUsers";
// add more admin components if needed

function App() {
  const location = useLocation();
  const { token, loadingToken, adminToken, loadingAdminToken } =
    useContext(ShopContext);
  const [loading, setLoading] = useState(false);

  // Detect current section
  const isAccountRoute = location.pathname.startsWith("/myaccount");
  const isAdminRoute = location.pathname.startsWith("/myadmin");

  // Loader on route change
  useEffect(() => {
    if (loadingToken || loadingAdminToken) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1500); 
    return () => clearTimeout(timer);
  }, [location, loadingToken, loadingAdminToken]);

  if (loadingToken || loadingAdminToken) return null;

  return (
    <div>
      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "#1d3557", color: "#fff" },
          success: { iconTheme: { primary: "#4ade80", secondary: "#fff" } },
          error: { iconTheme: { primary: "#f87171", secondary: "#fff" } },
        }}
      />

      {/* Loader */}
      {loading && <Loader />}

      {/* NavBar only on public routes */}
      {!isAccountRoute && !isAdminRoute && <NavBar />}
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="*" element={<NotFound />} />

        {/* User Auth Page (login/signup) */}
        {!token && <Route path="/account" element={<MyAccount />} />}

        {/* Protected User Routes */}
        <Route
          path="/myaccount"
          element={token ? <AccountLayout /> : <Navigate to="/account" />}
        >
          <Route path="/myaccount/dashboard" element={<Dashboard />} />
          <Route path="/myaccount/profile" element={<Profile />} />
          <Route path="/myaccount/cart" element={<Cart />} />
          <Route path="/myaccount/checkout" element={<Checkout/>}/>
          <Route path="/myaccount/orders" element={<Orders/>}/>
        </Route>

        {/* Protected Admin Routes */}
        <Route
          path="/myadmin"
          element={adminToken ? <AdminLayout /> : <Navigate to="/admin" />}
        >
          <Route path="/myadmin/dashboard" element={<AdminDashboard />} />
          <Route path="/myadmin/additems" element={<AddFood/>}/>
          <Route path="/myadmin/listitems" element={<ListedFood/>}/>
          {/* add more admin subroutes here */}
        </Route>
      </Routes>

      {/* Footer only on public routes */}
      {!isAccountRoute && !isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
