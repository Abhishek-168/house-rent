import React, { useEffect, useState } from 'react';
import AllPropertiesCards from '../../user/AllPropertiesCards.jsx';
import { apiFetch } from '../../../utils/api.js';

export default function RenterAllProperties(){
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function fetchProperties(params = {}){
    setLoading(true);
    const qs = new URLSearchParams();
    if(params.location) qs.set('location', params.location);
    if(params.minPrice) qs.set('minPrice', params.minPrice);
    if(params.maxPrice) qs.set('maxPrice', params.maxPrice);
    apiFetch(`/api/properties/search?${qs.toString()}`)
      .then(d => setProperties(d.items || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }

  useEffect(() => { fetchProperties(); }, []);

  function handleSearch(){
    fetchProperties({ location, minPrice, maxPrice });
  }

  return (
    <div className="page-section">
      <div className="container">
        <h1 className="page-title">Available Properties</h1>
        <p className="page-subtitle">Find your next home</p>

        <div className="card mb-lg" style={{display:'flex',gap:'0.75rem',flexWrap:'wrap',alignItems:'flex-end'}}>
          <div className="form-group" style={{flex:1,minWidth:180,marginBottom:0}}>
            <label>Location</label>
            <input className="input" placeholder="City or neighborhood" value={location} onChange={e=>setLocation(e.target.value)} />
          </div>
          <div className="form-group" style={{width:120,marginBottom:0}}>
            <label>Min Price</label>
            <input className="input" type="number" placeholder="0" value={minPrice} onChange={e=>setMinPrice(e.target.value)} />
          </div>
          <div className="form-group" style={{width:120,marginBottom:0}}>
            <label>Max Price</label>
            <input className="input" type="number" placeholder="5000" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} />
          </div>
          <button className="btn" style={{height:38}} onClick={handleSearch}>Search</button>
        </div>

        {loading ? <p className="muted">Loading…</p> : properties.length === 0 ? (
          <div className="empty-state">
            <p>No properties match your search</p>
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
