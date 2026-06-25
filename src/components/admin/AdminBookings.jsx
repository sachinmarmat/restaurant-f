import { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/client';
import { useToast } from '../../context/ToastContext';

const STATUS_COLORS = {
  confirmed: 'bg-green-100 text-green-800',
  completed: 'bg-blue-100 text-blue-800',
  cancelled: 'bg-red-100 text-red-800',
};

export default function AdminBookings() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const { data } = await bookingAPI.getAll();
      setBookings(data.data);
    } catch {
      showToast('Failed to load bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBookings(); }, []);

  const handleCancel = async (id) => {
    if (!confirm('Cancel this reservation?')) return;
    try {
      await bookingAPI.cancel(id);
      setBookings((prev) => prev.filter((b) => b._id !== id));
      showToast('Reservation cancelled');
    } catch {
      showToast('Failed to cancel booking', 'error');
    }
  };

  if (loading) return <div className="text-center py-20 text-muted">Loading bookings...</div>;

  if (!bookings.length) return <div className="text-center py-20 text-muted">No bookings yet.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-xl font-semibold">Bookings <span className="text-muted text-sm font-normal">({bookings.length})</span></h2>
        <button onClick={fetchBookings} className="text-sm text-primary hover:underline">↻ Refresh</button>
      </div>
      {bookings.map((b) => (
        <div key={b._id} className="card p-4 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{b.name}</p>
              <p className="text-sm text-muted">{b.email} · {b.phone}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status]}`}>
              {b.status}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-sm">
            <div className="bg-cream rounded-lg p-2 text-center">
              <p className="text-xs text-muted">Date</p>
              <p className="font-medium">{b.date}</p>
            </div>
            <div className="bg-cream rounded-lg p-2 text-center">
              <p className="text-xs text-muted">Time</p>
              <p className="font-medium">{b.time}</p>
            </div>
            <div className="bg-cream rounded-lg p-2 text-center">
              <p className="text-xs text-muted">Guests</p>
              <p className="font-medium">{b.guests}</p>
            </div>
            <div className="bg-cream rounded-lg p-2 text-center">
              <p className="text-xs text-muted">Table</p>
              <p className="font-medium">{b.table}</p>
            </div>
          </div>

          {b.notes && (
            <p className="text-sm text-muted italic">"{b.notes}"</p>
          )}

          <div className="flex justify-end">
            <button onClick={() => handleCancel(b._id)} className="btn-danger">
              Cancel Reservation
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
