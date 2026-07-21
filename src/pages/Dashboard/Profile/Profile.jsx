import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetch patient profile details
const fetchPatientProfile = async () => {
  const res = await fetch('http://localhost:5000/patients/me');
  if (!res.ok) throw new Error('Failed to fetch profile data');
  return res.json();
};

const Profile = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['patientProfile'],
    queryFn: fetchPatientProfile,
  });

  const updateProfileMutation = useMutation({
    mutationFn: async (updatedData) => {
      const res = await fetch('http://localhost:5000/patients/me', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patientProfile'] });
      setIsEditing(false);
    },
  });

  if (isLoading) return <div className="p-4 text-gray-600">Loading profile data...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to load profile details.</div>;

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfileMutation.mutate(formData);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <button
          onClick={() => {
            setFormData(profile);
            setIsEditing(!isEditing);
          }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              defaultValue={profile?.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              defaultValue={profile?.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
            />
          </div>
          <button
            type="submit"
            disabled={updateProfileMutation.isPending}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <span className="font-semibold block text-sm text-gray-500">Full Name</span>
            <p className="text-lg">{profile?.name || 'N/A'}</p>
          </div>
          <div>
            <span className="font-semibold block text-sm text-gray-500">Email Address</span>
            <p className="text-lg">{profile?.email || 'N/A'}</p>
          </div>
          <div>
            <span className="font-semibold block text-sm text-gray-500">Phone Number</span>
            <p className="text-lg">{profile?.phone || 'N/A'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;