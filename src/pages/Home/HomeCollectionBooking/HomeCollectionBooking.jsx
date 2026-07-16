import { useState } from 'react';
import { 
  FaShieldAlt, 
  FaUserCheck, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaClock, 
  FaPhoneAlt, 
  FaCheckCircle 
} from 'react-icons/fa';

export default function HomeCollectionBooking() {
  // LOGIC: State to manage the user booking form data
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    selectedTest: '',
    date: '',
    timeSlot: ''
  });

  // LOGIC: State to show success feedback after a simulated booking submit
  const [isSubmitted, setIsSubmitted] = useState(false);

  // LOGIC: Static datasets for select options
  const popularTests = [
    'Complete Blood Count (CBC)',
    'Lipid Profile (Cholesterol)',
    'Fasting Blood Sugar (FBS)',
    'Thyroid Profile (T3, T4, TSH)',
    'HbA1c'
  ];

  const timeSlots = [
    '07:00 AM - 09:00 AM',
    '09:00 AM - 11:00 AM',
    '11:00 AM - 01:00 PM',
    '03:00 PM - 05:00 PM'
  ];

  // LOGIC: Generic input handler for form field updates
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // LOGIC: Form submit handler that stops page refresh and toggles success UI state
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullName && formData.phone && formData.address && formData.selectedTest) {
      setIsSubmitted(true);
      // In a real application, you would trigger an API call to your backend database here
    }
  };

  return (
    <section className="w-full py-16 lg:py-24 bg-white relative overflow-hidden">
      
      {/* Decorative background circle */}
      <div className="absolute left-0 bottom-0 w-64 h-64 bg-[#3ca4f4]/5 rounded-full -translate-x-24 translate-y-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* LOGIC: Responsive structural grid (1 col on mobile, 12 cols from lg breakpoint up to split info & form) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Promotional & Safety Information (5/12 columns on desktop) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-[3px] bg-[#3ca4f4]" />
                <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Safe & Sterile</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight leading-tight">
                Home Sample Collection Bookings
              </h2>
            </div>

            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              No need to visit the clinic. Save time and reduce stress by scheduling our certified lab medical technician to collect your blood or urine samples in the comfort and privacy of your home.
            </p>

            {/* Trust Badges */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3ca4f4] shrink-0">
                  <FaShieldAlt className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0a2240] text-sm sm:text-base">100% Sterile Procedures</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Technicians follow strict WHO hygiene protocols with sealed disposable kits.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#3ca4f4] shrink-0">
                  <FaUserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#0a2240] text-sm sm:text-base">Certified Technicians</h4>
                  <p className="text-xs sm:text-sm text-gray-500">Fully licensed, vaccinated, and highly experienced pediatric and geriatric phlebotomists.</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Interactive Booking Form (7/12 columns on desktop) */}
          <div className="lg:col-span-7 bg-[#f4f8fc] p-6 sm:p-10 rounded-[2.5rem] shadow-xl border border-blue-100/30">
            
            {/* LOGIC: Conditional rendering to swap the form out for a success banner once submitted */}
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4 animate-fadeIn">
                <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto shadow-lg">
                  <FaCheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[#0a2240]">Booking Request Received!</h3>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                  Thank you, <strong className="text-black">{formData.fullName}</strong>. Our customer care representative will call you shortly on <strong className="text-black">{formData.phone}</strong> to confirm your home appointment and assign a technician.
                </p>
                <button 
                  onClick={() => { setIsSubmitted(false); setFormData({ fullName: '', phone: '', address: '', selectedTest: '', date: '', timeSlot: '' }); }}
                  className="mt-6 bg-[#0a2240] hover:bg-[#3ca4f4] text-white font-extrabold py-3 px-8 rounded-full transition-all duration-300"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-black text-[#0a2240] mb-1">Request a Home Appointment</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Fill in your details below and we will contact you immediately.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Your Full Name</label>
                    <input 
                      type="text" 
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. John Doe"
                      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Phone Number</label>
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-3.5 h-3.5" />
                      <input 
                        type="tel" 
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="e.g. +1 555-0199"
                        className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Dropdown Test Selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Select Diagnostic Test</label>
                  <select 
                    name="selectedTest"
                    required
                    value={formData.selectedTest}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all"
                  >
                    <option value="" disabled>-- Select a test package --</option>
                    {popularTests.map((test, idx) => (
                      // LOGIC: Mapping option list safely using index-key since testing options represent simple static strings
                      <option key={idx} value={test}>{test}</option>
                    ))}
                  </select>
                </div>

                {/* Complete Address */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Collection Address</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400 w-4 h-4" />
                    <textarea 
                      name="address"
                      required
                      rows="2"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter house number, building, street, and landmark..."
                      className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all resize-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Preferred Date */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Preferred Date</label>
                    <div className="relative">
                      <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      <input 
                        type="date" 
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Time Slot */}
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Preferred Time Slot</label>
                    <div className="relative">
                      <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                      <select 
                        name="timeSlot"
                        required
                        value={formData.timeSlot}
                        onChange={handleInputChange}
                        className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 focus:border-[#3ca4f4] rounded-xl text-sm font-semibold text-gray-800 outline-none transition-all"
                      >
                        <option value="" disabled>-- Select time --</option>
                        {timeSlots.map((slot, idx) => (
                          <option key={idx} value={slot}>{slot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <button 
                  type="submit" 
                  className="w-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 tracking-wide uppercase text-sm"
                >
                  Book Collection Now
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}