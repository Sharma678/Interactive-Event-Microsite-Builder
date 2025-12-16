import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventForm from '../components/EventForm';
import './CreateEvent.css';

const API_BASE = import.meta.env.VITE_API_BASE || '';

function CreateEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (eventData) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE}/api/events`, eventData);
      navigate(`/event/${response.data.id}/edit`);
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event">
      <div className="container">
        <div className="page-header">
          <h1>Create New Event</h1>
          <p>Fill in the details to create your event microsite</p>
        </div>
        <EventForm onSubmit={handleSubmit} loading={loading} />
      </div>
    </div>
  );
}

export default CreateEvent;

