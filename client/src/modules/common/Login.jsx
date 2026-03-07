import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Toast from './Toast.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiFetch } from '../../utils/api.js';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [loading,setLoading] = useState(false);
  const [toast,setToast] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleLogin(){
    if(!email || !password){ setToast({message:'Email and password required', type:'error'}); return; }
    try{
      setLoading(true);
      const data = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });
      login(data.token, data.user);
      setToast({message:'Login successful', type:'success'});
      const role = data.user?.role;
      const dest = role === 'Admin' ? '/admin' : role === 'Owner' ? '/owner' : '/';
      setTimeout(()=>navigate(dest),700);
    }catch(err){
      setToast({message: err.message || 'Login error', type:'error'});
    }finally{ setLoading(false); }
  }

  return (
    <div className="page-section">
      <Toast message={toast?.message} type={toast?.type} />
      <div className="form-card">
        <h2>Welcome back</h2>
        <p className="muted">Sign in to your account</p>
        <div className="form-group">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input className="input" type="password" placeholder="••••••••" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div className="flex justify-between items-center mb-md">
          <Link to="/forgot-password" className="btn-link text-sm">Forgot password?</Link>
        </div>
        <button className="btn" style={{width:'100%'}} onClick={handleLogin} disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</button>
        <p className="muted mt-md" style={{textAlign:'center'}}>
          Don&rsquo;t have an account? <Link to="/register" className="btn-link">Register</Link>
        </p>
      </div>
    </div>
  );
}
