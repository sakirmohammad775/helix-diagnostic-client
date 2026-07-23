import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic'; // Adjust path if needed
import { FiSearch, FiCalendar, FiTag, FiArrowRight } from 'react-icons/fi';

export default function TestSearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const axiosPublic = useAxiosPublic();

  // Fetch tests from MongoDB endpoint
  const { data: tests = [], isLoading, isError, error } = useQuery({
    queryKey: ['allTests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tests');
      return res.data;
    },
  });

  // Filter tests by matching search query against 'title'
  const filteredTests = tests.filter((test) =>
    test.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Show maximum of 6 cards
  const displayedTests = filteredTests.slice(0, 6);

  return (
    <section className="w-full py-12 bg-[#f4f8fc]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* HEADER & SEARCH INPUT */}
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <h2 className="text-3xl font-black text-[#0a2240] tracking-tight">
            Search Diagnostic Tests
          </h2>
          
          <div className="relative">
            <FiSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tests by name..."
              className="w-full pl-14 pr-4 py-4 rounded-2xl bg-white border border-gray-200 shadow-sm focus:border-[#3ca4f4] focus:ring-2 focus:ring-[#3ca4f4]/20 text-gray-800 placeholder-gray-400 font-semibold transition-all outline-none"
            />
          </div>
        </div>

        {/* RESULTS GRID */}
        <div>
          {isLoading ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-100 max-w-md mx-auto shadow-sm">
              <div className="w-7 h-7 border-4 border-[#3ca4f4] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500 font-medium text-sm">Loading tests...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-8 bg-white rounded-2xl border border-red-100 max-w-md mx-auto px-4">
              <p className="text-red-500 font-semibold text-sm">
                {error?.message || 'Failed to fetch tests.'}
              </p>
            </div>
          ) : displayedTests.length > 0 ? (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {displayedTests.map((test) => (
                  <div 
                    key={test._id} 
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between gap-4"
                  >
                    {/* Test Title & Price */}
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-[#0a2240] line-clamp-2">
                        {test.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-[#3ca4f4] font-black text-lg">
                        <FiTag className="w-4 h-4" />
                        <span>${test.price}</span>
                      </div>
                    </div>

                    {/* Available Dates */}
                    <div className="border-t border-gray-100 pt-3 text-xs text-gray-500 space-y-1.5">
                      <div className="flex items-center gap-1.5 font-semibold text-gray-600">
                        <FiCalendar className="w-3.5 h-3.5 text-[#3ca4f4]" />
                        <span>Available Dates:</span>
                      </div>

                      {Array.isArray(test.availableDates) && test.availableDates.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {test.availableDates.map((date, idx) => (
                            <span 
                              key={idx} 
                              className="bg-gray-50 text-gray-700 px-2.5 py-1 rounded-md border border-gray-100 text-[11px] font-medium"
                            >
                              {date}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400 italic block">No dates scheduled</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* VIEW ALL BUTTON */}
              <div className="text-center pt-2">
                <Link 
                  to="/tests" 
                  className="inline-flex items-center gap-2 bg-[#0a2240] hover:bg-[#3ca4f4] text-white font-bold py-3.5 px-8 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                >
                  <span>View All Tests</span>
                  <FiArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-10 bg-white rounded-2xl border border-dashed border-gray-200 max-w-md mx-auto">
              <p className="text-gray-400 font-medium text-sm">No tests found matching "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs text-[#3ca4f4] font-bold underline hover:text-[#0a2240]"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}