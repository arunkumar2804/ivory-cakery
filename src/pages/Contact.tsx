import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaInstagram } from 'react-icons/fa';
import './Contact.css';

interface ContactProps {
  onEnquiryClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ onEnquiryClick }) => {
  return (
    <div className="contact-vibrant-page">
      
      {/* Hero Banner */}
      <section className="page-hero-vibrant text-center pt-0">
        <div className="floating-geo geo-circle-solid" style={{ left: '10%', top: '40%' }}></div>
        <div className="container" style={{ paddingTop: '8rem' }}>
          <h1 className="heading-1">
            Get in <span className="text-highlight">Touch</span>
          </h1>
          <p className="text-lg mt-2 max-w-lg mx-auto">
            Connect with our dessert curation desk directly to launch your upcoming party pre-orders.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container">
          <div className="contact-vibrant-grid max-w-5xl mx-auto">
            
            <div className="contact-info-block">
              <h2 className="heading-2 mb-4">
                Reach Out <span className="text-highlight">Directly</span>
              </h2>
              
              <div className="contact-vibrant-items">
                
                <div className="contact-row-box blob-shape-2">
                  <div className="contact-icon-bubble">
                    <Phone size={20} />
                  </div>
                  <div className="contact-details">
                    <h3>Phone Hotline</h3>
                    <p>+91 81237 84747</p>
                  </div>
                </div>

                <div className="contact-row-box blob-shape-1">
                  <div className="contact-icon-bubble" style={{ backgroundColor: 'var(--color-primary)', color: '#FFFFFF' }}>
                    <Mail size={20} />
                  </div>
                  <div className="contact-details">
                    <h3>Email Desk</h3>
                    <p>ivorycakery@gmail.com</p>
                  </div>
                </div>

                <div className="contact-row-box blob-shape-3">
                  <div className="contact-icon-bubble">
                    <MapPin size={20} />
                  </div>
                  <div className="contact-details">
                    <h3>Atelier Location</h3>
                    <p>Based in [City Name]<br/>Delivery available across selected premium zones</p>
                  </div>
                </div>

                <div className="contact-row-box blob-shape-2">
                  <div className="contact-icon-bubble" style={{ backgroundColor: 'var(--color-text)', color: '#FFFFFF' }}>
                    <FaInstagram size={20} />
                  </div>
                  <div className="contact-details">
                    <h3>Social Feed</h3>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="vibrant-link">@ivorycakery</a>
                  </div>
                </div>

              </div>
            </div>

            <div className="contact-action-block blob-shape-1">
              <h2 className="heading-3 mb-2 text-white">Quick Enquiry</h2>
              <p className="text-white opacity-90 mb-4" style={{ fontSize: '0.95rem', opacity: 0.9 }}>
                Launch our streamlined embedded booking pop-up to log your flavor architecture instantly.
              </p>
              
              <button className="btn btn-outline-white w-100" onClick={onEnquiryClick} style={{ padding: '1.1rem 2rem' }}>
                👉 Open Enquiry Form
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Contact;
