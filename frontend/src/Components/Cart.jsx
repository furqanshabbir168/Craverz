import { Check, Plus, Minus, Trash, ShoppingBag } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(ShopContext);
  const navigate = useNavigate();


  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShoppingBag size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          Your cart is empty
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t added anything yet.
        </p>
        <Link
          to="/shop"
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Go to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {/* Banner */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-2 rounded-lg mb-4">
        <Check />
        <p className="text-sm">
          Delivery charges and taxes will be calculated at checkout.
        </p>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2 mb-2">
        <p>Image</p>
        <p>Name</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>

      {/* Cart Items */}
      <div className="space-y-4">
        {cart.map((food) => (
          <div
            key={food.id}
            className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border p-4 rounded-lg shadow-sm"
          >
            {/* Mobile Layout (card style) */}
            <div className="flex md:hidden w-full gap-4">
              <img
                src={food.img}
                alt={food.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex flex-col justify-between w-full">
                <div>
                  <p className="font-semibold">{food.name}</p>
                  <p className="text-gray-600 text-sm">Price: ${food.price}</p>
                  <p className="text-gray-600 text-sm">
                    Total: ${food.price * food.quantity}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decreaseQty(food.id)}
                      className="p-1 border rounded hover:bg-gray-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2">{food.quantity}</span>
                    <button
                      onClick={() => increaseQty(food.id)}
                      className="p-1 border rounded hover:bg-gray-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(food.id)}
                    className="p-1 hover:text-red-500 cursor-pointer"
                  >
                    <Trash onClick={()=>{toast.success("Food removed from cart")}} className="cursor-pointer"/>
                  </button>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <img
              src={food.img}
              alt={food.name}
              className="hidden md:block w-20 h-20 rounded-lg object-cover"
            />
            <p className="hidden md:block">{food.name}</p>
            <p className="hidden md:block">${food.price}</p>
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => decreaseQty(food.id)}
                className="p-1 border rounded hover:bg-gray-200"
              >
                <Minus size={16} />
              </button>
              <span className="px-2">{food.quantity}</span>
              <button
                onClick={() => increaseQty(food.id)}
                className="p-1 border rounded hover:bg-gray-200"
              >
                <Plus size={16} />
              </button>
            </div>
            <p className="hidden md:block">${food.price * food.quantity}</p>
            <button
              onClick={() => removeFromCart(food.id)}
              className="hidden md:block p-1 hover:text-red-500 cursor-pointer"
            >
              <Trash onClick={()=>{toast.success("Food removed from cart")}} className="cursor-pointer"/>
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mt-6">
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Coupon Code..."
            className="border p-2 rounded w-full md:w-auto"
          />
          <button
            onClick={() =>
              toast.success("Coupon feature coming soon — stay tuned!")
            }
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full md:w-auto cursor-pointer"
          >
            Apply Coupon
          </button>
        </div>
        <div className="w-full md:w-auto">
          <button onClick={()=>{navigate('/shop')}} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 w-full md:w-auto cursor-pointer">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
