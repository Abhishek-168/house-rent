import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import './App.css'
import './theme.css'

import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'

import Home from './modules/common/Home.jsx'
import Login from './modules/common/Login.jsx'
import Register from './modules/common/Register.jsx'
import ForgotPassword from './modules/common/ForgotPassword.jsx'

import RenterHome from './modules/user/renter/RenterHome.jsx'
import RenterAllProperties from './modules/user/renter/AllProperties.jsx'

import OwnerHome from './modules/user/owner/OwnerHome.jsx'
import OwnerAllProperties from './modules/user/owner/AllProperties.jsx'
import AddProperty from './modules/user/owner/AddProperty.jsx'
import OwnerAllBookings from './modules/user/owner/AllBookings.jsx'

import AdminHome from './modules/admin/AdminHome.jsx'
import AdminUsers from './modules/admin/AllUsers.jsx'
import AdminProperties from './modules/admin/AllProperty.jsx'
import AdminBookings from './modules/admin/AllBookings.jsx'

function Navbar() {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">House<span>Rent</span></Link>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/properties">Properties</Link></li>

        {isLoggedIn && user?.role === 'Admin' && (
          <li><Link to="/admin">Admin</Link></li>
        )}
        {isLoggedIn && user?.role === 'Owner' && (
          <li><Link to="/owner">Dashboard</Link></li>
        )}
        {isLoggedIn && user?.role === 'Renter' && (
          <li><Link to="/renter">Dashboard</Link></li>
        )}

        {!isLoggedIn ? (
          <>
            <li><Link to="/login" className="btn btn-sm btn-outline">Login</Link></li>
            <li><Link to="/register" className="btn btn-sm">Register</Link></li>
          </>
        ) : (
          <>
            <li><span className="badge badge-amber" style={{fontSize:'0.75rem'}}>{user?.role}</span></li>
            <li><button className="btn btn-sm btn-outline" onClick={handleLogout}>Logout</button></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default function App(){
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <main style={{flex:1}}>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgot-password" element={<ForgotPassword/>} />

            <Route path="/properties" element={<RenterAllProperties/>} />
            <Route path="/renter" element={<ProtectedRoute roles={['Renter']}><RenterHome/></ProtectedRoute>} />

            <Route path="/owner" element={<ProtectedRoute roles={['Owner']}><OwnerHome/></ProtectedRoute>} />
            <Route path="/owner/properties" element={<ProtectedRoute roles={['Owner']}><OwnerAllProperties/></ProtectedRoute>} />
            <Route path="/owner/properties/add" element={<ProtectedRoute roles={['Owner']}><AddProperty/></ProtectedRoute>} />
            <Route path="/owner/bookings" element={<ProtectedRoute roles={['Owner']}><OwnerAllBookings/></ProtectedRoute>} />

            <Route path="/admin" element={<ProtectedRoute roles={['Admin']}><AdminHome/></ProtectedRoute>} />
            <Route path="/admin/users" element={<ProtectedRoute roles={['Admin']}><AdminUsers/></ProtectedRoute>} />
            <Route path="/admin/properties" element={<ProtectedRoute roles={['Admin']}><AdminProperties/></ProtectedRoute>} />
            <Route path="/admin/bookings" element={<ProtectedRoute roles={['Admin']}><AdminBookings/></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace/>} />
          </Routes>
        </main>

        <footer style={{borderTop:'1px solid #e5e7eb',padding:'1.25rem',textAlign:'center',fontSize:'0.8125rem',color:'#6b7280'}}>
          &copy; {new Date().getFullYear()} HouseRent
        </footer>
      </Router>
    </AuthProvider>
  )
}
