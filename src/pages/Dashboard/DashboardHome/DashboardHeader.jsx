import { Link } from 'react-router-dom';
import { UserCircle, Menu, X, ShieldCheck } from 'lucide-react';
import useAuth from '../../../hooks/useAuth';
import useRole from '../../../hooks/useRole';

const DashboardHeader = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { user } = useAuth();
  const { role } = useRole();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      
      {/* Top Left: Mobile Toggle & Brand Logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 md:hidden focus:outline-none transition"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        <Link to="/" className="flex items-center gap-2.5">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-md shadow-blue-500/20">
            <ShieldCheck size={20} />
          </div>
          <span className="text-lg sm:text-xl font-bold text-slate-800 tracking-tight">
            Helix Diagnostic
          </span>
        </Link>
      </div>

      {/* Top Right: User Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <div className="flex items-center justify-end gap-1.5">
            <p className="text-sm font-bold text-slate-800">
              {user?.displayName || "User"}
            </p>
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              {role}
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {user?.email || "No email available"}
          </p>
        </div>

        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-slate-200 object-cover ring-2 ring-blue-50" 
          />
        ) : (
          <UserCircle className="w-10 h-10 text-slate-400" />
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;