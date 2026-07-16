import { FaAngleDoubleRight } from "react-icons/fa";


export default function CtaBanner() {
  return (
    <div className="w-full bg-[#0a2240] text-white overflow-hidden relative">
      
      {/* DECORATIVE RIGHT BACKGROUND ELEMENT: Simulates the faint blue arc/circle design on the far right */}
      <div className="absolute right-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full translate-x-20 translate-y-20 pointer-events-none" />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LOGIC: Responsive structural grid. 
            - Stacks vertically on mobile (cols-1)
            - Side-by-side on tablets/desktops (lg:grid-cols-12) to align image, text, and button */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 lg:gap-8 py-8 lg:py-0">
          
          {/* 1. LEFT IMAGE AREA (Occupies 3 columns on desktop, hidden on extra small mobile screens) */}
          <div className="hidden sm:block lg:col-span-3 relative h-40 lg:h-48 self-stretch">
            <img 
              src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80" 
              alt="Doctor Consulting" 
              className="w-full h-full object-cover object-top"
            />
            {/* LOGIC: CSS clip-path to create the precise right-pointing triangle pointing towards the text */}
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-6 h-12 bg-[#3ca4f4] z-10 hidden lg:block"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
          </div>

          {/* 2. MIDDLE TEXT AREA (Occupies 6 columns on desktop) */}
          <div className="lg:col-span-6 lg:pl-8 text-center sm:text-left space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-[26px] font-black tracking-tight leading-snug">
              Meet The Team Support Medical Service.
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-normal opacity-90">
              For us, there are no minor aspects, because a quality
            </p>
          </div>

          {/* 3. RIGHT BUTTON AREA (Occupies 3 columns on desktop) */}
          <div className="lg:col-span-3 flex justify-center sm:justify-start lg:justify-end">
            {/* Booking Action Button featuring double-chevron icons */}
            <button className="flex items-center justify-center space-x-2 bg-white text-[#0a2240] hover:bg-[#3ca4f4] hover:text-white font-extrabold py-3.5 px-8 rounded-full shadow-md hover:shadow-xl transition-all duration-300 whitespace-nowrap group">
              <span className="text-[15px] tracking-wide">Booking Now</span>
              <FaAngleDoubleRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}