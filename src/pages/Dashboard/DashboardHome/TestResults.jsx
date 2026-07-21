import { useQuery } from '@tanstack/react-query';

const fetchResults = async () => {
  const res = await fetch('http://localhost:5000/test-results');
  return res.json();
};

const TestResults = () => {
  const { data: results = [], isLoading } = useQuery({
    queryKey: ['testResults'],
    queryFn: fetchResults,
  });

  if (isLoading) return <div className="p-4">Loading delivered reports...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Results & Delivered Reports</h2>
      <div className="grid gap-4">
        {results.map((report) => (
          <div key={report._id} className="bg-white p-5 rounded-lg border flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-semibold text-lg text-gray-800">{report.testName}</h3>
              <p className="text-sm text-gray-500">Delivered on: {report.deliveryDate}</p>
            </div>
            <a
              href={report.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 bg-gray-800 text-white rounded text-sm hover:bg-gray-700"
            >
              Download / Print
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;