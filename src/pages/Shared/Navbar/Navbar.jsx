import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X, LogOut,  } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Logo from "../Logo/Logo"; // Reusable Logo Component

export default function Navbar() {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOutAction = async () => {
    try {
      await logOut();
      navigate("/login");
    } catch (error) {
      console.error("Sign out execution failure:", error);
    }
  };

  const navLinks = [
    { name: "Home", path: "/", hasDropdown: false },
    { name: "All Tests", path: "/tests", hasDropdown: false },
    { name: "Services", path: "/services", hasDropdown: false },
    { name: "About Us", path: "/about", hasDropdown: false },
    { name: "Blog", path: "/blog", hasDropdown: false },
    { name: "Contact", path: "/contact", hasDropdown: false },
  ];

  return (
    <header className="w-full sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      {/* 1. TOP BRAND ACCENT BAR */}
      <div className="h-[4px] w-full bg-gradient-to-r from-[#0a2240] via-[#3ca4f4] to-[#0a2240]" />

      {/* 2. MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* REUSABLE LOGO */}
          <div className="flex items-center">
            <Logo />
          </div>

          {/* 3. DESKTOP NAVIGATION MENU */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-6">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-[15px] font-bold tracking-wide transition-all duration-200 flex items-center space-x-1.5 rounded-lg ${
                      isActive
                        ? "text-[#3ca4f4] bg-[#3ca4f4]/10"
                        : "text-[#0a2240] hover:text-[#3ca4f4] hover:bg-gray-50"
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-[#3ca4f4] group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </NavLink>

                {/* Dropdown Menu Overlay */}
                {link.hasDropdown && (
                  <div className="absolute left-0 top-[85%] w-52 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 translate-y-3 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50 overflow-hidden p-1.5">
                    <NavLink
                      to={`${link.path}`}
                      className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#f4f8fc] hover:text-[#3ca4f4] rounded-lg transition-colors"
                    >
                      Popular Diagnostic Packages
                    </NavLink>
                    <NavLink
                      to={`${link.path}`}
                      className="block px-4 py-2.5 text-xs font-bold text-gray-700 hover:bg-[#f4f8fc] hover:text-[#3ca4f4] rounded-lg transition-colors"
                    >
                      Specialized Lab Services
                    </NavLink>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 4. USER ACTION AREA */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-3 bg-gray-50/80 p-1.5 pl-4 rounded-full border border-gray-100 shadow-inner">
                {/* User Greeting/Profile Trigger */}
                <NavLink
                  to="/dashboard/profile"
                  className="flex items-center gap-2 group"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="Profile"
                    className="w-9 h-9 rounded-full object-cover ring-2 ring-[#3ca4f4]/40 group-hover:ring-[#3ca4f4] transition-all"
                  />
                  <span className="text-sm font-extrabold text-[#0a2240] group-hover:text-[#3ca4f4] transition-colors max-w-[100px] truncate">
                    {user.displayName?.split(" ")[0] || "Account"}
                  </span>
                </NavLink>

                {/* Sign Out Button */}
                <button
                  onClick={handleSignOutAction}
                  title="Sign Out"
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <NavLink
                  to="/login"
                  className="inline-flex items-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-extrabold py-2.5 px-6 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95"
                >
                  <span className="text-sm">Sign In</span>
                  <span className="text-xs font-black">≫</span>
                </NavLink>
              </div>
            )}
          </div>

          {/* 5. MOBILE MENU TRIGGER */}
          <div className="flex lg:hidden items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl bg-gray-50 text-[#0a2240] hover:bg-gray-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2.5]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 6. MOBILE RESPONSIVE DRAWER */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-2xl transition-all">
          <div className="px-4 pt-3 pb-6 space-y-1.5">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex justify-between items-center py-3 px-4 rounded-xl text-base font-extrabold transition-all ${
                    isActive
                      ? "bg-[#3ca4f4]/15 text-[#3ca4f4]"
                      : "text-gray-800 hover:bg-gray-50 hover:text-[#3ca4f4]"
                  }`
                }
              >
                <span>{link.name}</span>
                {link.hasDropdown && (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </NavLink>
            ))}

            {/* Mobile Auth Actions */}
            <div className="pt-4 mt-2 border-t border-gray-100 px-2">
              {user ? (
                <div className="space-y-2">
                  <NavLink
                    to="/dashboard/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 text-[#0a2240] font-bold"
                  >
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span>My Dashboard</span>
                  </NavLink>
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleSignOutAction();
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-extrabold py-3 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-extrabold py-3 rounded-xl transition-colors"
                >
                  <span>Sign In</span>
                  <span>≫</span>
                </NavLink>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}