import { useRestaurant } from '../../context/RestaurantContext';
// Import your logo here (adjust the path to match your actual folder structure)
import logo from '../gallery/logo.webp';

export default function Footer() {
  const { restaurant } = useRestaurant();
  const year = new Date().getFullYear();

  // A cleaner way to manage your links
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Booking', href: '#booking' },
    { name: 'Order', href: '#order' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-ink text-white/70 pt-16 pb-8 border-t border-white/10 relative overflow-hidden">
      
      {/* Subtle top glow effect for a premium feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[100px] bg-accent/10 blur-[80px] rounded-full pointer-events-none"></div>

      <div className="container-app relative z-10 flex flex-col items-center gap-3 text-center px-4">
        
        {/* Brand Logo & Name Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-white/5 rounded-full p-2 border border-white/10 shadow-lg backdrop-blur-md flex items-center justify-center">
             <img src={logo} alt="Restaurant Logo" className="w-full h-full object-contain" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl tracking-wide text-white">
            {restaurant?.name || 'Gourmet Haven'}
          </h2>
          <p className="max-w-md text-sm text-white/50 leading-relaxed ">
            Experience the fine art of dining. Savoring moments, one exquisite dish at a time.
          </p>
        </div>

        {/* Elegant Small Divider Line */}
        <div className="w-12 h-[2px] bg-accent/60 rounded-full my-2"></div>

        {/* Navigation Links */}
        <nav className="flex gap-8 flex-wrap justify-center text-sm font-medium tracking-widest uppercase ">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-white/70 hover:text-accent transition-all duration-300 hover:-translate-y-1"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Copyright & Bottom Info */}
        <div className="mt-8 pt-4 border-t border-white/10 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; {year} {restaurant?.name || 'Restaurant'}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}