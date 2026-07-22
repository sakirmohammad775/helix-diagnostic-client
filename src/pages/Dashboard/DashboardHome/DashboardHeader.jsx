import { Link } from 'react-router-dom';
import { UserCircle, Menu, X } from 'lucide-react';

const DashboardHeader = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-10">
      
      {/* Top Left: Hamburger Button (Mobile) + Logo & Brand Name */}
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 md:hidden focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Your Original Logo Structure */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-blue-600 text-white font-bold text-xl px-3 py-1 rounded">
            H
          </div>
          <span className="text-lg sm:text-xl font-bold text-gray-800 tracking-tight">
            Helix Diagnostic
          </span>
        </Link>
      </div>

      {/* Top Right: Profile Details */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-700">
            {user?.displayName || "Patient"}
          </p>
          <p className="text-xs text-gray-500">
            {user?.email || "patient@helix.com"}
          </p>
        </div>

        {user?.photoURL ? (
          <img 
            src={user.photoURL} 
            alt="Profile" 
            className="w-10 h-10 rounded-full border border-gray-300 object-cover" 
          />
        ) : (
          <UserCircle className="w-10 h-10 text-gray-400" />
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;