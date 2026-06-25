import { useState } from 'react';
import { messageAPI } from '../../api/client';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../../context/ToastContext';
import SectionHeader from '../layout/SectionHeader';

export default function Contact() {
  const { restaurant } = useRestaurant();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  if (!restaurant) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await messageAPI.create(form);
      setForm({ name: '', email: '', subject: '', message: '' });
      showToast('Message sent! We will get back to you soon.');
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to send message', 'error');
    }
  };

  const cards = [
    { icon: '📞', title: 'Phone', content: <a href={`tel:${restaurant.phone}`} className="text-primary font-medium hover:underline">{restaurant.phone}</a> },
    { icon: '✉️', title: 'Email', content: <a href={`mailto:${restaurant.email}`} className="text-primary font-medium hover:underline">{restaurant.email}</a> },
    { icon: '📍', title: 'Address', content: <p className="text-muted text-sm">{restaurant.address}</p> },
    {
      icon: '🌐', title: 'Follow Us',
      content: (
        <div className="flex gap-4 text-sm">
          {['Facebook', 'Instagram', 'Twitter'].map((s) => (
            <a key={s} href="#" className="text-primary font-medium hover:underline">{s}</a>
          ))}
        </div>
      ),
    },
  ];

  return (
    <section id="contact" className="section-padding bg-white">
      <div className="container-app">
        <SectionHeader eyebrow="Get in Touch" title="Contact Us" center />
        <div className="grid lg:grid-cols-2 gap-7 md:gap-10">
          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((c) => (
              <div key={c.title} className="p-5 sm:p-6 bg-cream rounded-xl border border-stone-200 hover:border-primary hover:shadow-sm transition">
                <span className="text-3xl block mb-3">{c.icon}</span>
                <h4 className="font-display text-lg font-semibold mb-1">{c.title}</h4>
                {c.content}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="card">
            <h3 className="font-display text-xl sm:text-2xl mb-5">Send a Message</h3>
            <div className="space-y-4">
              <div>
                <label className="form-label">Name *</label>
                <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Subject *</label>
                <input className="form-input" name="subject" value={form.subject} onChange={handleChange} required />
              </div>
              <div>
                <label className="form-label">Message *</label>
                <textarea className="form-input" name="message" rows={4} value={form.message} onChange={handleChange} required />
              </div>
              <button type="submit" className="btn-primary w-full min-h-12">Send Message</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
