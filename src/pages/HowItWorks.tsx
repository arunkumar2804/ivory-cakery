import React from 'react';
import './HowItWorks.css';

interface HowItWorksProps {
  onEnquiryClick: () => void;
}

const HowItWorks: React.FC<HowItWorksProps> = ({ onEnquiryClick }) => {
  return (
    <div className="how-works-vibrant-page">
      
      {/* Hero Banner */}
      <section className="page-hero-vibrant text-center pt-0">
        <div className="container" style={{ paddingTop: '8rem' }}>
          <h1 className="heading-1">
            Simple. <span className="text-highlight">Seamless.</span>
          </h1>
          <p className="text-lg mt-2 max-w-lg mx-auto">
            Our systematic yet completely personalized flow from cake design blueprinting to pristine delivery.
          </p>
        </div>
      </section>

      {/* Steps Flow */}
      <section className="section pt-0">
        <div className="container max-w-4xl mx-auto">
          <div className="steps-vibrant-vertical">
            
            <div className="step-row-box blob-shape-1">
              <span className="step-badge-num">1</span>
              <div className="step-desc">
                <h3>Share Your Idea</h3>
                <p>Tell us about your occasion, your aesthetic preferences, and the flavor profile you desire. From subtle moodboards to customized visual requests, we ingest every dimension of your requirements.</p>
              </div>
            </div>

            <div className="step-row-box blob-shape-2">
              <span className="step-badge-num">2</span>
              <div className="step-desc">
                <h3>We Curate</h3>
                <p>Our creative team drafts custom concepts tailored exactly to your vision. We iterate closely on tier sizing, color formulations, piping styles, and rich internal cream pairings.</p>
              </div>
            </div>

            <div className="step-row-box blob-shape-3">
              <span className="step-badge-num">3</span>
              <div className="step-desc">
                <h3>Confirm</h3>
                <p>Finalize your design details alongside precise date blocks and delivery postcodes. Once confirmed, our bakers deploy absolute care, crafting fresh layers from scratch.</p>
              </div>
            </div>

            <div className="step-row-box blob-shape-1">
              <span className="step-badge-num">4</span>
              <div className="step-desc">
                <h3>Celebrate</h3>
                <p>Your finished center-stage custom cake arrives ready for your special moment. Designed to wow your party circle and deliver incredible rich satisfaction to the tastebuds.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="section cta-vibrant text-center pt-0">
        <div className="container">
          <div className="cta-box-wrapper blob-shape-2">
            <h2 className="heading-2 text-white">Ready to Start?</h2>
            <button className="btn btn-outline-white mt-4" onClick={onEnquiryClick}>
              👉 Launch Form
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HowItWorks;
