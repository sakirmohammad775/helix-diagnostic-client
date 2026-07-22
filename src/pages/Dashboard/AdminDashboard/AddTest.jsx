import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { PlusCircle, Image as ImageIcon, DollarSign, Calendar, Layers, FileText } from 'lucide-react';

const AddTest = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    price: '',
    availableSlots: '',
    date: '',
    description: '',
    preparationInstructions: '',
  });

  const addTestMutation = useMutation({
    mutationFn: async (newTest) => {
      const res = await fetch('http://localhost:5000/tests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTest),
      });
      if (!res.ok) throw new Error('Failed to create test');
      return res.json();
    },
    onSuccess: () => {
      toast.success('New diagnostic test successfully added!');
      queryClient.invalidateQueries({ queryKey: ['allTests'] });
      // Reset Form
      setFormData({
        title: '',
        image: '',
        price: '',
        availableSlots: '',
        date: '',
        description: '',
        preparationInstructions: '',
      });
    },
    onError: () => {
      toast.error('Failed to add test. Please verify inputs.');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    // Format numbers and structure dates into array format
    const payload = {
      title: formData.title,
      image: formData.image,
      price: parseFloat(formData.price),
      availableSlots: parseInt(formData.availableSlots, 10),
      availableDates: [formData.date],
      description: formData.description,
      fullDescription: formData.description,
      preparationInstructions: formData.preparationInstructions || 'Standard lab preparation applies.',
    };

    addTestMutation.mutate(payload);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8 max-w-3xl mx-auto space-y-6">
      <Toaster position="top-right" />

      <div className="border-b border-gray-100 pb-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <PlusCircle className="w-6 h-6 text-blue-600" /> Add New Diagnostic Test
        </h2>
        <p className="text-sm text-gray-500">Create a new test listing for patient bookings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Test Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Test Name / Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Full Body Lipid Panel"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <ImageIcon className="w-4 h-4 text-gray-400" /> Image URL
          </label>
          <input
            type="url"
            required
            placeholder="https://images.unsplash.com/photo-..."
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Grid Inputs: Price, Slots, Date */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-gray-400" /> Price ($)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              required
              placeholder="99.00"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Layers className="w-4 h-4 text-gray-400" /> Capacity / Slots
            </label>
            <input
              type="number"
              min="1"
              required
              placeholder="10"
              value={formData.availableSlots}
              onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" /> Available Date
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center gap-1">
            <FileText className="w-4 h-4 text-gray-400" /> Test Description
          </label>
          <textarea
            rows="3"
            required
            placeholder="Short details about the diagnostic procedure..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Preparation Instructions */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Preparation Instructions</label>
          <input
            type="text"
            placeholder="e.g. Fast for 10 hours before blood collection"
            value={formData.preparationInstructions}
            onChange={(e) => setFormData({ ...formData, preparationInstructions: e.target.value })}
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={addTestMutation.isPending}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-md disabled:bg-gray-400"
        >
          {addTestMutation.isPending ? 'Publishing Test...' : 'Add Diagnostic Test'}
        </button>
      </form>
    </div>
  );
};

export default AddTest;