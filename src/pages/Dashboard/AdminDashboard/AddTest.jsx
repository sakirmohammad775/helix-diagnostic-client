import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosPublic from '../../../hooks/useAxiosPublic'; // Adjust relative path as needed

const imgbbApiKey = import.meta.env.VITE_image_host_key;

const AddTest = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    price: '',
    availableSlots: '',
    availableDates: '',
    preparationInstructions: '',
  });

  const addTestMutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosPublic.post('/tests', payload);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTests'] });
      navigate('/tests'); // Navigate back to all tests page
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      alert('Please select an image file to upload.');
      return;
    }

    setImageUploading(true);

    try {
      // 1. Upload Image to ImgBB
      const imgFormData = new FormData();
      imgFormData.append('image', imageFile);

      const imgRes = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: 'POST',
        body: imgFormData,
      });

      const imgData = await imgRes.json();

      if (!imgData.success) {
        throw new Error('Image upload failed');
      }

      const imageUrl = imgData.data.display_url;

      // 2. Prepare payload & parse dates list
      const datesArray = formData.availableDates
        .split(',')
        .map((d) => d.trim())
        .filter((d) => d !== '');

      const payload = {
        title: formData.title,
        image: imageUrl,
        description: formData.description,
        fullDescription: formData.fullDescription,
        price: Number(formData.price),
        availableSlots: Number(formData.availableSlots),
        availableDates: datesArray,
        preparationInstructions: formData.preparationInstructions,
      };

      // 3. Save to MongoDB
      addTestMutation.mutate(payload);
    } catch (err) {
      console.error('Failed to add diagnostic test:', err);
      alert('Error adding test. Please try again.');
    } finally {
      setImageUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-8 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add Diagnostic Test</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Title</label>
          <input
            type="text"
            required
            placeholder="e.g. Full Body Comprehensive Checkup"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image Upload (ImgBB)</label>
          <input
            type="file"
            required
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 font-medium hover:file:bg-blue-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 120"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Available Slots</label>
            <input
              type="number"
              required
              min="0"
              placeholder="e.g. 8"
              value={formData.availableSlots}
              onChange={(e) => setFormData({ ...formData, availableSlots: e.target.value })}
              className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
          <input
            type="text"
            required
            placeholder="Brief overview of the test"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Description</label>
          <textarea
            rows="3"
            required
            placeholder="Detailed breakdown of parameters checked"
            value={formData.fullDescription}
            onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
            className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Available Dates (Comma-separated)</label>
          <input
            type="text"
            required
            placeholder="2026-07-22, 2026-07-25, 2026-08-01"
            value={formData.availableDates}
            onChange={(e) => setFormData({ ...formData, availableDates: e.target.value })}
            className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Instructions</label>
          <input
            type="text"
            placeholder="e.g. Fast for 10-12 hours prior to test."
            value={formData.preparationInstructions}
            onChange={(e) => setFormData({ ...formData, preparationInstructions: e.target.value })}
            className="w-full p-2.5 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={imageUploading || addTestMutation.isPending}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {imageUploading || addTestMutation.isPending ? 'Adding Test...' : 'Add Diagnostic Test'}
        </button>
      </form>
    </div>
  );
};

export default AddTest;