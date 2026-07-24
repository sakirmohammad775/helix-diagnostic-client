import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const UploadResult = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [reportDetails, setReportDetails] = useState("");
  const [reportUrl, setReportUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch pending appointments
  const { data: appointments = [], refetch, isLoading } = useQuery({
    queryKey: ["pending-appointments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/appointments/delivered-pending");
      return res.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAppointmentId) {
      return Swal.fire("Warning", "Please select an appointment ID", "warning");
    }

    if (!reportUrl) {
      return Swal.fire("Warning", "Please provide a report URL or file link", "warning");
    }

    try {
      setIsSubmitting(true);
      const res = await axiosSecure.patch(`/appointments/deliver-result/${selectedAppointmentId}`, {
        reportUrl,
        details: reportDetails,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: "Success!",
          text: "Test result delivered to patient profile successfully.",
          icon: "success",
        });

        // Reset Form
        setSelectedAppointmentId("");
        setReportDetails("");
        setReportUrl("");
        refetch(); // Refresh dropdown list
      }
    } catch (error) {
      Swal.fire("Error", "Failed to upload result. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800">Deliver Test Result</h2>
      <p className="text-sm text-slate-500 mt-1 mb-6">
        Select a booked appointment ID to attach and deliver results to the patient.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Select Appointment ID Dropdown */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Select Appointment (ID / Patient) *
          </label>
          <select
            value={selectedAppointmentId}
            onChange={(e) => setSelectedAppointmentId(e.target.value)}
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 text-sm"
          >
            <option value="">-- Choose Booked Appointment ID --</option>
            {appointments.map((app) => (
              <option key={app._id} value={app._id}>
                ID: {app._id} | {app.testTitle || app.testName} ({app.userName || app.userEmail})
              </option>
            ))}
          </select>
        </div>

        {/* Observation / Details Field */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Result Details / Observations
          </label>
          <textarea
            rows="3"
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            placeholder="e.g. Hemoglobin level normal at 14.5 g/dL..."
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 text-sm"
          ></textarea>
        </div>

        {/* Report File Link URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-1.5">
            Upload Report URL (Direct File or PDF Link) *
          </label>
          <input
            type="url"
            value={reportUrl}
            onChange={(e) => setReportUrl(e.target.value)}
            placeholder="https://i.ibb.co/report.pdf or Drive Link"
            required
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 text-slate-800 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-md transition disabled:opacity-50"
        >
          {isSubmitting ? "Delivering Result..." : "Submit & Release Test Result"}
        </button>
      </form>
    </div>
  );
};

export default UploadResult;