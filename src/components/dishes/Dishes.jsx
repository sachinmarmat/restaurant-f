import { useState } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import SectionHeader from '../layout/SectionHeader';

const CATEGORIES = ['all', 'starters', 'mains', 'desserts', 'drinks'];
const CATEGORY_IMAGES = {
  starters: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=80',
  mains: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=900&q=80',
  desserts: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=900&q=80',
  drinks: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
};

export default function Dishes() {
  const { restaurant } = useRestaurant();
  const [filter, setFilter] = useState('all');

  if (!restaurant) return null;

  const dishes =
    filter === 'all' ? restaurant.dishes : restaurant.dishes.filter((d) => d.category === filter);

  return (
    <section id="dishes" className="section-padding bg-white">
      <div className="container-app">
        <SectionHeader
          eyebrow="Our Menu"
          title="Famous Dishes"
          description="Each dish carries a legacy — discover what makes them legendary."
          center
        />
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium border-2 transition ${
                filter === cat
                  ? 'bg-primary border-primary text-white'
                  : 'border-stone-200 text-muted hover:border-primary'
              }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
          
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {dishes.map((dish) => (
            <article key={dish._id} className="bg-cream rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition flex flex-col">
              <div className="relative h-48">
                <img
                  src={dish.image || CATEGORY_IMAGES[dish.category]}
                  alt={dish.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
                
                <div className="photo-overlay" />
                <span className="absolute left-4 top-4 text-3xl">{dish.emoji || '🍽️'}</span>
                <span className="absolute right-3 bottom-3 font-bold text-white bg-primary/80 backdrop-blur px-3 py-1 rounded-full text-sm">
                  ${dish.price.toFixed(2)}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-1 rounded-full w-fit mb-2">
                  {dish.category}
                </span>
                <div className="flex justify-between items-start gap-2 mb-2">
                  <h3 className="font-display text-xl font-semibold">{dish.name}</h3>
                </div>
                <p className="text-sm text-muted mb-4 flex-1">{dish.description}</p>
                <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary rounded-r-lg text-sm">
                  <strong className="text-primary text-xs uppercase tracking-wide block mb-1">Why It&apos;s Famous</strong>
                  {dish.famousReason}
                </div>
              </div>
              
            </article>
            
          ))}
          
        </div>
        
      </div>
    </section>
  );
}
