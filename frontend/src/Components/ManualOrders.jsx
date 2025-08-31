import { useState, useContext } from "react";
import { Utensils, Search, Plus, Minus, Trash2 } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import axios from "axios";

function ManualOrders() {
  const { food , url } = useContext(ShopContext);
  const [orderType, setOrderType] = useState("Dine-in");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
  const [category, setCategory] = useState("Pizzas");
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);

  // filter menu by search
  const searchedFood = food.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // cart functions
  const addToCart = (item) => {
    const exists = cart.find((i) => i._id === item._id);
    if (exists) {
      setCart(
        cart.map((i) => (i._id === item._id ? { ...i, qty: i.qty + 1 } : i))
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
      toast.success(`${item.name} added to order!`);
    }
  };

  const updateQty = (_id, action) => {
    setCart(
      cart.map((i) =>
        i._id === _id
          ? {
              ...i,
              qty: action === "inc" ? i.qty + 1 : Math.max(i.qty - 1, 1),
            }
          : i
      )
    );
  };

  const removeFromCart = (_id) => {
    setCart(cart.filter((i) => i._id !== _id));
  };

  const totalPrice = cart.reduce((acc, i) => acc + i.price * i.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast.error("Please add at least one item to the order!");
      return;
    }

    const orderData = {
      orderType,
      paymentMethod,
      items: cart,
      amount: totalPrice, 
      paymentStatus: "Paid",
    };

    try {
      setLoading(true);
      const res = await axios.post(`${url}/api/order/manual`, orderData);
      if (res.data.success) {
        toast.success("Manual order submitted!");
        setCart([]); // reset cart
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* FORM SECTION */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full lg:w-1/3 bg-gray-100 p-6 rounded-2xl shadow-md"
      >
        <label className="text-sm font-semibold text-gray-700 mb-1">
          Order Type
        </label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="Dine-in">Dine-in</option>
          <option value="Takeaway">Takeaway</option>
        </select>

        <label className="text-sm font-semibold text-gray-700 mb-1">
          Payment Method
        </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Stripe">Stripe</option>
        </select>

        <label className="text-sm font-semibold text-gray-700">
          Total Price
        </label>
        <p className="text-sm font-semibold text-gray-700 mb-1 border border-red-400 p-2.5 rounded-md">
          ${totalPrice}
        </p>

        <button
          type="submit"
          disabled={loading}
          className={`py-2 rounded-md transition text-white cursor-pointer ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* FOOD MENU SECTION */}
      <div className="w-full lg:w-2/3 bg-gray-100 p-6 rounded-2xl shadow-md">
        <div className="flex items-center gap-4 text-red-500 mb-4">
          <Utensils className="w-6 h-6" />
          <p className="text-xl font-semibold text-gray-800">Select Food</p>
          <Utensils className="w-6 h-6" />
        </div>

        {/* Search Bar */}
        <div className="flex flex-col gap-3 mb-6">
          <label className="text-lg font-semibold text-gray-700">
            Search Food
          </label>
          <div className="relative">
            <input
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by item name..."
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <Search className="absolute top-2.5 left-3 text-gray-500 w-5 h-5" />
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-3 mb-6">
          <p className="text-lg font-semibold text-gray-700">Select Category</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
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

        {/* Products (4 per row, small cards, no image) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {searchedFood
            .filter((item) => item.category === category)
            .map((product, index) => {
              const inCart = cart.find((i) => i._id === product._id);
              return (
                <motion.div
                  key={product._id}
                  className="bg-white shadow-md rounded-lg p-3 flex flex-col items-center text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.1 + index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <h3 className="text-sm font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-red-500 font-bold text-sm mt-1">
                    ${product.price}
                  </p>

                  {!inCart ? (
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-2 px-3 py-1 text-xs font-medium rounded-full bg-red-500 text-white hover:bg-red-600 transition cursor-pointer"
                    >
                      Add
                    </button>
                  ) : (
                    <div className="flex items-center gap-1 mt-2">
                      <button
                        onClick={() => updateQty(product._id, "dec")}
                        className="p-1 bg-gray-200 rounded cursor-pointer"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="px-2 text-sm">{inCart.qty}</span>
                      <button
                        onClick={() => updateQty(product._id, "inc")}
                        className="p-1 bg-gray-200 rounded cursor-pointer"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="p-1 bg-red-500 text-white rounded cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ManualOrders;
