import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'; 
import useAxiosPublic from '../../../hooks/useAxiosPublic'; 

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const { data: profile, isLoading, isError } = useQuery({
    queryKey: ['patientProfile', user?.email],
    enabled: !authLoading && !!user?.email, 
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <div className="p-6 text-blue-600 font-medium animate-pulse">
          Loading profile data from database...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-3xl mx-auto my-6 space-y-6">
      
      {/* Error alert if email doesn't match MongoDB */}
      {isError && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
          ⚠️ No record found in MongoDB for <strong>{user?.email}</strong>. Please check if your email in MongoDB has a typo!
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
        <button
          onClick={() => navigate('/dashboard/profile/edit')}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition text-sm font-medium shadow-sm"
        >
          Edit Profile
        </button>
      </div>

      {/* Main Profile Info Header */}
      <div className="flex items-center gap-5 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <img
          src={profile?.photoURL || user?.photoURL || 'https://via.placeholder.com/100'}
          alt="Profile Avatar"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-500 shadow-sm"
        />
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-gray-800">{profile?.name || 'N/A'}</h3>
          <p className="text-sm text-gray-500">{profile?.email || user?.email}</p>
          
          <div className="flex gap-2 pt-1">
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-green-100 text-green-800 uppercase">
              {profile?.status || 'active'}
            </span>
            <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
              Role: {profile?.role || 'user'}
            </span>
          </div>
        </div>
      </div>

      {/* Detailed MongoDB Information Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 pt-2">
        
        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
          <span className="font-semibold block text-xs uppercase text-gray-400 mb-1">Blood Group</span>
          <p className="text-base font-bold text-gray-800">{profile?.bloodGroup || 'N/A'}</p>
        </div>

        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
          <span className="font-semibold block text-xs uppercase text-gray-400 mb-1">District</span>
          <p className="text-base font-bold text-gray-800">{profile?.district || 'N/A'}</p>
        </div>

        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
          <span className="font-semibold block text-xs uppercase text-gray-400 mb-1">Upazila</span>
          <p className="text-base font-bold text-gray-800">{profile?.upazila || 'N/A'}</p>
        </div>

        <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-xs">
          <span className="font-semibold block text-xs uppercase text-gray-400 mb-1">Joined Date</span>
          <p className="text-base font-bold text-gray-800">{profile?.joinedDate || 'N/A'}</p>
        </div>

      </div>
    </div>
  );
};

export default Profile;