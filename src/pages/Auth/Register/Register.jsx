import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaImage, 
  FaTint, 
  FaMapMarkerAlt, 
  FaSpinner, 
  FaRegCheckCircle 
} from 'react-icons/fa';

export default function Register() {
  const [uploadingImage, setUploadingImage] = useState(false); //state to track image upload status  
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // state to track registration success

  // Mock geographical datasets for District/Upazila selector mapping
  const districts = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh']; // List of districts in Bangladesh
  const upazilasByDistrict = {
    Dhaka: ['Mirpur', 'Dhanmondi', 'Gulshan', 'Uttara', 'Savar'],
    Chattogram: ['Panchlaish', 'Double Mooring', 'Hathazari', 'Raozan', 'Sandwip'],
    Sylhet: ['Sylhet Sadar', 'Beanibazar', 'Golapganj', 'Sreemangal'],
    Rajshahi: ['Boalia', 'Motihar', 'Rajpara', 'Puthia'],
    Khulna: ['Khalishpur', 'Daulatpur', 'Rupsha', 'Dumuria'],
    Barishal: ['Barishal Sadar', 'Bakerganj', 'Babuganj', 'Wazirpur'],
    Rangpur: ['Rangpur Sadar', 'Mithapukur', 'Pirganj', 'Kaunia'],
    Mymensingh: ['Mymensingh Sadar', 'Muktagachha', 'Trishal', 'Bhaluka'] // Sample Upazilas for each district
  };

  const {
    register,
    handleSubmit, // Handles form submission and validation
    watch, // Watch specific form fields for dynamic behavior
    setValue, // Set values programmatically for fields (e.g., after image upload)
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
  }); // Initialize react-hook-form with default values for all fields

  // Watch district value to dynamically switch Upazila selections
  const selectedDistrict = watch('district'); // Watch the 'district' field to dynamically update the Upazila options based on the selected district
  const password = watch('password'); // Watch the 'password' field to validate confirm password against it

  // Clear upazila if selected district changes
  useEffect(() => {
    setValue('upazila', '');
  }, [selectedDistrict, setValue]);

  // LOGIC: Handles the direct image upload to imgBB
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true); // Set uploading state to true while the image is being uploaded 

    const formData = new FormData();
    formData.append('image', file); // Append the selected image file to the FormData object for submission to imgBB

    const IMGBB_API_KEY = 'YOUR_IMGBB_API_KEY_HERE'; 

    try {
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        // Inject the returned direct URL into our react-hook-form register state
        setValue('avatarUrl', data.data.url, { shouldValidate: true });
      } else {
        alert('Image upload failed. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading image to imgBB:', error);
    } finally {
      setUploadingImage(false); // Reset uploading state after the upload process completes, regardless of success or failure
    }
  };

  const onSubmit = (data) => {
    // Prevent submission if image is still uploading
    if (uploadingImage) return;
    
    console.log('Final Registration Data Sent to Backend:', data);
    setRegistrationSuccess(true);
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Top Decorative Border Accent */}
        <div className="h-[6px] w-full bg-[#0a2240]" />

        <div className="p-8 sm:p-12 space-y-8">
          
          {/* Header Typography */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0a2240] tracking-tight">Create Your Account</h2>
            <p className="text-sm text-gray-500">
              Join Helix Diagnostics to manage your bookings and medical records.
            </p>
          </div>

          {registrationSuccess ? (
            <div className="bg-[#f4f8fc] p-8 rounded-2xl border border-[#3ca4f4]/20 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <FaRegCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0a2240]">Registration Successful!</h3>
              <p className="text-gray-500 text-sm max-w-md mx-auto">
                Your account is ready. You can now access full dashboard privileges.
              </p>
              <div className="pt-2">
                <NavLink 
                  to="/login" 
                  className="inline-block bg-[#3ca4f4] hover:bg-[#2b93e3] text-white text-sm font-bold py-3 px-8 rounded-full transition-colors shadow-md"
                >
                  Go to Login
                </NavLink>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* 1. Name Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="text"
                      {...register('name', { required: 'Name is required' })}
                      placeholder="John Doe"
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                    />
                  </div>
                  {errors.name && <p className="text-red-500 text-[11px] font-bold">{errors.name.message}</p>}
                </div>

                {/* 2. Email Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="email"
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' }
                      })}
                      placeholder="example@helix.com"
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-[11px] font-bold">{errors.email.message}</p>}
                </div>

                {/* 3. Avatar Upload Field (imgBB Integration) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Profile Avatar</label>
                  <div className="flex items-center space-x-4 p-4 bg-[#f4f8fc] rounded-xl border border-dashed border-gray-200">
                    <div className="relative">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="avatar-upload"
                      />
                      <label 
                        htmlFor="avatar-upload"
                        className="cursor-pointer bg-[#0a2240] hover:bg-[#14355c] text-white text-xs font-black px-4 py-2.5 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        {uploadingImage ? <FaSpinner className="animate-spin" /> : <FaImage />}
                        <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      </label>
                    </div>
                    
                    <div className="flex-1">
                      {watch('avatarUrl') ? (
                        <p className="text-xs text-green-600 font-semibold truncate max-w-xs">
                          ✓ Image successfully hosted on imgBB!
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 font-semibold">
                          Please choose an image to upload.
                        </p>
                      )}
                    </div>

                    {watch('avatarUrl') && (
                      <img 
                        src={watch('avatarUrl')} 
                        alt="Avatar Preview" 
                        className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"
                      />
                    )}
                  </div>
                  {/* Registering dynamic string avatar value for validation mapping */}
                  <input type="hidden" {...register('avatarUrl', { required: 'Avatar upload is required' })} />
                  {errors.avatarUrl && <p className="text-red-500 text-[11px] font-bold mt-1">{errors.avatarUrl.message}</p>}
                </div>

                {/* 4. Blood Group Select Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Blood Group</label>
                  <div className="relative">
                    <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <select
                      {...register('bloodGroup', { required: 'Please select your blood group' })}
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100 appearance-none"
                    >
                      <option value="">Select Group</option>
                      {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((group) => (
                        <option key={group} value={group}>{group}</option>
                      ))}
                    </select>
                  </div>
                  {errors.bloodGroup && <p className="text-red-500 text-[11px] font-bold">{errors.bloodGroup.message}</p>}
                </div>

                {/* 5. District Select Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">District</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <select
                      {...register('district', { required: 'District is required' })}
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100 appearance-none"
                    >
                      <option value="">Select District</option>
                      {districts.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  {errors.district && <p className="text-red-500 text-[11px] font-bold">{errors.district.message}</p>}
                </div>

                {/* 6. Upazila Select Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Upazila</label>
                  <div className="relative">
                    <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <select
                      {...register('upazila', { required: 'Upazila is required' })}
                      disabled={!selectedDistrict}
                      className={`w-full pl-10 pr-4 py-3 text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100 appearance-none ${
                        selectedDistrict ? 'bg-[#f4f8fc]' : 'bg-gray-150 cursor-not-allowed opacity-50'
                      }`}
                    >
                      <option value="">Select Upazila</option>
                      {selectedDistrict &&
                        upazilasByDistrict[selectedDistrict]?.map((u) => (
                          <option key={u} value={u}>{u}</option>
                        ))}
                    </select>
                  </div>
                  {errors.upazila && <p className="text-red-500 text-[11px] font-bold">{errors.upazila.message}</p>}
                </div>

                {/* Empty block to align grid on deskop screen dimensions */}
                <div className="hidden sm:block" />

                {/* 7. Password Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="password"
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: { value: 6, message: 'Password must be at least 6 characters long' }
                      })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                    />
                  </div>
                  {errors.password && <p className="text-red-500 text-[11px] font-bold">{errors.password.message}</p>}
                </div>

                {/* 8. Confirm Password Field */}
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Confirm Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input 
                      type="password"
                      {...register('confirm_password', { 
                        required: 'Please confirm your password',
                        validate: value => value === password || 'Passwords do not match'
                      })}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                    />
                  </div>
                  {errors.confirm_password && <p className="text-red-500 text-[11px] font-bold">{errors.confirm_password.message}</p>}
                </div>

              </div>

              {/* Submit Trigger Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={uploadingImage}
                  className={`w-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-wide ${
                    uploadingImage ? 'opacity-55 cursor-not-allowed' : ''
                  }`}
                >
                  Register Now
                </button>
              </div>

              {/* Redirection link */}
              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-gray-400">
                  Already have an account?{' '}
                  <NavLink to="/login" className="text-[#3ca4f4] hover:underline font-extrabold ml-1">
                    Sign In
                  </NavLink>
                </p>
              </div>

            </form>
          )}

        </div>
      </div>
    </section>
  );
}