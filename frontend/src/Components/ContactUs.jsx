import { PhoneCall, Mail, MapPin, Clock } from "lucide-react";

function ContactUs() {
  return (
    <div className="flex flex-col items-center p-4 mx-auto bg-gray-200">
      {/* Section Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <PhoneCall className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Contact Us</p>
        <PhoneCall className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
        Have a Query? Let’s Connect
      </h2>

      {/* Contact Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Address */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4 mb-2 text-red-500">
            <MapPin className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Our Address</h3>
          </div>
          <p className="text-gray-600">Main Street, Lahore, Pakistan</p>
        </div>

        {/* Email */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4 mb-2 text-red-500">
            <Mail className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Email</h3>
          </div>
          <p className="text-gray-600">cravezsupport@gmail.com</p>
          <p className="text-sm text-gray-500 mt-1">Email us anytime for any kind of query.</p>
        </div>

        {/* Phone */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4 mb-2 text-red-500">
            <PhoneCall className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Contact</h3>
          </div>
          <p className="text-gray-600">+92 373 42 24 244</p>
          <p className="text-sm text-gray-500 mt-1">24/7 support on call or message.</p>
        </div>

        {/* Opening Hours */}
        <div className="bg-white rounded-xl shadow-md p-6 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center gap-4 mb-2 text-red-500">
            <Clock className="w-6 h-6" />
            <h3 className="text-lg font-semibold text-gray-800">Opening Hours</h3>
          </div>
          <p className="text-gray-600">Sunday – Friday: 9 AM – 6 PM</p>
          <p className="text-gray-600">Saturday: 9 AM – 4 PM</p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
