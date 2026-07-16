

import { FaBriefcaseMedical, FaFlask, FaMicroscope } from 'react-icons/fa';
import { FaKitMedical, FaPrescriptionBottleMedical, FaUserDoctor } from 'react-icons/fa6';

export default function WhyChooseUs() {
  // LOGIC: High-performance data structure representing the 6 core pillars of the diagnostic center
  const features = [
    {
      id: 1,
      title: 'Expert Care',
      desc: 'Medical competitor research startup to financial',
      icon: FaKitMedical,
    },
    {
      id: 2,
      title: 'Emergency Help',
      desc: 'Medical competitor research startup to financial',
      icon: FaBriefcaseMedical,
    },
    {
      id: 3,
      title: 'Qualified Doctors',
      desc: 'Medical competitor research startup to financial',
      icon: FaUserDoctor,
    },
    {
      id: 4,
      title: 'Medical Advices',
      desc: 'Medical competitor research startup to financial',
      icon: FaPrescriptionBottleMedical,
    },
    {
      id: 5,
      title: 'Medical Research',
      desc: 'Medical competitor research startup to financial',
      icon: FaMicroscope,
    },
    {
      id: 6,
      title: 'Affordable Prices',
      desc: 'Medical competitor research startup to financial',
      icon: FaFlask,
    },
  ];

  return (
    <section className="relative w-full py-16 lg:py-24 bg-[#f4f8fc] overflow-hidden">
      
      {/* 1. STYLIZED BACKGROUND SHAPES (Abstract blue circles on the right) */}
      <div className="absolute right-0 top-0 w-[45%] h-full bg-[#3ca4f4] rounded-l-[10rem] hidden lg:block pointer-events-none" />
      <div className="absolute right-12 bottom-0 w-32 h-32 bg-[#0a2240] rounded-full hidden lg:block pointer-events-none" />

      {/* 2. MAIN CONTAINER */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* LOGIC: Responsive grid. On mobile/tablet, it stacks vertically. On desktops (lg), it splits 7-5. */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT SECTION: CONTENT & GRID (7 Columns wide on desktop) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Tagline Header */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-[3px] bg-[#3ca4f4]" />
                <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Why Choose Us</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-[#0a2240] tracking-tight leading-tight">
                Medical Ready To Get This <br /> Health Solution.
              </h2>
            </div>

            {/* LOGIC: Sub-grid for the 6 dynamic diagnostic center features. 
                - Stacks on mobile (cols-1)
                - Splits on tablets and above (sm:cols-2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  // LOGIC: Standard key mapping using steady unique item IDs
                  <div key={feature.id} className="flex items-start space-x-4 p-2">
                    {/* Rounded Icon Box */}
                    <div className="w-12 h-12 shrink-0 bg-white shadow-md rounded-xl flex items-center justify-center text-[#0a2240] group hover:bg-[#3ca4f4] hover:text-white transition-all duration-300">
                      <IconComponent className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                    {/* Feature text block */}
                    <div className="space-y-1">
                      <h4 className="text-base font-extrabold text-[#0a2240] tracking-tight">{feature.title}</h4>
                      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* RIGHT SECTION: ILLUSTRATION (5 Columns wide on desktop) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Outer wrapper to containerize mobile positioning over base background circle */}
            <div className="relative w-full max-w-[450px] aspect-square lg:aspect-auto lg:h-[480px]">
              
              {/* Blue backdrop visible on mobile/tablet screens to replace the desktop background shift */}
              <div className="absolute inset-0 bg-[#3ca4f4]/10 rounded-full lg:hidden" />
              
              <img 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80" 
                alt="Medical Diagnostics Team" 
                className="relative z-10 w-full h-full object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

          </div>

        </div>

      </div>

    </section>
  );
}