import React from 'react';
import { Link } from 'react-router-dom';
function Navbar({ user, logout, cartCount }) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          🍭 Sweet Paradise
        </Link>
        
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/products" className="nav-link">Products</Link>
          
          {user?.isLoggedIn ? (
            <div className="user-menu">
              {user.isAdmin && (
                <Link to="/admin" className="nav-link admin-link" style={{
                  color: '#c44569', 
                  fontWeight: 'bold',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  border: '2px solid #c44569',
                  textDecoration: 'none'
                }}>
                  👑 Admin Panel
                </Link>
              )}
              <Link to="/cart" className="nav-link cart-icon">
                🛒
                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
              </Link>
              <span className="user-greeting" style={{
                color: '#c44569', 
                fontWeight: '600',
                background: '#f8f9fa',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                marginRight: '1rem',
                border: '1px solid #e9ecef'
              }}>
                👋 Hi, {user.name || 'User'}!
              </span>
              <button onClick={logout} className="btn btn-secondary">Logout</button>
            </div>
          ) : (
            <div className="user-menu">
              <Link to="/login" className="btn btn-primary">Login</Link>
              <Link to="/register" className="btn btn-secondary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;