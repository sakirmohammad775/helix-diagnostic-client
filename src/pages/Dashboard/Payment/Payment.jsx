import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../../../hooks/useAxiosPublic'; // Adjust path if needed
import { FiLock, FiShield } from 'react-icons/fi';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const [processing, setProcessing] = useState(false);

  const booking = location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
        <p className="text-gray-500 text-sm font-medium">No active booking session found.</p>
      </div>
    );
  }

  const handleSimulatedPayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Generate a unique mock transaction ID
    const transactionId = `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    // Combine booking & payment payload
    const finalBookingRecord = {
      ...booking,
      transactionId,
      paymentStatus: 'Paid',
      paidAt: new Date().toISOString(),
    };

    try {
      // 1. Save to MongoDB database via your API endpoint
      await axiosPublic.post('/appointments', finalBookingRecord);

      // 2. Navigate to Payment Success page
      navigate('/dashboard/payment-success', { 
        state: { bookingDetails: finalBookingRecord } 
      });
    } catch (err) {
      console.error('Failed to save booking:', err);
      alert('Error saving booking. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-xl mx-auto px-4 sm:px-6 space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 text-[#3ca4f4] px-3 py-1 rounded-full text-xs font-bold">
            <FiShield className="w-3.5 h-3.5" />
            <span>Test Mode Sandbox</span>
          </div>
          <h1 className="text-3xl font-black text-[#0a2240]">Complete Payment</h1>
          <p className="text-gray-500 text-sm">Testing payment flow for: {booking.userEmail}</p>
        </div>

        {/* Payment Summary Box */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-lg p-6 sm:p-8 space-y-6">
          <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Patient</span>
              <span className="font-bold text-[#0a2240]">{booking.userName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Test Title</span>
              <span className="font-bold text-[#0a2240]">{booking.testTitle}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Scheduled Date</span>
              <span className="font-bold text-[#3ca4f4]">{booking.appointmentDate}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between items-center text-base font-black text-[#0a2240]">
              <span>Amount Due</span>
              <span>${booking.price}</span>
            </div>
          </div>

          <form onSubmit={handleSimulatedPayment}>
            <button
              type="submit"
              disabled={processing}
              className="w-full flex items-center justify-center gap-2 bg-[#0a2240] hover:bg-[#3ca4f4] text-white font-bold py-4 rounded-2xl transition-all shadow-md text-sm disabled:opacity-50"
            >
              <FiLock className="w-4 h-4" />
              <span>{processing ? 'Processing Demo Payment...' : `Simulate Pay $${booking.price}`}</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}