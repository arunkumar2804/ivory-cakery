import React, { useEffect, useState } from 'react';
import { X, Send, CheckCircle, Loader2, Cake, Calendar, User, Mail, Phone, MessageSquare, PartyPopper, ArrowRight, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './EnquiryModal.css';

interface EnquiryModalProps {
  onClose: () => void;
}

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxfQXst4OXm-9JuxtvxE4KlqbspaUTl7266xLEvmsExRG6sZOKPZlBgqBsl8VMfepZ6/exec';

const CAKE_TYPES = [
  'Wedding Cake',
  'Birthday Cake',
  'Kids Theme Cake',
  'Bento Cake',
  'Custom Theme Cake',
  'Anniversary Cake',
  'Engagement Cake',
  'Photo Cake',
  'Gourmet Cupcakes',
];

interface FormData {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  cakeType: string;
  eventDate: string;
  message: string;
}

const EnquiryModal: React.FC<EnquiryModalProps> = ({ onClose }) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    occasion: '',
    cakeType: '',
    eventDate: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const nextStep = () => {
    // Basic validation before moving forward
    if (step === 1 && !formData.name.trim()) {
      setError("Please let us know your name first.");
      return;
    }
    if (step === 2) {
      if (!formData.email.trim()) {
        setError("We need your email to send the invoice.");
        return;
      }
      if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        setError("Please enter a valid 10-digit phone number.");
        return;
      }
    }
    if (step === 3 && !formData.occasion.trim()) {
      setError("What occasion are we celebrating?");
      return;
    }
    if (step === 4 && !formData.cakeType) {
      setError("Please pick a cake style.");
      return;
    }
    if (step === 5 && !formData.eventDate) {
      setError("When is the celebration?");
      return;
    }

    setDirection(1);
    setStep(step + 1);
  };

  const prevStep = () => {
    setDirection(-1);
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const formDataBody = new URLSearchParams();
      Object.entries(formData).forEach(([key, value]) => {
        formDataBody.append(key, value.trim());
      });

      await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataBody
      });

      setIsSubmitted(true);
      setIsSubmitting(false);
    } catch (err) {
      setError('Something went wrong. Please try again or reach us on WhatsApp.');
      setIsSubmitting(false);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    })
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="modal-container interactive-form-container" 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}><X size={20} /></button>

        <div className="form-progress">
          <div className="progress-bar" style={{ width: `${(step / 6) * 100}%` }}></div>
        </div>

        <AnimatePresence initial={false} custom={direction} mode="wait">
          {isSubmitted ? (
            <motion.div 
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="modal-success conversational-step"
            >
              <div className="success-icon-wrapper"><CheckCircle size={64} /></div>
              <h2>Perfect! 🎂</h2>
              <p>Your enquiry for the <strong>{formData.cakeType}</strong> has been received. We'll contact you shortly!</p>
              <button className="btn btn-primary mt-4" onClick={onClose}>Back to Website</button>
            </motion.div>
          ) : (
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="conversational-step"
            >
              {/* Step 0: Intro */}
              {step === 0 && (
                <div className="step-content text-center">
                  <div className="step-icon-big"><Cake size={48} /></div>
                  <h1>Let's design your <br/><span className="text-highlight">Dream Cake</span></h1>
                  <p>Answer a few quick questions so we can craft the perfect centerpiece for your celebration.</p>
                  <button className="btn btn-primary btn-large mt-4" onClick={() => nextStep()}>
                    Start Enquiry <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {/* Step 1: Name */}
              {step === 1 && (
                <div className="step-content">
                  <span className="step-label">Step 1 of 6</span>
                  <h2>First, what should we <br/><span className="text-highlight">call you?</span></h2>
                  <div className="input-container">
                    <User className="input-icon" size={24} />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="Type your name..." 
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && nextStep()}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Contact */}
              {step === 2 && (
                <div className="step-content">
                  <span className="step-label">Step 2 of 6</span>
                  <h2>How can we <br/><span className="text-highlight">reach you?</span></h2>
                  <div className="input-container mb-3">
                    <Mail className="input-icon" size={20} />
                    <input 
                      autoFocus
                      type="email" 
                      placeholder="Email Address" 
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  </div>
                  <div className="input-container">
                    <Phone className="input-icon" size={20} />
                    <input 
                      type="tel" 
                      placeholder="WhatsApp Number" 
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && nextStep()}
                      maxLength={10}
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Occasion */}
              {step === 3 && (
                <div className="step-content">
                  <span className="step-label">Step 3 of 6</span>
                  <h2>What are we <br/><span className="text-highlight">celebrating?</span></h2>
                  <div className="input-container">
                    <PartyPopper className="input-icon" size={24} />
                    <input 
                      autoFocus
                      type="text" 
                      placeholder="e.g. 1st Birthday, Wedding..." 
                      value={formData.occasion}
                      onChange={(e) => handleChange('occasion', e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && nextStep()}
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Cake Type */}
              {step === 4 && (
                <div className="step-content">
                  <span className="step-label">Step 4 of 6</span>
                  <h2>Pick your <br/><span className="text-highlight">Cake Style</span></h2>
                  <div className="options-grid">
                    {CAKE_TYPES.map(type => (
                      <button 
                        key={type}
                        className={`option-btn ${formData.cakeType === type ? 'selected' : ''}`}
                        onClick={() => {
                          handleChange('cakeType', type);
                          setTimeout(nextStep, 300);
                        }}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 5: Date */}
              {step === 5 && (
                <div className="step-content">
                  <span className="step-label">Step 5 of 6</span>
                  <h2>When is the <br/><span className="text-highlight">big day?</span></h2>
                  <div className="input-container">
                    <Calendar className="input-icon" size={24} />
                    <input 
                      autoFocus
                      type="date" 
                      min={today}
                      value={formData.eventDate}
                      onChange={(e) => handleChange('eventDate', e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && nextStep()}
                    />
                  </div>
                </div>
              )}

              {/* Step 6: Notes */}
              {step === 6 && (
                <div className="step-content">
                  <span className="step-label">Final Step</span>
                  <h2>Any <span className="text-highlight">Special Vision</span> <br/>for the cake?</h2>
                  <div className="input-container">
                    <MessageSquare className="input-icon-top" size={24} />
                    <textarea 
                      autoFocus
                      placeholder="Flavor choices, theme details, tier count..." 
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      rows={4}
                    />
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              {step > 0 && (
                <div className="step-navigation">
                  <button className="btn-nav back" onClick={prevStep}>
                    <ArrowLeft size={20} /> Back
                  </button>
                  
                  {step < 6 ? (
                    <button className="btn btn-primary" onClick={nextStep}>
                      Next <ArrowRight size={20} />
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? <Loader2 className="spin-icon" size={20} /> : <><Send size={20} /> Submit</>}
                    </button>
                  )}
                </div>
              )}

              {error && <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="conversational-error">{error}</motion.div>}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EnquiryModal;
