import { useContext } from "react";
import bg from "../assets/menu-bg.jpeg";
import { Utensils } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import pizzaone from "../assets/pizza-1.jpeg";
import burgerandsandwichone from "../assets/burger-and-sandwich-1.avif";
import wingsandnuggone from "../assets/wings-and-nugg-1.jpg";
import pastaone from "../assets/pasta-1.jpg";
import friedriceone from "../assets/fried-rice-1.jpg";
import noodlesone from "../assets/noodles-1.webp";
import wrapone from "../assets/wrap-1.webp";
import friesone from "../assets/fries-1.webp";
import drinkone from "../assets/drink-1.jpg";
import dessertone from "../assets/dessert-1.jpg";
import { Link } from "react-router-dom";

function MenuBanner() {
  const { Menu } = useContext(ShopContext);

  const categories = [
    { name: "Pizzas", image: pizzaone },
    { name: "Burgers & Sandwiches", image: burgerandsandwichone },
    { name: "Wings & Nuggets", image: wingsandnuggone },
    { name: "Pasta", image: pastaone },
    { name: "Fried Rice & Chinese", image: friedriceone },
    { name: "Noodles & Chow Mein", image: noodlesone },
    { name: "Wraps & Rolls", image: wrapone },
    { name: "Sides & Snacks", image: friesone },
    { name: "Drinks & Shakes", image: drinkone },
    { name: "Desserts", image: dessertone },
  ];

  return (
    <div className="bg-gray-200">
      <div className="flex flex-col items-center p-4 mx-auto max-w-6xl gap-5 bg-gray-200">
        <div className="flex items-center gap-4 text-red-500 mb-2">
          <Utensils className="w-6 h-6" />
          <p className="text-xl font-semibold text-gray-800">Best Food</p>
          <Utensils className="w-6 h-6" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Our Food Menu
        </h2>

        {categories.map((category, index) => {
          const items = Menu.filter((item) => item.category === category.name);
          const isImageRight = index % 2 === 0;

          return (
            <div key={category.name} className="w-full">
              <h3
                className={`text-2xl font-bold text-red-500 mb-6 w-full ${
                  isImageRight ? "text-left" : "text-right"
                }`}
              >
                {category.name}
              </h3>

              <div
                className={`flex flex-col-reverse lg:flex-row gap-8 w-full items-center ${
                  !isImageRight ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className="flex flex-col gap-4 w-full lg:w-1/2">
                  {items.map((food, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between bg-white shadow p-3 rounded-md"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={food.img}
                          alt={food.name}
                          className="w-12 h-12 object-cover rounded-full border"
                        />
                        <p className="text-gray-800 font-medium">{food.name}</p>
                      </div>
                      <p className="text-red-500 font-semibold text-lg">
                        ${food.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div
                  className={`relative w-full lg:w-1/2 h-72 flex flex-col lg:flex-row items-center justify-center text-center bg-black/60 bg-cover gap-5 ${
                    isImageRight
                      ? "bg-left rounded-l-full"
                      : "bg-right rounded-r-full"
                  }`}
                  style={{ backgroundImage: `url(${bg})` }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-28 h-28 sm:w-44 sm:h-44 object-cover rounded-full border-4 border-white shadow-xl"
                  />
                  <Link to="/shop">
                    <button className="px-6 py-3 bg-red-500 text-white font-medium rounded-full hover:bg-red-600 transition self-center cursor-pointer">
                      Shop Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MenuBanner;
