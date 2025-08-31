import { Utensils, Search, Check } from "lucide-react";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function MenuSection() {
  const { food, addToCart, cart } = useContext(ShopContext);
  const [category, setCategory] = useState("Pizzas");
  const [searchTerm, setSearchTerm] = useState("");

  const searchedFood = food.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // check if food already in cart
  const isInCart = (_id) => cart.some((item) => item._id === _id);

  return (
    <div className="bg-gray-100">
      <div className="flex flex-col items-center px-4 py-10 mx-auto max-w-6xl bg-gray-100">
        {/* Section Heading */}
        <div className="flex items-center gap-4 text-red-500 mb-4">
          <Utensils className="w-6 h-6" />
          <p className="text-xl font-semibold text-gray-800">Cravez Menu</p>
          <Utensils className="w-6 h-6" />
        </div>
        <motion.h2
          className="text-3xl font-bold text-gray-800 mb-10 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          Explore Our Menu
        </motion.h2>

        {/* Search + Categories Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search Box */}
          <div className="flex flex-col gap-3">
            <label
              htmlFor="search"
              className="text-lg font-semibold text-gray-700"
            >
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
            <p className="text-lg font-semibold text-gray-700">
              Select Category
            </p>
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
                  onClick={() => {
                    setCategory(cat);
                  }}
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

        {/* Products */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-6 w-full px-2 mt-8">
          {searchedFood
            .filter((item) => item.category === category)
            .map((product, index) => {
              const added = isInCart(product._id);
              return (
                <motion.div
                  key={product._id}
                  className="bg-white shadow-md rounded-xl p-4 flex flex-col items-center text-center w-full sm:w-60 max-w-[270px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.5,
                    ease: "easeOut",
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-30 h-30 object-cover rounded-full border-4 border-red-100 shadow-sm"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <p className="text-red-500 font-bold text-base mt-2">
                    ${product.price}
                  </p>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => {
                      if (!added) {
                        addToCart(product);
                        toast.success("Food added to cart!");
                      }
                    }}
                    className={`mt-2.5 px-6 py-3 font-medium rounded-full transition cursor-pointer flex items-center gap-2
                      ${
                        added
                          ? "bg-green-500 text-white hover:bg-green-600"
                          : "bg-red-500 text-white hover:bg-red-600"
                      }`}
                  >
                    {added ? <Check size={18} /> : null}
                    {added ? "Added" : "Add to Cart"}
                  </button>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MenuSection;
