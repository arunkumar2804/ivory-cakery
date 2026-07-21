import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaInstagram, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <img src="/images/ivory_logo.png" alt="Ivory Cakery Logo" className="footer-logo-img" loading="lazy" decoding="async" />
          <p className="footer-tagline">Crafted to be as beautiful as it is memorable.</p>
          <div className="social-links">
            <a href="https://www.instagram.com/ivory_cakery" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/share/18rBG3NEVS" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebook size={20} />
            </a>
          </div>
        </div>

        <div className="footer-links-group">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/creations">Our Creations</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Get in Touch</h3>
          <ul>
            <li>
              <Phone size={18} />
              <span>+91 81237 84747</span>
            </li>
            <li>
              <Mail size={18} />
              <span>ivorycakery@gmail.com</span>
            </li>
            <li>
              <MapPin size={18} />
              <span>SSK Residency 2nd cross, FCI Main Rd,<br/>Kadugodi, Bengaluru 560067</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Ivory Cakery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
