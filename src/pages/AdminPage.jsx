import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminLogin from '../components/admin/AdminLogin';
import Admin from '../components/admin/Admin';
import AdminOrders from '../components/admin/AdminOrders';
import AdminBookings from '../components/admin/AdminBookings';

const TABS = [
  { id: 'restaurant', label: '🏠 Restaurant' },
  { id: 'orders', label: '🧾 Orders' },
  { id: 'bookings', label: '📅 Bookings' },
];

export default function AdminPage() {
  const { isAdmin, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('restaurant');

  if (!isAdmin) return <AdminLogin />;

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <header className="bg-ink text-white border-b border-white/10 sticky top-0 z-50">
        <div className="container-app py-3 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-accent text-xs uppercase tracking-widest">Private Area</p>
            <h1 className="font-display text-xl font-bold">Restaurant Management</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="btn-outline text-sm px-3 py-2">View Site</Link>
            <button onClick={logout} className="btn-primary text-sm px-3 py-2">Logout</button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="container-app pb-0">
          <div className="flex border-t border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 sm:flex-none px-4 py-3 text-sm font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-white/60 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 container-app max-w-3xl py-8">
        {activeTab === 'restaurant' && <Admin />}
        {activeTab === 'orders' && <AdminOrders />}
        {activeTab === 'bookings' && <AdminBookings />}
      </main>
    </div>
  );
}
