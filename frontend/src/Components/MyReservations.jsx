import { CalendarCheck, Clock, Users, Package } from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function MyReservation() {
  const { url, token } = useContext(ShopContext);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch user reservations
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
      } catch (err) {
        console.error(err);
        toast.error("Error fetching reservations");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      fetchReservations();
    }
  }, [url, token]);

  // If no reservations
  if (!loading && reservations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <CalendarCheck size={60} className="text-gray-400 mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700">
          You have no reservations yet
        </h2>
        <p className="text-gray-500 mt-2">
          Looks like you haven’t made any reservations request yet.
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
      <div className="flex flex-row items-center gap-2 bg-red-500 text-white p-2 rounded-lg mb-4">
        <CalendarCheck />
        <p className="text-sm">
          Your reservation has been received! We will contact you soon to confirm your booking. If for some reason our confirmation call gets delayed, please feel free to reach us directly through the contact information provided on our website.
        </p>
      </div>

      {/* Reservations List */}
      <div className="space-y-6">
        {reservations.map((res) => (
          <div
            key={res._id}
            className="border rounded-lg shadow-sm p-4"
          >
            {/* Reservation Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-gray-700">
                Reservation #{res._id.slice(-6)}
              </h2>
              <span className="flex items-center gap-1 text-sm capitalize text-gray-600">
                <Package size={16} /> {res.status}
              </span>
            </div>

            {/* Reservation Details */}
            <div className="space-y-2 text-gray-700">
              <p><span className="font-semibold">Name:</span> {res.name}</p>
              <p><span className="font-semibold">Email:</span> {res.email}</p>
              <p className="flex items-center gap-2">
                <CalendarCheck size={16} /> Date: {new Date(res.date).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Clock size={16} /> Time: {res.time}
              </p>
              <p className="flex items-center gap-2">
                <Users size={16} /> Guests: {res.numberOfGuests}
              </p>
              <p className="text-sm text-gray-500">
                Requested on: {new Date(res.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyReservation;
