import {
  Search,
  Bell,
  DollarSign,
  ShoppingBag,
  Utensils,
  Star,
} from "lucide-react";
import dp from "../assets/profile.png";
import DashboardPieCharts from "./DashboardPieCharts";
import { useState , useEffect, useContext} from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";

function AdminDashboard() {
  const {url} = useContext(ShopContext);
  const [ todayRevenue , setTodayRevenue ] = useState();
  const [ todayOrders , setTodayOrders ] = useState();
  const [ todayReservations , setTodayReservation ] = useState();
  const [ totalDishes , setTotalDishes ] = useState();
  ////
  useEffect(() => {
  const fetchStats = async () => {
    try {
      const { data } = await axios.get(`${url}/api/order/today-stats`);
      setTodayRevenue(data.todayRevenue);
      setTodayOrders(data.todayOrders);

      const { data: reservationData } = await axios.get(`${url}/api/reservation/today-reservations`);
      setTodayReservation(reservationData.todayReservations);

      const { data : dishesData } = await axios.get(`${url}/api/food/total`);
      setTotalDishes(dishesData.totalDishes);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };
  fetchStats();
}, [url]);


  return (
    <div className="flex flex-col w-full bg-gray-50">
      {/* Top Navbar */}
      <div className="flex flex-row justify-between items-center p-4 bg-white shadow-md">
        {/* Welcome */}
        <h1 className="text-xl font-bold text-gray-800">Welcome, Furqan</h1>

        {/* Search (hidden on mobile) */}
        <div className="hidden md:flex items-center border rounded-lg px-2 py-1 bg-gray-100">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="search"
            placeholder="Search"
            className="ml-2 bg-transparent focus:outline-none text-sm"
          />
        </div>

        {/* Right Side */}
        <div className="flex flex-row items-center gap-4">
          <div className="border rounded-full p-2 hover:bg-gray-100 cursor-pointer">
            <Bell className="w-5 h-5 text-gray-600" />
          </div>
          <img
            src={dp}
            alt="profile"
            className="w-10 h-10 rounded-full border"
          />
          <div className="flex flex-col text-sm">
            <p className="font-semibold">Furqan Shabbir</p>
            <p className="text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
        {/* Revenue Card */}
        <div className="bg-green-600 rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl">
            <DollarSign className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-white">Today's Revenue</p>
            <h2 className="text-xl font-bold text-white">$ {todayRevenue}</h2>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-pink-500 rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl">
            <ShoppingBag className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-white">Today's Orders</p>
            <h2 className="text-xl font-bold text-white">{todayOrders}</h2>
          </div>
        </div>

        {/* Dishes Sold Card */}
        <div className="bg-blue-600 rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl">
            <Star className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-white">Today's Reservations</p>
            <h2 className="text-xl font-bold text-white">{todayReservations}</h2>
          </div>
        </div>

        {/* Reviews Card */}
        <div className="bg-amber-600 rounded-2xl shadow-md p-4 flex items-center gap-4">
          <div className="bg-red-100 p-3 rounded-xl">
            <Utensils className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-white">Listed Dishes</p>
            <h2 className="text-xl font-bold text-white">{totalDishes}</h2>
          </div>
        </div>
      </div>
      {/* Right side: Pie Chart */}
      <DashboardPieCharts />

      {/* Right side: Pie Chart */}
      <div className="mt-6 text-center text-gray-700 text-sm">
        Keep running <span className="font-semibold text-red-600">Cravez</span>{" "}
        smoothly! If anything seems off on the site, contact the{" "}
        <a
          href="https://furqandev-ruby.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-red-600 font-semibold underline"
        >
          Developer of CraveZ
        </a>
        .
      </div>
    </div>
  );
}

export default AdminDashboard;
