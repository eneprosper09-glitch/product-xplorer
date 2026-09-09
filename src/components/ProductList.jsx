import ProductCard from './ProductCard';

function ProductList({ products, onAddToCart, onSelectProduct, wishlist, onToggleWishlist, isWishlistView }) {
  if (products.length === 0) {
    return (
      <div className="no-results">
        <h2>{isWishlistView ? '♡ Your wishlist is empty' : '🔍 No products found'}</h2>
        <p>{isWishlistView ? 'Tap the heart on any product to save it here for later.' : 'Try adjusting your search or filters to find what you’re looking for.'}</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onSelectProduct={onSelectProduct}
          isWishlisted={wishlist.includes(product.id)}
          onToggleWishlist={onToggleWishlist}
        />
      ))}
    </div>
  );
}

export default ProductList;