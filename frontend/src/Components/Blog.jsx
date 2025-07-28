import {
  FileText,
  ScrollText,
  ShieldCheck,
  Briefcase,
  Utensils,
  Contact,
} from "lucide-react";

function Blog() {
  return (
    <div className="flex flex-col items-center p-4 mx-auto bg-gray-100">
      {/* Top Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <FileText className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Blog</p>
        <FileText className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
        All You Need to Know
      </h2>

      {/* Info Sections */}
      <div className="max-w-4xl w-full flex flex-col gap-8">

        {/* Who We Are */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <ScrollText />
            <h3 className="text-xl font-semibold text-gray-800">Who We Are</h3>
          </div>
          <p className="text-gray-700">
            Craverz is not just a food platform — it’s a movement to bring people and flavor together. We're a team of passionate individuals driven by quality, speed, and customer satisfaction. Whether you're ordering from home, reserving a table for a romantic dinner, or exploring a late-night snack, Craverz is here to serve. Founded with love for both tech and taste, we aim to redefine how Pakistan orders food online.
          </p>
          <p className="text-gray-700 mt-3">
            We believe in building trust. Our team includes chefs, delivery pros, support heroes, and tech minds — all working to give you an unforgettable experience every time you interact with us.
          </p>
        </div>

        {/* What We Offer */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <Utensils />
            <h3 className="text-xl font-semibold text-gray-800">What We Offer</h3>
          </div>
          <p className="text-gray-700 mb-2">
            Craverz is a one-stop solution for all your food needs. Here's what makes us different:
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li><strong>Online Food Delivery:</strong> Choose from a variety of dishes and get them delivered hot & fresh at your doorstep.</li>
            <li><strong>Table Reservation:</strong> Reserve your table in advance and avoid waiting time at our partner restaurants.</li>
            <li><strong>Event Catering:</strong> Planning a party or office lunch? We offer custom packages tailored to your needs.</li>
            <li><strong>Live Order Tracking:</strong> Know exactly when your food is being prepared and when it’s out for delivery.</li>
            <li><strong>Wallet & Discounts:</strong> Enjoy promo codes, Craverz wallet cashback, and seasonal offers.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            Every service we offer is built with user experience, transparency, and taste at its core.
          </p>
        </div>

        {/* Privacy Policy */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <ShieldCheck />
            <h3 className="text-xl font-semibold text-gray-800">Privacy Policy</h3>
          </div>
          <p className="text-gray-700">
            We understand the value of your personal data and are committed to protecting your privacy. Your contact details, order history, and payment methods are encrypted and stored securely.
          </p>
          <p className="text-gray-700 mt-2">
            We never share your personal data with third parties without your consent. You can update, view, or delete your data anytime through your account settings.
          </p>
          <p className="text-gray-700 mt-2">
            By using our platform, you agree to the collection and use of information in accordance with this policy. For complete details, please refer to our <span className="text-red-500 underline">Full Privacy Policy</span>.
          </p>
        </div>

        {/* Terms and Conditions */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <ScrollText />
            <h3 className="text-xl font-semibold text-gray-800">Terms & Conditions</h3>
          </div>
          <p className="text-gray-700">
            Our terms govern the use of the Craverz platform. By placing an order or booking a table, you agree to:
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1 mt-2">
            <li>Provide accurate and complete information.</li>
            <li>Respect delivery & refund policies outlined on our website.</li>
            <li>Avoid misuse of promo codes or platform features.</li>
            <li>Accept possible changes in availability during peak hours.</li>
          </ul>
          <p className="text-gray-700 mt-3">
            For any disputes, our support team is available to assist. We aim for fairness and transparency in every situation.
          </p>
        </div>

        {/* Careers */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <Briefcase />
            <h3 className="text-xl font-semibold text-gray-800">Careers at Craverz</h3>
          </div>
          <p className="text-gray-700 mb-2">
            Looking to grow your career in the food or tech industry? We’re constantly expanding and always looking for passionate individuals to join our team.
          </p>
          <p className="text-gray-700 mb-2">
            Current Openings:
          </p>
          <ul className="list-disc ml-5 text-gray-700 space-y-1">
            <li>Delivery Riders (own bike required)</li>
            <li>Customer Support Executives (Remote/On-site)</li>
            <li>Kitchen Staff & Chefs</li>
            <li>Full Stack Developers (React + Node)</li>
            <li>Marketing Interns & Content Creators</li>
          </ul>
          <p className="mt-3 text-gray-700">
            Email your resume to{" "}
            <a href="mailto:cravezsupport@gmail.com" className="text-red-500 underline">
              cravezsupport@gmail.com
            </a>{" "}
            and mention the role in the subject line.
          </p>
        </div>

        {/* Help / Contact */}
        <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-2 text-red-500">
            <Contact />
            <h3 className="text-xl font-semibold text-gray-800">Need Assistance?</h3>
          </div>
          <p className="text-gray-700">
            Our support team is available 24/7 for any queries related to your orders, payments, or platform experience.
            You can reach us through the{" "}
            <a href="/contact" className="text-red-500 underline">
              Contact Page
            </a>{" "}
            or drop an email at{" "}
            <a href="mailto:cravezsupport@gmail.com" className="text-red-500 underline">
              cravezsupport@gmail.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Blog;
