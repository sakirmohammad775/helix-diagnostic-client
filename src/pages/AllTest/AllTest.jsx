import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../../hooks/useAxiosPublic'; // Adjust path if needed
import { FiCalendar, FiArrowRight, FiInfo, FiActivity } from 'react-icons/fi';

export default function AllTestsPage() {
  const axiosPublic = useAxiosPublic();

  // Fetch all diagnostic tests from your backend
  const { data: tests = [], isLoading, isError, error } = useQuery({
    queryKey: ['allTests'],
    queryFn: async () => {
      const res = await axiosPublic.get('/tests');
      return res.data;
    },
  });

  return (
    <section className="w-full min-h-screen bg-[#f8fafc] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* PAGE HEADER */}
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#3ca4f4] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <FiActivity className="w-3.5 h-3.5" />
            <span>Diagnostic Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-[#0a2240] tracking-tight">
            All Diagnostic Tests & Packages
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Browse through our accredited laboratory tests, view prep rules, and schedule your appointment online.
          </p>
        </div>

        {/* LOADING & ERROR STATES */}
        {isLoading ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
            <div className="w-8 h-8 border-4 border-[#3ca4f4] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500 font-semibold text-sm">Loading available diagnostic tests...</p>
          </div>
        ) : isError ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-red-100 max-w-md mx-auto px-4">
            <p className="text-red-500 font-semibold text-sm">
              {error?.message || 'Failed to load diagnostic tests. Please try again later.'}
            </p>
          </div>
        ) : tests.length > 0 ? (
          
          /* CARDS GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tests.map((test) => {
              // Extract fields with clean fallbacks
              const prep = test.preparationInstructions || test.description || 'Standard sample collection protocol.';
              const dates = Array.isArray(test.availableDates) ? test.availableDates : [];

              return (
                <div
                  key={test._id}
                  className="group bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 flex flex-col justify-between overflow-hidden relative"
                >
                  {/* TOP HEADER / IMAGE BANNER */}
                  <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={test.image || 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80'}
                      alt={test.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl shadow-md border border-white/50">
                      <span className="text-xs text-gray-500 font-bold block leading-none">Fee</span>
                      <span className="text-base font-black text-[#0a2240]">${test.price}</span>
                    </div>

                    {/* Available Slots Badge */}
                    <div className="absolute bottom-3 left-3 bg-[#0a2240]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                      <span>{test.availableSlots ?? 'N/A'} Slots Left</span>
                    </div>
                  </div>

                  {/* CARD BODY CONTENT */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    
                    <div>
                      {/* Test Title */}
                      <h3 className="text-lg font-bold text-[#0a2240] group-hover:text-[#3ca4f4] transition-colors line-clamp-1 mb-2">
                        {test.title}
                      </h3>

                      {/* Prep Instructions / Short Info */}
                      <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 flex items-start gap-1.5">
                        <FiInfo className="w-4 h-4 text-[#3ca4f4] shrink-0 mt-0.5" />
                        <span>{prep}</span>
                      </p>
                    </div>

                    {/* DATES PREVIEW */}
                    <div className="border-t border-slate-100 pt-3 space-y-2">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1 font-semibold text-slate-700">
                          <FiCalendar className="w-3.5 h-3.5 text-[#3ca4f4]" />
                          Upcoming Dates:
                        </span>
                        <span className="text-[11px] text-slate-400">
                          {dates.length > 0 ? `${dates.length} scheduled` : 'Check details'}
                        </span>
                      </div>

                      {dates.length > 0 ? (
                        <div className="flex flex-wrap gap-1.5">
                          {dates.slice(0, 3).map((date, idx) => (
                            <span
                              key={idx}
                              className="bg-slate-50 text-slate-700 border border-slate-200/60 text-[10px] font-medium px-2 py-0.5 rounded-md"
                            >
                              {date}
                            </span>
                          ))}
                          {dates.length > 3 && (
                            <span className="bg-blue-50 text-[#3ca4f4] text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                              +{dates.length - 3} more
                            </span>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 italic block">Flexible scheduling on request</span>
                      )}
                    </div>

                  </div>

                  {/* ACTION FOOTER */}
                  <div className="p-5 pt-0">
                    <Link
                      to={`/tests/${test._id}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#f4f8fc] hover:bg-[#3ca4f4] text-[#3ca4f4] hover:text-white font-extrabold py-3 px-4 rounded-xl transition-all duration-300 text-xs sm:text-sm group-hover:shadow-md"
                    >
                      <span>View Full Details & Book</span>
                      <FiArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>

                </div>
              );
            })}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200 max-w-md mx-auto">
            <p className="text-gray-400 font-medium text-sm">No diagnostic tests currently listed.</p>
          </div>
        )}

      </div>
    </section>
  );
}