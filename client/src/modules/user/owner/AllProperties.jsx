import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AllPropertiesCards from '../../user/AllPropertiesCards.jsx';
import { apiFetch } from '../../../utils/api.js';

export default function OwnerAllProperties(){
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiFetch('/api/owner')
      .then(d => setProperties(d.properties || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-section">
      <div className="container">
        <div className="flex justify-between items-center mb-md">
          <div>
            <h1 className="page-title">Your Properties</h1>
            <p className="page-subtitle" style={{marginBottom:0}}>Listings you own</p>
          </div>
          <Link to="/owner/properties/add" className="btn">+ Add Property</Link>
        </div>

        {loading ? <p className="muted">Loading…</p> : properties.length === 0 ? (
          <div className="empty-state">
            <p>You haven&rsquo;t listed any properties yet</p>
            <Link to="/owner/properties/add" className="btn mt-md">Add Your First Property</Link>
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
