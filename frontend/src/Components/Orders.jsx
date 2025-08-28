import { Check, ShoppingBag, Package } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Orders() {
  const { url, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user orders
  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(`${url}/api/order/my-orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          toast.error(res.data.message || "Failed to fetch orders");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchOrders();
    }
  }, [url, token]);

  // If no orders
  if (!loading && orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <ShoppingBag size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          You have no orders yet
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t placed any orders yet.
        </p>
        <Link
          to="/shop"
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Start Shopping
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
          Thank you for your order! Please check your email for the details of your latest order. If your delivery takes longer than expected, please feel free to reach us directly through the contact information provided on our website.
        </p>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border rounded-lg shadow-sm p-4"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">
                Order #{order._id.slice(-6)}
              </h2>
              <span className="flex items-center gap-1 text-sm capitalize text-gray-600">
                <Package size={16} /> {order.status}
              </span>
            </div>

            {/* Table Header (desktop only) */}
            <div className="hidden md:grid grid-cols-5 font-semibold border-b pb-2 mb-2">
              <p>Image</p>
              <p>Name</p>
              <p>Quantity</p>
              <p>Price</p>
              <p>Total</p>
            </div>

            {/* Order Items */}
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col md:grid md:grid-cols-5 gap-4 items-center border p-3 rounded-lg"
                >
                  {/* Mobile Layout */}
                  <div className="flex md:hidden w-full gap-4">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex flex-col justify-between w-full">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Price: ${item.price}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Total: ${item.price * item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <img
                    src={item.img}
                    alt={item.name}
                    className="hidden md:block w-20 h-20 rounded-lg object-cover"
                  />
                  <p className="hidden md:block">{item.name}</p>
                  <p className="hidden md:block">{item.quantity}</p>
                  <p className="hidden md:block">${item.price}</p>
                  <p className="hidden md:block">
                    ${item.price * item.quantity}
                  </p>
                </div>
              ))}
            </div>

            {/* Order Footer */}
            <div className="flex justify-between mt-4 text-gray-700 text-sm">
              <p>
                Ordered on:{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="font-semibold">
                Total: ${order.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
