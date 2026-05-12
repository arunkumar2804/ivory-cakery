import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EnquiryModal from './components/EnquiryModal';
import Home from './pages/Home';
import Creations from './pages/Creations';
import About from './pages/About';
import HowItWorks from './pages/HowItWorks';
import Contact from './pages/Contact';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  // Auto-trigger enquiry form popup when the site loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEnquiryOpen(true);
    }, 800); // 800ms delay for a smooth premium entrance feel
    return () => clearTimeout(timer);
  }, []);

  const toggleEnquiry = () => setIsEnquiryOpen(!isEnquiryOpen);

  // WhatsApp pre-typed ordering message
  const whatsappNumber = "918667248598"; // User test number
  const whatsappMessage = encodeURIComponent("Hello Ivory Cakery! I would like to order a bespoke custom cake. Please guide me through the custom tier options.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="app-container">
      <ScrollToTop />
      <Navbar onEnquiryClick={toggleEnquiry} />
      <main>
        <Routes>
          <Route path="/" element={<Home onEnquiryClick={toggleEnquiry} />} />
          <Route path="/creations" element={<Creations onEnquiryClick={toggleEnquiry} />} />
          <Route path="/about" element={<About onEnquiryClick={toggleEnquiry} />} />
          <Route path="/how-it-works" element={<HowItWorks onEnquiryClick={toggleEnquiry} />} />
          <Route path="/contact" element={<Contact onEnquiryClick={toggleEnquiry} />} />
        </Routes>
      </main>
      <Footer />
      {isEnquiryOpen && <EnquiryModal onClose={toggleEnquiry} />}

      {/* Floating Global WhatsApp Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp size={28} />
        <span className="whatsapp-tooltip">Order on WhatsApp</span>
      </a>
    </div>
  );
}

export default App;
