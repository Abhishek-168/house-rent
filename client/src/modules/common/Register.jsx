import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiFetch } from '../../utils/api.js';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('Renter');
  const [loading,setLoading] = useState(false);
  const [toast,setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleRegister(){
    if(!name || !email || !password){ setToast({message:'All fields are required', type:'error'}); return; }
    try{
      setLoading(true);
      const data = await apiFetch('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password, role })
      });
      login(data.token, data.user);
      setToast({message:'Registration successful', type:'success'});
      const dest = role === 'Owner' ? '/owner' : '/';
      setTimeout(()=>navigate(dest),700);
    }catch(err){
      setToast({message: err.message || 'Registration error', type:'error'});
    }finally{ setLoading(false); }
  }

  return (
    <div className="page-section">
      <Toast message={toast?.message} type={toast?.type} />
      <div className="form-card">
        <h2>Create an account</h2>
        <p className="muted">Start renting or listing properties</p>
        <div className="form-group">
          <label>Full Name</label>
          <input className="input" placeholder="Rahul Dravid" value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>I am a</label>
          <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
            <option value="Renter">Renter</option>
            <option value="Owner">Property Owner</option>
          </select>
        </div>
        <button className="btn" style={{width:'100%'}} onClick={handleRegister} disabled={loading}>{loading ? 'Creating...' : 'Create Account'}</button>
        <p className="muted mt-md" style={{textAlign:'center'}}>
          Already have an account? <Link to="/login" className="btn-link">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
