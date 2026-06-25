import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Hero from '../components/home/Hero';
import About from '../components/about/About';
import Chefs from '../components/about/Chefs';
import Gallery from '../components/gallery/Gallery';
import Dishes from '../components/dishes/Dishes';
import Booking from '../components/booking/Booking';
import Order from '../components/order/Order';
import Contact from '../components/contact/Contact';

export default function PublicSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Gallery />
        <Dishes />
        <Booking />
        <Order />
        <Chefs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
