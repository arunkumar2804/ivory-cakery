import React from 'react';
import { ArrowRight } from 'lucide-react';
import './Creations.css';

interface CreationsProps {
  onEnquiryClick: () => void;
}

const Creations: React.FC<CreationsProps> = ({ onEnquiryClick }) => {
  const categories = [
    { name: 'Kids Theme Cakes', img: '/images/AVIF/kids_theme_cake.avif', subtitle: 'Fun & Magical Sculptures', color: 'bg-cream' },
    { name: 'Wedding Cakes', img: '/images/AVIF/wedding_cake.avif', subtitle: 'Bespoke Centerpieces', color: 'bg-coral-light' },
    { name: 'Bento Cakes', img: '/images/AVIF/bento_cake.avif', subtitle: 'Personal Showstoppers', color: 'bg-peach-light' },
    { name: 'Custom Themes', img: '/images/AVIF/custom_theme_cake.avif', subtitle: 'Sculpted Masterpieces', color: 'bg-cream' },
    { name: 'Birthday Cakes', img: '/images/AVIF/birthday_cake.avif', subtitle: 'Sweet Grandeur', color: 'bg-coral-light' },
    { name: 'Anniversary Cakes', img: '/images/AVIF/anniversary_cake.avif', subtitle: 'Romantic Layering', color: 'bg-peach-light' },
    { name: 'Gourmet Bites', img: '/images/AVIF/gourmet_bites.avif', subtitle: 'Exquisite Finishes', color: 'bg-cream' },
    { name: 'Photo Cakes', img: '/images/AVIF/photo_cake.avif', subtitle: 'Edible Realism', color: 'bg-coral-light' },
    { name: 'Engagement Cakes', img: '/images/AVIF/engagement_cake.avif', subtitle: 'Stunning Showpieces', color: 'bg-peach-light' },
  ];

  return (
    <div className="creations-page">
      
      {/* Hero Banner */}
      <section className="page-hero-vibrant text-center">
        <div className="floating-geo geo-circle-empty" style={{ left: '20%' }}></div>
        <div className="floating-geo geo-square-rot" style={{ right: '25%' }}></div>
        
        <div className="container">
          <h1 className="heading-1">
            Featured <span className="text-highlight">Variants</span>
          </h1>
          <p className="text-lg mt-2 max-w-lg mx-auto">
            Our cakes are designed to be the main characters of your event. Feast your eyes on these show-stopping centerpiece designs.
          </p>
        </div>
      </section>

      {/* Grid Showcase Section */}
      <section className="section pt-0">
        <div className="container">
          <div className="creations-showcase-grid">
            {categories.map((cat, index) => (
              <div className={`showcase-card ${cat.color}`} key={index} onClick={onEnquiryClick}>
                <div className="showcase-img-box">
                  <img 
                    src={cat.img} 
                    alt={`Ivory Cakery ${cat.name} collection display`} 
                    className="showcase-main-character" 
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="overlay-tint"></div>
                </div>
                
                <div className="showcase-info">
                  <h3>{cat.name}</h3>
                  <p>{cat.subtitle}</p>
                  <span className="card-click-trigger">
                    <span>Order Design</span> <ArrowRight size={16} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section cta-vibrant text-center pt-0">
        <div className="container">
          <div className="cta-box-wrapper blob-shape-2">
            <h2 className="heading-2 text-white">Found Your Favorite Design?</h2>
            <p className="text-white mt-1 opacity-90 max-w-lg mx-auto" style={{ opacity: 0.9 }}>
              Let's craft the custom layers and visual toppings for your upcoming party.
            </p>
            <button className="btn btn-outline-white mt-4" onClick={onEnquiryClick}>
              👉 Start Enquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Creations;
