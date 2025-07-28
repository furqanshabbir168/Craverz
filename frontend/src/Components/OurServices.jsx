import {
  UtensilsCrossed,
  CalendarCheck,
  ShoppingCart,
  BadgePercent,
  Leaf,
  Search,
  PartyPopper,
} from 'lucide-react';

function OurServices() {
  const services = [
    {
      icon: <CalendarCheck className="w-8 h-8 text-red-500" />,
      title: 'Table Reservation',
      desc:
        'Book your table at your favorite restaurants instantly. Enjoy hassle-free dining with real-time availability, personalized seating preferences, and instant confirmation.',
    },
    {
      icon: <ShoppingCart className="w-8 h-8 text-red-500" />,
      title: 'Instant Online Ordering',
      desc:
        'Order your favorite meals from top-rated restaurants near you. Craverz ensures quick delivery, live tracking, and secure payments—bringing comfort food right to your doorstep.',
    },
    {
      icon: <BadgePercent className="w-8 h-8 text-red-500" />,
      title: 'Craverz Specials & Discounts',
      desc:
        'Unlock exclusive deals, combo offers, and limited-time discounts from your favorite food spots. Save more while enjoying premium meals every day.',
    },
    {
      icon: <Leaf className="w-8 h-8 text-red-500" />,
      title: 'Fresh & Hygienic Food Promise',
      desc:
        'Partnered restaurants are verified for freshness, cleanliness, and quality standards. Every meal is served with care to ensure a safe and satisfying experience.',
    },
    {
      icon: <Search className="w-8 h-8 text-red-500" />,
      title: 'Curated Food Explorer',
      desc:
        'Discover trending dishes, chef specials, and hidden gems based on your cravings. Filter by cuisine, price, or popularity to find your next favorite bite.',
    },
    {
      icon: <PartyPopper className="w-8 h-8 text-red-500" />,
      title: 'Live Food Events & Tastings',
      desc:
        'Join exclusive food tasting sessions, chef-curated events, and seasonal festivals. A unique opportunity to experience dishes before they go public.',
    },
  ];

  return (
    <div className='bg-gray-200'>
        <div className="flex flex-col items-center px-4 py-10 mx-auto max-w-[1300px] bg-gray-200">
      <div className="flex items-center gap-4 text-red-500 mb-2">
        <UtensilsCrossed className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">Our Services</p>
        <UtensilsCrossed className="w-6 h-6" />
      </div>

      <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        What Craverz Offers
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:scale-[1.02] group"
          >
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 group-hover:text-red-500 transition-colors duration-200">
              {service.title}
            </h3>
            <p className="text-gray-600 mt-2 text-sm leading-relaxed">
              {service.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default OurServices;
