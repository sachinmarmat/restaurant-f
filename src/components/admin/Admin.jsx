import { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import { useToast } from '../../context/ToastContext';
import SectionHeader from '../layout/SectionHeader';

const EMPTY_DISH = { name: '', category: 'mains', price: '', emoji: '🍽️', image: '', description: '', famousReason: '' };
const EMPTY_CHEF = { name: '', role: '', experience: '', specialty: '', ability: '', photo: '' };

export default function Admin() {
  const { restaurant, updateRestaurant, resetRestaurant } = useRestaurant();
  const { showToast } = useToast();
  const [form, setForm] = useState(null);
  const [dishes, setDishes] = useState([]);
  const [chefs, setChefs] = useState([]);

  useEffect(() => {
    if (restaurant) {
      setForm({
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        tagline: restaurant.tagline,
        description: restaurant.description,
        famousReason: restaurant.famousReason,
        phone: restaurant.phone,
        email: restaurant.email,
        address: restaurant.address,
        hours: restaurant.hours,
        chef: restaurant.chef,
        rating: restaurant.rating,
        years: restaurant.years,
        tableCount: restaurant.tableCount,
      });
      setDishes(restaurant.dishes.map((d) => ({ ...d })));
      setChefs((restaurant.chefs || []).map((c) => ({ ...c })));
    }
  }, [restaurant]);

  if (!form) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleDishChange = (i, field, value) => {
    const updated = [...dishes];
    updated[i] = { ...updated[i], [field]: value };
    setDishes(updated);
  };

  const handleChefChange = (i, field, value) => {
    const updated = [...chefs];
    updated[i] = { ...updated[i], [field]: value };
    setChefs(updated);
  };

  const addDish = () => setDishes([...dishes, { ...EMPTY_DISH }]);
  const removeDish = (i) => {
    if (dishes.length <= 3) return showToast('Minimum 3 dishes required.', 'error');
    setDishes(dishes.filter((_, idx) => idx !== i));
  };

  const addChef = () => setChefs([...chefs, { ...EMPTY_CHEF }]);
  const removeChef = (i) => {
    if (chefs.length <= 3) return showToast('Minimum 3 chefs required.', 'error');
    setChefs(chefs.filter((_, idx) => idx !== i));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        rating: parseFloat(form.rating),
        years: parseInt(form.years, 10),
        tableCount: parseInt(form.tableCount, 10),
        dishes: dishes.map((d) => ({ ...d, price: parseFloat(d.price) })),
        chefs,
      };
      await updateRestaurant(payload);
      showToast('Restaurant saved successfully!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      showToast(err.response?.data?.message || 'Save failed', 'error');
    }
  };

  const handleReset = async () => {
    if (!confirm('Reset to default restaurant data? This cannot be undone.')) return;
    try {
      await resetRestaurant();
      showToast('Restaurant reset to defaults.');
    } catch {
      showToast('Reset failed', 'error');
    }
  };

  return (
    <div>
      <SectionHeader
        eyebrow="Restaurant Management"
        title="Add or Update Restaurant"
        description="All fields marked with * are compulsory to register a restaurant."
        center
      />

      <form onSubmit={handleSubmit} className="card space-y-8">
        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-primary font-semibold mb-2">Basic Information *</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Restaurant Name *</label>
              <input className="form-input" name="name" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Cuisine Type *</label>
              <input className="form-input" name="cuisine" value={form.cuisine} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="form-label">Tagline *</label>
            <input className="form-input" name="tagline" value={form.tagline} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Description *</label>
            <textarea className="form-input" name="description" rows={3} value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Why This Restaurant Is Famous *</label>
            <textarea className="form-input" name="famousReason" rows={2} value={form.famousReason} onChange={handleChange} required />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-primary font-semibold mb-2">Contact Details *</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Phone *</label>
              <input className="form-input" name="phone" value={form.phone} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Email *</label>
              <input className="form-input" type="email" name="email" value={form.email} onChange={handleChange} required />
            </div>
          </div>
          <div>
            <label className="form-label">Full Address *</label>
            <input className="form-input" name="address" value={form.address} onChange={handleChange} required />
          </div>
          <div>
            <label className="form-label">Opening Hours *</label>
            <input className="form-input" name="hours" value={form.hours} onChange={handleChange} required />
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-primary font-semibold mb-2">Additional Details *</legend>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label">Head Chef *</label>
              <input className="form-input" name="chef" value={form.chef} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Rating (1–5) *</label>
              <input className="form-input" type="number" name="rating" min="1" max="5" step="0.1" value={form.rating} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Years in Business *</label>
              <input className="form-input" type="number" name="years" min="1" value={form.years} onChange={handleChange} required />
            </div>
            <div>
              <label className="form-label">Number of Tables *</label>
              <input className="form-input" type="number" name="tableCount" min="1" max="100" value={form.tableCount} onChange={handleChange} required />
            </div>
          </div>
        </fieldset>

        {/* Chefs */}
        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-primary font-semibold mb-2">
            Chef Profiles * <span className="text-sm font-body text-muted font-normal">(min. 3)</span>
          </legend>
          {chefs.map((chef, i) => (
            <div key={i} className="relative p-5 bg-cream rounded-xl border border-stone-200 space-y-3">
              <button type="button" onClick={() => removeChef(i)} className="absolute top-3 right-3 text-red-700 text-xl leading-none">×</button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Chef Name *</label>
                  <input className="form-input" value={chef.name} onChange={(e) => handleChefChange(i, 'name', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Role *</label>
                  <input className="form-input" placeholder="e.g. Executive Chef" value={chef.role} onChange={(e) => handleChefChange(i, 'role', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Experience *</label>
                  <input className="form-input" placeholder="e.g. 12 years" value={chef.experience} onChange={(e) => handleChefChange(i, 'experience', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Specialty *</label>
                  <input className="form-input" placeholder="e.g. Modern Indian Cuisine" value={chef.specialty} onChange={(e) => handleChefChange(i, 'specialty', e.target.value)} required />
                </div>
              </div>
              <div>
                <label className="form-label">Ability / Description *</label>
                <input className="form-input" placeholder="What makes this chef unique..." value={chef.ability} onChange={(e) => handleChefChange(i, 'ability', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Photo URL</label>
                <input className="form-input" placeholder="https://..." value={chef.photo || ''} onChange={(e) => handleChefChange(i, 'photo', e.target.value)} />
                {chef.photo && <img src={chef.photo} alt="preview" className="mt-2 h-24 w-24 object-cover rounded-full border-2 border-primary" />}
              </div>
            </div>
          ))}
          <button type="button" onClick={addChef} className="btn-outline-dark">+ Add Chef</button>
        </fieldset>

        {/* Dishes */}
        <fieldset className="space-y-4">
          <legend className="font-display text-xl text-primary font-semibold mb-2">
            Signature Dishes * <span className="text-sm font-body text-muted font-normal">(min. 3)</span>
          </legend>
          {dishes.map((dish, i) => (
            <div key={i} className="relative p-5 bg-cream rounded-xl border border-stone-200 space-y-3">
              <button type="button" onClick={() => removeDish(i)} className="absolute top-3 right-3 text-red-700 text-xl leading-none">×</button>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="form-label">Dish Name *</label>
                  <input className="form-input" value={dish.name} onChange={(e) => handleDishChange(i, 'name', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Category *</label>
                  <select className="form-input" value={dish.category} onChange={(e) => handleDishChange(i, 'category', e.target.value)}>
                    {['starters', 'mains', 'desserts', 'drinks'].map((c) => (
                      <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label">Price ($) *</label>
                  <input className="form-input" type="number" min="0" step="0.01" value={dish.price} onChange={(e) => handleDishChange(i, 'price', e.target.value)} required />
                </div>
                <div>
                  <label className="form-label">Emoji</label>
                  <input className="form-input" value={dish.emoji} onChange={(e) => handleDishChange(i, 'emoji', e.target.value)} maxLength={4} />
                </div>
              </div>
              <div>
                <label className="form-label">Description *</label>
                <input className="form-input" value={dish.description} onChange={(e) => handleDishChange(i, 'description', e.target.value)} required />
              </div>
              <div>
                <label className="form-label">Image URL</label>
                <input className="form-input" placeholder="https://..." value={dish.image || ''} onChange={(e) => handleDishChange(i, 'image', e.target.value)} />
                {dish.image && <img src={dish.image} alt="preview" className="mt-2 h-24 w-full object-cover rounded-lg" />}
              </div>
              <div>
                <label className="form-label">Why It&apos;s Famous *</label>
                <input className="form-input" value={dish.famousReason} onChange={(e) => handleDishChange(i, 'famousReason', e.target.value)} required />
              </div>
            </div>
          ))}
          <button type="button" onClick={addDish} className="btn-outline-dark">+ Add Dish</button>
        </fieldset>

        <div className="flex flex-wrap gap-4">
          <button type="submit" className="btn-primary">Save Restaurant</button>
          <button type="button" onClick={handleReset} className="btn-outline-dark">Reset to Default</button>
        </div>
      </form>
    </div>
  );
}
