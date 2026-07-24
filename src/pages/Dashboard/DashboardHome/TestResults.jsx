import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth"; // Adjust import path if needed
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Adjust import path if needed

const TestResults = () => {
  const authState = useAuth();
  const user = authState?.user;
  const authLoading = authState?.loading;
  
  const axiosSecure = useAxiosSecure();

  // Fetch delivered test results for the logged-in user email
  const {
    data: testResults = [],
    isLoading: queryLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["test-results", user?.email],
    enabled: Boolean(!authLoading && user?.email), // Only run query when user email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/test-results/${user?.email}`);
      return res.data;
    },
  });

  // Action: Print report summary
  const handlePrint = (report) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <html>
        <head>
          <title>Test Result - ${report.testName}</title>
          <style>
            body { font-family: sans-serif; padding: 24px; line-height: 1.6; color: #1e293b; }
            .header { border-bottom: 2px solid #e2e8f0; padding-bottom: 12px; margin-bottom: 20px; }
            .title { color: #0284c7; font-size: 24px; font-weight: bold; margin: 0; }
            .content { background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 16px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1 class="title">Helix Diagnostic Center</h1>
            <p style="margin: 4px 0;"><strong>Patient Name:</strong> ${report.patientName || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>Patient Email:</strong> ${report.patientEmail || "N/A"}</p>
            <p style="margin: 4px 0;"><strong>Delivered Date:</strong> ${report.deliveredDate || "N/A"}</p>
          </div>
          <div class="content">
            <h2 style="margin-top:0;">Test: ${report.testName}</h2>
            <p><strong>Status:</strong> ${(report.status || "delivered").toUpperCase()}</p>
            <p><strong>Result Details:</strong></p>
            <p>${report.resultDetails || "No additional details provided."}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  // Show loading spinner while Auth or Query is pending
  if (authLoading || queryLoading) {
    return (
      <div className="flex justify-center items-center min-h-[300px] w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  // Handle query error
  if (isError) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 font-semibold text-lg">Failed to load test results.</p>
        <button
          onClick={() => refetch()}
          className="mt-3 px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg hover:bg-red-100 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
          My Test Results
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          View and download your delivered diagnostic reports safely.
        </p>
      </div>

      {/* Empty State */}
      {!testResults || testResults.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center shadow-sm">
          <svg className="w-12 h-12 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-700">No Test Results Delivered Yet</h3>
          <p className="text-slate-400 text-sm mt-1">
            Once your lab reports are uploaded by admins, they will appear here.
          </p>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 uppercase text-xs border-b border-slate-200">
                <th className="p-4">#</th>
                <th className="p-4">Test Title</th>
                <th className="p-4">Delivered Date</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-700">
              {testResults.map((report, index) => (
                <tr key={report._id || index} className="hover:bg-slate-50 transition">
                  <td className="p-4 font-medium text-slate-400">{index + 1}</td>
                  <td className="p-4 font-bold text-slate-800">{report.testName}</td>
                  <td className="p-4 text-slate-500">{report.deliveredDate || "N/A"}</td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full capitalize">
                      {report.status || "delivered"}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* PDF View / Download */}
                      {report.reportPdfUrl ? (
                        <a
                          href={report.reportPdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          Download PDF
                        </a>
                      ) : (
                        <span className="text-xs text-slate-400 bg-slate-100 px-3 py-1.5 rounded-lg">
                          No PDF Attached
                        </span>
                      )}

                      {/* Print Button */}
                      <button
                        onClick={() => handlePrint(report)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
                      >
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                        </svg>
                        Print
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TestResults;