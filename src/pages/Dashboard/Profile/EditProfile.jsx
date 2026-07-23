import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'; 
import useAxiosPublic from '../../../hooks/useAxiosPublic';

// Example Districts & Upazilas Data structure
const districtUpazilaMap = {
  Dhaka: ['Dhanmondi', 'Gulshan', 'Mirpur', 'Uttara', 'Savaria'],
  Chattogram: ['Panchlaish', 'Double Mooring', 'Halishahar', 'Hathazari', 'Kotwali'],
  Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Sreemangal'],
  Barishal: ['Barishal Sadar', 'Babuganj', 'Bakerganj'],
  Rajshahi: ['Boalia', 'Rajpara', 'Paba', 'Godagari'],
  Khulna: ['Khulna Sadar', 'Daulatpur', 'Sonadanga']
};

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY; 

const EditProfile = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    photoURL: '',
    bloodGroup: '',
    district: '',
    upazila: '',
  });

  // Fetch current user data from Mongo
  const { data: profile, isLoading } = useQuery({
    queryKey: ['patientProfile', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user?.email}`);
      return res.data;
    },
  });

  // Populate local form state when data is loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || user?.displayName || '',
        photoURL: profile.photoURL || user?.photoURL || '',
        bloodGroup: profile.bloodGroup || '',
        district: profile.district || '',
        upazila: profile.upazila || '',
      });
    }
  }, [profile, user]);

  // Handle District Change & Reset Upazila
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setFormData((prev) => ({
      ...prev,
      district: selectedDistrict,
      upazila: '', // Reset upazila when district changes
    }));
  };

  // Profile Update Mutation
  const updateMutation = useMutation({
    mutationFn: async (updatedPayload) => {
      const res = await axiosPublic.put(`/users/${user?.email}`, updatedPayload);
      return res.data;
    },
    onSuccess: () => {
      // Refresh cached user profile query so profile page immediately shows updated info
      queryClient.invalidateQueries({ queryKey: ['patientProfile', user?.email] });
      // Redirect back to profile page
      navigate('/dashboard/profile'); 
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    let finalPhotoURL = formData.photoURL;

    // 1. If user chose a new photo file, upload to ImgBB first
    if (imageFile) {
      setImageUploading(true);
      const imageFormData = new FormData();
      imageFormData.append('image', imageFile);

      try {
        const res = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
          method: 'POST',
          body: imageFormData,
        });
        const imgData = await res.json();
        if (imgData.success) {
          finalPhotoURL = imgData.data.display_url;
        }
      } catch (err) {
        console.error('Failed to upload image to ImgBB:', err);
      } finally {
        setImageUploading(false);
      }
    }

    // 2. Prepare payload & mutate database
    const payload = {
      name: formData.name,
      photoURL: finalPhotoURL,
      bloodGroup: formData.bloodGroup,
      district: formData.district,
      upazila: formData.upazila,
    };

    updateMutation.mutate(payload);
  };

  if (isLoading) {
    return <div className="p-6 text-gray-600 font-medium">Loading user profile for edit...</div>;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Enter full name"
          />
        </div>

        {/* Avatar Upload (ImgBB) */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
          <div className="flex items-center gap-4">
            {formData.photoURL && (
              <img
                src={formData.photoURL}
                alt="Current Avatar"
                className="w-12 h-12 rounded-full object-cover border"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files[0])}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
        </div>

        {/* Blood Group Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
          <select
            value={formData.bloodGroup}
            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select Blood Group</option>
            {bloodGroups.map((bg) => (
              <option key={bg} value={bg}>{bg}</option>
            ))}
          </select>
        </div>

        {/* District Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
          <select
            value={formData.district}
            onChange={handleDistrictChange}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            <option value="">Select District</option>
            {Object.keys(districtUpazilaMap).map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>

        {/* Upazila Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Upazila</label>
          <select
            value={formData.upazila}
            onChange={(e) => setFormData({ ...formData, upazila: e.target.value })}
            disabled={!formData.district}
            className="w-full rounded-md border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">Select Upazila</option>
            {formData.district &&
              districtUpazilaMap[formData.district]?.map((upz) => (
                <option key={upz} value={upz}>{upz}</option>
              ))}
          </select>
        </div>

        {/* Submit & Cancel Buttons */}
        <div className="flex gap-3 pt-3">
          <button
            type="submit"
            disabled={updateMutation.isPending || imageUploading}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-semibold disabled:opacity-50"
          >
            {updateMutation.isPending || imageUploading ? 'Saving Changes...' : 'Save Changes'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/dashboard/profile')}
            className="px-5 py-2.5 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition text-sm font-semibold"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;