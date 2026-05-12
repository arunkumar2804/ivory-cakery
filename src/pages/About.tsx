import React from 'react';

import { Sparkles, Heart, Award } from 'lucide-react';
import './About.css';

interface AboutProps {
  onEnquiryClick: () => void;
}

const About: React.FC<AboutProps> = ({ onEnquiryClick }) => {
  return (
    <div className="about-vibrant-page">
      
      {/* Hero Banner */}
      <section className="page-hero-vibrant text-center">
        <div className="floating-geo geo-square-small" style={{ left: '15%' }}></div>
        <div className="floating-geo geo-circle-solid-small" style={{ right: '10%' }}></div>

        <div className="container">
          <h1 className="heading-1">
            Our <span className="text-highlight">Story</span>
          </h1>
          <p className="text-lg mt-2 max-w-lg mx-auto">
            The creative narrative and absolute passion for design driving Ivory Cakery.
          </p>
        </div>
      </section>

      {/* Story Content Block */}
      <section className="section pt-0">
        <div className="container">
          <div className="story-editorial-box blob-shape-3">
            <h2 className="heading-2 text-center mb-4">
              Taking Baking To <br/>
              <span className="text-highlight">New Heights</span>
            </h2>

            <div className="story-split-text">
              <p>
                Ivory Cakery began with a simple idea — to make every celebration feel truly personal. 
                What started as a passion for baking soon grew into a love for designing cakes that reflect 
                individual stories, styles, and moments.
              </p>
              <p>
                Today, Ivory Cakery is dedicated to creating bespoke cakes that go beyond taste — each one 
                thoughtfully crafted to become a meaningful part of your celebration. From an intimate 
                gathering to a grand wedding, we pour our heart into every detail, ensuring your cake is 
                as unique as the memories you're creating.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy simplified */}
      <section className="section philosophy-vibrant pt-0">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="heading-2">Why Choose Our <span className="text-highlight">Cakes</span></h2>
            <p className="text-lg mt-1">Guided by simplicity, quality, and thoughtful design.</p>
          </div>

          <div className="reasons-vibrant-grid">
            
            <div className="reason-card-box bg-cream">
              <div className="reason-icon-pill mx-auto mb-3">
                <Sparkles size={20} color="#FFFFFF" />
              </div>
              <h3>Modern Innovation</h3>
              <p>Every cake is conceptualized around breathtaking designs, playful sprinkles, and aesthetic toppings.</p>
            </div>

            <div className="reason-card-box bg-coral-light">
              <div className="reason-icon-pill mx-auto mb-3" style={{ backgroundColor: 'var(--color-primary)' }}>
                <Heart size={20} color="#FFFFFF" />
              </div>
              <h3>Passionate Approach</h3>
              <p>Made with carefully chosen premium ingredients alongside meticulous attention to taste combinations.</p>
            </div>

            <div className="reason-card-box bg-peach-light">
              <div className="reason-icon-pill mx-auto mb-3">
                <Award size={20} color="#FFFFFF" />
              </div>
              <h3>Organic Flavoring</h3>
              <p>Crafted using genuine purees, unadulterated cocoa structures, and artisan slow-churned butterbases.</p>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-vibrant text-center pt-0">
        <div className="container">
          <div className="cta-box-wrapper blob-shape-1">
            <h2 className="heading-2 text-white">Let’s Create Something <br/>Beautiful Together</h2>
            <button className="btn btn-outline-white mt-4" onClick={onEnquiryClick}>
              👉 Start Enquiry
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
