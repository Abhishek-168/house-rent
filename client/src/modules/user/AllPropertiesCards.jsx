import React from 'react';

export default function AllPropertiesCards({ property }){
  if(!property) return null;
  return (
    <div className="property-card">
      <div className="property-card-img">No image</div>
      <div className="property-card-body">
        <h3>{property.title || 'Untitled'}</h3>
        <div className="muted">{property.location || 'No location'}</div>
        <div className="property-card-meta">
          {property.bedrooms && <span>{property.bedrooms} bed</span>}
          {property.bathrooms && <span>{property.bathrooms} bath</span>}
          {property.size && <span>{property.size} sqft</span>}
        </div>
        <div className="property-card-price">${property.rentAmount ?? '—'}/mo</div>
      </div>
      <div className="property-card-footer">
        <button className="btn btn-sm">View Details</button>
      </div>
    </div>
  );
}
