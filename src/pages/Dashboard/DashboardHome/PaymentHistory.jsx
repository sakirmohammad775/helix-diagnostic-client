
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments?email=${user?.email}`);
      return res.data.filter((app) => app.paymentStatus === "Paid");
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
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Payment History</h2>

      {payments.length === 0 ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl text-slate-500">
          No payment records found.
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                <th className="p-4">#</th>
                <th className="p-4">Test Name</th>
                <th className="p-4">Transaction ID</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Date Paid</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {payments.map((item, idx) => (
                <tr key={item._id} className="hover:bg-slate-50">
                  <td className="p-4 font-medium text-slate-400">{idx + 1}</td>
                  <td className="p-4 font-bold text-slate-800">{item.testTitle}</td>
                  <td className="p-4 font-mono text-xs text-blue-600">{item.transactionId || "N/A"}</td>
                  <td className="p-4 font-bold text-emerald-600">${item.price}</td>
                  <td className="p-4 text-slate-500">
                    {item.paidAt ? new Date(item.paidAt).toLocaleDateString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;