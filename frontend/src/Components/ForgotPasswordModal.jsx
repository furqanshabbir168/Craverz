import { useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ShopContext } from "../Context/ShopContext";

function ForgotPasswordModal({ onClose }) {
  const { url } = useContext(ShopContext);
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // STEP 1: Request OTP
  const handleEmailSubmit = async () => {
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/forgotpass`, { email });
      toast.success(res.data.message || "OTP sent to email!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleOtpSubmit = async () => {
    if (otp.length !== 6) return toast.error("Enter full 6-digit OTP");
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/verifyotp`, { otp });
      toast.success("OTP verified!");
      setResetToken(res.data.resetToken); // Save reset token
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset Password
  const handlePasswordReset = async () => {
    if (newPassword.length < 8) return toast.error("Password must be at least 8 characters");
    setLoading(true);
    try {
      const res = await axios.post(`${url}/api/user/resetpass`, {
        resetToken,
        newPassword,
      });
      toast.success(res.data.message || "Password reset successful!");
      onClose(); // Close modal
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-200 bg-opacity-50 backdrop-blur-sm flex justify-center items-center px-4 z-50">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Forgot Password</h2>

        {/* STEP 1: Email */}
        {step === 1 && (
          <>
            <p className="text-sm text-gray-500 mb-4">Enter your email to receive an OTP</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-400 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleEmailSubmit}
              disabled={loading}
              className="mt-4 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2: OTP */}
        {step === 2 && (
          <>
            <p className="text-sm text-gray-500 mb-4">Enter the OTP sent to {email}</p>
            <input
              type="text"
              maxLength="6"
              placeholder="------"
              className="w-full border border-gray-300 rounded-md p-2 text-center tracking-widest text-lg focus:ring-2 focus:ring-red-400 outline-none"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              onClick={handleOtpSubmit}
              disabled={loading}
              className="mt-4 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <>
            <p className="text-sm text-gray-500 mb-4">Enter your new password</p>
            <input
              type="password"
              placeholder="New password"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-400 outline-none"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button
              onClick={handlePasswordReset}
              disabled={loading}
              className="mt-4 bg-red-500 text-white w-full py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* Cancel */}
        <button
          onClick={onClose}
          className="mt-4 text-gray-500 text-sm hover:underline cursor-pointer"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ForgotPasswordModal;
