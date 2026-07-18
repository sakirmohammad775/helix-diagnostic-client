import  { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSpinner, FaRegCheckCircle, FaGoogle } from 'react-icons/fa';
import useAuth from '../../../hooks/useAuth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [authError, setAuthError] = useState('');

  const { signIn, signInWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  // Redirect target calculation: checks location state history fallback parameters
  const fromTarget = location.state?.from?.pathname || "/patient";

  const onSubmit = async (data) => {
    setLoading(true);
    setAuthError('');
    try {
      await signIn(data.email, data.password);
      setLoginSuccess(true);
      setTimeout(() => navigate(fromTarget, { replace: true }), 1500);
    } catch (error) {
      setAuthError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError('');
    try {
      await signInWithGoogle();
      setLoginSuccess(true);
      setTimeout(() => navigate(fromTarget, { replace: true }), 1500);
    } catch (error) {
      setAuthError(error.message);
    }
  };

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="h-[6px] w-full bg-[#0a2240]" />
        <div className="p-8 sm:p-10 space-y-6">
          
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0a2240] tracking-tight">Welcome Back</h2>
          </div>

          {loginSuccess ? (
            <div className="bg-[#f4f8fc] p-8 rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-[#3ca4f4] text-white rounded-full flex items-center justify-center mx-auto">
                <FaRegCheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#0a2240]">Access Granted!</h3>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Email</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input type="email" {...register('email', { required: true })} placeholder="example@helix.com" className="w-full pl-10 pr-4 py-3 bg-[#f4f8fc] text-sm rounded-xl outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-black text-[#0a2240] uppercase tracking-wider">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                    <input type={showPassword ? 'text' : 'password'} {...register('password', { required: true })} placeholder="••••••••" className="w-full pl-10 pr-12 py-3 bg-[#f4f8fc] text-sm rounded-xl outline-none" />
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </div>

                {authError && <p className="text-red-500 text-[11px] font-bold text-center">{authError}</p>}

                <button type="submit" disabled={loading} className="w-full bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-black py-3.5 rounded-xl transition-all text-sm flex items-center justify-center space-x-2">
                  {loading && <FaSpinner className="animate-spin" />}
                  <span>Sign In</span>
                </button>
              </form>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="mx-4 text-gray-400 text-xs font-bold uppercase tracking-wider">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              <button onClick={handleGoogleSignIn} type="button" className="w-full flex items-center justify-center space-x-3 border border-gray-200 hover:bg-gray-50 text-gray-700 font-bold py-3 px-4 rounded-xl transition-colors text-sm">
                <FaGoogle className="text-red-500" />
                <span>Sign in with Google</span>
              </button>

              <div className="text-center pt-2">
                <p className="text-xs font-semibold text-gray-400">
                  Don't have an account? <NavLink to="/register" className="text-[#3ca4f4] hover:underline font-extrabold ml-1">Register Now</NavLink>
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}