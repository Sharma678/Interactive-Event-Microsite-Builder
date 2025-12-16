import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import RSVPForm from '../components/RSVPForm';
import AttendeeList from '../components/AttendeeList';
import './EventPage.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    fetchEvent();
    fetchRSVPs();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRSVPs = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/events/${id}/rsvps`);
      setRsvps(response.data);
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
    }
  };

  const handleRSVPSubmit = async (rsvpData) => {
    try {
      await axios.post(`${API_BASE}/api/events/${id}/rsvp`, rsvpData);
      alert('RSVP submitted successfully!');
      fetchRSVPs();
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Failed to submit RSVP. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="event-page loading">
        <div className="container">Loading event...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="event-page">
        <div className="container">
          <div className="error">Event not found</div>
        </div>
      </div>
    );
  }

  const themeStyles = {
    '--primary-color': event.primaryColor || '#667eea',
    '--secondary-color': event.secondaryColor || '#764ba2',
    '--font-family': event.fontFamily || 'Inter',
  };

  return (
    <div className={`event-page theme-${event.theme || 'default'}`} style={themeStyles}>
      <header className="event-header">
        <div className="container">
          <h1 className="event-title">{event.title}</h1>
          <div className="event-meta">
            <div className="meta-item">
              <span className="meta-icon">📅</span>
              <span>{new Date(event.date).toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            {(event.startTime || event.endTime || event.time) && (
              <div className="meta-item">
                <span className="meta-icon">🕐</span>
                <span>
                  {event.startTime && event.endTime
                    ? `${event.startTime} - ${event.endTime}`
                    : event.startTime || event.endTime || event.time}
                </span>
              </div>
            )}
            <div className="meta-item">
              <span className="meta-icon">📍</span>
              <span>{event.venue}</span>
            </div>
            {event.address && (
              <div className="meta-item">
                <span className="meta-icon">🗺️</span>
                <span>{event.address}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container">
        <div className="event-tabs">
          <button
            className={`tab ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            Event Details
          </button>
          <button
            className={`tab ${activeTab === 'rsvp' ? 'active' : ''}`}
            onClick={() => setActiveTab('rsvp')}
          >
            RSVP
          </button>
          <button
            className={`tab ${activeTab === 'attendees' ? 'active' : ''}`}
            onClick={() => setActiveTab('attendees')}
          >
            Attendees ({rsvps.length})
          </button>
        </div>

        <div className="event-content">
          {activeTab === 'details' && (
            <div className="tab-content">
              {event.description && (
                <section className="event-section">
                  <h2>About the Event</h2>
                  <p className="event-description">{event.description}</p>
                </section>
              )}

              {event.agenda && (
                <section className="event-section">
                  <h2>Agenda</h2>
                  <div className="agenda-content">
                    {event.agenda.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </section>
              )}

              {event.speakers && event.speakers.length > 0 && (
                <section className="event-section">
                  <h2>Speakers</h2>
                  <div className="speakers-grid">
                    {event.speakers.map((speaker, index) => (
                      <div key={speaker.id || index} className="speaker-card">
                        {speaker.image && (
                          <img src={speaker.image} alt={speaker.name} className="speaker-image" />
                        )}
                        <h3>{speaker.name}</h3>
                        {speaker.bio && <p>{speaker.bio}</p>}
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {event.gallery && event.gallery.length > 0 && (
                <section className="event-section">
                  <h2>Gallery</h2>
                  <div className="gallery-grid">
                    {event.gallery.map((item, index) => (
                      <div key={item.id || index} className="gallery-item">
                        <img src={item.url} alt={`Gallery ${index + 1}`} />
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === 'rsvp' && (
            <div className="tab-content">
              <RSVPForm onSubmit={handleRSVPSubmit} />
            </div>
          )}

          {activeTab === 'attendees' && (
            <div className="tab-content">
              <AttendeeList attendees={rsvps} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventPage;

