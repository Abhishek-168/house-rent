import React from 'react';

export default function OwnerHome(){
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Owner Dashboard</h1>
        <div className="muted">Manage your listings</div>
      </div>
      <div className="grid">
        <div className="card">Add a property</div>
        <div className="card">View bookings</div>
      </div>
    </div>
  );
}
