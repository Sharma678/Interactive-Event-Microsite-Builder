import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import EventForm from '../components/EventForm';
import './EditEvent.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function EditEvent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const response = await axios.get(`${API_BASE}/api/events/${id}`);
      setEvent(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
      alert('Event not found');
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (eventData) => {
    setSaving(true);
    try {
      const response = await axios.put(`${API_BASE}/api/events/${id}`, eventData);
      setEvent(response.data);
      alert('Event updated successfully!');
    } catch (error) {
      console.error('Error updating event:', error);
      alert('Failed to update event. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handlePublish = async () => {
    if (!window.confirm('Are you sure you want to publish this event? It will be publicly accessible.')) {
      return;
    }

    setPublishing(true);
    try {
      const response = await axios.post(`${API_BASE}/api/events/${id}/publish`);
      setEvent(response.data);
      alert('Event published successfully!');
      navigate(`/event/${id}`);
    } catch (error) {
      console.error('Error publishing event:', error);
      alert('Failed to publish event. Please try again.');
    } finally {
      setPublishing(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-event">
        <div className="container">
          <div className="loading">Loading event...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-event">
      <div className="container">
        <div className="page-header">
          <div className="header-actions">
            <Link to="/" className="btn btn-secondary">
              ← Back to Home
            </Link>
            {event && !event.published && (
              <button
                onClick={handlePublish}
                className="btn btn-success"
                disabled={publishing}
              >
                {publishing ? 'Publishing...' : 'Publish Event'}
              </button>
            )}
            {event && event.published && (
              <Link to={`/event/${id}`} className="btn btn-primary" target="_blank">
                View Published Page
              </Link>
            )}
          </div>
          <h1>Edit Event: {event?.title}</h1>
          <p>Update your event details and customization options</p>
        </div>
        <EventForm onSubmit={handleUpdate} initialData={event} loading={saving} />
      </div>
    </div>
  );
}

export default EditEvent;

