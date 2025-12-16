import React from 'react';
import './AttendeeList.css';

function AttendeeList({ attendees }) {
  if (attendees.length === 0) {
    return (
      <div className="attendee-list-container">
        <div className="card">
          <div className="empty-attendees">
            <p>No attendees yet. Be the first to RSVP!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="attendee-list-container">
      <div className="card">
        <h2>Attendees ({attendees.length})</h2>
        <div className="attendees-grid">
          {attendees.map((attendee) => (
            <div key={attendee.id} className="attendee-card">
              <div className="attendee-avatar">
                {attendee.name.charAt(0).toUpperCase()}
              </div>
              <div className="attendee-info">
                <h3>{attendee.name}</h3>
                <p className="attendee-email">{attendee.email}</p>
                {attendee.phone && (
                  <p className="attendee-phone">{attendee.phone}</p>
                )}
                <p className="attendee-date">
                  RSVP'd on {new Date(attendee.submittedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AttendeeList;

