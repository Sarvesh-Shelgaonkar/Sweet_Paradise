import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../apis/api";

function Login({ setUser }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      setUser({ 
        isLoggedIn: true, 
        isAdmin: res.data.user.isAdmin,
        name: res.data.user.name,
        email: res.data.user.email
      });
      
      const welcomeMsg = res.data.user.isAdmin ? "Welcome back Admin!" : "Welcome back!";
      alert("Login successful! " + welcomeMsg);
      
      // Role-based redirect
      if (res.data.user.isAdmin) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/products";
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container fade-in">
      <h2 className="form-title">Welcome Back!</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Sign in to your sweet account
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input 
            type="email"
            name="email" 
            placeholder="Email Address"
            className="form-input"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-group">
          <input 
            type="password" 
            name="password" 
            placeholder="Password"
            className="form-input"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="form-submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
      
      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <p style={{ color: '#666' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#c44569', textDecoration: 'none', fontWeight: 'bold' }}>
            Create one here
          </Link>
        </p>
        
        <div style={{ margin: '1.5rem 0', color: '#666' }}>
          <p style={{ fontSize: '0.9rem' }}>Demo Credentials:</p>
          <p style={{ fontSize: '0.8rem' }}>admin_incubyte@sweetshop.com | admin_incubyte123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;