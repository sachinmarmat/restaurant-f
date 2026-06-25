import { useState, useEffect } from 'react';
import { useRestaurant } from '../../context/RestaurantContext';
import myLogo from '../gallery/logo.webp';

const LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#dishes', label: 'Dishes' },
  { href: '#booking', label: 'Book Table' },
  { href: '#order', label: 'Order' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const { restaurant } = useRestaurant();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#home');

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY + 120;
      sections.forEach((sec) => {
        if (scrollY >= sec.offsetTop && scrollY < sec.offsetTop + sec.offsetHeight) {
          setActive(`#${sec.id}`);
        }
      });
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleClick = (href) => {
    setActive(href);
    setOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/45 z-[998] md:hidden" onClick={() => setOpen(false)} />
      )}

      <header className="fixed top-0 left-0 right-0 z-[999] bg-ink/95 backdrop-blur-md border-b border-white/10 h-[68px] md:h-[72px]">
        <nav className="container-app flex items-center justify-between  h-full">
          <a href="#home" className="flex items-center gap-2 text-white font-display text-xl md:text-2xl font-bold min-w-0">
            {/* <span className="text-accent">✦</span> */}
            <div className=""> <img
              src={myLogo}
              alt="Restaurant Logo"
              className="w-8 h-8 object-contain rounded-full "
            /></div>
            <span className="truncate max-w-[190px] sm:max-w-[260px]">
              {restaurant?.name || 'Restaurant'}
            </span>
          </a>

          <button
            className="md:hidden h-11 w-11 rounded-full border border-white/20 bg-white/10 text-white flex items-center justify-center shadow-lg"
            onClick={() => setOpen(!open)}
            aria-label="Open navigation menu"
            aria-expanded={open}
          >
            <div className="flex flex-col gap-1">
              <span className="block w-1.5 h-1.5 rounded-full bg-white" />
              <span className="block w-1.5 h-1.5 rounded-full bg-white" />
              <span className="block w-1.5 h-1.5 rounded-full bg-white" />
            </div>
          </button>

          <ul
            className={`fixed md:static top-[76px] md:top-0 right-4 md:right-0 w-[88vw] max-w-[550px] md:w-auto bg-white/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-3 md:p-0 rounded-2xl md:rounded-none border border-white/70 md:border-0 shadow-2xl md:shadow-none flex flex-col md:flex-row md:items-center gap-3 transition-all duration-300 ${open
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-2 pointer-events-none md:opacity-100 md:translate-y-0 md:pointer-events-auto'
              }`}
          >
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`block px-3 py-3 rounded-xl text-sm font-medium transition ${active === link.href
                      ? 'text-white bg-primary md:bg-accent/15'
                      : 'text-ink md:text-white/80 hover:text-primary md:hover:text-white hover:bg-primary/10 md:hover:bg-white/10'
                    }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>
    </>
  );
}
