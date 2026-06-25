import { useRestaurant } from '../../context/RestaurantContext';
import SectionHeader from '../layout/SectionHeader';

const DETAILS = [
  { icon: '🕐', label: 'Opening Hours', key: 'hours' },
  { icon: '📍', label: 'Location', key: 'address' },
  { icon: '👨‍🍳', label: 'Head Chef', key: 'chef' },
  { icon: '🏆', label: "Why We're Famous", key: 'famousReason' },
];

export default function About() {
  const { restaurant } = useRestaurant();
  if (!restaurant) return null;

  return (
    <section id="about" className="section-padding">
      <div className="container-app">
        <SectionHeader eyebrow="Our Story" title="Restaurant Details" />
        <div className="grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary to-primary-dark shadow-2xl overflow-hidden relative">
          {restaurant.photo ? (
            <img src={restaurant.photo} alt={restaurant.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-8xl">🍽️</div>
          )}
        </div>
          <div>
            <h3 className="font-display text-3xl font-bold">{restaurant.name}</h3>
            <p className="text-primary font-semibold mt-1 mb-4">{restaurant.cuisine}</p>
            <p className="text-muted mb-8">{restaurant.description}</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {DETAILS.map((d) => (
                <div key={d.key} className="flex gap-4 p-5 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition">
                  <span className="text-2xl">{d.icon}</span>
                  <div>
                    <strong className="text-xs uppercase tracking-wide text-primary block mb-1">{d.label}</strong>
                    <p className="text-sm text-muted">{restaurant[d.key]}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
