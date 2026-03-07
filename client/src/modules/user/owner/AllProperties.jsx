import React from 'react';
import AllPropertiesCards from '../../user/AllPropertiesCards.jsx';

export default function OwnerAllProperties(){
  const sample = [];
  return (
    <div className="container">
      <h2 className="title">Your Properties</h2>
      <div className="grid">
        {sample.length===0 && <div className="card">No properties yet</div>}
        {sample.map(p=> <AllPropertiesCards key={p._id} property={p} />)}
      </div>
    </div>
  );
}
