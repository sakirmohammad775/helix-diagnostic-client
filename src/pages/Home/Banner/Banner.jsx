// Importing chevron and stethoscope icons for medical design elements
import {  FaStethoscope } from 'react-icons/fa6';

export default function Banner() {
  // LOGIC: Abstracting doctor profile images with unique IDs to dynamically render the overlapping side-stack
  const overlayDoctors = [
    { id: 1, name: 'Dr. John', img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=120&q=80' },
    { id: 2, name: 'Dr. Sarah', img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=120&q=80' },
    { id: 3, name: 'Dr. Emma', img: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&w=120&q=80' },
  ];

  return (
    <section className="relative w-full min-h-[90vh] bg-gradient-to-r from-[#f4f8fc] via-white to-[#eef5fc] overflow-hidden flex items-center">
      
      {/* 1. DECORATIVE ABSTRACT SHAPES */}
      <div className="absolute top-12 left-12 w-12 h-12 opacity-20 pointer-events-none">
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3ca4f4] stroke-[8]">
          <polygon points="50,15 90,85 10,85" stroke="currentColor" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-[20%] w-8 h-8 rounded-full border-4 border-blue-900/10 pointer-events-none" />

      {/* 2. MAIN LAYOUT CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        {/* LOGIC: Responsive structural grid. 1 column on mobile, 12 columns from tablet/md up to split text and imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT CONTENT COLUMN (6/12 width on desktop) */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#1a202c] leading-[1.15] tracking-tight">
              We Hospital Doctors <br className="hidden sm:inline" />
              Patients <span className="text-[#3ca4f4] relative inline-block underline decoration-4 decoration-[#3ca4f4]/30 underline-offset-8">Service.</span>
            </h1>

            <p className="text-gray-500 text-sm sm:text-base max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Medical ers piciatis unde omnis iste natus this the word medical this mountains, 
              far from the countries Vokalia and, live the docor white teeth sitting on a 
              dental for best medical.
            </p>

            {/* Accent Highlight: "Receive Medical Service" callout */}
            <div className="flex items-center justify-center lg:justify-start space-x-4 border-l-4 border-[#3ca4f4] pl-4 py-1.5 my-6">
              <div className="text-left">
                <p className="text-base font-extrabold text-[#0a2240]">Receive Medical Service.</p>
                <p className="text-xs sm:text-sm text-gray-500 font-semibold">Call Us at: (+2) 56 54 1453</p>
              </div>
            </div>

            {/* BUTTON group: Dual call to action links styled with custom double-right arrows */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-sm tracking-wide">Contact Now</span>
                <span className="text-xs select-none">≫</span>
              </button>

              <button className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-[#0a2240] hover:bg-[#112a52] text-white font-bold py-4 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-sm tracking-wide">Discover More</span>
                <span className="text-xs select-none">≫</span>
              </button>
            </div>

            {/* Floating tooth and stethoscope illustration mock */}
            <div className="hidden sm:flex items-center space-x-4 pt-8 opacity-90 justify-center lg:justify-start">
              <div className="w-16 h-16 rounded-full bg-white shadow-md flex items-center justify-center text-[#3ca4f4] border border-blue-50">
                <FaStethoscope className="w-8 h-8" />
              </div>
              <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">Professional Diagnostic Standards</span>
            </div>

          </div>

          {/* RIGHT GRAPHICS COLUMN (5/12 width on desktop) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* The Main Doctors Image featuring absolute border masks */}
            <div className="relative w-full max-w-[480px] aspect-[4/3] sm:aspect-square rounded-[2rem] overflow-hidden border-8 border-white shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1579684389782-64d84b5e901d?auto=format&fit=crop&w=600&q=80" 
                alt="Medical Personnel" 
                className="w-full h-full object-cover"
              />
            </div>

            {/* LOGIC: Dynamic side overlapping floating stack for doctor fast-links */}
            <div className="absolute right-4 sm:right-6 bottom-8 bg-white/95 backdrop-blur-sm py-4 px-3 rounded-2xl shadow-xl flex flex-col space-y-3 border border-gray-100 z-20">
              {overlayDoctors.map((doc) => (
                // LOGIC: Mapping arrays with unique ID keys to maintain optimal React DOM updates
                <div 
                  key={doc.id} 
                  className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#3ca4f4] hover:scale-110 transition-transform duration-200 cursor-pointer"
                  title={doc.name}
                >
                  <img src={doc.img} alt={doc.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}