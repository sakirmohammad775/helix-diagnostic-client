import { useLocation, Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight } from 'react-icons/fi';

export default function PaymentSuccess() {
  const location = useLocation();
  const details = location.state?.bookingDetails || {
    testTitle: 'Full Body Comprehensive Checkup',
    price: 120,
    userName: 'John Doe',
    userEmail: 'johndoe@example.com',
    appointmentDate: '2026-08-10',
    transactionId: 'TXN_98A12B7C',
    paidAt: new Date().toISOString(),
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] py-16 flex items-center justify-center">
      <div className="max-w-lg w-full px-4">
        
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl p-8 text-center space-y-6">
          
          {/* Animated Success Badge */}
          <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <FiCheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h1 className="text-2xl font-black text-[#0a2240]">Payment Successful!</h1>
            <p className="text-gray-500 text-xs sm:text-sm">
              Your appointment has been confirmed. A confirmation receipt was sent to {details.userEmail}.
            </p>
          </div>

          {/* Receipt Box */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-3 text-left text-xs sm:text-sm">
            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-gray-400 font-medium">Transaction ID</span>
              <span className="font-mono font-bold text-[#0a2240]">{details.transactionId}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-gray-400 font-medium">Test Name</span>
              <span className="font-bold text-[#0a2240] line-clamp-1">{details.testTitle}</span>
            </div>

            <div className="flex justify-between items-center border-b border-slate-200/60 pb-2.5">
              <span className="text-gray-400 font-medium">Appointment Date</span>
              <span className="font-bold text-[#3ca4f4]">{details.appointmentDate}</span>
            </div>

            <div className="flex justify-between items-center pt-1 font-black text-[#0a2240] text-base">
              <span>Amount Paid</span>
              <span>${details.price}</span>
            </div>
          </div>

          {/* Action Button */}
          <Link
            to="/dashboard/appointments"
            className="w-full flex items-center justify-center gap-2 bg-[#0a2240] hover:bg-[#3ca4f4] text-white font-bold py-4 rounded-2xl transition-all shadow-md text-sm"
          >
            <span>View All Appointments</span>
            <FiArrowRight className="w-4 h-4" />
          </Link>

        </div>

      </div>
    </div>
  );
}