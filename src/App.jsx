import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TrackingScreen from './components/TrackingScreen';
import ResolvedScreen from './components/ResolvedScreen';
import TestimoniesScreen from './components/TestimoniesScreen';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar /> {/* Sidebar for navigation */}
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} /> 
            <Route path="/tracking" element={<TrackingScreen />} />
            <Route path="/resolved" element={<ResolvedScreen />} />
            <Route path="/testimonies" element={<TestimoniesScreen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
