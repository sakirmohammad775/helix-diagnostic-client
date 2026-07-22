import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../pages/Dashboard/DashboardHome/DashboardHeader';
import Sidebar from '../pages/Dashboard/DashboardHome/Sidebar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Replace with your actual auth context/state hook if available
  const user = { displayName: "Jane Doe", email: "jane@helix.com" };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header with Hamburger Toggle for Mobile */}
      <DashboardHeader 
        user={user} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      <div className="flex flex-1 relative">
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
          />
        )}

        {/* Responsive Sidebar (Sliding Drawer on Mobile, Fixed Sidebar on Desktop) */}
        <div
          className={`fixed md:static inset-y-0 left-0 z-30 transition-transform duration-300 transform ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <Sidebar closeMobileMenu={() => setIsSidebarOpen(false)} />
        </div>

        {/* Main Workspace */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;