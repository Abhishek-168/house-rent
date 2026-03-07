import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Toast from '../../common/Toast.jsx';
import { apiFetch } from '../../../utils/api.js';

export default function AddProperty(){
  const [title,setTitle] = useState('');
  const [location,setLocation] = useState('');
  const [rent,setRent] = useState('');
  const [bedrooms,setBedrooms] = useState('1');
  const [bathrooms,setBathrooms] = useState('1');
  const [description,setDescription] = useState('');
  const [loading,setLoading] = useState(false);
  const [toast,setToast] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(){
    if(!title || !location || !rent){ setToast({message:'Title, location and rent are required', type:'error'}); return; }
    try{
      setLoading(true);
      await apiFetch('/api/owner', {
        method: 'POST',
        body: JSON.stringify({ title, location, rentAmount: Number(rent), bedrooms: Number(bedrooms), bathrooms: Number(bathrooms), description })
      });
      setToast({message:'Property published!', type:'success'});
      setTimeout(()=>navigate('/owner/properties'),700);
    }catch(err){
      setToast({message: err.message || 'Failed to add property', type:'error'});
    }finally{ setLoading(false); }
  }

  return (
    <div className="page-section">
      <Toast message={toast?.message} type={toast?.type} />
      <div className="container" style={{maxWidth:600}}>
        <h1 className="page-title">Add Property</h1>
        <p className="page-subtitle">List a new property for renters to find</p>

        <div className="card">
          <div className="form-group">
            <label>Title</label>
            <input className="input" placeholder="Cozy 2-bedroom apartment" value={title} onChange={e=>setTitle(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input className="input" placeholder="City, neighborhood" value={location} onChange={e=>setLocation(e.target.value)} />
          </div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:'1rem'}}>
            <div className="form-group">
              <label>Rent Amount ($)</label>
              <input className="input" type="number" placeholder="1200" value={rent} onChange={e=>setRent(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Bedrooms</label>
              <input className="input" type="number" min="1" value={bedrooms} onChange={e=>setBedrooms(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Bathrooms</label>
              <input className="input" type="number" min="1" value={bathrooms} onChange={e=>setBathrooms(e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea className="input" rows="4" placeholder="Describe the property..." value={description} onChange={e=>setDescription(e.target.value)} />
          </div>
          <div className="flex gap-sm">
            <button className="btn" onClick={handleSubmit} disabled={loading}>{loading ? 'Publishing…' : 'Publish Listing'}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
