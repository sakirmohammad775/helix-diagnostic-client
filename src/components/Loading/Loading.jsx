import { Activity } from 'lucide-react';

const Loading = ({ fullScreen = true, message = 'Loading Helix Diagnostic...' }) => {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${
        fullScreen ? 'min-h-screen bg-gray-50/80 backdrop-blur-sm' : 'w-full py-12'
      }`}
    >
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Glow */}
        <div className="absolute w-16 h-16 bg-blue-500/20 rounded-full animate-ping" />

        {/* Outer Spinning Ring */}
        <div className="w-14 h-14 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />

        {/* Center Brand Icon */}
        <div className="absolute text-blue-600 animate-pulse">
          <Activity className="w-6 h-6" />
        </div>
      </div>

      {/* Loading Message */}
      <p className="mt-4 text-sm font-medium text-gray-600 tracking-wide animate-pulse">
        {message}
      </p>
    </div>
  );
};

export default Loading;