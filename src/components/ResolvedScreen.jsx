// components/ResolvedScreen.js
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase'; // Adjust the path as necessary
import { collection, getDocs } from 'firebase/firestore';
import './ResolvedScreen.css'; // Import the CSS file

function ResolvedScreen() {
  const [resolvedComplaints, setResolvedComplaints] = useState([]);

  useEffect(() => {
    const fetchResolvedComplaints = async () => {
      try {
        // Fetch all documents from the 'complaints' collection
        const querySnapshot = await getDocs(collection(db, 'reports'));
        const complaints = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setResolvedComplaints(complaints);
      } catch (error) {
        console.error('Error fetching resolved complaints: ', error);
      }
    };

    fetchResolvedComplaints();
  }, []);

  return (
    <div className="resolved">
      <h1>Reports</h1>
      <ul>
        {resolvedComplaints.map((complaint) => (
          <li key={complaint.id} className="resolved-card">
            <h3>{complaint.description}</h3>
            <p><strong>Location:</strong> {complaint.location}</p>
            <p><strong>Request Help:</strong> {complaint.requestHelp}</p>
            <p><strong>Resolved at:</strong> {complaint.timestamp}</p>
            <p><strong>Type:</strong> {complaint.type}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ResolvedScreen;
