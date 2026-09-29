import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-inner">
        <NavLink to="/" className="navbar-logo" onClick={closeMenu}>
          Port<span>folio</span>
          <span className="logo-star" aria-hidden="true">✦</span>
        </NavLink>

        <button
          className={`navbar-toggle ${isOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
          <NavLink to="/" end onClick={closeMenu}>
            หน้าแรก
          </NavLink>
          <NavLink to="/education" onClick={closeMenu}>
            การศึกษา
          </NavLink>
          <NavLink to="/activities" onClick={closeMenu}>
            กิจกรรม
          </NavLink>
          <NavLink to="/contact" onClick={closeMenu}>
            ติดต่อ
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
