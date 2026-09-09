import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import Login from './components/Login';
import { products as initialProducts } from './data/products';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [products] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Get unique categories
  const categories = ['All', ...new Set(products.map(p => p.category))];

  // Handle login
  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Close cart if open
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('open');
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCart([]);
  };

  const toggleWishlist = (productId) => {
    setWishlist(currentWishlist => (
      currentWishlist.includes(productId)
        ? currentWishlist.filter(id => id !== productId)
        : [...currentWishlist, productId]
    ));
  };

  // Filter and sort products
  const getFilteredProducts = () => {
    let filtered = showWishlist
      ? products.filter(product => wishlist.includes(product.id))
      : products;

    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (sortBy === 'price-low') {
      filtered = [...filtered].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  };

  // Add to cart
  const addToCart = (product) => {
    if (!isLoggedIn) {
      alert('Please login first to add items to cart!');
      return;
    }
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(cart.map(item =>
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setShowCheckout(true);
    const cartSidebar = document.querySelector('.cart-sidebar');
    if (cartSidebar) {
      cartSidebar.classList.remove('open');
    }
  };

  const handleCheckout = (event) => {
    event.preventDefault();
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    alert(`Order placed successfully!\n\nTotal: $${total.toFixed(2)}\nThank you for your purchase!`);
    setCart([]);
    setShowCheckout(false);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const filteredProducts = getFilteredProducts();

  // If not logged in, show login page
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  if (showCheckout) {
    return (
      <Checkout
        cart={cart}
        cartTotal={cartTotal}
        user={user}
        onBack={() => setShowCheckout(false)}
        onPlaceOrder={handleCheckout}
      />
    );
  }

  return (
    <div className="app">
      <Navbar 
        cartCount={cartCount}
        cartTotal={cartTotal}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        sortBy={sortBy}
        setSortBy={setSortBy}
        wishlistCount={wishlist.length}
        showWishlist={showWishlist}
        onToggleWishlistView={() => setShowWishlist(current => !current)}
        user={user}
        onLogout={handleLogout}
      />
      
      <div className="main-content">
        <ProductList 
          products={filteredProducts}
          onAddToCart={addToCart}
          onSelectProduct={setSelectedProduct}
          wishlist={wishlist}
          onToggleWishlist={toggleWishlist}
          isWishlistView={showWishlist}
        />
      </div>

      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-product">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <div className="modal-info">
                <h2>{selectedProduct.name}</h2>
                <span className="modal-category">{selectedProduct.category}</span>
                <p className="modal-description">{selectedProduct.description}</p>
                <p className="modal-price">${selectedProduct.price}</p>
                <p className="modal-rating">⭐ {selectedProduct.rating} / 5</p>
                <button 
                  className="btn-add-cart"
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Cart 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        cartTotal={cartTotal}
        onCheckout={openCheckout}
      />
    </div>
  );
}

export default App;