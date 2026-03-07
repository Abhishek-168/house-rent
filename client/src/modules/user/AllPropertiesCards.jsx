import React from 'react';

export default function AllPropertiesCards({property}){
  if(!property) return null;
  return (
    <div className="property-card">
      <h3 style={{margin:'0 0 0.5rem 0'}}>{property.title || 'Untitled'}</h3>
      <div className="muted">{property.location || 'No location'}</div>
      <div style={{marginTop:8,fontWeight:600}}>${property.rentAmount || '—'}/mo</div>
      <div style={{marginTop:8}}>
        <button className="btn">View</button>
      </div>
    </div>
  );
}
