import { useState, useEffect } from 'react';
import { bookingAPI } from '../../api/client';
import { useToast } from '../../context/ToastContext';
import SectionHeader from '../layout/SectionHeader';

const TIMES = ['11:00', '12:00', '13:00', '14:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
const TABLES = [
  { value: 'any', label: 'Any Available' },
  { value: 'window', label: 'Window Seat' },
  { value: 'garden', label: 'Garden View' },
  { value: 'private', label: 'Private Booth' },
  { value: 'bar', label: 'Bar Counter' },
];

function formatDate(d) {
  return new Date(d + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short', month: 'short', day: 'numeric', year: 'numeric',
  });
}

function formatTime(t) {
  const [h, m] = t.split(':');
  const hour = parseInt(h, 10);
  return `${hour % 12 || 12}:${m} ${hour >= 12 ? 'PM' : 'AM'}`;
}

export default function Booking() {
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', date: '', time: '', guests: '', table: 'any', notes: '',
  });

  const today = new Date().toISOString().split('T')[0];

  const loadBookings = async () => {
    try {
      const { data } = await bookingAPI.getAll();
      setBookings(data.data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => { loadBookings(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await bookingAPI.create({ ...form, guests: parseInt(form.guests, 10) });
      setForm({ name: '', email: '', phone: '', date: '', time: '', guests: '', table: 'any', notes: '' });
      loadBookings();
      showToast('Reservation confirmed! We look forward to seeing you.');
    } catch (err) {
      showToast(err.response?.data?.message || 'Booking failed', 'error');
    }
  };

  const handleCancel = async (id) => {
    try {
      await bookingAPI.cancel(id);
      loadBookings();
      showToast('Reservation cancelled.');
    } catch {
      showToast('Could not cancel booking', 'error');
    }
  };

  return (
    <section id="booking" className="section-padding bg-gradient-to-b from-cream to-stone-100">
      <div className="container-app">
        <div className="grid lg:grid-cols-2 gap-7 md:gap-10 items-start">
          <div>
            <SectionHeader eyebrow="Reservations" title="Book Your Table" />
            <p className="text-muted mb-5 text-sm sm:text-base">Reserve your perfect evening. Choose your date, time, and party size.</p>
            <ul className="space-y-2 text-muted text-sm bg-white/70 border border-stone-200 rounded-2xl p-4">
              {['Instant confirmation', 'Free cancellation up to 2 hours', 'Special occasion arrangements', 'Private dining available'].map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleSubmit} className="card">
            <h3 className="font-display text-xl sm:text-2xl mb-5">Table Reservation</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Full Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required placeholder="John Doe" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Phone *</label>
                  <input className="form-input" type="tel" name="phone" value={form.phone} onChange={handleChange} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Date *</label>
                  <input className="form-input" type="date" name="date" min={today} value={form.date} onChange={handleChange} required />
                </div>
                <div>
                  <label className="form-label">Time *</label>
                  <select className="form-input" name="time" value={form.time} onChange={handleChange} required>
                    <option value="">Select time</option>
                    {TIMES.map((t) => <option key={t} value={t}>{formatTime(t)}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="form-label">Guests *</label>
                  <select className="form-input" name="guests" value={form.guests} onChange={handleChange} required>
                    <option value="">Select guests</option>
                    {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>)}
                    <option value="7">7+ Guests</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">Preferred Table</label>
                  <select className="form-input" name="table" value={form.table} onChange={handleChange}>
                    {TABLES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="form-label">Special Requests</label>
                <textarea className="form-input" name="notes" rows={3} value={form.notes} onChange={handleChange} placeholder="Birthday, allergies..." />
              </div>
              <button type="submit" className="btn-primary w-full min-h-12">Confirm Reservation</button>
            </div>
          </form>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl mb-4">Your Reservations</h3>
          {bookings.length === 0 ? (
            <p className="text-muted italic text-center py-8">No reservations yet. Book your table above!</p>
          ) : (
            <div className="space-y-3">
              {bookings.map((b) => (
                <div key={b._id} className="flex flex-col sm:flex-row sm:flex-wrap justify-between sm:items-center gap-3 p-4 sm:p-5 bg-white rounded-xl border border-stone-200">
                  <div className="min-w-0">
                    <h4 className="font-display text-lg font-semibold">{b.name} — {b.guests} Guest{b.guests > 1 ? 's' : ''}</h4>
                    <p className="text-sm text-muted">{formatDate(b.date)} at {formatTime(b.time)} · Table: {b.table}</p>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">Confirmed</span>
                    <button onClick={() => handleCancel(b._id)} className="btn-danger">Cancel</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
