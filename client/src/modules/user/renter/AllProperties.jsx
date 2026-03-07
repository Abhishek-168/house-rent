import React from 'react';
import AllPropertiesCards from '../../user/AllPropertiesCards.jsx';

export default function RenterAllProperties(){
  const sample = [];
  return (
    <div className="container">
      <h2 className="title">Available Properties</h2>
      <div className="grid">
        {sample.length===0 && <div className="card">No properties found</div>}
        {sample.map(p=> <AllPropertiesCards key={p._id} property={p} />)}
      </div>
    </div>
  );
}
