import React, { useEffect, useState } from 'react';
import AllPropertiesCards from '../user/AllPropertiesCards.jsx';
import { apiFetch } from '../../utils/api.js';

export default function AllProperty(){
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/admin/properties')
      .then(d => setProperties(d.properties || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">All Properties</h1>
        <p className="page-subtitle">Every listing on the platform</p>

        {loading ? <p className="muted">Loading…</p> : properties.length === 0 ? (
          <div className="empty-state">
            <p>No properties listed yet</p>
          </div>
        ) : (
          <div className="grid grid-2">
            {properties.map(p=> <AllPropertiesCards key={p._id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
