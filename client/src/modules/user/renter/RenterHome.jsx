import React from 'react';
import { Link } from 'react-router-dom';

export default function RenterHome(){
  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">Welcome back</h1>
        <p className="page-subtitle">Browse rentals and manage your bookings</p>

        <div className="grid grid-3">
          <div className="stat-card">
            <span className="stat-value">—</span>
            <span className="stat-label">Saved Searches</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">—</span>
            <span className="stat-label">Active Bookings</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">—</span>
            <span className="stat-label">Favorites</span>
          </div>
        </div>

        <div className="divider" />

        <div className="flex gap-md">
          <Link to="/properties" className="btn">Browse Properties</Link>
        </div>
      </div>
    </div>
  );
}
