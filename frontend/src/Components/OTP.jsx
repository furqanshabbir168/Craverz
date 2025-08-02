import { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext";
import { useNavigate } from "react-router-dom";

function OTP({ email, onClose }) {
  const { url, setToken } = useContext(ShopContext); // Get setToken from context
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.length !== 6) {
      toast.error("Enter full 6-digit OTP");
      return;
    }

    try {
      const res = await axios.post(`${url}/api/user/verify`, { email, otp });

      if (res.status === 200) {
        toast.success("OTP Verified Successfully!");

        // Save token using context (this updates localStorage too)
        setToken(res.data.token);

        onClose(); // Close OTP modal
        navigate('/myaccount/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex justify-center items-center px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-2 text-gray-800">Enter OTP</h2>
        <p className="text-sm text-gray-500 mb-4">
          OTP has been sent to your email. It will expire in 2 minutes.
        </p>

        <input
          type="text"
          maxLength="6"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-center tracking-widest text-lg focus:ring-2 focus:ring-red-400 outline-none"
          placeholder="------"
        />

        <button
          onClick={handleVerify}
          className="mt-4 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
        >
          Verify OTP
        </button>

        <button
          onClick={onClose}
          className="mt-2 text-gray-500 text-sm hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default OTP;
