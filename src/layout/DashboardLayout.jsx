import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from '../pages/Dashboard/DashboardHome/DashboardHeader';
import Sidebar from '../pages/Dashboard/DashboardHome/Sidebar';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return <Loading message="Checking permissions..." />;
  }

  return (
    // 1. h-screen + overflow-hidden keeps the whole page locked so body doesn't double-scroll
    <div className="h-screen w-screen bg-slate-50 flex flex-col overflow-hidden">
      
      {/* 2. Fixed Header stays pinned at top */}
      <DashboardHeader 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
      />

      {/* 3. Container filling remaining height (100vh - 4rem header) */}
      <div className="flex flex-1 relative h-[calc(100vh-4rem)] overflow-hidden">
        
        {/* Mobile Backdrop Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 top-16 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          />
        )}

        {/* Responsive Sidebar Drawer */}
        <aside
          className={`fixed md:static top-16 bottom-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out shrink-0 ${
            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
        >
          <Sidebar 
            role={role}
            closeMobileMenu={() => setIsSidebarOpen(false)} 
          />
        </aside>

        {/* Main Content Workspace - Independent Vertical Scroll */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto w-full h-full">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;