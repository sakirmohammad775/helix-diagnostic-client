import { 
  FaUser, 
  FaEnvelope, 
  FaTint, 
  FaMapMarkerAlt, 
  FaSignOutAlt, 
  FaCalendarAlt, 
  FaShieldAlt 
} from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

export default function Profile() {
  const { user, logOut } = useAuth();

  const handleLogoutClick = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Failed executing sign out transaction:", error);
    }
  };

  // Fallback structural asset if avatarUrl metadata hasn't fully propagated yet
  const defaultAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80";

  return (
    <section className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
          <div className="h-32 w-full bg-[#0a2240]" />
          
          <div className="px-8 pb-8 pt-0 flex flex-col sm:flex-row items-center sm:items-end sm:space-x-6 -mt-16 relative z-10 text-center sm:text-left">
            <img 
              src={user?.photoURL || defaultAvatar} 
              alt="User Profile Avatar" 
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-md bg-white"
            />
            <div className="mt-4 sm:mt-0 flex-1 space-y-1">
              <span className="bg-[#3ca4f4]/10 text-[#3ca4f4] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                Verified Patient
              </span>
              <h1 className="text-3xl font-black text-[#0a2240] tracking-tight mt-1">
                {user?.displayName || "Helix Patient"}
              </h1>
              <p className="text-sm font-semibold text-gray-400 flex items-center justify-center sm:justify-start space-x-1">
                <FaEnvelope className="text-xs" />
                <span>{user?.email}</span>
              </p>
            </div>
            
            <div className="mt-6 sm:mt-0">
              <button 
                onClick={handleLogoutClick}
                className="flex items-center space-x-2 bg-red-50 hover:bg-red-100 text-red-600 font-black py-2.5 px-5 rounded-xl transition-all text-xs"
              >
                <FaSignOutAlt />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>

        {/* Informational Cards Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Main Account Info Column */}
          <div className="md:col-span-2 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
            <h3 className="text-lg font-black text-[#0a2240] border-b border-gray-100 pb-3 flex items-center space-x-2">
              <FaUser className="text-[#3ca4f4]" />
              <span>Personal Account Parameters</span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Full Name</span>
                <p className="text-sm font-bold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {user?.displayName || "Not Specified"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Registered Email</span>
                <p className="text-sm font-bold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100 truncate">
                  {user?.email || "Not Specified"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Unique UID</span>
                <p className="text-xs font-mono font-bold text-gray-500 bg-slate-50 p-3 rounded-xl border border-slate-100 truncate">
                  {user?.uid || "N/A"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black text-gray-400 uppercase tracking-wider block">Account Created</span>
                <p className="text-sm font-bold text-gray-700 bg-slate-50 p-3 rounded-xl border border-slate-100 flex items-center space-x-2">
                  <FaCalendarAlt className="text-gray-300" />
                  <span>{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : "Recent"}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Medical & Location Metadata Column */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 space-y-6">
            <h3 className="text-lg font-black text-[#0a2240] border-b border-gray-100 pb-3 flex items-center space-x-2">
              <FaShieldAlt className="text-[#3ca4f4]" />
              <span>Medical & Region</span>
            </h3>

            {/* Blood Marker Display Card */}
            <div className="flex items-center space-x-4 bg-[#f4f8fc] p-4 rounded-2xl border border-[#3ca4f4]/10">
              <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                <FaTint />
              </div>
              <div>
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Blood Classification</span>
                <span className="text-sm font-extrabold text-[#0a2240]">Patient Managed Group</span>
              </div>
            </div>

            {/* Location Region Display Card */}
            <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-2xl border border-gray-100">
              <div className="w-12 h-12 bg-[#0a2240] text-white rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                <FaMapMarkerAlt />
              </div>
              <div>
                <span className="text-[11px] font-black text-gray-400 uppercase tracking-wider block">Regional Residence</span>
                <span className="text-sm font-extrabold text-[#0a2240]">Registered Zone</span>
              </div>
            </div>
            
            <div className="pt-2 text-center">
              <p className="text-[11px] font-medium text-gray-400 leading-relaxed">
                To update your health profile records or change settings, please file a request with the Helix administration desk.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}