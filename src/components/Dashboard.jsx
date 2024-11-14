// components/Dashboard.js
import React, { useEffect, useState } from "react";
import { db } from "../../firebase"; // Adjust the path as necessary
import { collection, getDocs, onSnapshot } from "firebase/firestore"; // Import onSnapshot
import { toast, ToastContainer } from "react-toastify"; // Import toast for notifications
import "react-toastify/ReactToastify.css"; // Correct path for toast styles
import "./Dashboard.css";

function Dashboard() {
  const [totalComplaints, setTotalComplaints] = useState(0);
  const [totalResolved, setTotalResolved] = useState(0);
  const [totalPending, setTotalPending] = useState(0); // Adjust based on how you define "pending"

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Fetch total complaints
        const complaintsSnapshot = await getDocs(collection(db, "reports"));
        setTotalComplaints(complaintsSnapshot.size); // Total complaints count

        // Fetch total SOS alerts
        const sosAlertsSnapshot = await getDocs(collection(db, "sosAlerts"));
        setTotalResolved(sosAlertsSnapshot.size); // Total SOS alerts count

        // Calculate pending complaints
        setTotalPending(complaintsSnapshot.size - sosAlertsSnapshot.size); // Example logic for pending
      } catch (error) {
        console.error("Error fetching counts: ", error);
      }
    };

    // Use onSnapshot to listen for new complaints
    const unsubscribe = onSnapshot(collection(db, "reports"), (snapshot) => {
      const newComplaintsCount = snapshot.size;
      if (newComplaintsCount > totalComplaints) {
        // Notify when a new complaint is added
        toast.success("A new complaint has been logged!");
      }
      setTotalComplaints(newComplaintsCount);
    });

    fetchCounts();

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [totalComplaints, totalResolved]);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card">
          <h2>Complaints</h2>
          <p>{totalComplaints} Total</p>
        </div>
        <div className="stat-card">
          <h2>Resolved</h2>
          <p>{totalResolved} Total</p>
        </div>
        <div className="stat-card">
          <h2>Pending</h2>
          <p>{totalPending} Total</p>
        </div>
      </div>
      {/* Include ToastContainer for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Dashboard;
