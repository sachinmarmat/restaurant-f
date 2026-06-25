import { useRestaurant } from '../../context/RestaurantContext';
import SectionHeader from '../layout/SectionHeader';

export default function Chefs() {
  const { restaurant } = useRestaurant();
  if (!restaurant?.chefs?.length) return null;

  return (
    <section id="chefs" className="section-padding bg-cream">
      <div className="container-app">
        <SectionHeader
          eyebrow="Meet The Team"
          title="Our Chefs"
          description="The talented hands and passionate minds behind every legendary dish."
          center
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurant.chefs.map((chef, i) => (
            <div key={i} className="bg-white rounded-2xl overflow-hidden border border-stone-200 hover:shadow-xl hover:-translate-y-1 transition flex flex-col">
              <div className="relative h-56">
                {chef.photo ? (
                  <img src={chef.photo} alt={chef.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-6xl">
                    👨‍🍳
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-white font-display font-bold text-lg leading-tight">{chef.name}</p>
                  <p className="text-accent text-xs font-semibold uppercase tracking-wide">{chef.role}</p>
                </div>
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex gap-3">
                  <div className="flex-1 bg-cream rounded-lg p-2.5 text-center">
                    <p className="text-xs text-muted uppercase tracking-wide">Experience</p>
                    <p className="font-semibold text-sm mt-0.5">{chef.experience}</p>
                  </div>
                  <div className="flex-1 bg-cream rounded-lg p-2.5 text-center">
                    <p className="text-xs text-muted uppercase tracking-wide">Specialty</p>
                    <p className="font-semibold text-sm mt-0.5 leading-tight">{chef.specialty}</p>
                  </div>
                </div>
                <div className="p-3 bg-gradient-to-r from-primary/10 to-accent/10 border-l-4 border-primary rounded-r-lg text-sm text-muted">
                  {chef.ability}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
