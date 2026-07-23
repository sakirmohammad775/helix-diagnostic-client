import { Link, useNavigate } from 'react-router-dom';
import { ShieldAlert, ArrowLeft, Home, Lock } from 'lucide-react';

const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl border border-gray-100 p-8 space-y-6 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Animated Icon Badge */}
        <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 text-red-600 mb-2">
          <ShieldAlert className="w-10 h-10" />
          <div className="absolute -bottom-1 -right-1 bg-red-600 text-white p-1.5 rounded-full border-2 border-white shadow-sm">
            <Lock className="w-4 h-4" />
          </div>
        </div>

        {/* Error Details */}
        <div className="space-y-2">
          <span className="text-xs font-bold tracking-widest uppercase text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">
            Error 403 • Access Denied
          </span>
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
            Restricted Access
          </h1>
          <p className="text-sm text-gray-500 leading-relaxed">
            You don’t have permission to view this page. This area is reserved exclusively for Helix Diagnostic administrators or active members.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-sm transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors duration-200 shadow-sm"
          >
            <Home className="w-4 h-4" />
            Home Page
          </Link>
        </div>

        {/* Support Note */}
        <p className="text-xs text-gray-400 border-t border-gray-100 pt-4">
          Think this is a mistake? Please contact the Helix support team.
        </p>
      </div>
    </div>
  );
};

export default Forbidden;