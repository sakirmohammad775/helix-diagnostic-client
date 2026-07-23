import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth'; // 1. Import your Auth hook!
import { FiCalendar, FiUser, FiMail, FiArrowRight } from 'react-icons/fi';

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();
  
  // 2. Get the real logged-in user dynamically
  const { user } = useAuth(); 

  // Fetch test details if not passed via route state
  const { data: testData, isLoading } = useQuery({
    queryKey: ['testDetails', id],
    queryFn: async () => {
      if (location.state?.test) return location.state.test;
      const res = await axiosPublic.get(`/tests/${id}`);
      return res.data;
    },
    initialData: location.state?.test,
  });

  const test = testData || {};
  const [selectedDate, setSelectedDate] = useState(test?.availableDates?.[0] || '');

  const handleProceedToPayment = () => {
    if (!selectedDate && test?.availableDates?.length > 0) {
      alert('Please select an appointment date.');
      return;
    }

    // 3. Attach the REAL logged-in user's name & email
    const bookingPayload = {
      testId: test._id,
      testTitle: test.title,
      price: test.price,
      userName: user?.displayName || 'Patient Name',
      userEmail: user?.email, // <--- Dynamic real email
      appointmentDate: selectedDate || new Date().toISOString().split('T')[0],
      bookingDate: new Date().toISOString(),
    };

    navigate('/dashboard/payment', { state: { booking: bookingPayload } });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <div className="w-8 h-8 border-4 border-[#3ca4f4] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black text-[#0a2240]">Confirm Test Appointment</h1>
          <p className="text-gray-500 text-sm">Review your booking details before proceeding to payment.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 space-y-6">
          
          {/* Patient Info displaying REAL dynamic user */}
          <div className="border-b border-slate-100 pb-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3ca4f4]">Patient Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <FiUser className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Patient Name</p>
                  <p className="text-sm font-bold text-[#0a2240]">{user?.displayName || 'User'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                <FiMail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-[11px] text-gray-400 font-medium">Email Address</p>
                  <p className="text-sm font-bold text-[#0a2240]">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Overview */}
          <div className="border-b border-slate-100 pb-6 space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-[#3ca4f4]">Test Overview</h2>
            <div className="flex justify-between items-start bg-[#f4f8fc] p-4 rounded-2xl border border-blue-50">
              <div className="space-y-1">
                <h3 className="font-bold text-[#0a2240]">{test.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-1">{test.description}</p>
              </div>
              <span className="text-xl font-black text-[#0a2240]">${test.price}</span>
            </div>
          </div>

          {/* Date Selector */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-[#0a2240]">Select Preferred Date</label>
            {Array.isArray(test.availableDates) && test.availableDates.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {test.availableDates.map((date, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`py-3 px-4 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      selectedDate === date
                        ? 'bg-[#0a2240] text-white border-[#0a2240] shadow-md'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-[#3ca4f4]'
                    }`}
                  >
                    <FiCalendar className="w-4 h-4" />
                    <span>{date}</span>
                  </button>
                ))}
              </div>
            ) : (
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3.5 rounded-xl border border-gray-200 text-sm font-medium focus:border-[#3ca4f4] outline-none"
              />
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleProceedToPayment}
            className="w-full flex items-center justify-center gap-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-4 rounded-2xl transition-all shadow-md text-sm sm:text-base"
          >
            <span>Proceed to Payment</span>
            <FiArrowRight className="w-5 h-5" />
          </button>

        </div>
      </div>
    </div>
  );
}