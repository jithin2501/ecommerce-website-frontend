import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import '../../styles/navbar/Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav>
      <div className="nav-inner">

        {/* LEFT: LOGO */}
        <Link to="/" className="logo-container">
          <div className="logo-img">
            <img src="images/logo.png" alt="logo" />
          </div>
          <div className="logo-text">
            Sumathi<br />Trends
          </div>
        </Link>

        {/* RIGHT: HAMBURGER */}
        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26}/> : <Menu size={26}/>}
        </button>

      </div>

      {/* SLIDE MENU */}
      <div className={`mobile-drawer ${menuOpen ? 'open' : ''}`}>

        <Link onClick={() => handleNav('/')}>Home</Link>
        <a onClick={() => handleNav('/')}>About Us</a>
        <Link onClick={() => handleNav('/collections')}>Collections</Link>
        <a onClick={() => handleNav('/')}>Review</a>
        <Link onClick={() => handleNav('/contact')}>Contact</Link>

        <hr />

        <Link onClick={() => handleNav('/account')}>
          <User size={18}/> Account
        </Link>

        <Link onClick={() => handleNav('/cart')}>
          <ShoppingCart size={18}/> Cart ({cartCount})
        </Link>

      </div>

      {/* OVERLAY */}
      {menuOpen && (
        <div 
          className="overlay"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </nav>
  );
}