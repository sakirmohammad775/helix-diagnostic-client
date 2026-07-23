import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaImage, 
  FaSpinner, 
  FaRegCheckCircle 
} from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

export default function Register() {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(''); 
  const [uploadingImage, setUploadingImage] = useState(false);  
  const [registrationSuccess, setRegistrationSuccess] = useState(false); 

  const districts = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh']; 
  const upazilasByDistrict = {
    Dhaka: ['Mirpur', 'Dhanmondi', 'Gulshan', 'Uttara', 'Savar'],
    Chattogram: ['Panchlaish', 'Double Mooring', 'Hathazari', 'Raozan', 'Sandwip'],
    Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Sreemangal'],
    Rajshahi: ['Boalia', 'Motihar', 'Rajpara', 'Puthia'],
    Khulna: ['Khalishpur', 'Daulatpur', 'Rupsha', 'Dumuria'],
    Barishal: ['Barishal Sadar', 'Bakerganj', 'Babuganj', 'Wazirpur'],
    Rangpur: ['Rangpur Sadar', 'Mithapukur', 'Pirganj', 'Kaunia'],
    Mymensingh: ['Mymensingh Sadar', 'Muktagachha', 'Trishal', 'Bhaluka'] 
  };

  const {
    register,
    handleSubmit, 
    watch, 
    setValue, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      avatarUrl: '',
      bloodGroup: '',
      district: '',
      upazila: '',
      password: '',
      confirm_password: ''
    }
  }); 

  const selectedDistrict = watch('district'); 
  const password = watch('password'); 

  useEffect(() => {
    setValue('upazila', '');
  }, [selectedDistrict, setValue]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true); 
    const formData = new FormData();
    formData.append('image', file); 

    const hostKey = import.meta.env.VITE_image_host_key;

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${hostKey}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        setValue('avatarUrl', data.data.url, { shouldValidate: true });
      } else {
        alert('Image upload failed. Please verify your ImgBB API Key.');
      }
    } catch (error) {
      console.error('Error uploading image to imgBB:', error);
    } finally {
      setUploadingImage(false); 
    }
  };

  const onSubmit = async (data) => {
    if (uploadingImage) return;
    setAuthError(''); 
    
    try {
      // 1. Create User in Firebase Authentication
      const result = await createUser(data.email, data.password);
      
      // 2. Update Firebase Display Name & Avatar
      await updateUserProfile(data.name, data.avatarUrl);
      
      // 3. POST User Details directly to MongoDB!
      const userInfo = {
        name: data.name,
        email: data.email,
        photoURL: data.avatarUrl || '',
        bloodGroup: data.bloodGroup,
        district: data.district,
        upazila: data.upazila,
        role: 'user',
        status: 'active'
      };

      const dbRes = await axiosPublic.post('/users', userInfo);
      console.log('MongoDB User Saved:', dbRes.data);

      setRegistrationSuccess(true);
      
      // Redirect to patient route after success
      setTimeout(() => {
        navigate('/patient');
      }, 1500);

    } catch (error) {
      console.error('Registration Error:', error);
      setAuthError(error.message || 'Registration failed. Please try again.'); 
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-[6px] w-full bg-[#0a2240]" />
        <div className="p-8 sm:p-12 space-y-8">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0a2240] tracking-tight">Create Your Account</h2>
          </div>

          {registrationSuccess ? (
            <div className="bg-[#f4f8fc] p-8 rounded-2xl border border-[#3ca4f4]/20 text-center space-y-4">
              <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <FaRegCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0a2240]">Registration Successful!</h3>
              <p className="text-gray-500 text-sm">Setting up your profile, routing you in...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Name */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="text" 
                      {...register('name', { required: 'Name is required' })} 
                      placeholder="John Doe" 
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none" 
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-[11px] font-bold">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="email" 
                      {...register('email', { required: 'Email is required' })} 
                      placeholder="example@helix.com" 
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none" 
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[11px] font-bold">{errors.email.message}</p>}
                </div>

                {/* Avatar File Upload */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Profile Avatar</label>
                  <div className="flex items-center space-x-4 p-4 bg-[#f4f8fc] rounded-xl border border-dashed border-gray-200">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      className="hidden" 
                      id="avatar-upload" 
                    />
                    <label htmlFor="avatar-upload" className="cursor-pointer bg-[#0a2240] hover:bg-[#14355c] text-white text-xs font-black px-4 py-2.5 rounded-lg flex items-center space-x-2">
                      {uploadingImage ? <FaSpinner className="animate-spin" /> : <FaImage />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                    </label>
                    <div className="flex-1 text-xs font-semibold text-gray-400">
                      {watch('avatarUrl') ? (
                        <span className="text-green-600">✓ Image uploaded & link attached</span>
                      ) : (
                        'Select custom image'
                      )}
                    </div>
                  </div>
                  {errors.avatarUrl && <p className="text-red-500 text-[11px] font-bold">{errors.avatarUrl.message}</p>}
                </div>

                {/* Blood Group */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Blood Group</label>
                  <select 
                    {...register('bloodGroup', { required: 'Blood group required' })} 
                    className="w-full px-4 py-3 bg-[#f4f8fc] text-sm rounded-xl outline-none border border-gray-100"
                  >
                    <option value="">Select Group</option>
                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                  {errors.bloodGroup && <p className="text-red-500 text-[11px] font-bold">{errors.bloodGroup.message}</p>}
                </div>

                {/* District */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">District</label>
                  <select 
                    {...register('district', { required: 'District required' })} 
                    className="w-full px-4 py-3 bg-[#f4f8fc] text-sm rounded-xl outline-none border border-gray-100"
                  >
                    <option value="">Select District</option>
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <p className="text-red-500 text-[11px] font-bold">{errors.district.message}</p>}
                </div>

                {/* Upazila */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Upazila</label>
                  <select 
                    {...register('upazila', { required: 'Upazila required' })} 
                    disabled={!selectedDistrict} 
                    className="w-full px-4 py-3 bg-[#f4f8fc] text-sm rounded-xl outline-none border border-gray-100 disabled:opacity-50"
                  >
                    <option value="">Select Upazila</option>
                    {selectedDistrict && upazilasByDistrict[selectedDistrict]?.map(u => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                  {errors.upazila && <p className="text-red-500 text-[11px] font-bold">{errors.upazila.message}</p>}
                </div>

                <div className="hidden sm:block" />

                {/* Password */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="password" 
                      {...register('password', { required: true, minLength: 6 })} 
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none" 
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="password" 
                      {...register('confirm_password', { 
                        required: true, 
                        validate: v => v === password || 'Mismatch' 
                      })} 
                      placeholder="••••••••" 
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none" 
                    />
                  </div>
                  {errors.confirm_password && <p className="text-red-500 text-[11px] font-bold">Passwords must match</p>}
                </div>

              </div>

              {authError && <p className="text-red-500 text-xs font-bold text-center">{authError}</p>}

              <button 
                type="submit" 
                disabled={uploadingImage} 
                className="w-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-4 rounded-xl shadow-md transition-all text-sm disabled:opacity-50"
              >
                Register Now
              </button>

              <div className="text-center">
                <p className="text-xs text-gray-400 font-semibold">
                  Already have an account? <NavLink to="/login" className="text-[#3ca4f4] hover:underline font-extrabold ml-1">Sign In</NavLink>
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}