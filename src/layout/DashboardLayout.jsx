import { Outlet } from 'react-router-dom';
import DashboardHeader from '../pages/Dashboard/DashboardHome/DashboardHeader';
import Sidebar from '../pages/Dashboard/DashboardHome/Sidebar';

const DashboardLayout = () => {
  // Replace with your actual auth context/state hook if available
  const user = { displayName: "Jane Doe", email: "jane@helix.com" };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Clean Top Bar */}
      <DashboardHeader user={user} />

      {/* Main Workspace */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;