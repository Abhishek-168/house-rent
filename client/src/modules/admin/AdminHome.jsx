import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api.js';

export default function AdminHome(){
  const [counts, setCounts] = useState({ users: '—', properties: '—', bookings: '—' });

  useEffect(() => {
    Promise.all([
      apiFetch('/api/admin/users').then(d => d.users?.length ?? 0),
      apiFetch('/api/admin/properties').then(d => d.properties?.length ?? 0),
      apiFetch('/api/admin/bookings').then(d => d.bookings?.length ?? 0),
    ]).then(([u,p,b]) => setCounts({ users: u, properties: p, bookings: b })).catch(() => {});
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Platform overview at a glance</p>

        <div className="grid grid-3">
          <div className="stat-card">
            <span className="stat-value">{counts.users}</span>
            <span className="stat-label">Total Users</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{counts.properties}</span>
            <span className="stat-label">Properties</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{counts.bookings}</span>
            <span className="stat-label">Bookings</span>
          </div>
        </div>

        <div className="divider" />

        <h2 className="section-title">Quick Links</h2>
        <div className="flex gap-md">
          <Link to="/admin/users" className="btn btn-outline">Manage Users</Link>
          <Link to="/admin/properties" className="btn btn-outline">All Properties</Link>
          <Link to="/admin/bookings" className="btn btn-outline">All Bookings</Link>
        </div>
      </div>
    </div>
  );
}
