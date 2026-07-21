import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchAppointments = async () => {
  const res = await fetch('http://localhost:5000/appointments/upcoming');
  return res.json();
};

const UpcomingAppointments = () => {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['upcomingAppointments'],
    queryFn: fetchAppointments,
  });

  const cancelMutation = useMutation({
    mutationFn: async (id) => {
      await fetch(`http://localhost:5000/appointments/${id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['upcomingAppointments'] });
    },
  });

  if (isLoading) return <div className="p-4">Loading appointments...</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upcoming Appointments</h2>
      {appointments.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments scheduled.</p>
      ) : (
        appointments.map((appt) => (
          <div key={appt._id} className="bg-white p-5 rounded-lg border flex justify-between items-center shadow-sm">
            <div>
              <h3 className="font-semibold text-lg text-blue-600">{appt.testName}</h3>
              <p className="text-sm text-gray-600">Date: {appt.date} | Time: {appt.time}</p>
            </div>
            <button
              onClick={() => cancelMutation.mutate(appt._id)}
              className="px-3 py-1.5 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 font-medium"
            >
              Cancel
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default UpcomingAppointments;