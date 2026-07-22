import { ShieldCheck, Ban, CheckCircle2, Eye } from 'lucide-react';

const UserRow = ({ user, onSeeInfo, onStatusToggle, onMakeAdmin }) => {
  const isBlocked = user.status === 'blocked';
  const isAdmin = user.role === 'admin';

  return (
    <tr className="hover:bg-gray-50/80 transition-colors border-b border-gray-100">
      {/* User Info */}
      <td className="py-4 px-4">
        <div className="flex items-center gap-3">
          <img
            src={user.photoURL || 'https://via.placeholder.com/40'}
            alt={user.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-200"
          />
          <div>
            <p className="font-bold text-gray-900 text-sm">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>
      </td>

      {/* Role Badge */}
      <td className="py-4 px-4">
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
          isAdmin ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'
        }`}>
          {isAdmin && <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />}
          {isAdmin ? 'Admin' : 'User'}
        </span>
      </td>

      {/* Status Badge */}
      <td className="py-4 px-4">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isBlocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {isBlocked ? 'Blocked' : 'Active'}
        </span>
      </td>

      {/* Actions */}
      <td className="py-4 px-4 text-right space-x-2">
        {/* See Info Button */}
        <button
          onClick={() => onSeeInfo(user)}
          className="inline-flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition"
        >
          <Eye className="w-3.5 h-3.5" /> Info
        </button>

        {/* Toggle Status Button */}
        <button
          onClick={() => onStatusToggle(user._id, isBlocked ? 'active' : 'blocked')}
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
            isBlocked
              ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
              : 'bg-red-50 text-red-600 hover:bg-red-100'
          }`}
        >
          {isBlocked ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Ban className="w-3.5 h-3.5" />}
          {isBlocked ? 'Activate' : 'Block'}
        </button>

        {/* Make Admin Button */}
        {!isAdmin && (
          <button
            onClick={() => onMakeAdmin(user._id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg text-xs font-medium transition"
          >
            <ShieldCheck className="w-3.5 h-3.5" /> Make Admin
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;