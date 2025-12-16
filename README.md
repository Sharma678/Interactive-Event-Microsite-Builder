# Event Microsite Builder

A mini platform where users can design and publish simple event websites. Perfect for clubs, colleges, and small organizations to instantly create event landing pages without external tools.

## Features

- ✅ **Event Details Form** - Complete form with title, date, venue, agenda, speakers, and gallery support
- ✅ **Auto-generated Event Webpage** - Beautiful, shareable event pages automatically generated
- ✅ **Customization Options** - Themes, fonts, and color customization
- ✅ **RSVP System** - RSVP submission page with attendee list view
- ✅ **Unique Event URLs** - Each published event gets a unique, shareable URL

## Tech Stack

- **Frontend**: React 18 with Vite
- **Backend**: Node.js with Express
- **Data Storage**: JSON file (easily upgradeable to database)

## Installation

1. Install dependencies for both root and client:
```bash
npm run install-all
```

2. Start the development servers:
```bash
npm run dev
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend development server on `http://localhost:3000`

Create a `.env` inside `client` for API base URL (used for deployment):
```
VITE_API_BASE=http://localhost:5000
```

## Usage

1. **Create an Event**: Click "Create New Event" and fill in the event details form
2. **Customize**: Choose your theme, colors, and fonts
3. **Add Content**: Add speakers, agenda items, and gallery images
4. **Publish**: Click "Publish Event" to make it publicly accessible
5. **Share**: Share the unique event URL with attendees
6. **RSVP**: Attendees can RSVP directly on the event page
7. **View Attendees**: See the list of all attendees who RSVP'd

## Project Structure

```
Task2/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app component
│   └── package.json
├── server/                 # Express backend
│   ├── index.js           # Server entry point
│   └── data.json          # Data storage (auto-generated)
└── package.json           # Root package.json
```

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get event by ID
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `POST /api/events/:id/publish` - Publish event
- `POST /api/events/:id/rsvp` - Submit RSVP
- `GET /api/events/:id/rsvps` - Get RSVPs for an event

## Features in Detail

### Event Form
- Title, description, date, time
- Venue name and address
- Agenda (multi-line text)
- Speakers (name, bio, image URL)
- Gallery images (image URLs)
- Customization options (theme, colors, fonts)

### Themes
- Default
- Modern
- Elegant
- Minimal
- Vibrant

### Customization
- Primary and secondary color pickers
- Font family selection
- Theme selection

### RSVP System
- Name, email, phone (optional)
- Real-time attendee list
- RSVP timestamp

## Development

- Frontend runs on port 3000 (Vite dev server)
- Backend runs on port 5000 (Express server)
- Data is stored in `server/data.json` (auto-created)

## Production Build

```bash
npm run build
```

The built frontend will be in `client/dist/` and will be served by the Express server.

## Deploying (Option A: Recommended)
Because Vercel serverless cannot persist `server/data.json`, deploy the backend to a persistent host (Railway/Render/Fly/Heroku) and deploy the React frontend to Vercel.

1. **Backend**: Deploy the `server` folder to a host that supports long-running processes. Ensure `PORT` is respected (already coded).
2. **Frontend env**: In `client/.env`, set `VITE_API_BASE=https://your-backend-host.com`.
3. **Vercel**: Import the repo → set Root Directory to `client` → Build Command `npm run build` → Output `dist` → add env `VITE_API_BASE` with your backend URL → Deploy.

Local dev remains unchanged (`npm run dev` uses the Vite proxy to `localhost:5000`).

