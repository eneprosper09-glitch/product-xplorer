function Navbar({ 
  cartCount, 
  searchTerm, 
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  sortBy,
  setSortBy,
  wishlistCount,
  showWishlist,
  onToggleWishlistView,
  user,
  onLogout
}) {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-logo">
          <span className="logo-icon">🛍️</span>
          <span>Product<span>Explorer</span></span>
        </div>
        
        <div className="navbar-controls">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Sort by</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Rating: High to Low</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <span style={{ 
            fontSize: '13px', 
            color: '#b0bec5',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            👤 {user?.email}
          </span>
          <button
            className={`wishlist-nav-button${showWishlist ? ' is-active' : ''}`}
            type="button"
            onClick={onToggleWishlistView}
            aria-pressed={showWishlist}
            title={showWishlist ? 'Show all products' : 'View wishlist'}
          >
            {showWishlist ? '← Products' : '♡ Wishlist'}
            {wishlistCount > 0 && (
              <span className="wishlist-nav-badge">{wishlistCount}</span>
            )}
          </button>
          <button 
            onClick={onLogout}
            style={{
              padding: '6px 16px',
              background: 'transparent',
              border: '1px solid #e74c3c',
              color: '#e74c3c',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
              transition: 'all 0.3s'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#e74c3c';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'transparent';
              e.target.style.color = '#e74c3c';
            }}
          >
            Logout
          </button>
          <button 
            className="cart-button"
            onClick={() => {
              document.querySelector('.cart-sidebar').classList.toggle('open');
            }}
          >
            🛒 Cart
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
