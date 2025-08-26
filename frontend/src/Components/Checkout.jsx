import { Check, Wallet } from "lucide-react";
import { FaStripe } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import { ShopContext } from "../Context/ShopContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const { cart, url, token, clearCart } = useContext(ShopContext);
  const navigate = useNavigate();

  // Calculate totals
  const subtotal = cart.reduce(
    (acc, food) => acc + food.price * food.quantity,
    0
  );
  const delivery = 5;
  const total = subtotal + delivery;

  // Handle address input
  function handleAddressChange(e) {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  }

  // Place order
  async function handleSubmit(e) {
    e.preventDefault();

    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);

    if (paymentMethod === "cod") {
      try {
        const res = await axios.post(
          `${url}/api/order/place-cod`,
          {
            items: cart,
            amount: total,
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success) {
          toast.success("Order placed successfully!");
          clearCart(); // 🧹 Empty the cart after order
          navigate("/myaccount/orders");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error placing order.");
      }
    }

    if (paymentMethod === "stripe") {
      try {
        const res = await axios.post(
          `${url}/api/order/place-stripe`,
          {
            items: cart,
            amount: total,
            address,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.data.success && res.data.url) {
          toast.success("Redirecting to Stripe payment...");
          clearCart(); // Optional: clear cart immediately
          window.location.href = res.data.url; // redirect to Stripe checkout
        } else {
          toast.error("Failed to initiate Stripe payment.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error initiating Stripe payment.");
      } finally{
        setLoading(false);
      }
    }
  }

  const getButtonText = () => {
    if (!paymentMethod) return "Select Payment Method";
    if (paymentMethod === "cod") return "Place Order";
    if (paymentMethod === "stripe") return "Proceed to Payment";
  };

  return (
    <div className="p-4">
      {/* Banner */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-2 rounded-lg mb-6">
        <Check />
        <p className="text-sm">
          Please use the same email address you registered with when entering your Address Info.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-6">
        {/* Left Side: Address Info */}
        <div className="flex-1 border rounded-lg p-4 shadow-sm space-y-4">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            Address Info
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              value={address.firstName}
              onChange={handleAddressChange}
              placeholder="First Name"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="text"
              name="lastName"
              value={address.lastName}
              onChange={handleAddressChange}
              placeholder="Last Name"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <input
            type="email"
            name="email"
            value={address.email}
            onChange={handleAddressChange}
            placeholder="Email"
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
          />
          <input
            type="text"
            name="street"
            value={address.street}
            onChange={handleAddressChange}
            placeholder="Street"
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              placeholder="City"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
            />
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              placeholder="State"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="zip"
              value={address.zip}
              onChange={handleAddressChange}
              placeholder="Zip Code"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
            />
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleAddressChange}
              placeholder="Country"
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
            />
          </div>
          <input
            type="number"
            name="phone"
            value={address.phone}
            onChange={handleAddressChange}
            placeholder="Phone No."
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 w-full"
          />
        </div>

        {/* Right Side: Cart Summary + Payment */}
        <div className="w-full md:w-1/3 border rounded-lg p-4 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Cart Summary
          </h2>
          <div className="space-y-3">
            <div className="flex justify-between text-gray-700">
              <p>Subtotal</p>
              <p className="font-medium">${subtotal}</p>
            </div>
            <div className="flex justify-between text-gray-700">
              <p>Delivery Charges</p>
              <p className="font-medium">${delivery}</p>
            </div>
            <div className="flex justify-between text-lg font-semibold border-t pt-3 text-gray-900">
              <p>Total</p>
              <p>${total}</p>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mt-6 space-y-3">
            <label className="flex items-center gap-2 border rounded p-2 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <Wallet size={20} className="text-gray-600" />
              <span>Cash on Delivery</span>
            </label>

            <label className="flex items-center gap-2 border rounded p-2 cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="stripe"
                checked={paymentMethod === "stripe"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <FaStripe size={22} className="text-indigo-600" />
              <span>Stripe Payment</span>
            </label>
          </div>

          {/* Checkout Button */}
          <button
            type="submit"
            disabled={!paymentMethod || loading} // disabled if no method OR loading
            className={`mt-6 w-full py-3 rounded-lg transition ${
              paymentMethod && !loading
                ? "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            {loading ? "Processing..." : getButtonText()}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Checkout;
