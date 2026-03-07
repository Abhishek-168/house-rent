import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../../utils/api.js';

export default function OwnerHome(){
  const [counts, setCounts] = useState({ properties: '—', bookings: '—' });

  useEffect(() => {
    apiFetch('/api/owner')
      .then(d => setCounts(prev => ({ ...prev, properties: d.properties?.length ?? 0 })))
      .catch(() => {});
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">Owner Dashboard</h1>
        <p className="page-subtitle">Manage your listings and track bookings</p>

        <div className="grid grid-3">
          <div className="stat-card">
            <span className="stat-value">{counts.properties}</span>
            <span className="stat-label">Your Properties</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">—</span>
            <span className="stat-label">Active Bookings</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">—</span>
            <span className="stat-label">Pending Requests</span>
          </div>
        </div>

        <div className="divider" />

        <h2 className="section-title">Actions</h2>
        <div className="flex gap-md">
          <Link to="/owner/properties/add" className="btn">Add Property</Link>
          <Link to="/owner/properties" className="btn btn-outline">My Properties</Link>
          <Link to="/owner/bookings" className="btn btn-outline">View Bookings</Link>
        </div>
      </div>
    </div>
  );
}
