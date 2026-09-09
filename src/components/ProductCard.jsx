function ProductCard({ product, onAddToCart, onSelectProduct, isWishlisted, onToggleWishlist }) {
  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
        onClick={() => onSelectProduct(product)}
      />
      <div className="product-info">
        <div className="product-heading">
          <h3 className="product-name">{product.name}</h3>
          <button
            className={`wishlist-button${isWishlisted ? ' is-wishlisted' : ''}`}
            type="button"
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            aria-pressed={isWishlisted}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
          >
            {isWishlisted ? '♥' : '♡'}
          </button>
        </div>
        <p className="product-category">{product.category}</p>
        <p className="product-price">${product.price}</p>
        <p className="product-rating">⭐ {product.rating} / 5</p>
        <div className="product-actions">
          <button 
            className="btn-add-cart"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product);
            }}
          >
            Add to Cart
          </button>
          <button 
            className="btn-view-details"
            onClick={() => onSelectProduct(product)}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
