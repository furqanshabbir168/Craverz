import { CalendarCheck, Clock, Users, Loader2, ClipboardList } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyReservation() {
  const { url, token } = useContext(ShopContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReservations() {
      try {
        const res = await axios.get(`${url}/api/reservation/my-reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setReservations(res.data.reservations);
        } else {
          toast.error(res.data.message || "Failed to fetch reservations");
        }
      } catch (error) {
        console.error("Error fetching reservations:", error);
        toast.error("Error fetching reservations");
      } finally {
        setLoading(false);
      }
    }

    if (token) fetchReservations();
  }, [url, token]);

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

  // If no reservations
  if (reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <CalendarCheck size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          You have no reservations yet
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t made any reservations yet.
        </p>
        <Link
          to="/reservations"
          className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
        >
          Create Reservation
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4">
      {/* Banner */}
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-3 rounded-lg mb-6">
        <CalendarCheck />
        <p className="text-sm">
          Your reservation has been received! We will contact you soon to
          confirm your booking. If for some reason our confirmation call gets
          delayed, please feel free to reach us directly through the contact
          information provided on our website.
        </p>
      </div>

      {/* Table Header (desktop only) */}
      <div className="hidden md:grid grid-cols-6 font-semibold border-b pb-2 mb-3 text-gray-700">
        <p>Reservation</p>
        <p>Name</p>
        <p>Guests</p>
        <p>Date & Time</p>
        <p>Status</p>
        <p>Action</p>
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {reservations.map((res) => (
          <div
            key={res._id}
            className="border p-4 rounded-lg shadow-sm hover:shadow-md transition"
          >
            {/* Desktop Layout */}
            <div className="hidden md:grid md:grid-cols-6 items-center gap-4">
              {/* Reservation ID */}
              <div className="flex items-center gap-2 font-semibold text-gray-800">
                <ClipboardList className="text-red-500" size={20} />
                #{res._id.slice(-6)}
              </div>

              {/* Name */}
              <p className="text-gray-700">{res.name}</p>

              {/* Guests */}
              <p className="flex items-center gap-1 text-gray-700">
                <Users size={16} /> {res.numberOfGuests}
              </p>

              {/* Date & Time */}
              <p className="flex flex-col text-gray-700 text-sm">
                <span className="flex items-center gap-1">
                  <CalendarCheck size={16} /> {formatDate(res.date)}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={16} /> {res.time}
                </span>
              </p>

              {/* Status */}
              <p className="capitalize text-gray-700">{res.status}</p>

              {/* Action */}
              <Link
                to={`/myaccount/reservations/${res._id}`}
                className="text-red-500 font-medium hover:underline"
              >
                View →
              </Link>
            </div>

            {/* Mobile Layout (only essential info) */}
            <div className="md:hidden flex flex-col gap-3">
              {/* Reservation ID */}
              <div className="flex items-center gap-2">
                <ClipboardList className="text-red-500" size={20} />
                <span className="font-semibold text-gray-800">
                  Reservation #{res._id.slice(-6)}
                </span>
              </div>

              {/* Guests */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <Users size={16} /> Guests
                </span>
                <span className="text-gray-800 font-medium">
                  {res.numberOfGuests}
                </span>
              </div>

              {/* Date & Time */}
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-gray-600 text-sm">
                  <CalendarCheck size={16} /> Date & Time
                </span>
                <span className="text-gray-700 text-sm">
                  {formatDate(res.date)} - {res.time}
                </span>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">Status</span>
                <span
                  className={`font-medium ${
                    res.status === "pending"
                      ? "text-yellow-600"
                      : res.status === "confirmed"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {res.status}
                </span>
              </div>

              {/* Action */}
              <div className="flex justify-end">
                <Link
                  to={`/myaccount/reservations/${res._id}`}
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

export default MyReservation;
