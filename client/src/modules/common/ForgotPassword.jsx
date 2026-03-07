import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword(){
  const [email,setEmail] = useState('');
  return (
    <div className="page-section">
      <div className="form-card">
        <h2>Reset password</h2>
        <p className="muted">Enter your email and we&rsquo;ll send a reset link</p>
        <div className="form-group">
          <label>Email</label>
          <input className="input" type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <button className="btn" style={{width:'100%'}}>Send Reset Link</button>
        <p className="muted mt-md" style={{textAlign:'center'}}>
          <Link to="/login" className="btn-link">Back to login</Link>
        </p>
      </div>
    </div>
  );
}
