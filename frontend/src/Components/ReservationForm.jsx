import { CalendarCheck, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

function ReservationForm() {
  return (
    <div className='bg-gray-200'>
        <div className="flex flex-col items-center px-4 py-10 mx-auto bg-gray-200 max-w-[1300px]">
      {/* Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <CalendarCheck className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Reservations</p>
        <CalendarCheck className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
        Your Dining Spot, Just a Click Away
      </h2>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 w-full">
        {/* Left: Contact Info */}
        <div className="w-full lg:w-1/2 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600">
            We’re here to help you with reservations, orders, or any questions you may have.
            Reach out and our team will respond promptly.
          </p>

          <div className="space-y-4">
            <div>
              <h4 className="text-gray-700 font-semibold">Contact</h4>
              <p className="text-gray-600">+92 373 42 24 244</p>
            </div>
            <div>
              <h4 className="text-gray-700 font-semibold">Email</h4>
              <p className="text-gray-600">cravezsupport@gmail.com</p>
            </div>
            <div>
              <h4 className="text-gray-700 font-semibold">Address</h4>
              <p className="text-gray-600">Main Street, Lahore, Pakistan</p>
            </div>
            <div>
              <h4 className="text-gray-700 font-semibold mb-2">Follow Us</h4>
              <div className="flex gap-3 text-red-500">
                <Instagram className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                <Facebook className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                <Youtube className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
                <Linkedin className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <form className="w-full lg:w-1/2 bg-white p-6 rounded-2xl shadow-md space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Create a <span className="text-red-500">Reservation</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Select Date*</label>
              <input
                type="date"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Select Time*</label>
              <input
                type="time"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Phone Number*</label>
              <input
                type="tel"
                placeholder="Phone Number"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-700 mb-1">Number of Guests*</label>
              <input
                type="number"
                placeholder="e.g. 4"
                className="border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 mb-1">Message*</label>
            <textarea
              rows={4}
              placeholder="We would like to reserve a table for 10 guests on Saturday at 7:30 PM for a birthday dinner. Please arrange a corner seating if possible."
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md transition"
          >
            Book a Table
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default ReservationForm;
