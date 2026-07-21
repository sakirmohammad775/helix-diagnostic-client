import { NavLink } from 'react-router-dom';
import { Calendar, FileText, User } from 'lucide-react';

const Sidebar = () => {
  const navItems = [
    { label: 'My Profile', path: '/dashboard/profile', icon: User },
    { label: 'Upcoming Appointments', path: '/dashboard/appointments', icon: Calendar },
    { label: 'Test Results', path: '/dashboard/results', icon: FileText },
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-200 min-h-[calc(100vh-4rem)] p-4 flex flex-col justify-between">
      <nav className="space-y-2">
        <p className="text-xs font-semibold uppercase text-gray-400 px-3 mb-4 tracking-wider">
          Patient Portal
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;