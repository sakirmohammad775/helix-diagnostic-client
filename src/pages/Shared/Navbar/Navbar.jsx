import { useState } from 'react';
import { Search, ChevronDown, Menu, X } from 'lucide-react';

export default function Navbar() {
  // LOGIC: State to manage mobile-responsive menu visibility
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // LOGIC: State to handle dropdown hovers or clicks if needed 
  // (In a real app, you could expand this to target specific dropdown IDs)
  const [activeDropdown, setActiveDropdown] = useState(null);

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
    <header className="w-full bg-white font-sans">
      {/* 1. TOP BAR: The thin, dark blue bar stretching across the very top of the image */}
      <div className="h-[6px] w-full bg-[#0a2240]" />

      {/* 2. MAIN NAVBAR CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* LOGO SECTION */}
          <div className="flex items-center space-x-3 cursor-pointer">
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
          </div>

          {/* 3. DESKTOP NAVIGATION MENU (Hidden on screens smaller than large 'lg') */}
          

          {/* 4. ACTIONS AREA (Search & Call-To-Action Button) */}
          <div className="hidden lg:flex items-center space-x-5">
            {/* Circular Search Icon matching the reference image styling */}
            <button className="w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:border-gray-400 hover:text-black transition-all">
              <Search className="w-5 h-5 stroke-[1.8]" />
            </button>

            {/* "Contact Now" Rounded Button featuring double-chevron symbol */}
            <button className="flex items-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-3 px-7 rounded-full shadow-md hover:shadow-lg transition-all duration-300">
              <span className="text-[15px]">Contact Now</span>
              <div className="flex items-center tracking-tighter">
                {/* Visual approximation of the double-right arrow dynamic icon */}
                <span className="text-xs font-black select-none">≫</span>
              </div>
            </button>
          </div>

          {/* 5. MOBILE HAMBURGER BUTTON (Visible only on screens below 'lg' breakpoint) */}
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

      {/* 6. RESPONSIVE MOBILE DRAWER (Displays on toggle) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white shadow-inner animate-slideDown">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <div key={link.name}>
                <a 
                  href="#" 
                  className="flex justify-between items-center py-3 px-4 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#3ca4f4]"
                >
                  <span>{link.name}</span>
                  {link.hasDropdown && <ChevronDown className="w-4 h-4 text-gray-400" />}
                </a>
              </div>
            ))}
            <div className="pt-4 px-4">
              <button className="w-full flex items-center justify-center space-x-2 bg-[#3ca4f4] text-white font-bold py-3 rounded-full">
                <span>Contact Now</span>
                <span>≫</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}