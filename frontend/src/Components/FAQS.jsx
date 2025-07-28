import { useState } from "react";
import { HelpCircle, Plus, Minus } from "lucide-react";
import faqimg from "../assets/faq.png";
import faqData from "../assets/faqData";

function FAQS() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className="bg-gray-200">
        <div className="flex flex-col items-center p-4 mx-auto bg-gray-200 max-w-[1300px]">
      {/* Heading */}
      <div className="flex items-center gap-4 text-red-500 mb-4">
        <HelpCircle className="w-6 h-6" />
        <p className="text-xl font-semibold text-gray-800">FAQ'S</p>
        <HelpCircle className="w-6 h-6" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-8 text-center">
        Frequently Ask Question's
      </h2>

      {/* Content */}
      <div className="flex flex-col lg:flex-row justify-between gap-8 w-full">
        {/* Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <img src={faqimg} alt="faq" className="max-w-full h-auto rounded-xl" />
        </div>

        {/* FAQ List */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {faqData.map((item, index) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl transition-all duration-300 shadow-md cursor-pointer ${
                activeIndex === index ? "bg-red-500 text-white" : "bg-white text-gray-800"
              }`}
              onClick={() => handleToggle(index)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">{item.question}</h3>
                {activeIndex === index ? (
                  <Minus className="w-5 h-5" />
                ) : (
                  <Plus className="w-5 h-5" />
                )}
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-sm text-white">{item.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default FAQS;
