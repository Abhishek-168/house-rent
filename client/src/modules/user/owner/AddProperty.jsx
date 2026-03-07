import React, { useState } from 'react';

export default function AddProperty(){
  const [title,setTitle]=useState('');
  return (
    <div className="container">
      <h2 className="title">Add Property</h2>
      <div className="card">
        <label>Title</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} />
        <label>Location</label>
        <input className="input" />
        <label>Rent Amount</label>
        <input className="input" />
        <div style={{display:'flex',gap:8}}>
          <button className="btn">Save</button>
        </div>
      </div>
    </div>
  );
}
