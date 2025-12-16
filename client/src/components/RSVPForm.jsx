import React, { useState } from 'react';
import './RSVPForm.css';

function RSVPForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', email: '', phone: '' });
  };

  return (
    <div className="rsvp-form-container">
      <div className="card">
        <h2>RSVP to this Event</h2>
        <p className="rsvp-subtitle">Join us for this exciting event!</p>
        <form onSubmit={handleSubmit} className="rsvp-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="form-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number (optional)"
            />
          </div>

          <button type="submit" className="btn btn-primary btn-submit">
            Submit RSVP
          </button>
        </form>
      </div>
    </div>
  );
}

export default RSVPForm;

