import { useState, useEffect } from 'react';
import { orderAPI } from '../../api/client';
import { useRestaurant } from '../../context/RestaurantContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../context/ToastContext';
import SectionHeader from '../layout/SectionHeader';

export default function Order() {
  const { restaurant } = useRestaurant();
  const { cart, updateQty, removeItem, clearCart, items, totalItems, subtotal, service, total } = useCart();
  const { showToast } = useToast();
  const [orders, setOrders] = useState([]);
  const [table, setTable] = useState('');
  const [customerName, setCustomerName] = useState('');

  const loadOrders = async () => {
    try {
      const { data } = await orderAPI.getAll();
      setOrders(data.data);
    } catch { /* ignore */ }
  };

  useEffect(() => { loadOrders(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!table) return showToast('Please select your table number.', 'error');
    if (!items.length) return showToast('Your cart is empty.', 'error');

    try {
      const payload = {
        table,
        customerName,
        items: items.map((i) => ({
          dishId: i.dish._id,
          name: i.dish.name,
          qty: i.qty,
          price: i.dish.price,
        })),
      };
      await orderAPI.create(payload);
      clearCart();
      setTable('');
      setCustomerName('');
      loadOrders();
      showToast(`Order placed for Table ${table}! Kitchen is preparing your meal.`);
    } catch (err) {
      showToast(err.response?.data?.message || 'Order failed', 'error');
    }
  };

  if (!restaurant) return null;

  const tableOptions = Array.from({ length: restaurant.tableCount || 20 }, (_, i) => i + 1);

  return (
    <section id="order" className="section-padding">
      <div className="container-app">
        <SectionHeader
          eyebrow="Dine In"
          title="Order at Your Table"
          description="Already seated? Browse our menu and place your order directly."
          center
        />

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="card py-4">
              <label className="form-label">Your Table Number *</label>
              <select className="form-input" value={table} onChange={(e) => setTable(e.target.value)}>
                <option value="">Select table</option>
                {tableOptions.map((n) => <option key={n} value={n}>Table {n}</option>)}
              </select>
            </div>

            {restaurant.dishes.map((dish) => {
              const qty = cart[dish._id]?.qty || 0;
              return (
                <div key={dish._id} className="flex justify-between items-center gap-3 p-4 bg-white rounded-xl border border-stone-200 hover:border-primary transition">
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-3xl">{dish.emoji}</span>
                    <div className="min-w-0">
                      <div className="font-semibold truncate max-w-[150px] sm:max-w-none">{dish.name}</div>
                      <div className="text-primary font-semibold text-sm">${dish.price.toFixed(2)}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => updateQty(dish, -1)} className="w-9 h-9 rounded-full border-2 border-stone-200 hover:bg-primary hover:text-white hover:border-primary transition font-bold text-base">−</button>
                    <span className="w-6 text-center font-semibold">{qty}</span>
                    <button type="button" onClick={() => updateQty(dish, 1)} className="w-9 h-9 rounded-full border-2 border-stone-200 hover:bg-primary hover:text-white hover:border-primary transition font-bold text-base">+</button>
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="card lg:sticky lg:top-24 h-fit mb-20 md:mb-0">
            <h3 className="font-display text-xl mb-4">
              Your Order
              <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 bg-primary text-white text-xs font-bold rounded-full">{totalItems}</span>
            </h3>

            {items.length === 0 ? (
              <p className="text-muted italic text-center py-8">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-2 mb-4">
                  {items.map((i) => (
                    <div key={i.dish._id} className="flex justify-between text-sm py-2 border-b border-stone-100 gap-2">
                      <span className="truncate max-w-[150px] sm:max-w-none">{i.dish.name} × {i.qty}</span>
                      <span className="flex items-center gap-2">
                        ${(i.dish.price * i.qty).toFixed(2)}
                        <button onClick={() => removeItem(i.dish._id)} className="text-red-700 text-lg leading-none">×</button>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="space-y-1 text-sm text-muted border-t-2 border-stone-200 pt-4 mb-4">
                  <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span>Service (10%)</span><span>${service.toFixed(2)}</span></div>
                  <div className="flex justify-between text-lg font-bold text-ink pt-2 border-t border-stone-200"><span>Total</span><span>${total.toFixed(2)}</span></div>
                </div>
              </>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="form-label">Your Name *</label>
                <input className="form-input" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required placeholder="Your name" />
              </div>
              <button type="submit" className="btn-primary w-full min-h-12" disabled={!items.length}>Place Order</button>
            </form>
          </aside>
        </div>

        <div className="mt-12">
          <h3 className="font-display text-2xl mb-4">Recent Table Orders</h3>
          {orders.length === 0 ? (
            <p className="text-muted italic text-center py-8">No table orders yet.</p>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 10).map((o) => (
                <div key={o._id} className="flex flex-wrap justify-between items-center gap-4 p-5 bg-white rounded-xl border border-stone-200">
                  <div>
                    <h4 className="font-display text-lg font-semibold">Table {o.table} — {o.customerName}</h4>
                    <p className="text-sm text-muted">{o.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}</p>
                    <p className="text-sm text-muted">Total: ${o.total.toFixed(2)}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase px-3 py-1 rounded-full bg-primary/10 text-primary">{o.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
