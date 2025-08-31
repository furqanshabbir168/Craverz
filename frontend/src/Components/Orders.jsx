import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  Loader2,
  ShoppingBag,
  Check,
  CreditCard,
  CalendarDays,
  Truck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import toast from "react-hot-toast";

function Orders() {
  const { url, token } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

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
      } catch (error) {
        console.error("Error fetching user orders:", error);
        toast.error("Error fetching orders");
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchOrders();
  }, [url, token]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  // If no orders
  if (orders.length === 0) {
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
      {/* Thank You Banner */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-3 rounded-lg mb-6">
        <Check />
        <p className="text-sm">
          Thank you for your order! Please check your email for the details of
          your latest order. If your delivery takes longer than expected,
          please feel free to reach us directly through the contact
          information provided on our website.
        </p>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2 mb-3 text-gray-700">
        <p>Order</p>
        <p>Amount</p>
        <p>Payment</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-6 items-center gap-4">
              {/* Order */}
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <Package className="text-red-500" size={20} />
                #{order._id.slice(-6)}
              </div>

              {/* Amount */}
              <p className="text-gray-700 font-medium">${order.amount}</p>

              {/* Payment */}
              <p className="text-gray-700">
                {order.payment.method} <br />
                <span
                  className={`text-sm ${
                    order.payment.status === "Pending"
                      ? "text-yellow-600"
                      : order.payment.status === "Failed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {order.payment.status}
                </span>
              </p>

              {/* Status */}
              <p className="text-gray-700">{order.status}</p>

              {/* Date */}
              <p className="text-gray-600 text-sm">
                {formatDate(order.createdAt)}
              </p>

              {/* Action */}
              <Link
                to={`/myaccount/orders/${order._id}`}
                className="text-red-500 font-medium hover:underline"
              >
                View Details →
              </Link>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-3">
              {/* Order */}
              <div className="flex items-center gap-2">
                <Package className="text-red-500" size={20} />
                <span className="font-semibold text-gray-800">
                  Order #{order._id.slice(-6)}
                </span>
              </div>

              {/* Payment */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <CreditCard size={16} /> Payment
                </span>
                <span
                  className={`text-sm font-medium ${
                    order.payment.status === "Pending"
                      ? "text-yellow-600"
                      : order.payment.status === "Failed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {order.payment.method} ({order.payment.status})
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <Truck size={16} /> Status
                </span>
                <span className="text-gray-800 font-medium">
                  {order.status}
                </span>
              </div>

              {/* Date */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <CalendarDays size={16} /> Date
                </span>
                <span className="text-gray-700 text-sm">
                  {formatDate(order.createdAt)}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <Link
                  to={`/myaccount/orders/${order._id}`}
                  className="text-red-500 font-medium hover:underline"
                >
                  View →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
