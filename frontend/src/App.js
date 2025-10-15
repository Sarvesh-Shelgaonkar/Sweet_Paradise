import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import ProductCatalog from "./components/ProductCatalog";
import Register from "./components/Register";
import Login from "./components/Login";
import Cart from "./components/Cart";
import AdminPanel from "./components/AdminPanel";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setUser({ 
          isLoggedIn: true,
          isAdmin: user.isAdmin,
          name: user.name,
          email: user.email
        });
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };
  return (
    <Router>
      <div className="app">
        <Navbar user={user} logout={logout} cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Homepage user={user} />} />
          <Route path="/products" element={<ProductCatalog cart={cart} setCart={setCart} user={user} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
          <Route path="/admin" element={
            <ProtectedRoute user={user} requireAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
