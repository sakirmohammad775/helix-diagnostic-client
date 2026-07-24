import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ArrowLeft, UserCheck, Calendar, FileText } from "lucide-react";

const UserDetails = () => {
  const { email } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // Decode the email in case React Router URL-encoded it (e.g. test%40gmail.com)
  const decodedEmail = email ? decodeURIComponent(email) : "";

  // Fetch appointments
  const {
    data: appointments = [],
    isLoading,
  } = useQuery({
    queryKey: ["user-appointments", decodedEmail],
    enabled: !!decodedEmail, // Only run query if email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/user-appointments/${encodeURIComponent(decodedEmail)}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Users Database
      </button>

      {/* Header Info */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" /> User Appointment History
          </h2>
          <p className="text-slate-500 text-sm mt-0.5">
            Showing records for <span className="font-semibold text-slate-800">{decodedEmail || "No Email Provided"}</span>
          </p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full border border-blue-200">
            Total Bookings: {appointments.length}
          </span>
        </div>
      </div>

      {/* Appointments List */}
      {appointments.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-slate-500">
          No appointments found for this user.
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                  <th className="p-4">#</th>
                  <th className="p-4">Test Title</th>
                  <th className="p-4">Appointment Date</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Payment</th>
                  <th className="p-4">Transaction ID</th>
                  <th className="p-4">Report Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {appointments.map((item, idx) => (
                  <tr key={item._id} className="hover:bg-slate-50 transition">
                    <td className="p-4 font-medium text-slate-400">{idx + 1}</td>
                    <td className="p-4 font-bold text-slate-800">{item.testTitle}</td>
                    <td className="p-4 text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        {item.appointmentDate}
                      </span>
                    </td>
                    <td className="p-4 font-semibold text-slate-800">${item.price}</td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                          item.paymentStatus === "Paid"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {item.paymentStatus || "Unpaid"}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-xs text-blue-600">
                      {item.transactionId || "N/A"}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                          item.reportStatus === "delivered"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        <FileText className="w-3 h-3" />
                        {item.reportStatus || "pending"}
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
  );
};

export default UserDetails;