import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../../utils/api.js';

export default function OwnerAllBookings(){
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/bookings/mine')
      .then(d => setBookings(d.bookings || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">Bookings on Your Properties</h1>
        <p className="page-subtitle">Review incoming booking requests</p>

        {loading ? <p className="muted">Loading…</p> : bookings.length === 0 ? (
          <div className="empty-state">
            <p>No booking requests yet</p>
          </div>
        ) : (
          <div className="table-wrap card">
            <table>
              <thead>
                <tr><th>Property</th><th>Tenant</th><th>Dates</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {bookings.map(b=>(
                  <tr key={b._id}>
                    <td>{b.property?.title || '—'}</td>
                    <td>{b.tenant?.name || '—'}</td>
                    <td className="text-sm muted">{new Date(b.startDate).toLocaleDateString()} — {new Date(b.endDate).toLocaleDateString()}</td>
                    <td><span className="badge badge-amber">{b.status}</span></td>
                    <td><button className="btn btn-sm btn-outline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
