import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Heart, Award, ArrowRight } from 'lucide-react';
import './Home.css';

interface HomeProps {
  onEnquiryClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onEnquiryClick }) => {
  const categories = [
    { name: 'Kids Theme Cakes', img: '/images/AVIF/kids_theme_cake.avif', subtitle: 'Fun & Magical Tiers', color: 'bg-cream' },
    { name: 'Wedding Cakes', img: '/images/AVIF/wedding_cake.avif', subtitle: 'Bespoke Centerpieces', color: 'bg-coral-light' },
    { name: 'Bento Cakes', img: '/images/AVIF/bento_cake.avif', subtitle: 'Personal Delights', color: 'bg-peach-light' },
    { name: 'Custom Themes', img: '/images/AVIF/custom_theme_cake.avif', subtitle: 'Sculpted Artistry', color: 'bg-cream' },
    { name: 'Birthday Cakes', img: '/images/AVIF/birthday_cake.avif', subtitle: 'Sweet Memories', color: 'bg-coral-light' },
    { name: 'Anniversary Cakes', img: '/images/AVIF/anniversary_cake.avif', subtitle: 'Romantic Layering', color: 'bg-peach-light' },
    { name: 'Gourmet Bites', img: '/images/AVIF/gourmet_bites.avif', subtitle: 'Luxurious Flavors', color: 'bg-cream' },
    { name: 'Photo Cakes', img: '/images/AVIF/photo_cake.avif', subtitle: 'Edible Realism', color: 'bg-coral-light' },
    { name: 'Engagement Cakes', img: '/images/AVIF/engagement_cake.avif', subtitle: 'Stunning Showpieces', color: 'bg-peach-light' },
  ];

  return (
    <div className="home-page">
      
      {/* 1. HERO SECTION (Massive Cake Focus) */}
      <section className="hero-vibrant">
        <div className="floating-geo geo-circle-empty"></div>
        <div className="floating-geo geo-square-rot"></div>
        <div className="floating-geo geo-dots-grid"></div>

        <div className="container hero-grid">
          
          <div className="hero-content">
            <h1 className="heading-1">
              Crafted for <br/>
              <span className="text-highlight">Your</span> Moments.
            </h1>
            
            <p className="text-lg mt-3 mb-4 max-w-lg">
              Bespoke cakes designed to celebrate your most meaningful occasions. Popping with vibrant artistic structures where every design tells a delicious story.
            </p>
            
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={onEnquiryClick}>
                Order Now
              </button>
              <Link to="/creations" className="btn btn-outline">
                Explore Designs
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <div className="blob-backdrop blob-shape-1 anim-blob"></div>
            <div className="stripes-accent"></div>
            
            {/* Massive Hero Image Showcase */}
            <div className="hero-massive-wrapper">
              <img src="/images/AVIF/wedding_cake.avif" alt="Delicious Bespoke Cake" className="hero-massive-cake" />
            </div>

            <div className="floating-sticker anim-float">
              <Sparkles size={16} color="#F05A5B" />
              <span>Freshly Baked</span>
            </div>
          </div>

        </div>
      </section>

      {/* 2. OUR STORY (Large Visual Impact) */}
      <section className="section story-vibrant bg-wave-bottom">
        <div className="floating-geo geo-square-small"></div>
        <div className="floating-geo geo-circle-solid"></div>

        <div className="container story-grid">
          
          <div className="story-visual">
            <div className="blob-backdrop-secondary blob-shape-2 anim-blob" style={{ animationDirection: 'reverse' }}></div>
            <div className="dots-accent-left"></div>
            
            <div className="story-massive-wrapper">
              <img src="/images/AVIF/custom_theme_cake.avif" alt="Baker crafting a cake" className="story-massive-img" />
            </div>
            
            <div className="mini-badge-square"></div>
          </div>

          <div className="story-content">
            <h2 className="heading-2">
              Taking Cakes To <br/>
              <span className="text-highlight">New Heights</span>
            </h2>
            
            <p className="text-lg mt-3">
              Ivory Cakery began with a simple idea — to make every celebration feel truly personal. 
              What started as a passion for baking soon grew into a love for designing cakes that reflect 
              individual stories, styles, and moments.
            </p>
            
            <p className="text-lg mt-3 mb-4">
              Today, Ivory Cakery is dedicated to creating bespoke cakes that go beyond taste — each one 
              thoughtfully crafted to become a meaningful centerpiece of your celebration.
            </p>

            <Link to="/about" className="btn btn-primary">
              Learn More
            </Link>
          </div>

        </div>
      </section>

      {/* 3. CAKE COLLECTIONS (Large Show-stopping Imagery Main Characters) */}
      <section className="section creations-vibrant">
        <div className="container">
          
          <div className="section-header text-center mb-5">
            <h2 className="heading-2">Featured <span className="text-highlight">Variants</span></h2>
            <p className="text-lg mt-1">Our visual showpieces command the spotlight at every party.</p>
          </div>
          
          <div className="creations-showcase-grid">
            {categories.map((cat, index) => (
              <div className={`showcase-card ${cat.color}`} key={index} onClick={onEnquiryClick}>
                <div className="showcase-img-box">
                  <img src={cat.img} alt={cat.name} className="showcase-main-character" />
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

      {/* 4. WHY CHOOSE US / PHILOSOPHY */}
      <section className="section philosophy-vibrant">
        <div className="container philosophy-grid">
          
          <div className="philosophy-content">
            <h2 className="heading-2 mb-3">
              Why Choose Our <br/>
              <span className="text-highlight">Bespoke Cakes</span>
            </h2>
            <p className="text-lg mb-5">Guided by simplicity, quality, and absolutely thoughtful visual design.</p>
            
            <div className="reasons-list">
              
              <div className="reason-item">
                <div className="reason-icon-pill">
                  <Sparkles size={20} color="#FFFFFF" />
                </div>
                <div className="reason-text">
                  <h3>Personalisation</h3>
                  <p>Every single cake is conceptualized and designed directly around your idea and your special moment.</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon-pill">
                  <Award size={20} color="#FFFFFF" />
                </div>
                <div className="reason-text">
                  <h3>Careful Quality</h3>
                  <p>Made with strictly selected, pristine ingredients alongside uncompromised structural attention to detail.</p>
                </div>
              </div>

              <div className="reason-item">
                <div className="reason-icon-pill">
                  <Heart size={20} color="#FFFFFF" />
                </div>
                <div className="reason-text">
                  <h3>Design-First</h3>
                  <p>Crafted to be as eye-catchingly beautiful as it is rich and memorable on the tastebuds.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="philosophy-visual">
            <div className="floating-geo geo-square-rot-small"></div>
            <div className="blob-backdrop-accent blob-shape-3 anim-blob"></div>
            <div className="dots-accent-right"></div>
            
            {/* Massive Display Visual */}
            <div className="phil-massive-wrapper">
              <img src="/images/AVIF/kids_theme_cake.avif" alt="Delicious Featured Cake" className="phil-massive-cake" />
            </div>

            <div className="floating-geo geo-circle-solid-small"></div>
          </div>

        </div>
      </section>

      {/* 5. HOW IT WORKS FLOW */}
      <section className="section how-works-vibrant bg-wave-top">
        <div className="container">
          <div className="section-header text-center mb-5">
            <h2 className="heading-2">Simple. <span className="text-highlight">Seamless.</span></h2>
          </div>

          <div className="steps-vibrant-grid">
            <div className="step-card-box">
              <span className="step-bubble">1</span>
              <h3>Share Idea</h3>
              <p>Tell us about your occasion and preferences.</p>
            </div>
            
            <div className="step-card-box">
              <span className="step-bubble">2</span>
              <h3>We Curate</h3>
              <p>Our team designs a cake tailored to your vision.</p>
            </div>

            <div className="step-card-box">
              <span className="step-bubble">3</span>
              <h3>Confirm</h3>
              <p>Finalise your design and details.</p>
            </div>

            <div className="step-card-box">
              <span className="step-bubble">4</span>
              <h3>Celebrate</h3>
              <p>Your custom cake, ready for your special moment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="section testimonials-vibrant text-center">
        <div className="container">
          <h2 className="heading-2 mb-5">What Our <span className="text-highlight">Customers Say</span></h2>
          
          <div className="testi-vibrant-grid max-w-4xl mx-auto">
            <div className="testi-card">
              <p className="quote">"Absolutely stunning! Not only did the cake look like a piece of art, but it tasted incredible. Ivory Cakery made our day perfect."</p>
              <span className="author">— Sarah M.</span>
            </div>
            
            <div className="testi-card">
              <p className="quote">"The attention to detail on my daughter's birthday cake was mind-blowing. Highly recommend for anyone looking for a premium experience."</p>
              <span className="author">— James T.</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
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

export default Home;
