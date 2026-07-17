import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaRegCheckCircle } from 'react-icons/fa';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data) => {
    setLoading(true);
    
    // LOGIC: Simulate network request delay for authentication
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log('Login credentials submitted:', data);
      setLoginSuccess(true);
      
      // Redirect user to home or dashboard after a short delay
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        
        {/* Top Decorative Border Accent */}
        <div className="h-[6px] w-full bg-[#0a2240]" />

        <div className="p-8 sm:p-10 space-y-8">
          
          {/* Header Typography */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0a2240] tracking-tight">Welcome Back</h2>
            <p className="text-sm text-gray-500">
              Sign in to manage your medical records and appointments.
            </p>
          </div>

          {loginSuccess ? (
            <div className="bg-[#f4f8fc] p-8 rounded-2xl border border-[#3ca4f4]/20 text-center space-y-4 animate-fadeIn">
              <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <FaRegCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0a2240]">Access Granted!</h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Redirecting you to the portal shortly...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              
              {/* 1. Email Input */}
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

              {/* 2. Password Input with Toggle */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Password</label>
                  <a href="#" className="text-xs font-extrabold text-[#3ca4f4] hover:underline">
                    Forgot Password?
                  </a>
                </div>
                
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    {...register('password', { 
                      required: 'Password is required',
                      minLength: { value: 6, message: 'Password must be at least 6 characters' }
                    })}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-12 py-3 bg-[#f4f8fc] text-sm text-gray-700 rounded-xl outline-none focus:ring-2 focus:ring-[#3ca4f4]/20 transition-all border border-gray-100"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-500 text-[11px] font-bold">{errors.password.message}</p>}
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`w-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-4 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-sm tracking-wide flex items-center justify-center space-x-2 ${
                    loading ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                >
                  {loading && <FaSpinner className="animate-spin" />}
                  <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
                </button>
              </div>

              {/* Redirect to Register page */}
              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-gray-400">
                  Don't have an account?{' '}
                  <NavLink to="/register" className="text-[#3ca4f4] hover:underline font-extrabold ml-1">
                    Register Now
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