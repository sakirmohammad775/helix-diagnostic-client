import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Calendar, Search, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

// Fetch tests from local json or Express API endpoint
const fetchAllTests = async () => {
  const res = await fetch('/tests.json'); // Replace with 'http://localhost:5000/tests' for backend
  if (!res.ok) throw new Error('Failed to load test data');
  return res.json();
};

const AllTests = () => {
  const [selectedDate, setSelectedDate] = useState('');

  // Current system date for comparison
  const todayStr = new Date().toISOString().split('T')[0];

  const { data: tests = [], isLoading, isError } = useQuery({
    queryKey: ['allTests'],
    queryFn: fetchAllTests,
  });

  // 1. Filter out past test dates (Must have at least one date >= today)
  const futureTests = tests.filter((test) =>
    test.availableDates.some((date) => date >= todayStr)
  );

  // 2. Filter by user-selected date search if active
  const displayedTests = selectedDate
    ? futureTests.filter((test) => test.availableDates.includes(selectedDate))
    : futureTests;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium">Loading available diagnostic tests...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Failed to load tests. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Available Diagnostic Tests
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Select from our certified range of diagnostic screenings and book your slot online.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-sm font-semibold text-gray-700">Filter by Available Date:</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="date"
              min={todayStr}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            {selectedDate && (
              <button
                onClick={() => setSelectedDate('')}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Test Cards Grid */}
        {displayedTests.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-xl border border-dashed border-gray-300 text-gray-500">
            No diagnostic tests scheduled for the selected date.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedTests.map((test) => {
              // Get future available dates for display
              const validDates = test.availableDates.filter((d) => d >= todayStr);

              return (
                <div
                  key={test._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    {/* Image Header */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={test.image}
                        alt={test.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-3 right-3 bg-blue-600 text-white font-semibold text-xs px-2.5 py-1 rounded-full shadow">
                        ${test.price}
                      </span>
                    </div>

                    {/* Content Section */}
                    <div className="p-5 space-y-3">
                      <h3 className="text-xl font-bold text-gray-900 line-clamp-1">
                        {test.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2">
                        {test.description}
                      </p>

                      {/* Slot Availability Indicator */}
                      <div className="flex items-center gap-2 text-xs font-semibold pt-2">
                        {test.availableSlots > 0 ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600">
                            <CheckCircle className="w-4 h-4" />
                            {test.availableSlots} slots remaining
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-500">
                            <AlertCircle className="w-4 h-4" />
                            Fully Booked
                          </span>
                        )}
                      </div>

                      {/* Available Dates Badges */}
                      <div className="pt-2">
                        <p className="text-xs text-gray-400 font-medium mb-1 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Upcoming Dates:
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {validDates.slice(0, 3).map((d, idx) => (
                            <span
                              key={idx}
                              className="text-[11px] bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200"
                            >
                              {d}
                            </span>
                          ))}
                          {validDates.length > 3 && (
                            <span className="text-[11px] text-gray-500 self-center">
                              +{validDates.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions Footer */}
                  <div className="p-5 pt-0 border-t border-gray-100 mt-4">
                    <Link
                      to={`/tests/${test._id}`}
                      className="w-full mt-4 flex items-center justify-center gap-2 bg-gray-900 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-600 transition-colors"
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllTests;