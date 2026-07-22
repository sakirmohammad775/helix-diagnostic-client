import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ShieldCheck, CreditCard, X } from 'lucide-react';

// Single test fetcher function
const fetchTestDetails = async (id) => {
  const res = await fetch('/tests.json');
  const tests = await res.json();
  const test = tests.find((t) => t._id === id);
  if (!test) throw new Error('Test record not found');
  return test;
};

const TestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Booking & Modal State
  const [selectedDate, setSelectedDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');

  const { data: test, isLoading, isError } = useQuery({
    queryKey: ['testDetails', id],
    queryFn: () => fetchTestDetails(id),
  });

  // Booking Mutation (Handles Slot decrement & pending report creation)
  const bookTestMutation = useMutation({
    mutationFn: async (bookingPayload) => {
      // Endpoint where you post your appointment data
      const res = await fetch('http://localhost:5000/appointments/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload),
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['testDetails', id]);
      setIsModalOpen(false);
      navigate('/dashboard/appointments'); // Redirect directly to appointment list
    },
  });

  if (isLoading) return <div className="p-10 text-center">Loading test details...</div>;
  if (isError || !test) return <div className="p-10 text-center text-red-500">Test not found.</div>;

  // Price calculations
  const originalPrice = test.price;
  const discountedAmount = (originalPrice * discountPercent) / 100;
  const finalPrice = originalPrice - discountedAmount;

  // Promo Code Handler
  const handleApplyPromo = () => {
    setPromoError('');
    if (promoCode.trim().toUpperCase() === 'HELIX20') {
      setDiscountPercent(20); // 20% discount
    } else {
      setPromoError('Invalid coupon code. Try "HELIX20"');
      setDiscountPercent(0);
    }
  };

  // Payment Confirmation
  const handleStripePayment = (e) => {
    e.preventDefault();

    const bookingPayload = {
      testId: test._id,
      testName: test.title,
      pricePaid: finalPrice,
      appointmentDate: selectedDate || test.availableDates[0],
      reportStatus: 'pending', // Default report status requirement
      paymentStatus: 'paid',
      bookedAt: new Date().toISOString(),
    };

    bookTestMutation.mutate(bookingPayload);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Hero Image Section */}
        <div className="h-64 sm:h-80 w-full relative bg-gray-900">
          <img src={test.image} alt={test.title} className="w-full h-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white">{test.title}</h1>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Test Fee</span>
              <p className="text-3xl font-extrabold text-blue-600">${test.price}</p>
            </div>

            <div>
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Available Capacity</span>
              <p className={`text-lg font-bold ${test.availableSlots > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {test.availableSlots > 0 ? `${test.availableSlots} slots available` : 'Sold Out'}
              </p>
            </div>
          </div>

          {/* Detailed Descriptions */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">About this Diagnostic Procedure</h2>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{test.fullDescription}</p>
          </div>

          {/* Preparation Instructions */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 text-blue-900">
            <ShieldCheck className="w-6 h-6 flex-shrink-0 text-blue-600" />
            <div>
              <h4 className="font-semibold text-sm">Patient Preparation Instructions</h4>
              <p className="text-xs sm:text-sm text-blue-800 mt-0.5">{test.preparationInstructions}</p>
            </div>
          </div>

          {/* Date Picker Slot Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">Choose Appointment Date:</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full sm:w-72 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">-- Select an available date --</option>
              {test.availableDates.map((date, idx) => (
                <option key={idx} value={date}>{date}</option>
              ))}
            </select>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={test.availableSlots <= 0 || !selectedDate}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-base transition-all ${
                test.availableSlots > 0 && selectedDate
                  ? 'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {test.availableSlots <= 0
                ? 'No Slots Available'
                : !selectedDate
                ? 'Please Select a Date to Book'
                : 'Book Now'}
            </button>
          </div>
        </div>
      </div>

      {/* Stripe Payment & Checkout Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">
              Confirm & Complete Payment
            </h3>

            {/* Test Summary */}
            <div className="bg-gray-50 p-3.5 rounded-lg space-y-1 text-sm">
              <p className="font-semibold text-gray-800">{test.title}</p>
              <p className="text-xs text-gray-500">Scheduled Date: {selectedDate}</p>
            </div>

            {/* Promo Code Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Promo Code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. HELIX20"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleApplyPromo}
                  className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800"
                >
                  Apply
                </button>
              </div>
              {promoError && <p className="text-xs text-red-500">{promoError}</p>}
              {discountPercent > 0 && (
                <p className="text-xs text-emerald-600 font-semibold">
                  Promo code applied! You saved {discountPercent}%.
                </p>
              )}
            </div>

            {/* Payment Summary */}
            <div className="border-t border-gray-100 pt-3 space-y-1.5 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Base Price</span>
                <span>${originalPrice}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span>Discount ({discountPercent}%)</span>
                  <span>-${discountedAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t">
                <span>Total Due</span>
                <span>${finalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Simulated Stripe Credit Card Inputs */}
            <form onSubmit={handleStripePayment} className="space-y-4 pt-2">
              <div className="border border-gray-300 rounded-lg p-3 space-y-2 bg-gray-50">
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-1">
                  <CreditCard className="w-4 h-4" /> Card Details
                </div>
                <input
                  type="text"
                  placeholder="4242 •••• •••• 4242"
                  className="w-full bg-white border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none"
                  required
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-1/2 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none"
                    required
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    className="w-1/2 bg-white border border-gray-200 rounded px-2.5 py-1.5 text-sm focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={bookTestMutation.isPending}
                className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
              >
                {bookTestMutation.isPending ? 'Processing Payment...' : `Pay $${finalPrice.toFixed(2)} with Stripe`}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestDetails;