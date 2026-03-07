import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(){
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Find Your Next <span>Rental</span></h1>
          <p>Browse hundreds of verified properties. Whether you're renting or listing, HouseRent makes it simple.</p>
          <div className="hero-actions">
            <Link to="/properties" className="btn">Browse Properties</Link>
            <Link to="/register" className="btn btn-outline">Create Account</Link>
          </div>
        </div>
      </section>

      <section className="page-section">
        <div className="container">
          <h2 className="section-title">How it works</h2>
          <div className="grid grid-3">
            <div className="card">
              <h3 style={{marginBottom:4}}>1. Search</h3>
              <p className="muted">Filter by location, price, bedrooms, and amenities to find the perfect place.</p>
            </div>
            <div className="card">
              <h3 style={{marginBottom:4}}>2. Connect</h3>
              <p className="muted">Contact the property owner directly and schedule a viewing.</p>
            </div>
            <div className="card">
              <h3 style={{marginBottom:4}}>3. Move In</h3>
              <p className="muted">Confirm your booking and move in. It&rsquo;s that easy.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
