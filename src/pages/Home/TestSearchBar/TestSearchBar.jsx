
// Importing modern medical & diagnostic search icons
import { useState } from 'react';
import { FaMicroscope, FaVial, FaXRay } from 'react-icons/fa';
import { FaHeartPulse } from 'react-icons/fa6';
import { FiSearch, FiSliders, FiClock } from 'react-icons/fi';


export default function TestSearchBar() {
  // LOGIC: Local state to track user typed input and active test categories
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // LOGIC: Static datasets representing a high-performing real-world catalog
  const categories = [
    { name: 'All', icon: null },
    { name: 'Pathology', icon: FaVial },
    { name: 'Radiology & Imaging', icon: FaXRay },
    { name: 'Cardiology', icon: FaHeartPulse },
    { name: 'Microbiology', icon: FaMicroscope },
  ];

  const popularTests = [
    { id: 't1', name: 'Complete Blood Count (CBC)', category: 'Pathology', price: '$25', duration: '2 Hours' },
    { id: 't2', name: 'Lipid Profile (Cholesterol)', category: 'Pathology', price: '$35', duration: '4 Hours' },
    { id: 't3', name: 'Chest X-Ray (PA View)', category: 'Radiology & Imaging', price: '$45', duration: '1 Hour' },
    { id: 't4', name: 'Electrocardiogram (ECG)', category: 'Cardiology', price: '$30', duration: '30 Mins' },
    { id: 't5', name: 'HbA1c (Glycated Haemoglobin)', category: 'Pathology', price: '$20', duration: '3 Hours' },
    { id: 't6', name: 'Ultrasound (USG) Whole Abdomen', category: 'Radiology & Imaging', price: '$80', duration: '2 Hours' },
  ];

  // LOGIC: Dynamic filtering logic running on render pass to match query AND selected category
  const filteredTests = popularTests.filter((test) => {
    const matchesSearch = test.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="relative w-full py-16 bg-[#f4f8fc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <span className="text-[#3ca4f4] text-xs font-black tracking-widest uppercase block">Fast & Secure Diagnostics</span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            Search Available Diagnostic Tests
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Find tests, check prices, report turnaround times, and schedule bookings instantly.
          </p>
        </div>

        {/* 1. INTERACTIVE SEARCH WRAPPER */}
        <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-blue-50/50 space-y-6">
          
          {/* Main Input Row */}
          <div className="relative flex flex-col md:flex-row gap-3 items-center">
            <div className="relative w-full">
              <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search blood test, MRI, lipid profile, x-ray, hormones..."
                className="w-full pl-14 pr-4 py-4 rounded-2xl bg-gray-50 border-2 border-transparent focus:border-[#3ca4f4] focus:bg-white text-gray-800 placeholder-gray-400 text-[15px] font-semibold transition-all duration-300 outline-none"
              />
            </div>
            
            <button className="w-full md:w-auto flex items-center justify-center space-x-2 bg-[#3ca4f4] hover:bg-[#2b93e3] text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 whitespace-nowrap shadow-md">
              <FiSliders className="w-4 h-4" />
              <span>Filter Tests</span>
            </button>
          </div>

          {/* 2. CATEGORY PILL FILTERING SYSTEM */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`flex items-center space-x-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 border ${
                    isActive 
                      ? 'bg-[#0a2240] text-white border-[#0a2240] shadow-md shadow-blue-900/10' 
                      : 'bg-gray-50 text-gray-600 border-gray-100 hover:bg-gray-100 hover:text-[#0a2240]'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* 3. DYNAMIC RESULTS DISPLAY (Grid structure with responsive scaling) */}
        <div className="max-w-5xl mx-auto mt-12">
          {filteredTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredTests.map((test) => (
                // LOGIC: Rendering filtered records matching specific stable static IDs as keys
                <div 
                  key={test.id} 
                  className="bg-white p-5 rounded-2xl border border-gray-100 flex items-center justify-between hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="space-y-1.5">
                    <span className="inline-block text-[10px] uppercase font-black tracking-wider text-[#3ca4f4] bg-blue-50 px-2.5 py-1 rounded-md">
                      {test.category}
                    </span>
                    <h4 className="text-[15px] sm:text-base font-bold text-[#0a2240] group-hover:text-[#3ca4f4] transition-colors">
                      {test.name}
                    </h4>
                    <div className="flex items-center space-x-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiClock className="w-3.5 h-3.5" />
                        {test.duration}
                      </span>
                    </div>
                  </div>

                  <div className="text-right flex flex-col items-end gap-2">
                    <span className="text-lg font-black text-[#0a2240]">{test.price}</span>
                    <button className="text-xs bg-[#f4f8fc] text-[#3ca4f4] hover:bg-[#3ca4f4] hover:text-white font-extrabold py-2 px-4 rounded-lg transition-all duration-200">
                      Book Test
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // LOGIC: Fallback layout if user query produces empty results array
            <div className="text-center py-10 bg-white rounded-3xl border border-dashed border-gray-200 max-w-md mx-auto">
              <p className="text-gray-400 font-semibold text-sm">No diagnostic tests matched your filters.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-3 text-xs text-[#3ca4f4] font-black underline hover:text-[#0a2240]"
              >
                Reset Search Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}