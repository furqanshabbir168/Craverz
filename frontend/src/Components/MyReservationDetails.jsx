import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Loader2, CalendarCheck } from "lucide-react";
import { ShopContext } from "../Context/ShopContext";

function MyReservationDetails() {
  const { url } = useContext(ShopContext);
  const { id } = useParams(); // reservationId from URL
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await axios.get(`${url}/api/reservation/${id}`);
        setReservation(res.data);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReservation();
  }, [id, url]);

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

  if (!reservation) {
    return (
      <div className="text-center py-20">
        <CalendarCheck size={60} className="mx-auto text-gray-400 mb-4" />
        <p className="text-lg font-semibold text-gray-700">
          Reservation not found
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Reservation Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Reservation #{reservation._id.slice(-6)}
          </h2>
          <p className="text-gray-500 text-sm">
            Created on {formatDate(reservation.createdAt)}
          </p>
        </div>
        <p
          className={`text-lg font-semibold ${
            reservation.status === "pending"
              ? "text-yellow-600"
              : reservation.status === "confirmed"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          Status: {reservation.status}
        </p>
      </div>

      {/* Customer Info */}
      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
          Guest Information
        </h3>
        <div className="space-y-1 text-gray-700">
          <p>
            <span className="font-medium">Name:</span> {reservation.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {reservation.email}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {reservation.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Guests:</span>{" "}
            {reservation.numberOfGuests}
          </p>
        </div>
      </div>

      {/* Reservation Details */}
      <div className="bg-white shadow p-4 rounded-lg border">
        <h3 className="text-lg font-semibold mb-3 text-gray-800 border-b pb-2">
          Reservation Details
        </h3>
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-medium">Date:</span>{" "}
            {formatDate(reservation.date)}
          </p>
          <p>
            <span className="font-medium">Time:</span> {reservation.time}
          </p>
          <p>
            <span className="font-medium">Special Request:</span>{" "}
            {reservation.message || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MyReservationDetails;
