const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Data storage (in-memory, can be replaced with database)
let events = [];
let rsvps = {};

// Load data from file if exists
async function loadData() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'data.json'), 'utf8');
    const parsed = JSON.parse(data);
    events = parsed.events || [];
    rsvps = parsed.rsvps || {};
  } catch (error) {
    // File doesn't exist, start with empty data
    events = [];
    rsvps = {};
  }
}

// Save data to file
async function saveData() {
  try {
    await fs.writeFile(
      path.join(__dirname, 'data.json'),
      JSON.stringify({ events, rsvps }, null, 2)
    );
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

// Initialize data
loadData();

// API Routes

// Get all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// Get event by ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
});

// Create new event
app.post('/api/events', async (req, res) => {
  const event = {
    id: uuidv4(),
    ...req.body,
    createdAt: new Date().toISOString(),
    published: false,
  };
  events.push(event);
  await saveData();
  res.status(201).json(event);
});

// Update event
app.put('/api/events/:id', async (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  events[index] = { ...events[index], ...req.body };
  await saveData();
  res.json(events[index]);
});

// Publish event
app.post('/api/events/:id/publish', async (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  events[index].published = true;
  events[index].publishedAt = new Date().toISOString();
  await saveData();
  res.json(events[index]);
});

// Submit RSVP
app.post('/api/events/:id/rsvp', async (req, res) => {
  const eventId = req.params.id;
  const { name, email, phone } = req.body;

  if (!rsvps[eventId]) {
    rsvps[eventId] = [];
  }

  const rsvp = {
    id: uuidv4(),
    name,
    email,
    phone,
    submittedAt: new Date().toISOString(),
  };

  rsvps[eventId].push(rsvp);
  await saveData();
  res.status(201).json(rsvp);
});

// Get RSVPs for an event
app.get('/api/events/:id/rsvps', (req, res) => {
  const eventId = req.params.id;
  res.json(rsvps[eventId] || []);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

