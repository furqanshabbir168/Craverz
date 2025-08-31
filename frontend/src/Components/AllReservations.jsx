import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { CalendarCheck, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

function AllReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { url } = useContext(ShopContext);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const res = await axios.get(`${url}/api/reservation/all-reservations`);
        setReservations(res.data.reservations || []);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, []);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <CalendarCheck size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          No Reservations Found
        </h2>
        <p className="text-gray-500 mt-2">
          Reservations will appear here once booked.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {/* Header */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-3 rounded-lg mb-6">
        <CalendarCheck />
        <p className="text-sm">Manage and track all table reservations here.</p>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2 mb-3 text-gray-700">
        <p>Name</p>
        <p>Guests</p>
        <p>Date</p>
        <p>Time</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {reservations.map((resv) => (
          <div
            key={resv._id}
            className="flex flex-col md:grid md:grid-cols-6 gap-4 items-center border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Name */}
            <div className="w-full">
              <p className="font-semibold text-gray-800">{resv.name}</p>
              <p className="text-sm text-gray-500">{resv.email}</p>
            </div>

            {/* Guests */}
            <p className="w-full text-gray-700 font-medium">
              {resv.numberOfGuests}
            </p>

            {/* Date */}
            <p className="w-full text-gray-700">{formatDate(resv.date)}</p>

            {/* Time */}
            <p className="w-full text-gray-700">{resv.time}</p>

            {/* Status */}
            <p
              className={`w-full font-medium ${
                resv.status === "pending"
                  ? "text-yellow-600"
                  : resv.status === "confirmed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {resv.status}
            </p>

            {/* Action */}
            <Link
              to={`/myadmin/reservations/${resv._id}`}
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

export default AllReservations;
