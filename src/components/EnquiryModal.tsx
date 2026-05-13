import React, { useEffect, useState, useRef } from 'react';
import { X, Send, CheckCircle, Loader2, Cake, Calendar, User, Mail, Phone, MessageSquare, PartyPopper } from 'lucide-react';
import './EnquiryModal.css';

interface EnquiryModalProps {
  onClose: () => void;
}

// ── CONFIGURATION ──────────────────────────────────────────────
// Replace this URL with your deployed Google Apps Script Web App URL
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxvLaFhbmDu4ltxaDB-6ou1_sHQXxN2Itxn5n0UzzNSyH8aS7nfJEHHQPaeZzHAWej7Cw/exec';
// ───────────────────────────────────────────────────────────────

// Cake type dropdown options
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

// Form data interface
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
  // Form state management
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
  const formRef = useRef<HTMLFormElement>(null);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(''); // Clear error when user types
  };

  // Phone number validation (Indian format)
  const isValidPhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // ── Validation ──
    if (!formData.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!isValidPhone(formData.phone)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!formData.occasion.trim()) {
      setError('Please tell us about the occasion.');
      return;
    }
    if (!formData.cakeType) {
      setError('Please select a cake type.');
      return;
    }
    if (!formData.eventDate) {
      setError('Please select the event date.');
      return;
    }
    // ── Submit via hidden form + iframe (bypasses CORS entirely) ──
    setIsSubmitting(true);

    try {
      // Create a hidden iframe to receive the form response
      const iframeName = 'enquiry-submit-frame-' + Date.now();
      const iframe = document.createElement('iframe');
      iframe.name = iframeName;
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      // Create a hidden form targeting the iframe
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = APPS_SCRIPT_URL;
      form.target = iframeName; // Submit into hidden iframe, not the main window
      form.style.display = 'none';

      // Add all form fields as hidden inputs
      const fields: Record<string, string> = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        occasion: formData.occasion.trim(),
        cakeType: formData.cakeType,
        eventDate: formData.eventDate,
        message: formData.message.trim(),
      };

      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit(); // This will POST the data to Apps Script

      // Wait a moment for the submission to complete, then show success
      setTimeout(() => {
        setIsSubmitted(true);
        setIsSubmitting(false);

        // Cleanup: remove the hidden form and iframe
        document.body.removeChild(form);
        document.body.removeChild(iframe);
      }, 2000);

    } catch (err) {
      setError('Something went wrong. Please try again or contact us on WhatsApp.');
      setIsSubmitting(false);
    }
  };

  // Get today's date in YYYY-MM-DD for min date attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-container animate-fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close" onClick={onClose} aria-label="Close enquiry form">
          <X size={20} />
        </button>

        {/* ── SUCCESS STATE ── */}
        {isSubmitted ? (
          <div className="modal-success">
            <div className="success-icon-wrapper">
              <CheckCircle size={48} />
            </div>
            <h2>Thank You! 🎂</h2>
            <p>
              Your enquiry has been received. We'll get back to you within a few
              hours to discuss your perfect <strong>{formData.cakeType}</strong>.
            </p>
            <button className="btn btn-primary mt-4" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            {/* ── HEADER ── */}
            <div className="modal-header">
              <div className="modal-header-icon">
                <Cake size={24} />
              </div>
              <h2>Tell Us About Your Dream Cake</h2>
              <p>Fill in the details below and we'll craft something extraordinary for you.</p>
            </div>

            {/* ── FORM BODY ── */}
            <div className="modal-body">
              <form
                ref={formRef}
                className="enquiry-form"
                onSubmit={handleSubmit}
                noValidate
              >
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="enquiry-name">
                    <User size={16} />
                    <span>Your Name <span className="required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="enquiry-name"
                    name="name"
                    placeholder="e.g. Arun Kumar"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="enquiry-email">
                    <Mail size={16} />
                    <span>Email Address <span className="required">*</span></span>
                  </label>
                  <input
                    type="email"
                    id="enquiry-email"
                    name="email"
                    placeholder="e.g. arun@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    required
                  />
                </div>

                {/* Phone */}
                <div className="form-group">
                  <label htmlFor="enquiry-phone">
                    <Phone size={16} />
                    <span>Phone Number <span className="required">*</span></span>
                  </label>
                  <input
                    type="tel"
                    id="enquiry-phone"
                    name="phone"
                    placeholder="e.g. 8123784747"
                    value={formData.phone}
                    onChange={handleChange}
                    autoComplete="tel"
                    maxLength={10}
                    required
                  />
                </div>

                {/* Occasion */}
                <div className="form-group">
                  <label htmlFor="enquiry-occasion">
                    <PartyPopper size={16} />
                    <span>Occasion <span className="required">*</span></span>
                  </label>
                  <input
                    type="text"
                    id="enquiry-occasion"
                    name="occasion"
                    placeholder="e.g. Wedding Anniversary, Birthday"
                    value={formData.occasion}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Cake Type Dropdown */}
                <div className="form-group">
                  <label htmlFor="enquiry-cakeType">
                    <Cake size={16} />
                    <span>Cake Type <span className="required">*</span></span>
                  </label>
                  <select
                    id="enquiry-cakeType"
                    name="cakeType"
                    value={formData.cakeType}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a cake type...
                    </option>
                    {CAKE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date of Event */}
                <div className="form-group">
                  <label htmlFor="enquiry-eventDate">
                    <Calendar size={16} />
                    <span>Date of Event <span className="required">*</span></span>
                  </label>
                  <input
                    type="date"
                    id="enquiry-eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>

                {/* Message / Additional Details */}
                <div className="form-group">
                  <label htmlFor="enquiry-message">
                    <MessageSquare size={16} />
                    <span>Additional Details <span className="optional">(optional)</span></span>
                  </label>
                  <textarea
                    id="enquiry-message"
                    name="message"
                    placeholder="Theme preferences, flavor choices, tier count, decorations..."
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>

                {/* Error Message */}
                {error && (
                  <div className="form-error">
                    <span>⚠️ {error}</span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn btn-primary form-submit-btn"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spin-icon" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Submit Enquiry
                    </>
                  )}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;
