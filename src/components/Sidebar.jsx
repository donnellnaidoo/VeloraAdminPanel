// components/Sidebar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file for styling

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Community System</h2>
      <nav>
        <ul className="sidebar-nav">
          <li className="sidebar-item">
            <NavLink exact to="/" activeClassName="active-link" className="sidebar-link">
              Dashboard
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/tracking" activeClassName="active-link" className="sidebar-link">
              Tracking
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/resolved" activeClassName="active-link" className="sidebar-link">
              Issues Reported
            </NavLink>
          </li>
          <li className="sidebar-item">
            <NavLink to="/testimonies" activeClassName="active-link" className="sidebar-link">
              Testimonies
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
