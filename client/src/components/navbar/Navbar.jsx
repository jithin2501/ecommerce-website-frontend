import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/navbar/Navbar.css';

export default function Navbar() {
  const location  = useLocation();
  const navigate  = useNavigate();
  const { cartCount } = useCart();

  const pathParts    = location.pathname.split('/').filter(Boolean);
  const isBannerPage = pathParts.length <= 2 && location.pathname.startsWith('/collections');
  const isDetailPage = pathParts.length >= 3 && location.pathname.startsWith('/collections');
  const isContactPage = location.pathname === '/contact';

  const isCartPage = location.pathname === '/cart';
  const isHomePage = location.pathname === '/';
  const isAccountPage = location.pathname === '/account' || location.pathname.startsWith('/account/');

  const isFixedBanner = isBannerPage || isContactPage;

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setScrolled(false);

    if (!isFixedBanner && !isDetailPage && !isCartPage && !isHomePage && !isAccountPage) return;

    const handleScroll = () => setScrolled(window.scrollY > 60);

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    const hash = sessionStorage.getItem('scrollTarget');
    if (!hash) return;

    if (location.pathname === '/') {
      sessionStorage.removeItem('scrollTarget');
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (sessionStorage.getItem('goHome') === '1' && location.pathname === '/') {
      sessionStorage.removeItem('goHome');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  const handleHome = (e) => {
    e.preventDefault();
    sessionStorage.removeItem('scrollTarget');
    setMenuOpen(false);

    if (location.pathname !== '/') {
      sessionStorage.setItem('goHome', '1');
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleSection = (e, sectionId) => {
    e.preventDefault();
    setMenuOpen(false);

    if (location.pathname !== '/') {
      sessionStorage.setItem('scrollTarget', sectionId);
      navigate('/');
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    }
  };

  let navClass = '';

  if (isFixedBanner) {
    navClass = scrolled ? 'nav-banner-scrolled' : 'nav-initial';
  } else if ((isDetailPage || isCartPage || isHomePage || isAccountPage) && scrolled) {
    navClass = 'nav-detail-scrolled';
  }

  return (
    <nav className={navClass}>
      <div className="nav-inner">

        {/* LOGO */}
        <Link to="/" className="logo-container" onClick={handleHome}>
          <div className="logo-img">
            <img src="images/logo.png" alt="Sumathi Trends" />
          </div>
          <div className="logo-text">Sumathi<br />Trends</div>
        </Link>

        {/* DESKTOP NAV */}
        <ul className="nav-links">
          <li><a href="/" onClick={handleHome}>Home</a></li>
          <li><a href="#about" onClick={(e) => handleSection(e, 'about')}>About Us</a></li>
          {/* Collections now goes to /collections/all (mixed product grid) */}
          <li><Link to="/collections/all">Collections</Link></li>
          <li><a href="#reviews" onClick={(e) => handleSection(e, 'reviews')}>Review</a></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>

        {/* DESKTOP ACTIONS */}
        <div className="nav-actions">
          <Link to="/account" className="action-item">
            <User size={18} />
            Account
          </Link>

          <Link to="/cart" className="action-item">
            <div className="cart-wrapper">
              <ShoppingCart size={18} />
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </div>
            Cart
          </Link>
        </div>

        {/* HAMBURGER BUTTON */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="mobile-menu">
          <a href="/" onClick={handleHome}>Home</a>
          <a href="#about" onClick={(e) => handleSection(e, 'about')}>About Us</a>
          {/* Collections goes to /collections/all in mobile menu too */}
          <Link to="/collections/all" onClick={() => setMenuOpen(false)}>Collections</Link>
          <a href="#reviews" onClick={(e) => handleSection(e, 'reviews')}>Review</a>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          <Link to="/account" onClick={() => setMenuOpen(false)}>Account</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>
            Cart ({cartCount})
          </Link>
        </div>
      )}

    </nav>
  );
}