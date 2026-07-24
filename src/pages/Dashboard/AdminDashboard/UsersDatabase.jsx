
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Users, Calendar, ArrowRight, Shield, User } from "lucide-react";

const UsersDatabase = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users-database"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-with-stats");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10 text-red-500">
        <p className="font-semibold">Failed to load users database.</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-4 py-1.5 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-6 h-6 text-blue-600" /> Users Database
          </h2>
          <p className="text-slate-500 text-sm mt-1">
            Overview of all registered users and their total appointment counts.
          </p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-700 font-semibold text-xs rounded-full border border-blue-200">
          Total Users: {users.length}
        </span>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                <th className="p-4">User</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Total Appointments</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {users.map((item) => (
                <tr
                  key={item._id}
                  onClick={() => navigate(`/dashboard/user-details/${item.email}`)}
                  className="hover:bg-slate-50/80 transition cursor-pointer group"
                >
                  {/* User Profile Info */}
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.avatar || item.photoURL || "https://i.ibb.co/vCr6JgVz/image1.avif"}
                        alt={item.name || "User"}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://i.ibb.co/vCr6JgVz/image1.avif";
                        }}
                      />
                      <div>
                        <p className="font-bold text-slate-800 group-hover:text-blue-600 transition">
                          {item.name || item.displayName || "N/A"}
                        </p>
                        <p className="text-xs text-slate-400">{item.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 capitalize">
                      {item.role === "admin" ? <Shield className="w-3 h-3 text-blue-600" /> : <User className="w-3 h-3 text-slate-400" />}
                      {item.role || "user"}
                    </span>
                  </td>

                  {/* Account Status */}
                  <td className="p-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize ${
                        item.status === "blocked"
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {item.status || "active"}
                    </span>
                  </td>

                  {/* Total Appointments Badge */}
                  <td className="p-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 font-bold text-xs rounded-full border border-blue-100">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.totalAppointments || 0}
                    </span>
                  </td>

                  {/* Action Button */}
                  <td className="p-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevents double click trigger
                        navigate(`/dashboard/user-details/${item.email}`);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 group-hover:bg-blue-600 group-hover:text-white text-slate-700 text-xs font-semibold rounded-lg transition"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersDatabase;