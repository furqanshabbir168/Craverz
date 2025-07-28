import { MessageSquareQuote, UserRound, Star } from 'lucide-react';
import testimonialData from '../assets/testimonialData';

function TestimonialSection() {
  return (
    <div className='bg-gray-200'>
        <div className="flex flex-col items-center p-4 mx-auto bg-gray-200 max-w-[1300px] pb-8.5">
      {/* Top Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <MessageSquareQuote className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Testimonials</p>
        <MessageSquareQuote className="w-6 h-6" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-10 text-center">
        What Our Clients Say
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-4">
        {testimonialData.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col gap-4 items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            {/* User Icon */}
            <div className="bg-red-100 p-3 rounded-full">
              <UserRound className="text-red-500 w-8 h-8" />
            </div>

            {/* Review Text */}
            <p className="text-gray-600 italic text-sm">“{item.review}”</p>

            {/* User Info */}
            <div className="mt-4">
              <h3 className="text-base font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.role}</p>
            </div>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.floor(item.rating) }, (_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              {item.rating % 1 !== 0 && (
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-200" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default TestimonialSection;
