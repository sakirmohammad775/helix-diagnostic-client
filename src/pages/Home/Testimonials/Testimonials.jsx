import  { useState } from 'react';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function Testimonials() {
  // LOGIC: State to manage the currently active slide in the carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // LOGIC: Static array of patient reviews with stable IDs
  const reviews = [
    {
      id: 'rev-1',
      name: 'Sarah Jenkins',
      role: 'Wellness Patient',
      rating: 5,
      text: 'The home collection service was incredibly seamless. The technician arrived right on time, was highly professional, and I received my blood work reports in my inbox in less than 12 hours!',
      img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'rev-2',
      name: 'David Miller',
      role: 'Cardiology Patient',
      rating: 5,
      text: 'I was quite nervous about my ECG and imaging tests, but the staff at Medilo made me feel completely safe and comfortable. The facility is spotless and utilizes top-tier equipment.',
      img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
    },
    {
      id: 'rev-3',
      name: 'Elena Rostova',
      role: 'Executive Health Package',
      rating: 5,
      text: 'Excellent diagnostic center! Booking online was simple, prices are highly competitive compared to hospital labs, and their customer service team helped me understand my report values.',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80'
    }
  ];

  // LOGIC: Carousel navigation handlers utilizing circular index math
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="relative w-full py-16 lg:py-24 bg-[#f4f8fc] overflow-hidden">
      
      {/* Abstract Design Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-[#3ca4f4]/5 rounded-full -translate-x-10 -translate-y-10 pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="text-center mb-12 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
            <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Testimonials</span>
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            What Our Patients Say
          </h2>
        </div>

        {/* CAROUSEL CARD */}
        <div className="relative bg-white rounded-[2rem] p-8 sm:p-12 shadow-xl border border-blue-50/50">
          
          {/* Decorative Quote Icon */}
          <div className="absolute top-8 right-8 text-[#3ca4f4]/10 text-5xl sm:text-6xl pointer-events-none">
            <FaQuoteLeft />
          </div>

          {/* LOGIC: Active Review Render Wrapper */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            
            {/* Patient Image */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 border-4 border-[#f4f8fc] shadow-md">
              <img 
                src={reviews[currentSlide].img} 
                alt={reviews[currentSlide].name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Testimonial Content */}
            <div className="flex-1 text-center md:text-left space-y-4">
              
              {/* Star Rating Render */}
              <div className="flex items-center justify-center md:justify-start space-x-1">
                {Array.from({ length: reviews[currentSlide].rating }).map((_, starIdx) => (
                  // LOGIC: Generating static star array. Using index here as key since length is derived from fixed integer ratings
                  <FaStar key={starIdx} className="w-4 h-4 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed italic">
                "{reviews[currentSlide].text}"
              </p>

              {/* Reviewer Details */}
              <div>
                <h4 className="text-lg font-black text-[#0a2240] tracking-tight">
                  {reviews[currentSlide].name}
                </h4>
                <p className="text-xs sm:text-sm text-[#3ca4f4] font-bold">
                  {reviews[currentSlide].role}
                </p>
              </div>

            </div>

          </div>

          {/* CAROUSEL NAVIGATION BUTTONS */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
            
            {/* Pagination Dots */}
            <div className="flex space-x-2">
              {reviews.map((review, idx) => (
                // LOGIC: Explicitly requiring index parameter 'idx' to dynamically handle manual slide switching
                <button
                  key={review.id}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? 'w-8 bg-[#3ca4f4]' : 'w-2.5 bg-gray-200'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex space-x-3">
              <button 
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-gray-100 bg-white hover:bg-[#3ca4f4] hover:text-white flex items-center justify-center text-[#0a2240] transition-all duration-200 shadow-sm"
                aria-label="Previous Slide"
              >
                <FaChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-gray-100 bg-white hover:bg-[#3ca4f4] hover:text-white flex items-center justify-center text-[#0a2240] transition-all duration-200 shadow-sm"
                aria-label="Next Slide"
              >
                <FaChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}