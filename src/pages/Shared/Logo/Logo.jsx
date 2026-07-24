import { NavLink } from "react-router-dom";

export default function Logo({ className = "", showText = true, size = 10 }) {
  return (
    <NavLink
      to="/"
      className={`flex items-center space-x-3 cursor-pointer group ${className}`}
    >
      {/* Circular Caduceus/Medical Icon */}
      <div
        className={`w-${size} h-${size} rounded-full bg-[#3ca4f4] flex items-center justify-center text-white shadow-sm transition-transform duration-300 group-hover:scale-105`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5"
        >
          <path d="M12 22V8M5 12h14M12 5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
          <path d="M12 8c-2 1-4 3-4 6s2 5 4 6c2-1 4-3 4-6s-2-5-4-6Z" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span className="text-2xl font-black text-[#1a202c] tracking-tight">
          Helix<span className="text-[#3ca4f4]">.</span>
        </span>
      )}
    </NavLink>
  );
}