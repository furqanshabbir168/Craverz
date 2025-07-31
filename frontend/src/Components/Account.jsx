import { UserCircle } from "lucide-react";
import { useContext, useState } from "react";
import photo from "../assets/account-img.png";
import { useNavigate } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";
import toast from "react-hot-toast";

function Account() {
  const { url } = useContext(ShopContext);
  const navigate = useNavigate();

  const [currentState, setCurrentState] = useState("login");
  const [loading, setLoading] = useState(false);
  const [otpStage, setOtpStage] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");

  function onChangeHandle(event) {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmitHandle(event) {
    event.preventDefault();

    if (currentState === "signup") {
      const newURL = `${url}/api/user/register`;
      setLoading(true);

      try {
        const response = await axios.post(newURL, data);
        if (response.status === 201) {
          toast.success("OTP sent! Please verify within 2 minutes.");
          setOtpStage(true);
        } else {
          toast.error(response.data?.message || "Something went wrong.");
        }
      } catch (error) {
        const msg = error.response?.data?.message || "Signup failed.";
        toast.error(msg);
      } finally {
        setLoading(false);
      }
    }
  }

  async function handleOtpVerify() {
    if (!data.email || !otp) return toast.error("Email or OTP missing");

    try {
      const response = await axios.post(`${url}/api/user/verify`, {
        email: data.email,
        otp,
      });

      if (response.status === 200) {
        toast.success("Email verified successfully!");
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        toast.error(response.data?.message || "OTP verification failed");
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Verification failed.";
      toast.error(msg);
    }
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 bg-gray-200 min-h-screen">
      {/* Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <UserCircle className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">My Account</p>
        <UserCircle className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        One Account, Endless Cravings
      </h2>

      {/* Content Wrapper */}
      <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-12 max-w-5xl w-full">
        {/* Form Section */}
        <form
          onSubmit={onSubmitHandle}
          className="flex flex-col gap-4 w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md"
        >
          <h2 className="text-xl font-bold text-gray-800">
            {currentState === "signup" ? "Let's Get You Started" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-600">Please enter your details below</p>

          {currentState === "signup" && (
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={data.name}
              onChange={onChangeHandle}
              required
              className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          )}

          <input
            type="email"
            placeholder="Email"
            name="email"
            value={data.email}
            onChange={onChangeHandle}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={data.password}
            onChange={onChangeHandle}
            required
            className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {currentState === "login" && (
            <span className="text-sm text-red-500 cursor-pointer hover:underline">
              Forgot Password?
            </span>
          )}

          {currentState === "signup" && (
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input type="checkbox" className="mt-1" required />
              <p>
                By signing up, you agree to our{" "}
                <span
                  onClick={() => navigate("/blog")}
                  className="text-red-500 underline cursor-pointer"
                >
                  Terms & Conditions
                </span>{" "}
                and{" "}
                <span
                  onClick={() => navigate("/blog")}
                  className="text-red-500 underline cursor-pointer"
                >
                  Privacy Policy
                </span>
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`bg-red-500 text-white py-2 rounded-md transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-red-600"
            }`}
          >
            {loading
              ? "Please wait..."
              : currentState === "signup"
              ? "Create Account"
              : "Log In"}
          </button>

          {/* OTP Input */}
          {otpStage && (
            <div className="flex flex-col gap-3">
              <input
                type="text"
                maxLength={6}
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button
                type="button"
                onClick={handleOtpVerify}
                className="bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
              >
                Verify OTP
              </button>
            </div>
          )}

          {/* Google Login (Optional) */}
          <button
            type="button"
            className="flex items-center justify-center gap-3 border border-gray-400 rounded-md py-2 text-sm hover:bg-gray-100 transition"
          >
            <svg
              className="w-5 h-5"
              viewBox="0 0 533.5 544.3"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M533.5 278.4c0-17.4-1.6-34.2-4.6-50.4H272v95.3h147.2c-6.3 34.2-25.2 63.2-53.7 82.6l87 67.6c50.8-46.8 80-115.8 80-194.9z"
                fill="#4285F4"
              />
              <path
                d="M272 544.3c72.6 0 133.6-24.1 178.2-65.2l-87-67.6c-24.2 16.2-55 25.8-91.2 25.8-70 0-129.3-47.2-150.4-110.6H31.7v69.5C76.9 478.1 167.4 544.3 272 544.3z"
                fill="#34A853"
              />
              <path
                d="M121.6 326.7c-5.8-17.4-9.1-36-9.1-55s3.3-37.6 9.1-55V147.2H31.7C11.3 188.5 0 235.2 0 271.7s11.3 83.2 31.7 124.5l89.9-69.5z"
                fill="#FBBC05"
              />
              <path
                d="M272 107.3c39.5 0 75 13.6 103 40.5l77-77C392.9 25.6 334.6 0 272 0 167.4 0 76.9 66.2 31.7 147.2l89.9 69.5c21.1-63.4 80.4-109.4 150.4-109.4z"
                fill="#EA4335"
              />
            </svg>
            {currentState === "signup"
              ? "Sign up with Google"
              : "Log in with Google"}
          </button>

          {/* Toggle Login / Signup */}
          <p className="text-sm text-gray-600 text-center">
            {currentState === "signup" ? (
              <>
                Already have an account?{" "}
                <span
                  className="text-red-500 cursor-pointer underline"
                  onClick={() => {
                    setCurrentState("login");
                    setOtpStage(false);
                    setOtp("");
                  }}
                >
                  Log In
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="text-red-500 cursor-pointer underline"
                  onClick={() => {
                    setCurrentState("signup");
                    setOtpStage(false);
                    setOtp("");
                  }}
                >
                  Sign Up
                </span>
              </>
            )}
          </p>
        </form>

        {/* Image Section */}
        <div className="w-full lg:w-1/2">
          <img src={photo} alt="account" className="w-full max-w-md mx-auto" />
        </div>
      </div>
    </div>
  );
}

export default Account;
