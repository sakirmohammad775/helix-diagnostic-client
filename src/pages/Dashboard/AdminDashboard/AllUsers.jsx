import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShieldCheck, Ban, CheckCircle2, Eye, UserCheck, X, Mail, Phone, Calendar } from 'lucide-react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch all users
  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    },
  });

  // Toggle user status (Active <-> Blocked)
  const statusMutation = useMutation({
    mutationFn: async ({ userId, status }) => {
      const res = await axiosSecure.patch(`/users/status/${userId}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });

  // Promote user to admin
  const roleMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axiosSecure.patch(`/users/role/${userId}`, { role: 'admin' });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading user accounts...</div>;
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load user directory.</div>;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
      <div className="flex justify-between items-center border-b border-gray-100 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">All System Users</h2>
          <p className="text-sm text-gray-500">Manage patient accounts, access permissions, and roles.</p>
        </div>
        <span className="text-xs font-semibold bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
          Total Users: {users.length}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
              <th className="py-3 px-4">User Details</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              const isBlocked = user.status === 'blocked';
              const isAdmin = user.role === 'admin';

              return (
                <tr key={user._id} className="hover:bg-gray-50/80 transition-colors border-b border-gray-100">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.photoURL || 'https://via.placeholder.com/40'}
                        alt={user.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />}
                      {isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isBlocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {isBlocked ? 'Blocked' : 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right space-x-2">
                    <button
                      onClick={() => setSelectedUser(user)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition"
                    >
                      <Eye className="w-3.5 h-3.5" /> Info
                    </button>
                    <button
                      onClick={() => statusMutation.mutate({ userId: user._id, status: isBlocked ? 'active' : 'blocked' })}
                      className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                        isBlocked
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-red-50 text-red-600 hover:bg-red-100'
                      }`}
                    >
                      {isBlocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
                      {isBlocked ? 'Activate' : 'Block'}
                    </button>
                    {!isAdmin && (
                      <button
                        onClick={() => roleMutation.mutate(user._id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-medium transition"
                      >
                        <ShieldCheck className="w-3.5 h-3.5" /> Make Admin
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* User Info Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedUser(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-blue-600" /> User Profile Information
            </h3>
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
              <img
                src={selectedUser.photoURL || 'https://via.placeholder.com/80'}
                alt={selectedUser.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
              />
              <div>
                <h4 className="font-bold text-gray-900 text-lg">{selectedUser.name}</h4>
                <div className="flex gap-2 mt-1">
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                    {selectedUser.role?.toUpperCase() || 'USER'}
                  </span>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    selectedUser.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                  }`}>
                    {selectedUser.status?.toUpperCase() || 'ACTIVE'}
                  </span>
                </div>
              </div>
            </div>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-400 block">Email Address</span>
                  <p className="font-medium text-gray-800">{selectedUser.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-400 block">Phone</span>
                  <p className="font-medium text-gray-800">{selectedUser.phone || 'Not provided'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <span className="text-xs text-gray-400 block">Joined Date</span>
                  <p className="font-medium text-gray-800">{selectedUser.joinedDate || 'N/A'}</p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedUser(null)}
              className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;