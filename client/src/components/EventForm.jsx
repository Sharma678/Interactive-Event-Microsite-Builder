import React, { useState } from 'react';
import './EventForm.css';

function EventForm({ onSubmit, initialData = {}, loading = false }) {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    date: initialData.date || '',
    startTime: initialData.startTime || initialData.time || '',
    endTime: initialData.endTime || '',
    venue: initialData.venue || '',
    address: initialData.address || '',
    agenda: initialData.agenda || '',
    speakers: initialData.speakers || [],
    gallery: initialData.gallery || [],
    theme: initialData.theme || 'default',
    primaryColor: initialData.primaryColor || '#667eea',
    secondaryColor: initialData.secondaryColor || '#764ba2',
    fontFamily: initialData.fontFamily || 'Inter',
    ...initialData,
  });

  const [newSpeaker, setNewSpeaker] = useState({ name: '', bio: '', image: '' });
  const [newGalleryImage, setNewGalleryImage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddSpeaker = () => {
    if (newSpeaker.name.trim()) {
      setFormData((prev) => ({
        ...prev,
        speakers: [...prev.speakers, { ...newSpeaker, id: Date.now() }],
      }));
      setNewSpeaker({ name: '', bio: '', image: '' });
    }
  };

  const handleRemoveSpeaker = (id) => {
    setFormData((prev) => ({
      ...prev,
      speakers: prev.speakers.filter((s) => s.id !== id),
    }));
  };

  const handleAddGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, { url: newGalleryImage, id: Date.now() }],
      }));
      setNewGalleryImage('');
    }
  };

  const handleRemoveGalleryImage = (id) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      <div className="card">
        <h2>Basic Information</h2>
        <div className="form-group">
          <label>Event Title *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Annual Tech Conference 2024"
          />
        </div>

        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Describe your event..."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date *</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              placeholder="End time (optional)"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Venue Name *</label>
          <input
            type="text"
            name="venue"
            value={formData.venue}
            onChange={handleChange}
            required
            placeholder="e.g., Convention Center"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Full address of the venue"
          />
        </div>
      </div>

      <div className="card">
        <h2>Agenda</h2>
        <div className="form-group">
          <label>Event Agenda</label>
          <textarea
            name="agenda"
            value={formData.agenda}
            onChange={handleChange}
            placeholder="List the schedule and activities..."
            rows="6"
          />
        </div>
      </div>

      <div className="card">
        <h2>Speakers</h2>
        {formData.speakers.map((speaker) => (
          <div key={speaker.id} className="speaker-item">
            <div className="speaker-info">
              <strong>{speaker.name}</strong>
              {speaker.bio && <p>{speaker.bio}</p>}
            </div>
            <button
              type="button"
              onClick={() => handleRemoveSpeaker(speaker.id)}
              className="btn-remove"
            >
              Remove
            </button>
          </div>
        ))}
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Speaker name"
            value={newSpeaker.name}
            onChange={(e) => setNewSpeaker({ ...newSpeaker, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bio (optional)"
            value={newSpeaker.bio}
            onChange={(e) => setNewSpeaker({ ...newSpeaker, bio: e.target.value })}
          />
          <input
            type="text"
            placeholder="Image URL (optional)"
            value={newSpeaker.image}
            onChange={(e) => setNewSpeaker({ ...newSpeaker, image: e.target.value })}
          />
          <button type="button" onClick={handleAddSpeaker} className="btn btn-secondary">
            Add Speaker
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Gallery</h2>
        <div className="gallery-preview">
          {formData.gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img src={item.url} alt="Gallery" onError={(e) => e.target.style.display = 'none'} />
              <button
                type="button"
                onClick={() => handleRemoveGalleryImage(item.id)}
                className="btn-remove"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="add-item-form">
          <input
            type="text"
            placeholder="Image URL"
            value={newGalleryImage}
            onChange={(e) => setNewGalleryImage(e.target.value)}
          />
          <button type="button" onClick={handleAddGalleryImage} className="btn btn-secondary">
            Add Image
          </button>
        </div>
      </div>

      <div className="card">
        <h2>Customization</h2>
        <div className="form-row">
          <div className="form-group">
            <label>Theme</label>
            <select name="theme" value={formData.theme} onChange={handleChange}>
              <option value="default">Default</option>
              <option value="modern">Modern</option>
              <option value="elegant">Elegant</option>
              <option value="minimal">Minimal</option>
              <option value="vibrant">Vibrant</option>
            </select>
          </div>

          <div className="form-group">
            <label>Font Family</label>
            <select name="fontFamily" value={formData.fontFamily} onChange={handleChange}>
              <option value="Inter">Inter</option>
              <option value="Roboto">Roboto</option>
              <option value="Open Sans">Open Sans</option>
              <option value="Montserrat">Montserrat</option>
              <option value="Playfair Display">Playfair Display</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Primary Color</label>
            <input
              type="color"
              name="primaryColor"
              value={formData.primaryColor}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Secondary Color</label>
            <input
              type="color"
              name="secondaryColor"
              value={formData.secondaryColor}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : initialData.id ? 'Update Event' : 'Create Event'}
        </button>
      </div>
    </form>
  );
}

export default EventForm;

