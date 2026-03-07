import React, { useEffect, useState } from 'react';
import { apiFetch } from '../../utils/api.js';

export default function AllUsers(){
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/admin/users')
      .then(d => setUsers(d.users || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">All Users</h1>
        <p className="page-subtitle">Manage registered accounts</p>

        {loading ? <p className="muted">Loading…</p> : users.length === 0 ? (
          <div className="empty-state">
            <p>No users registered yet</p>
          </div>
        ) : (
          <div className="table-wrap card">
            <table>
              <thead>
                <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
              </thead>
              <tbody>
                {users.map(u=>(
                  <tr key={u._id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className="badge badge-gray">{u.role}</span></td>
                    <td>{u.isApproved ? 'Approved' : 'Pending'}</td>
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
