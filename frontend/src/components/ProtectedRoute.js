import React from 'react';

// Component to protect admin routes
function ProtectedRoute({ children, user, requireAdmin = false }) {
  // Check if user is logged in
  if (!user?.isLoggedIn) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        background: '#f8f9fa',
        borderRadius: '10px',
        margin: '2rem'
      }}>
        <h2 style={{ color: '#c44569', marginBottom: '1rem' }}>🔒 Access Denied</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Please login to access this page.
        </p>
        <a href="/login" className="btn btn-primary">
          Go to Login
        </a>
      </div>
    );
  }

  // Check if admin access is required
  if (requireAdmin && !user.isAdmin) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '4rem 2rem',
        background: '#fff3cd',
        borderRadius: '10px',
        margin: '2rem',
        border: '1px solid #ffeaa7'
      }}>
        <h2 style={{ color: '#e17055', marginBottom: '1rem' }}>⚠️ Admin Access Required</h2>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          You need administrator privileges to access this page.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <a href="/products" className="btn btn-primary">
            Browse Products
          </a>
          <a href="/" className="btn btn-secondary">
            Go Home
          </a>
        </div>
      </div>
    );
  }

  // User has required permissions
  return children;
}

export default ProtectedRoute;