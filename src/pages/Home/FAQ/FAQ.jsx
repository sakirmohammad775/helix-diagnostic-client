import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

export default function FAQ() {
  // LOGIC: State hook to track the index of the currently expanded FAQ card
  const [openIndex, setOpenIndex] = useState(null);

  // LOGIC: Handler to toggle open/close accordion states
  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // LOGIC: Dynamic list of FAQs 
  const faqs = [
    {
      id: 'faq1',
      question: 'Do I need a doctor referral to book a diagnostic test?',
      answer: 'While many routine screening tests (like basic lipid panels or wellness checks) can be booked directly, complex radiological imaging (like MRI or CT scans) generally require a prescription from a registered medical practitioner.'
    },
    {
      id: 'faq2',
      question: 'How long will it take to get my lab test results?',
      answer: 'Most blood and biochemistry reports are processed and sent to your email or patient portal within 12 to 24 hours. Specialized molecular microbiology or culture tests may take between 48 to 72 hours.'
    },
    {
      id: 'faq3',
      question: 'What are the rules for fasting before a blood test?',
      answer: 'For fasting tests (like Fasting Blood Sugar or Lipid Profile), you should not consume any food or beverages except plain water for 8 to 12 hours prior to your scheduled sample collection.'
    },
    {
      id: 'faq4',
      question: 'Do you offer home sample collection services?',
      answer: 'Yes! We offer professional, sterile home blood and sample collection. You can easily schedule a verified lab technician to visit your home directly through our online Booking portal.'
    }
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-[#f4f8fc]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-12 space-y-3">
          <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase block">Support Center</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Find immediate answers to common concerns about appointment booking, pricing, and medical tests.
          </p>
        </div>

        {/* ACCORDION CONTAINER */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            // LOGIC: Boolean constant evaluation for conditional rendering
            const isOpen = openIndex === index;
            return (
              <div 
                key={faq.id} 
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* LOGIC: Click event handler triggers state toggle via the mapped index */}
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none"
                >
                  <span className={`text-[15px] sm:text-lg font-bold transition-colors duration-200 ${isOpen ? 'text-[#3ca4f4]' : 'text-[#0a2240]'}`}>
                    {faq.question}
                  </span>
                  
                  {/* Dynamic icon toggle wrapper */}
                  <span className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-all ${isOpen ? 'bg-[#3ca4f4] text-white' : 'bg-gray-50 text-[#0a2240]'}`}>
                    {isOpen ? <FaMinus className="w-3.5 h-3.5" /> : <FaPlus className="w-3.5 h-3.5" />}
                  </span>
                </button>

                {/* LOGIC: Dynamic Tailwind CSS height transitions based on open/close state */}
                <div 
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 border-t border-gray-50 opacity-100' : 'max-h-0 opacity-0'
                  } overflow-hidden`}
                >
                  <div className="p-5 sm:p-6 text-gray-500 text-sm sm:text-base leading-relaxed bg-gray-50/50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}