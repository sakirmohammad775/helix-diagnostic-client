import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

const UploadResult = () => {
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();

  const [selectedAppointmentId, setSelectedAppointmentId] = useState("");
  const [resultDetails, setResultDetails] = useState("");
  const [reportPdfUrl, setReportPdfUrl] = useState("");
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // Fetch all appointments pending test result upload
  const { data: pendingAppointments = [], isLoading } = useQuery({
    queryKey: ["pendingAppointments"],
    queryFn: async () => {
      const res = await axiosPublic.get("/appointments/delivered-pending");
      return res.data;
    },
  });

  // Find selected appointment object
  const selectedAppointment = pendingAppointments.find(
    (app) => app._id === selectedAppointmentId,
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) {
      alert("Please select an appointment!");
      return;
    }

    setUploading(true);

    try {
      let finalPdfUrl = reportPdfUrl;

      // Upload file to ImgBB if chosen
      if (file) {
        const imageFormData = new FormData();
        imageFormData.append("image", file);
        const imgRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageFormData,
          },
        );
        const imgData = await imgRes.json();
        if (imgData.success) {
          finalPdfUrl = imgData.data.display_url;
        }
      }

      const payload = {
        appointmentId: selectedAppointment._id,
        userEmail: selectedAppointment.userEmail,
        userName: selectedAppointment.userName,
        testTitle: selectedAppointment.testTitle,
        resultDetails,
        reportPdfUrl: finalPdfUrl,
      };

      const res = await axiosPublic.post("/test-results", payload);

      if (res.data.insertedId) {
        alert("Test result successfully delivered to patient!");
        setSelectedAppointmentId("");
        setResultDetails("");
        setReportPdfUrl("");
        setFile(null);
        queryClient.invalidateQueries({ queryKey: ["pendingAppointments"] });
      }
    } catch (err) {
      console.error("Error submitting result:", err);
      alert("Failed to upload test result.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-2xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Deliver Test Result
      </h2>
      <p className="text-sm text-gray-500 mb-6">
        Select an appointment to automatically attach and deliver results to the
        patient.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Dropdown Select Appointment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Select Appointment *
          </label>
          <select
            required
            value={selectedAppointmentId}
            onChange={(e) => setSelectedAppointmentId(e.target.value)}
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">-- Choose Booked Appointment --</option>
            {pendingAppointments.map((app) => (
              <option key={app._id} value={app._id}>
                {app.testTitle || app.testName || "Test"} —{" "}
                {app.userName || app.name || "Patient"} (
                {app.userEmail || app.email})
              </option>
            ))}
          </select>
        </div>

        {/* Auto-filled details review */}
        {selectedAppointment && (
          <div className="p-4 bg-blue-50/60 border border-blue-100 rounded-xl text-xs space-y-1 text-blue-900">
            <p>
              <strong>Patient Email:</strong> {selectedAppointment.userEmail}
            </p>
            <p>
              <strong>Patient Name:</strong> {selectedAppointment.userName}
            </p>
            <p>
              <strong>Test Name:</strong> {selectedAppointment.testTitle}
            </p>
          </div>
        )}

        {/* Result Findings / Summary */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Result Details / Observations
          </label>
          <textarea
            rows="3"
            value={resultDetails}
            onChange={(e) => setResultDetails(e.target.value)}
            placeholder="e.g. Hemoglobin level normal at 14.5 g/dL..."
            className="w-full rounded-xl border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Report File Link / Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Upload Report (File or URL)
          </label>
          <input
            type="url"
            value={reportPdfUrl}
            onChange={(e) => setReportPdfUrl(e.target.value)}
            placeholder="https://i.ibb.co/report.pdf (Direct link)"
            className="w-full rounded-xl border border-gray-300 p-3 text-sm mb-2 focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-xs text-gray-500 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={uploading || isLoading}
          className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition shadow-sm disabled:opacity-50 text-sm"
        >
          {uploading ? "Delivering Report..." : "Submit & Release Test Result"}
        </button>
      </form>
    </div>
  );
};

export default UploadResult;
