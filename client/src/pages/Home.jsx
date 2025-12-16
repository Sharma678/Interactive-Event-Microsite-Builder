import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/events`);
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <header className="home-header">
        <div className="container">
          <h1>🎉 Event Microsite Builder</h1>
          <p>Create beautiful event landing pages in minutes</p>
          <Link to="/create" className="btn btn-primary">
            Create New Event
          </Link>
        </div>
      </header>

      <div className="container">
        {loading ? (
          <div className="loading">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="empty-state">
            <h2>No events yet</h2>
            <p>Create your first event to get started!</p>
            <Link to="/create" className="btn btn-primary">
              Create Event
            </Link>
          </div>
        ) : (
          <div className="events-grid">
            {events.map((event) => (
              <div key={event.id} className="event-card">
                <div className="event-card-header">
                  <h3>{event.title}</h3>
                  {event.published && (
                    <span className="badge badge-published">Published</span>
                  )}
                </div>
                <div className="event-card-body">
                  <p className="event-date">📅 {new Date(event.date).toLocaleDateString()}</p>
                  <p className="event-venue">📍 {event.venue}</p>
                  <p className="event-description">{event.description}</p>
                </div>
                <div className="event-card-footer">
                  {event.published ? (
                    <Link
                      to={`/event/${event.id}`}
                      className="btn btn-primary"
                      target="_blank"
                    >
                      View Event Page
                    </Link>
                  ) : (
                    <Link to={`/event/${event.id}/edit`} className="btn btn-secondary">
                      Edit & Publish
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;

