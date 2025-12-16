import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventPage from './pages/EventPage';
import EditEvent from './pages/EditEvent';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateEvent />} />
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/event/:id/edit" element={<EditEvent />} />
        <Route path="/event/:id/publish" element={<EventPage />} />
      </Routes>
    </Router>
  );
}

export default App;

