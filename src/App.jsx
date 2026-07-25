import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import RobotPet from './components/RobotPet';
import { CartProvider } from './context/CartContext';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);
  return null;
}

export default function App({ children }) {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin-dashboard';

  return (
    <CartProvider>
      <Preloader />
      <ScrollToTop />
      {!isAdmin && <Header />}
      {children}
      {!isAdmin && <RobotPet />}
      {!isAdmin && <Footer />}
    </CartProvider>
  );
}
