import React, { useState } from 'react';

export default function Register(){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Register</h2>
        <label>Name</label>
        <input className="input" value={name} onChange={e=>setName(e.target.value)} />
        <label>Email</label>
        <input className="input" value={email} onChange={e=>setEmail(e.target.value)} />
        <label>Password</label>
        <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div style={{display:'flex',gap:8}}>
          <button className="btn">Create Account</button>
        </div>
      </div>
    </div>
  );
}
