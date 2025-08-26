import { useState } from "react";
import food from "../assets/food.svg";
import upload from "../assets/upload.png";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";

function AddFood() {
  const {url} = useContext(ShopContext);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    category: "Pizzas",
    price: "",
    isPopular: false,
    isBestSeller: false,
  });

  function onChangeHandle(event) {
    const { name, value, type, checked } = event.target;
    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function onSubmitHandle(event) {
  event.preventDefault();

  if (!image) {
    toast.error("Please upload an image!");
    return;
  }

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("price", Number(data.price));
  formData.append("isPopular", data.isPopular);
  formData.append("isBestSeller", data.isBestSeller);
  formData.append("image", image);

  try {
    setLoading(true); // start loading

    const response = await axios.post(`${url}/api/food/add`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    toast.success(response.data.message);

    // Reset form
    setData({
      name: "",
      description: "",
      category: "Pizzas",
      price: "",
      isPopular: false,
      isBestSeller: false,
    });
    setImage(null);
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false); // stop loading
  }
}


  return (
    <div className="flex flex-col items-center px-4 py-4 bg-gray-100 relative">
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 max-w-5xl w-full">
        {/* Form Section */}
        <form
          className="flex flex-col gap-4 w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md"
          onSubmit={onSubmitHandle}
        >
          {/* Upload Image */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </p>
            <label
              htmlFor="image"
              className="cursor-pointer border-2 border-dashed border-gray-300 rounded-xl p-4 flex justify-center items-center hover:border-red-400 transition"
            >
              <img
                src={image ? URL.createObjectURL(image) : upload}
                alt="upload"
                className="w-25 h-25 object-cover"
              />
            </label>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              name="image"
              hidden
            />
          </div>

          {/* Name */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Name</p>
            <input
              type="text"
              placeholder="Pepperoni Pizza"
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              name="name"
              value={data.name}
              onChange={onChangeHandle}
            />
          </div>

          {/* Description */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">
              Description
            </p>
            <textarea
              placeholder="Spicy pepperoni with mozzarella cheese"
              rows={3}
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              name="description"
              value={data.description}
              onChange={onChangeHandle}
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Category</p>
            <select
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              name="category"
              value={data.category}
              onChange={onChangeHandle}
            >
              <option value="Pizzas">Pizzas</option>
              <option value="Burgers & Sandwiches">Burgers & Sandwiches</option>
              <option value="Wings & Nuggets">Wings & Nuggets</option>
              <option value="Pasta">Pasta</option>
              <option value="Fried Rice & Chinese">Fried Rice & Chinese</option>
              <option value="Noodles & Chow Mein">Noodles & Chow Mein</option>
              <option value="Wraps & Rolls">Wraps & Rolls</option>
              <option value="Sides & Snacks">Sides & Snacks</option>
              <option value="Drinks & Shakes">Drinks & Shakes</option>
              <option value="Desserts">Desserts</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-1">Price</p>
            <input
              type="number"
              placeholder="100$"
              className="border border-gray-300 w-full p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              required
              name="price"
              value={data.price}
              onChange={onChangeHandle}
            />
          </div>

          {/* Best Seller & Popular */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="accent-red-500"
                name="isBestSeller"
                checked={data.isBestSeller}
                onChange={onChangeHandle}
              />
              Is Best Seller
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                className="accent-red-500"
                name="isPopular"
                checked={data.isPopular}
                onChange={onChangeHandle}
              />
              Is Popular
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-red-500 text-white py-2 rounded-md transition ${
              loading
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-600 cursor-pointer"
            }`}
          >
            {loading
              ? "Please wait..."
              : "Add Food"}
          </button>
        </form>

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img src={food} alt="food" className="w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default AddFood;
