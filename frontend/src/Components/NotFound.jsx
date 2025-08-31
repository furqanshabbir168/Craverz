import { AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="p-5 h-screen flex flex-col items-center justify-center bg-gray-50 text-center">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-xl text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <a
        href="/"
        className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg shadow hover:bg-red-600 transition"
      >
        Go Back Home
      </a>
    </div>
  );
}

export default NotFound;
