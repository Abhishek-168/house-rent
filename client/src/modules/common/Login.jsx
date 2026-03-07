import React, { useState } from 'react';

export default function Login(){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Login</h2>
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8}}>
          <button className="btn">Login</button>
          <button className="btn btn-muted">Forgot?</button>
        </div>
      </div>
    </div>
  );
}
