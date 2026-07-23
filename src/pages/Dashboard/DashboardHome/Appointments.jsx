import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth'; // Replace with your actual Auth hook path
import { FiCalendar, FiCheckCircle } from 'react-icons/fi';

export default function Appointments() {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth(); // Gets current logged-in user

  // Fetch ONLY the bookings belonging to the currently authenticated user's email
  const { data: bookings = [], isLoading, isError } = useQuery({
    queryKey: ['userBookings', user?.email],
    enabled: !!user?.email, // Only query when user email is available
    queryFn: async () => {
      const res = await axiosPublic.get(`/appointments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-[#0a2240]">My Test Appointments</h1>
          <p className="text-gray-500 text-sm mt-1">
            Showing appointments booked for <span className="font-bold text-[#3ca4f4]">{user?.email}</span>
          </p>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 max-w-md mx-auto">
            <div className="w-8 h-8 border-4 border-[#3ca4f4] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500 text-sm font-medium">Fetching your appointments...</p>
          </div>
        ) : isError || bookings.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-10 text-center space-y-3 max-w-md mx-auto">
            <p className="text-gray-400 font-medium text-sm">No appointments found for your account.</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-extrabold uppercase text-gray-500 tracking-wider">
                    <th className="py-4 px-6">Test Name</th>
                    <th className="py-4 px-6">Scheduled Date</th>
                    <th className="py-4 px-6">Price</th>
                    <th className="py-4 px-6">Transaction ID</th>
                    <th className="py-4 px-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                  {bookings.map((item, index) => (
                    <tr key={item._id || index} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0a2240]">
                        {item.testTitle}
                      </td>
                      <td className="py-4 px-6">
                        <span className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold">
                          <FiCalendar className="w-3.5 h-3.5 text-[#3ca4f4]" />
                          {item.appointmentDate}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-bold text-[#0a2240]">
                        ${item.price}
                      </td>
                      <td className="py-4 px-6 font-mono text-xs text-gray-500">
                        {item.transactionId}
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <FiCheckCircle className="w-3 h-3" />
                          {item.paymentStatus || 'Paid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}