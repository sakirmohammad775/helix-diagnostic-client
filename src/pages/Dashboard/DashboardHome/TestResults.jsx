import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const TestResults = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosPublic = useAxiosPublic();

  const { data: reports = [], isLoading } = useQuery({
    queryKey: ['myTestResults', user?.email],
    enabled: !authLoading && !!user?.email,
    queryFn: async () => {
      const res = await axiosPublic.get(`/test-results/${user?.email}`);
      return res.data;
    },
  });

  const handleDownload = (fileUrl, testName) => {
    if (!fileUrl) {
      alert("No digital report file attached.");
      return;
    }
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = `${testName}_Report.pdf`;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = (report) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Medical Report - ${report.testName}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #0f172a; }
            .header { border-bottom: 2px solid #2563eb; padding-bottom: 15px; margin-bottom: 20px; }
            h1 { color: #2563eb; margin: 0; font-size: 24px; }
            .meta { margin-bottom: 20px; font-size: 14px; line-height: 1.8; }
            .box { background: #f8fafc; border: 1px solid #e2e8f0; padding: 18px; border-radius: 12px; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Diagnostic Test Report</h1>
            <p>Official Patient Record</p>
          </div>
          <div class="meta">
            <p><strong>Patient Name:</strong> ${report.patientName}</p>
            <p><strong>Patient Email:</strong> ${report.patientEmail}</p>
            <p><strong>Test Name:</strong> ${report.testName}</p>
            <p><strong>Delivered Date:</strong> ${report.deliveredDate}</p>
          </div>
          <div class="box">
            <h3 style="margin-top:0">Findings & Observations</h3>
            <p>${report.resultDetails || 'Detailed findings available in attached document.'}</p>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  if (authLoading || isLoading) {
    return <div className="p-8 text-center text-blue-600 font-medium animate-pulse">Loading test results...</div>;
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-200 max-w-4xl mx-auto my-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-1">My Test Results</h2>
      <p className="text-sm text-gray-500 mb-6">View, download, or print your delivered test reports.</p>

      {reports.length === 0 ? (
        <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-medium text-sm">
          No delivered test results found for {user?.email}.
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report._id} className="p-5 border border-gray-200 rounded-2xl hover:border-blue-300 transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <div className="space-y-1">
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 uppercase">
                  {report.status}
                </span>
                <h3 className="text-lg font-bold text-gray-800">{report.testName}</h3>
                <p className="text-xs text-gray-400">Delivered on: {report.deliveredDate}</p>
                {report.resultDetails && (
                  <p className="text-xs text-gray-600 mt-2 bg-white p-2.5 rounded-xl border border-gray-100">
                    {report.resultDetails}
                  </p>
                )}
              </div>

              <div className="flex gap-2 w-full sm:w-auto">
                {report.reportPdfUrl && (
                  <button
                    onClick={() => handleDownload(report.reportPdfUrl, report.testName)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition"
                  >
                    Download
                  </button>
                )}
                <button
                  onClick={() => handlePrint(report)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs font-bold rounded-xl transition"
                >
                  Print Report
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TestResults;