import SectionHeader from '../layout/SectionHeader';

const PHOTOS = [
  {
    src: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    title: 'Fine Dining Hall',
  },
  {
    src: 'https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?auto=format&fit=crop&w=1000&q=80',
    title: 'Chef Special Plating',
  },
  {
    src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=80',
    title: 'Fresh Signature Desserts',
  },
  {
    src: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?auto=format&fit=crop&w=1000&q=80',
    title: 'Colorful Beverages',
  },
];

export default function Gallery() {
  return (
    <section className="section-padding bg-gradient-to-b from-white to-amber-50/40">
      <div className="container-app">
        <SectionHeader
          eyebrow="Photo Experience"
          title="Restaurant Gallery"
          description="A vibrant look at our ambience, signature plates, and premium dining experience."
          center
        />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {PHOTOS.map((photo) => (
            <article
              key={photo.title}
              className="relative h-44 sm:h-56 lg:h-64 rounded-2xl overflow-hidden group shadow-md"
            >
              <img
                src={photo.src}
                alt={photo.title}
                loading="lazy"
                className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="photo-overlay" />
              <h3 className="absolute left-3 bottom-3 text-white text-sm sm:text-base font-semibold">
                {photo.title}
              </h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
