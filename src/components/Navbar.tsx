import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

interface NavbarProps {
  onEnquiryClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onEnquiryClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`navbar-vibrant ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-vibrant-container">
        
        <Link to="/" className="nav-brand-logo">
          <img src="/images/ivory_logo.png" alt="Ivory Cakery Logo" className="brand-logo-img" />
          <span className="brand-text">Ivory <span className="text-highlight">Cakery.</span></span>
        </Link>

        <nav className={`nav-vibrant-links ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/creations" className={location.pathname === '/creations' ? 'active' : ''}>Variants</Link>
          <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
          <Link to="/how-it-works" className={location.pathname === '/how-it-works' ? 'active' : ''}>Process</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact Us</Link>
          
          <button className="btn btn-primary nav-vibrant-cta" onClick={onEnquiryClick}>
            Order Now
          </button>
        </nav>

        <button className="mobile-toggle-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

      </div>
    </header>
  );
};

export default Navbar;
