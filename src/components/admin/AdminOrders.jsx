import { useState, useEffect } from 'react';
import { orderAPI } from '../../api/client';
import { useToast } from '../../context/ToastContext';

const STATUS_COLORS = {
  pending: 'bg-yellow-100 text-yellow-800',
  preparing: 'bg-blue-100 text-blue-800',
  served: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800',
};

const STATUSES = ['pending', 'preparing', 'served', 'cancelled'];

export default function AdminOrders() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await orderAPI.getAll();
      setOrders(data.data);
    } catch {
      showToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOrders(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await orderAPI.updateStatus(id, status);
      setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
      showToast('Order status updated');
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  if (loading) return <div className="text-center py-20 text-muted">Loading orders...</div>;

  if (!orders.length) return <div className="text-center py-20 text-muted">No orders yet.</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-display text-xl font-semibold">Orders <span className="text-muted text-sm font-normal">({orders.length})</span></h2>
        <button onClick={fetchOrders} className="text-sm text-primary hover:underline">↻ Refresh</button>
      </div>
      {orders.map((order) => (
        <div key={order._id} className="card p-4 space-y-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold">{order.customerName}</p>
              <p className="text-sm text-muted">Table {order.table} · {new Date(order.createdAt).toLocaleString()}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[order.status]}`}>
              {order.status}
            </span>
          </div>

          <div className="divide-y divide-stone-100">
            {order.items.map((item, i) => (
              <div key={i} className="flex justify-between py-1.5 text-sm">
                <span>{item.name} × {item.qty}</span>
                <span className="text-muted">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <p className="font-semibold text-primary">Total: ${order.total.toFixed(2)}</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
              className="form-input !w-auto !py-1.5 !px-3 text-sm"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
