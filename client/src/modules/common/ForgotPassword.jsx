import React from 'react';

export default function ForgotPassword(){
  return (
    <div className="container">
      <div className="card">
        <h2 className="title">Reset password</h2>
        <label>Email</label>
        <input className="input" />
        <div style={{display:'flex',gap:8}}>
          <button className="btn">Send reset link</button>
        </div>
      </div>
    </div>
  );
}
