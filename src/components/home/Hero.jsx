import { useRestaurant } from '../../context/RestaurantContext';

export default function Hero() {
  const { restaurant } = useRestaurant();
  if (!restaurant) return null;

  const stats = [
    { value: restaurant.rating, label: 'Rating' },
    { value: `${restaurant.dishes?.length || 0}+`, label: 'Signature Dishes' },
    { value: `${restaurant.years}+`, label: 'Years of Excellence' },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-24 pb-16"
    >
      <img
        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
        alt="Elegant restaurant interior"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="photo-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/35 via-transparent to-accent/20" />

      <div className="container-app text-center text-white relative z-10">
        <p className="text-accent text-sm font-semibold tracking-widest uppercase mb-4">{restaurant.tagline}</p>
        <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold mb-4">{restaurant.name}</h1>
        <p className="text-white/90 text-base sm:text-lg max-w-xl mx-auto mb-8 font-light">
          {restaurant.subtitle || restaurant.description?.slice(0, 120)}
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-12">
          <a href="#booking" className="btn-primary">Reserve a Table</a>
          <a href="#dishes" className="btn-outline">Explore Menu</a>
        </div>
        <div className="glass-card px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex flex-wrap justify-center gap-7 sm:gap-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <span className="block font-display text-3xl font-bold text-accent">{s.value}</span>
              <span className="text-xs uppercase tracking-wider text-white">{s.label}</span>
            </div>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
