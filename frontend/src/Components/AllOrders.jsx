import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Package, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function AllOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(ShopContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${url}/api/order/all-orders`);
        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [url]);

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

  // Filter only Delivery orders
  const deliveryOrders = orders.filter((order) => order.orderType === "Delivery");

  if (deliveryOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <Package size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Delivery Orders Found
        </h2>
        <p className="text-gray-500 mt-2">
          Delivery orders will appear here once placed.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {/* Header */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-3 rounded-lg mb-6">
        <Package />
        <p className="text-sm">Manage and track all delivery orders here.</p>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2 mb-3 text-gray-700">
        <p>Customer</p>
        <p>Amount</p>
        <p>Payment</p>
        <p>Status</p>
        <p>Date</p>
        <p>Action</p>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {deliveryOrders.map((order) => (
          <div
            key={order._id}
            className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Customer Info */}
            <div className="flex items-center gap-3 w-full">
              <div>
                <p className="font-semibold text-gray-800">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p className="text-sm text-gray-500">{order.address?.email}</p>
              </div>
            </div>

            {/* Amount */}
            <p className="w-full text-gray-700 font-medium">${order.amount}</p>

            {/* Payment */}
            <p className="w-full text-gray-700">
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

            {/* Order Status */}
            <p className="w-full text-gray-700">{order.status}</p>

            {/* Date */}
            <p className="w-full text-gray-600 text-sm">
              {formatDate(order.createdAt)}
            </p>

            {/* Action */}
            <Link
              to={`/myadmin/orders/${order._id}`}
              className="text-red-500 font-medium hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllOrders;
