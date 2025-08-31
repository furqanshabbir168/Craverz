import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Utensils, Search, Trash2 } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

function ListedFood() {
  const { food, url, fetchFood } = useContext(ShopContext);
  const [category, setCategory] = useState("Pizzas");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter by search + category
  const filteredFood = food.filter(
    (item) =>
      item.category === category &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete handler
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this food?")) return;

    try {
      const res = await axios.delete(`${url}/api/food/delete`, { data : {id} });

      if (res.data.success) {
        toast.success("Food deleted successfully!");
        fetchFood(); // 🔑 reload from backend
      } else {
        toast.error(res.data.message || "Failed to delete food");
      }
    } catch (error) {
      console.error("Delete food error:", error);
      toast.error(error.response?.data?.message || "Server error while deleting");
    }
  };

  return (
    <div className="flex flex-col p-4">
      {/* Heading */}
      <div className="flex items-center justify-center gap-4 text-red-500 mb-6">
        <Utensils className="w-6 h-6" />
        <p className="text-2xl font-bold text-gray-800">Manage Food Items</p>
        <Utensils className="w-6 h-6" />
      </div>

      {/* Search + Categories */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Search Box */}
        <div className="flex flex-col gap-3">
          <label htmlFor="search" className="text-lg font-semibold text-gray-700">
            Search Food
          </label>
          <div className="relative">
            <input
              type="search"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by item name..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <Search className="absolute top-2.5 left-3 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {/* Category List */}
        <div className="flex flex-col gap-3">
          <p className="text-lg font-semibold text-gray-700">Select Category</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2">
            {[
              "Pizzas",
              "Burgers & Sandwiches",
              "Wings & Nuggets",
              "Pasta",
              "Fried Rice & Chinese",
              "Noodles & Chow Mein",
              "Wraps & Rolls",
              "Sides & Snacks",
              "Drinks & Shakes",
              "Desserts",
            ].map((cat, index) => (
              <span
                key={index}
                onClick={() => setCategory(cat)}
                className={`px-3 py-2 text-sm rounded-lg border cursor-pointer transition
                  ${
                    category === cat
                      ? "bg-red-400 text-white border-red-400"
                      : "bg-white text-gray-700 hover:bg-red-200"
                  }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Table Header */}
      <div className="hidden md:grid grid-cols-5 font-semibold border-b pb-2 mb-2 text-gray-700">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      {/* Food Items */}
      <div className="flex flex-col gap-4">
        {filteredFood.length > 0 ? (
          filteredFood.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:grid md:grid-cols-5 items-center gap-4 p-4 border rounded-lg shadow-sm hover:shadow-md transition"
            >
              {/* Mobile / Card Layout */}
              <div className="flex md:hidden w-full gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border-4 border-red-400"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-gray-600 text-sm">Price: ${item.price}</p>
                    <p className="text-gray-600 text-sm">{item.category}</p>
                  </div>
                  <div className="flex justify-end mt-2">
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="p-2 hover:text-red-500 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5 cursor-pointer" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Layout */}
              <img
                src={item.image}
                alt={item.name}
                className="hidden md:block w-20 h-20 rounded-lg object-cover border-4 border-red-400"
              />
              <p className="hidden md:block">{item.name}</p>
              <p className="hidden md:block">${item.price}</p>
              <p className="hidden md:block">{item.category}</p>
              <button
                onClick={() => handleDelete(item._id)}
                className="hidden md:flex justify-center items-center text-red-500 hover:text-red-700 transition cursor-pointer"
              >
                <Trash2 className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-6">
            No food found for this category.
          </p>
        )}
      </div>
    </div>
  );
}

export default ListedFood;
