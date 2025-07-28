import pic from '../assets/touch.jpg';

function GetInTouch() {
  return (
    <div className='bg-gray-200 py-10'>
      <div className="flex flex-col md:flex-row items-center justify-between gap-12 px-4 md:px-10 max-w-6xl mx-auto">

        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={pic}
            alt="Contact"
            className="w-full h-auto object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Right Form Box */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 rounded-xl shadow-md flex flex-col gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Get In Touch</h2>

          {/* Name & Email */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>

          {/* Phone & Subject */}
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <select
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <option value="">Select Subject</option>
              <option value="greeting">Greeting</option>
              <option value="order">About Order</option>
              <option value="complaint">Complaint</option>
              <option value="pricing">About Price</option>
              <option value="reservation">About Reservation</option>
              <option value="feedback">Feedback</option>
              <option value="support">Customer Support</option>
            </select>
          </div>

          {/* Message Box */}
          <textarea
            rows="5"
            placeholder="Write your message here..."
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default GetInTouch;
