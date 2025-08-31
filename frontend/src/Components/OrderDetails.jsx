import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, Package } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";
import toast from 'react-hot-toast'

function OrderDetails() {
  const { url } = useContext(ShopContext);
  const { id } = useParams(); // orderId from URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${url}/api/order/${id}`);
        setOrder(res.data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

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

  const handleUpdate = async (field, value) => {
    setUpdating(true);
    try {
      const res = await axios.put(`${url}/api/order/${id}/update-status`, {
        [field]: value,
      });
      setOrder(res.data.order);
      toast.success(`Order ${field} updated to ${value}`);
    } catch (error) {
      console.error("Error updating order:", error);
      toast.error("Failed to update order. Try again!");
    } finally {
      setUpdating(false);
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-20">
        <Package size={60} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-700">Order not found</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Order Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Order #{order._id.slice(-6)}
          </h2>
          <p className="text-gray-500 text-sm">
            Placed on {formatDate(order.createdAt)}
          </p>
        </div>
        <p className="text-lg font-semibold text-red-500">
          Total: ${order.amount}
        </p>
      </div>

      {/* Customer Info */}
      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
          Customer Information
        </h3>
        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-medium">Name:</span>{" "}
            {order.address.firstName} {order.address.lastName}
          </p>
          <p>
            <span className="font-medium">Email:</span> {order.address.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {order.address.phone}
          </p>
          <p>
            <span className="font-medium">Address:</span> {order.address.street},{" "}
            {order.address.city}, {order.address.state}, {order.address.zip},{" "}
            {order.address.country}
          </p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
          Ordered Items
        </h3>
        <div className="space-y-3">
          {order.items.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-4 border-b pb-3 last:border-none"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">
                  {item.category} | {item.quantity}x
                </p>
              </div>
              <p className="font-medium text-gray-700">${item.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Status Controls */}
      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
          Update Order
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {/* Food Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Food Status
            </label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={order.status}
              onChange={(e) => handleUpdate("status", e.target.value)}
              disabled={updating}
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Payment Status */}
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Payment Status
            </label>
            <select
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              value={order.payment.status}
              onChange={(e) => handleUpdate("payment.status", e.target.value)}
              disabled={updating}
            >
              <option value="Pending" className="text-yellow-600">
                Pending
              </option>
              <option value="Paid" className="text-green-600">
                Paid
              </option>
              <option value="Failed" className="text-red-600">
                Failed
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;