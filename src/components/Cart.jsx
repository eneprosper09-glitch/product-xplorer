function Cart({ cart, onRemove, onUpdateQuantity, cartTotal, onCheckout }) {
  return (
    <div className="cart-sidebar">
      <div className="cart-header">
        <h2>🛒 Your Cart</h2>
        <button 
          className="cart-close"
          onClick={() => {
            document.querySelector('.cart-sidebar').classList.remove('open');
          }}
        >
          ✕
        </button>
      </div>

      <div className="cart-items">
        {cart.length === 0 ? (
          <div className="cart-empty">
            <p>🛒 Your cart is empty</p>
            <p>Start adding some products!</p>
          </div>
        ) : (
          cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">${item.price}</div>
                <div className="cart-item-controls">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                  <button 
                    className="btn-remove"
                    onClick={() => onRemove(item.id)}
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="cart-footer">
          <div className="cart-total">
            <span>Total:</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <button 
            className="cart-checkout"
            onClick={onCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;