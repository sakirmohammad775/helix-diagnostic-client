import { X, Mail, Phone, Calendar, UserCheck } from 'lucide-react';

const UserInfoModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
          <UserCheck className="w-5 h-5 text-blue-600" /> User Profile Information
        </h3>

        {/* User Overview Header */}
        <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <img
            src={user.photoURL || 'https://via.placeholder.com/80'}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <div>
            <h4 className="font-bold text-gray-900 text-lg">{user.name}</h4>
            <div className="flex gap-2 mt-1">
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {user.role?.toUpperCase() || 'USER'}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                user.status === 'blocked' ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {user.status?.toUpperCase() || 'ACTIVE'}
              </span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="space-y-3 text-sm text-gray-700">
          <div className="flex items-center gap-3">
            <Mail className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Email Address</span>
              <p className="font-medium text-gray-800">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Phone className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Phone</span>
              <p className="font-medium text-gray-800">{user.phone || 'Not provided'}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-gray-400" />
            <div>
              <span className="text-xs text-gray-400 block">Registration Date</span>
              <p className="font-medium text-gray-800">{user.joinedDate || '2026-01-15'}</p>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition"
          >
            Close Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;