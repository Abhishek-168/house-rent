import React from 'react';

export default function AdminHome(){
  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Admin Dashboard</h1>
        <div className="muted">Overview</div>
      </div>
      <div className="grid">
        <div className="card">Users: —</div>
        <div className="card">Properties: —</div>
        <div className="card">Bookings: —</div>
      </div>
    </div>
  );
}
