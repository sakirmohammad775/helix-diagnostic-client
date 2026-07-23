import { useParams, Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// Adjust relative path as needed

const TestDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const {
    data: test,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["testDetails", id],
    enabled: !!id,
    queryFn: async () => {
      const res = await axiosPublic.get(`/tests/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 font-medium text-lg">
          Loading test details...
        </p>
      </div>
    );
  }

  if (isError || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500 font-semibold">
          Error: {error?.message || "Unable to load test details."}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        to="/tests"
        className="text-blue-600 hover:underline text-sm font-medium mb-6 inline-block"
      >
        &larr; Back to All Tests
      </Link>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <img
          src={test.image}
          alt={test.title}
          className="w-full h-72 object-cover"
        />

        <div className="p-6 md:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{test.title}</h1>
              <p className="text-gray-500 text-sm mt-1">{test.description}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-blue-600">
                ${test.price}
              </span>
              <p className="text-xs text-gray-500">
                Available Slots: {test.availableSlots}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm">
              {test.fullDescription || test.description}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Preparation Instructions
            </h3>
            <p className="text-gray-600 text-sm bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
              {test.preparationInstructions ||
                "No specific preparation instructions provided."}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Available Dates
            </h3>
            <div className="flex flex-wrap gap-2">
              {test.availableDates?.map((date, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {date}
                </span>
              ))}
            </div>
          </div>
          <NavLink to={`/dashboard/booking/${test._id}`}>
            <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">
              Book Now
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default TestDetails;
