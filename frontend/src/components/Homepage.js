import React from 'react';
import { Link } from 'react-router-dom';

function Homepage({ user }) {
  const featuredSweets = [
    {
      id: 1,
      name: "Classic Gulab Jamun",
      price: "₹249",
      image: "/gulabjamun.jpeg",
      description: "Traditional soft and spongy milk solid balls in sugar syrup"
    },
    {
      id: 2,
      name: "Bengali Rasgulla",
      price: "₹199",
      image: "/rasgulla.jpeg",
      description: "Soft cottage cheese balls in light sugar syrup"
    },
    {
      id: 3,
      name: "Kaju Katli",
      price: "₹459",
      image: "/kaju.jpeg",
      description: "Diamond shaped cashew sweets with silver foil"
    }
  ];

  const handleAddToCart = (sweet) => {
    // Check if user is logged in
    if (!user?.isLoggedIn) {
      alert("Please register or login to add items to cart! 🛒");
      window.location.href = "/register";
      return;
    }
    
    // If logged in, redirect to products page for full cart functionality
    alert(`${sweet.name} - Please visit our Products page for full shopping experience! 🛒`);
    window.location.href = "/products";
  };

  const handleAddToWishlist = (sweet) => {
    if (!user?.isLoggedIn) {
      alert("Please register or login to add items to wishlist! ❤️");
      window.location.href = "/register";
      return;
    }
    
    alert(`${sweet.name} added to wishlist! ❤️`);
  };

  return (
    <div className="homepage fade-in">
      <section className="hero-section">
        <h1 className="hero-title">🍭 Welcome to Sweet Paradise 🍭</h1>
        <p className="hero-subtitle">
          Indulge in the finest collection of traditional and modern sweets
        </p>
        <Link to="/products" className="btn btn-primary">
          Explore Our Collection
        </Link>
      </section>

      <section className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">🍬</div>
          <h3 className="feature-title">Premium Quality</h3>
          <p>Made with finest ingredients and traditional recipes</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3 className="feature-title">Fast Delivery</h3>
          <p>Same day delivery for orders within the city</p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3 className="feature-title">Secure Payment</h3>
          <p>Multiple payment options with 100% security</p>
        </div>
      </section>
      <section>
        <h2 style={{ textAlign: 'center', margin: '3rem 0 2rem', color: '#c44569', fontSize: '2.5rem' }}>
          Featured Sweets
        </h2>
        
        <div className="products-grid">
          {featuredSweets.map(sweet => (
            <div key={sweet.id} className="product-card">
              <img 
                src={sweet.image} 
                alt={sweet.name} 
                className="product-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200/f8f9fa/6c757d?text=' + encodeURIComponent(sweet.name);
                }}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '8px 8px 0 0'
                }}
              />
              <div className="product-info">
                <h3 className="product-name">{sweet.name}</h3>
                <p className="product-description">{sweet.description}</p>
                <div className="product-price">{sweet.price}</div>
                <div className="product-actions">
                  <button 
                    className="btn btn-primary"
                    onClick={() => handleAddToCart(sweet)}
                  >
                    Add to Cart
                  </button>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleAddToWishlist(sweet)}
                  >
                    ❤️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <Link to="/products" className="btn btn-primary">
            View All Products →
          </Link>
        </div>
      </section>

      <section style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '3rem', 
        borderRadius: '20px', 
        textAlign: 'center',
        margin: '3rem 0'
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎉 Special Offer! 🎉</h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Get 20% off on your first order! Use code: SWEET20
        </p>
        <Link to="/register" className="btn btn-secondary">
          Register Now & Save!
        </Link>
      </section>
    </div>
  );
}

export default Homepage;