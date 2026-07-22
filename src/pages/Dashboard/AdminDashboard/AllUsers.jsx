import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UserRow from './UserRow';
import UserInfoModal from './UserInfoModal';

// API Fetchers
const fetchUsers = async () => {
  const res = await fetch('http://localhost:5000/users'); // Replace with your Express backend route
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

const AllUsers = () => {
  const queryClient = useQueryClient();
  const [selectedUser, setSelectedUser] = useState(null);

  const { data: users = [], isLoading, isError } = useQuery({
    queryKey: ['allUsers'],
    queryFn: fetchUsers,
  });

  // Change User Status Mutation (active / blocked)
  const statusMutation = useMutation({
    mutationFn: async ({ userId, status }) => {
      const res = await fetch(`http://localhost:5000/users/status/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allUsers'] });
    },
  });

  // Change User Role Mutation (make admin)
  const roleMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`http://localhost:5000/users/role/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'admin' }),
      });
      return res.json();
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

      {/* Users Table */}
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
            {users.map((user) => (
              <UserRow
                key={user._id}
                user={user}
                onSeeInfo={(u) => setSelectedUser(u)}
                onStatusToggle={(id, newStatus) =>
                  statusMutation.mutate({ userId: id, status: newStatus })
                }
                onMakeAdmin={(id) => roleMutation.mutate(id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Reusable Detail Modal */}
      {selectedUser && (
        <UserInfoModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  );
};

export default AllUsers;