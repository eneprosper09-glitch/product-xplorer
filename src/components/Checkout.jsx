function Checkout({ cart, cartTotal, user, onBack, onPlaceOrder }) {
  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <button className="checkout-back" type="button" onClick={onBack}>
          ← Back to cart
        </button>
        <div className="checkout-header">
          <div>
            <p className="checkout-eyebrow">Secure checkout</p>
            <h1>Complete your order</h1>
            <p>Enter your delivery information and we will get your order moving.</p>
          </div>
          <span className="checkout-step">1 of 1</span>
        </div>

        <div className="checkout-layout">
          <form className="checkout-form" onSubmit={onPlaceOrder}>
            <section className="checkout-section">
              <h2>Contact information</h2>
              <div className="checkout-fields">
                <label>
                  Email address
                  <input type="email" name="email" defaultValue={user?.email || ''} required autoComplete="email" />
                </label>
                <label>
                  Phone number
                  <input type="tel" name="phone" required autoComplete="tel" />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Shipping address</h2>
              <div className="checkout-fields">
                <label className="checkout-field-wide">
                  Full name
                  <input type="text" name="name" required autoComplete="name" />
                </label>
                <label className="checkout-field-wide">
                  Street address
                  <input type="text" name="address" required autoComplete="street-address" />
                </label>
                <label>
                  City
                  <input type="text" name="city" required autoComplete="address-level2" />
                </label>
                <label>
                  State / province
                  <input type="text" name="state" required autoComplete="address-level1" />
                </label>
                <label>
                  Postal code
                  <input type="text" name="postalCode" required autoComplete="postal-code" />
                </label>
                <label>
                  Country
                  <input type="text" name="country" defaultValue="United States" required autoComplete="country-name" />
                </label>
              </div>
            </section>

            <section className="checkout-section">
              <h2>Payment</h2>
              <div className="checkout-fields">
                <label className="checkout-field-wide">
                  Card number
                  <input type="text" name="cardNumber" inputMode="numeric" placeholder="1234 5678 9012 3456" minLength="12" required autoComplete="cc-number" />
                </label>
                <label>
                  Expiry date
                  <input type="text" name="expiry" placeholder="MM / YY" required autoComplete="cc-exp" />
                </label>
                <label>
                  Security code
                  <input type="text" name="securityCode" inputMode="numeric" placeholder="123" minLength="3" required autoComplete="cc-csc" />
                </label>
              </div>
            </section>

            <button className="checkout-submit" type="submit">
              Place order · ${cartTotal.toFixed(2)}
            </button>
          </form>

          <aside className="checkout-summary">
            <h2>Order summary</h2>
            <div className="checkout-summary-items">
              {cart.map(item => (
                <div className="checkout-summary-item" key={item.id}>
                  <img src={item.image} alt="" />
                  <div>
                    <strong>{item.name}</strong>
                    <span>Qty {item.quantity}</span>
                  </div>
                  <b>${(item.price * item.quantity).toFixed(2)}</b>
                </div>
              ))}
            </div>
            <div className="checkout-total">
              <span>Total</span>
              <strong>${cartTotal.toFixed(2)}</strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Checkout;
