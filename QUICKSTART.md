# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

## Installation Steps

1. **Install all dependencies:**
   ```bash
   npm run install-all
   ```
   This installs dependencies for both the root project and the client.

2. **Start the development servers:**
   ```bash
   npm run dev
   ```
   This starts both the backend (port 5000) and frontend (port 3000) servers.

3. **Open your browser:**
   Navigate to `http://localhost:3000` to see the application.

4. **Set API base URL for deployments (client/.env):**
   ```
   VITE_API_BASE=http://localhost:5000
   ```

## First Steps

1. Click **"Create New Event"** on the homepage
2. Fill in the event details form:
   - Enter event title, description, date, time, and venue
   - Add agenda items
   - Add speakers (name, bio, optional image URL)
   - Add gallery images (image URLs)
   - Customize theme, colors, and fonts
3. Click **"Create Event"**
4. On the edit page, click **"Publish Event"** to make it public
5. Share the unique event URL with attendees
6. Attendees can RSVP directly on the event page

## Features Overview

- **Home Page**: View all created events
- **Create Event**: Comprehensive form for event details
- **Edit Event**: Update event details and publish
- **Event Page**: Public-facing event page with:
  - Event details and description
  - Agenda
  - Speakers section
  - Gallery
  - RSVP form
  - Attendee list

## Troubleshooting

- **Port already in use**: Change ports in `server/index.js` (backend) or `client/vite.config.js` (frontend)
- **Dependencies not installing**: Make sure you have Node.js installed and try deleting `node_modules` folders and reinstalling
- **Data not persisting**: Check that `server/data.json` is being created (it's auto-generated)

## Production Build

To build for production:
```bash
npm run build
```

The built files will be in `client/dist/` and served by the Express server.

## Deploying to Vercel (frontend) + Railway/Render (backend) — recommended
1) Deploy backend (persistent host): point to `/server`, run `node server/index.js`, keep `PORT` env. Note the backend URL, e.g. `https://your-api.example.com`.
2) Set frontend env: in `client/.env` and Vercel project env, add `VITE_API_BASE=https://your-api.example.com`.
3) Vercel setup: Root Directory `client`; Build Command `npm run build`; Output `dist`; deploy.
4) Local dev remains `npm run dev` (Vite proxy to `localhost:5000`).

