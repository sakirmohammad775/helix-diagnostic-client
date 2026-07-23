import { NavLink } from 'react-router-dom';
import { 
  User, 
  Calendar, 
  FileText, 
  Users, 
  PlusCircle, 
  UploadCloud,
  LogOut
} from 'lucide-react';
import useAuth from '../../../hooks/useAuth';

const Sidebar = ({ role, closeMobileMenu }) => {
  const { logOut } = useAuth();

  const navItemClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
      isActive
        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 translate-x-1'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  return (
    // h-full + overflow-y-auto guarantees sidebar scrolls inside itself
    <div className="h-full flex flex-col justify-between p-4 overflow-y-auto border-r border-slate-200">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <nav className="flex flex-col gap-1.5">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-1">
            General
          </p>

          <NavLink
            to="/dashboard/profile"
            onClick={closeMobileMenu}
            className={navItemClass}
          >
            <User size={18} />
            <span>My Profile</span>
          </NavLink>

          {/* PATIENT / USER LINKS */}
          {role === 'user' && (
            <>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mt-4 mb-1">
                Patient Menu
              </p>

              <NavLink
                to="/dashboard/appointments"
                onClick={closeMobileMenu}
                className={navItemClass}
              >
                <Calendar size={18} />
                <span>My Appointments</span>
              </NavLink>

              <NavLink
                to="/dashboard/test-results"
                onClick={closeMobileMenu}
                className={navItemClass}
              >
                <FileText size={18} />
                <span>My Test Results</span>
              </NavLink>
            </>
          )}

          {/* ADMIN LINKS */}
          {role === 'admin' && (
            <>
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mt-4 mb-1">
                Management
              </p>

              <NavLink
                to="/dashboard/allUsers"
                onClick={closeMobileMenu}
                className={navItemClass}
              >
                <Users size={18} />
                <span>Manage Users</span>
              </NavLink>

              <NavLink
                to="/dashboard/addTest"
                onClick={closeMobileMenu}
                className={navItemClass}
              >
                <PlusCircle size={18} />
                <span>Add New Test</span>
              </NavLink>

              <NavLink
                to="/dashboard/upload-result"
                onClick={closeMobileMenu}
                className={navItemClass}
              >
                <UploadCloud size={18} />
                <span>Upload Results</span>
              </NavLink>
            </>
          )}
        </nav>
      </div>

      {/* Logout Action pinned at bottom */}
      <div className="pt-4 mt-6 border-t border-slate-100 shrink-0">
        <button
          onClick={logOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm text-rose-600 hover:bg-rose-50 transition"
        >
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;