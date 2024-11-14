// components/TestimoniesScreen.js
import React, { useState } from 'react';
import './TestimoniesScreen.css'; // Import the CSS file

function TestimoniesScreen() {
  const [testimonies, setTestimonies] = useState([]);
  const [newTestimony, setNewTestimony] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTestimony) {
      setTestimonies([...testimonies, { id: Date.now(), message: newTestimony }]);
      setNewTestimony('');
    }
  };

  return (
    <div className="testimonies">
      <h1>User Testimonies</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newTestimony}
          onChange={(e) => setNewTestimony(e.target.value)}
          placeholder="Share your experience..."
          required
        />
        <button type="submit">Submit Testimony</button>
      </form>
      <ul>
        {testimonies.map((testimony) => (
          <li key={testimony.id} className="testimony-card">
            {testimony.message}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TestimoniesScreen;
