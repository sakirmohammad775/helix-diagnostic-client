import { useState } from 'react';
import { NavLink } from 'react-router-dom'; // LOGIC: Added React Router integration
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  // LOGIC: State to manage mobile-responsive menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Configuration object for navbar links to keep the markup clean and DRY
  const navLinks = [
    { name: 'Home', path: '/', hasDropdown: true },
    { name: 'About', path: '/about', hasDropdown: false },
    { name: 'Service', path: '/services', hasDropdown: true },
    { name: 'Blog', path: '/blog', hasDropdown: true },
    { name: 'Pages', path: '/pages', hasDropdown: true },
    { name: 'Contact', path: '/contact', hasDropdown: false },
  ];

  return (
    <header className="w-full bg-white font-sans relative z-50">
      {/* 1. TOP BAR: The thin, dark blue bar stretching across the very top */}
      <div className="h-[6px] w-full bg-[#0a2240]" />

      {/* 2. MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO SECTION */}
          <NavLink to="/" className="flex items-center space-x-3 cursor-pointer">
            {/* The circular, light-blue Caduceus/Medical icon wrapper */}
            <div className="w-10 h-10 rounded-full bg-[#3ca4f4] flex items-center justify-center text-white shadow-sm">
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
            {/* Helix Text Logo */}
            <span className="text-2xl font-black text-[#1a202c] tracking-tight">Helix</span>
          </NavLink>

          {/* 3. DESKTOP NAVIGATION MENU (Filled & Integrated with Route handling) */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group py-5">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 text-[15px] font-bold tracking-wide transition-colors ${
                      isActive 
                        ? 'text-[#3ca4f4]' 
                        : 'text-[#0a2240] hover:text-[#3ca4f4]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && (
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#3ca4f4] transition-colors" />
                  )}
                </NavLink>

                {/* Dropdown Box: Displayed smoothly on parent group hover */}
                {link.hasDropdown && (
                  <div className="absolute left-0 top-[100%] w-48 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-200 z-50">
                    <div className="py-2">
                      <NavLink
                        to={`${link.path}/sub-item-1`}
                        className="block px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-[#f4f8fc] hover:text-[#3ca4f4] transition-colors"
                      >
                        Featured Service 1
                      </NavLink>
                      <NavLink
                        to={`${link.path}/sub-item-2`}
                        className="block px-4 py-2.5 text-xs font-bold text-gray-600 hover:bg-[#f4f8fc] hover:text-[#3ca4f4] transition-colors"
                      >
                        Featured Service 2
                      </NavLink>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* 4. ACTIONS AREA (Search & Call-To-Action Button) */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Circular Search Icon */}
            <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-400 hover:text-black transition-all">
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* "Contact Now" Rounded Button */}
            <NavLink 
              to="/contact" 
              className="flex items-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-3 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="text-[15px]">Contact Now</span>
              <div className="flex items-center tracking-tighter">
                <span className="text-xs font-black select-none">≫</span>
              </div>
            </NavLink>
          </div>

          {/* 5. MOBILE HAMBURGER BUTTON */}
          <div className="flex lg:hidden items-center space-x-4">
            <button className="p-2 rounded-full border border-gray-200 text-gray-700">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>

        </div>
      </div>

      {/* 6. RESPONSIVE MOBILE DRAWER (Integrated with dynamic Route active styling) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-inner animate-slideDown">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <NavLink 
                  to={link.path} 
                  // LOGIC: Automatically closes mobile menu drawer when navigation occurs
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex justify-between items-center py-3 px-4 rounded-lg text-base font-bold transition-colors ${
                      isActive 
                        ? 'bg-[#f4f8fc] text-[#3ca4f4]' 
                        : 'text-gray-800 hover:bg-gray-50 hover:text-[#3ca4f4]'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </NavLink>
              </div>
            ))}
            
            <div className="pt-4 px-4">
              <NavLink 
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-3 rounded-full"
              >
                <span>Contact Now</span>
                <span>≫</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}