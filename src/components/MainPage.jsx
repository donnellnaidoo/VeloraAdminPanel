import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import { format } from "date-fns";
import './main.css';

function MainPage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const collectionRef = collection(db, "sosAlerts");

    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const fetchedData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(fetchedData);
      },
      (error) => {
        console.error("Error fetching data: ", error);
        setError("Failed to fetch data from Firestore.");
      }
    );

    return () => unsubscribe();
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1 className="title">Community Complaints Log</h1>
      {data.length === 0 ? (
        <p className="noData">No complaints available.</p>
      ) : (
        <div className="gridContainer">
          {data.map((item) => (
            <div key={item.id} className="card">
              <img
                src={`https://via.placeholder.com/300?text=Image+${item.id}`} // Placeholder image
                alt={`Complaint Image ${item.id}`}
              />
              <h3 className="message">🚨 {item.message}</h3>
              <p className="timestamp">
                <strong>Logged:</strong> {convertTimestamp(item.timestamp)}
              </p>
              <p className="location">
                <strong>Latitude:</strong> {item.location?.latitude}
              </p>
              <p className="location">
                <strong>Longitude:</strong> {item.location?.longitude}
              </p>
              <iframe
                width="100%"
                height="150"
                frameBorder="0"
                className="map"
                src={`https://www.google.com/maps?q=${item.location?.latitude},${item.location?.longitude}&z=15&output=embed`}
                allowFullScreen
                title="map"
              ></iframe>
              <div className="actions">
                <button className="resolveButton">Resolve</button>
                <button className="viewButton">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function convertTimestamp(timestamp) {
  if (!timestamp) return "No timestamp available";

  const date = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  );
  return format(date, "PPpp");
}

export default MainPage;
