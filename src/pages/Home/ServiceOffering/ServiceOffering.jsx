import{ useState } from 'react';
// LOGIC: Using strictly react-icons/fa to comply with project linting rules
import { 
  FaMicroscope, 
  FaRegCheckCircle, 
  FaUserShield, 
  FaFileMedical,
  FaCheck,
  FaChevronRight
} from 'react-icons/fa';

export default function ServiceOfferings() {
  // LOGIC: Local state to manage the active tab selection
  const [activeTab, setActiveTab] = useState('tech');

  // LOGIC: Dataset mapping tabs to structured diagnostic clinical content
  const tabData = {
    tech: {
      title: 'Advanced Diagnostic Automation',
      desc: 'We integrate cutting-edge robotics and fully automated analyzer systems to eliminate human margin of error, dramatically improving processing speed and critical result verification.',
      bullet1: 'Fully automated biochemistry & hematology pathways.',
      bullet2: 'Direct integration with modern patient record databases for absolute security.',
      img: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80'
    },
    success: {
      title: '99.9% Diagnostic Accuracy Rates',
      desc: 'Our laboratory adheres to global pathology reference standards. Each clinical finding is double-checked by certified laboratory directors before any final signature is issued.',
      bullet1: 'Daily quality calibration audits across all analytical hardware.',
      bullet2: 'Stringent clinical verification cycles ensuring highly precise parameters.',
      img: 'https://images.unsplash.com/photo-1579154204601-01588f351167?auto=format&fit=crop&w=600&q=80'
    },
    doctors: {
      title: 'Board-Certified Pathologists',
      desc: 'Our medical panel is composed of leading licensed clinical pathologists and senior phlebotomists specializing in precise, gentle diagnostics for pediatric and senior patients.',
      bullet1: 'Supervision of all intricate molecular and microbiological assay panels.',
      bullet2: 'Expert consultation support to guide patients through complex health values.',
      img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80'
    },
    advice: {
      title: 'Actionable Health Analysis Reports',
      desc: 'We go beyond basic standard printouts. Our premium PDF digital health reports include clear, visual color-coded indicator charts that highlight critical warnings requiring attention.',
      bullet1: 'Easy-to-read charts highlighting normal versus warning thresholds.',
      bullet2: 'Comprehensive dietary and lifestyle guidance correlated to results.',
      img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80'
    }
  };

  // LOGIC: Define tab configurations to map headers dynamically
  const tabs = [
    { id: 'tech', label: 'Modern Technology', icon: FaMicroscope },
    { id: 'success', label: 'Success of Treatment', icon: FaRegCheckCircle },
    { id: 'doctors', label: 'Certified Doctors', icon: FaUserShield },
    { id: 'advice', label: 'Medical Advice', icon: FaFileMedical },
  ];

  return (
    <section className="w-full py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
            <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase">Service Offerings</span>
            <div className="w-6 h-[3px] bg-[#3ca4f4]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            Explore Our Service Offerings
          </h2>
        </div>

        {/* 1. INTERACTIVE TABS ROW */}
        {/* LOGIC: Dynamic map rendering grid of tabs. Highlights active option based on state matching. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-10">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 focus:outline-none ${
                  isActive 
                    ? 'bg-[#0a2240] text-white shadow-lg' 
                    : 'bg-[#f4f8fc] text-gray-700 hover:bg-[#eef5fc]'
                }`}
              >
                {/* Icon Wrapper (Blue background for active or default state) */}
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                  isActive ? 'bg-[#3ca4f4] text-white' : 'bg-white text-[#3ca4f4]'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <span className="text-[14px] sm:text-sm font-extrabold tracking-tight">
                  {tab.label}
                </span>

                {/* Pointing downward arrow shape representing active status matching reference image */}
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-4 h-4 bg-[#0a2240] rotate-45 pointer-events-none rounded-[2px] hidden lg:block" />
                )}
              </button>
            );
          })}
        </div>

        {/* 2. DYNAMIC CONTENT CARD */}
        {/* LOGIC: Standard split-panel template mapping current active state data */}
        <div className="max-w-5xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Image Section (5/12 columns) */}
            <div className="md:col-span-5 h-[280px] sm:h-[350px] rounded-2xl overflow-hidden shadow-inner">
              <img 
                src={tabData[activeTab].img} 
                alt={tabData[activeTab].title} 
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Right Information Section (7/12 columns) */}
            <div className="md:col-span-7 space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl sm:text-3xl font-black text-[#0a2240] leading-tight tracking-tight">
                  {tabData[activeTab].title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed">
                  {tabData[activeTab].desc}
                </p>
              </div>

              {/* Dynamic Bullets with Custom Verification Checks */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#f4f8fc] flex items-center justify-center text-[#3ca4f4] shrink-0 mt-0.5">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-normal">
                    {tabData[activeTab].bullet1}
                  </p>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="w-5 h-5 rounded-full bg-[#f4f8fc] flex items-center justify-center text-[#3ca4f4] shrink-0 mt-0.5">
                    <FaCheck className="w-2.5 h-2.5" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-gray-600 leading-normal">
                    {tabData[activeTab].bullet2}
                  </p>
                </div>
              </div>

              {/* Call To Action Button */}
              <div className="pt-4">
                <button className="flex items-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-extrabold py-3 px-6 rounded-xl transition-all duration-300 shadow-md">
                  <span>Read More</span>
                  <FaChevronRight className="w-2.5 h-2.5" />
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}