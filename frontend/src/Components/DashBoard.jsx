import { HelpCircle, Settings, Bell } from "lucide-react";
import profilepic from "../assets/dp.jpg";
import PopularFoods from "../assets/PopularFoods";
import BestSellingFood from "../assets/BestSellingFood";
import bg from "../assets/dash.jpg";
import bike from "../assets/del-boy.png";
import { useNavigate } from "react-router-dom";
import { useContext, useState , useEffect} from "react";
import axios from 'axios'
import { ShopContext } from "../Context/ShopContext";
import toast from 'react-hot-toast'

function Dashboard() {
  const [ name , setName ] = useState("null");
  const navigate = useNavigate();
  const { token , url } = useContext(ShopContext);

   // Fetch user profile when dashboard mounts
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${url}/api/user/profile`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (res.data.success) {
          setName(res.data.user.name); // only take name
        } else {
          console.log("Profile error:", res.data.message);
        }
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };

    if (token) {
      fetchProfile();
    }
  }, [token, url]);


  return (
    <div className="p-4 bg-white flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center justify-between mb-4">
        {/* Left - Greeting */}
        <div>
          <h1 className="text-xl font-bold text-gray-800 items-center">Hello, {name || 'Guest'}</h1>
          <p className="text-sm text-red-600">What would you eat today?</p>
        </div>

        {/* Right - Icons + Profile */}
        <div className="flex items-center gap-3">
          <HelpCircle onClick={()=>{navigate('/contact')}} className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          <Settings onClick={()=>{toast.success("This feature is on the way — stay tuned!")}} className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-900" />
          <div className="relative cursor-pointer">
            <Bell onClick={()=>{toast.success("This feature is on the way — stay tuned!")}} className="w-5 h-5 text-gray-600 hover:text-gray-900" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <img
            src={profilepic}
            alt="profile"
            onClick={()=>{navigate('/myaccount/profile')}}
            className="w-9 h-9 rounded-full border border-gray-200 cursor-pointer"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col gap-3">
        {/* Banner */}
        <div
          className="flex h-50 md:h-52 items-center justify-around rounded-xl px-5 py-2 bg-cover bg-center shadow-md"
          style={{ backgroundImage: `url(${bg})` }}
        >
          {/* Left Side - Text */}
          <div className="max-w-sm">
            <h1 className="text-2xl font-extrabold text-red-600 leading-snug">
              Get up to 50% OFF on your First Order!
            </h1>
            <button onClick={()=>{navigate('/shop')}} className="mt-2 px-4 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg shadow hover:bg-red-600 transition cursor-pointer">
              Order Now
            </button>
          </div>

          {/* Right Side - Image */}
          <div className="hidden sm:block">
            <img
              src={bike}
              alt="Delivery Boy"
              className="w-50 h-auto drop-shadow-lg"
            />
          </div>
        </div>

        {/* Popular Foods */}
        <div className="bg-white rounded-xl p-0">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Popular Foods
          </h2>
          <div onClick={()=>{navigate('/shop')}} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {PopularFoods.map((food) => (
              <div
                key={food.id}
                className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border-4 border-red-100 p-1"
              >
                <img
                  src={food.img}
                  alt={food.title}
                  className="w-25 h-25 object-cover rounded-full mx-auto mt-2 border-4 border-red-100 p-1"
                />
                <p className="text-center text-gray-700 text-sm font-medium py-1">
                  {food.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Best Selling Foods */}
        <div className="bg-white rounded-xl p-0">
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Best Selling Foods
          </h2>
          <div onClick={()=>{navigate('/shop')}} className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {BestSellingFood.map((food) => (
              <div
                key={food.id}
                className="bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer border-4 border-red-100 p-1"
              >
                <img
                  src={food.img}
                  alt={food.title}
                  className="w-25 h-25 object-cover rounded-full mx-auto mt-2 border-4 border-red-100 p-1"
                />
                <p className="text-center text-gray-700 text-sm font-medium py-1">
                  {food.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
