// components/TrackingScreen.js
import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase'; // Update this import path
import './TrackingScreen.css'; // Import the CSS file

function TrackingScreen() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'sosAlerts');
    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      const fetchedData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Sort complaints by timestamp in descending order
      fetchedData.sort((a, b) => b.timestamp.seconds - a.timestamp.seconds);
      setComplaints(fetchedData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="tracking">
      <h1>Tracking Complaints</h1>
      <div className="complaint-grid">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="complaint-card">
            <h3>{complaint.message}</h3>
            <p><strong>Timestamp:</strong> {new Date(complaint.timestamp.seconds * 1000).toLocaleString()}</p>
            <iframe
              width="100%"
              height="150"
              frameBorder="0"
              src={`https://www.google.com/maps?q=${complaint.location.latitude},${complaint.location.longitude}&z=15&output=embed`}
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackingScreen;
