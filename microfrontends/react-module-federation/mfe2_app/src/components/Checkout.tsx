import React, { createContext, useContext, useState } from 'react';
import './Checkout.css';
// @ts-ignore
import { CartContextType } from 'host_app/types';

const CartContext = createContext<CartContextType | null>(null);

export const useRemoteCart = () => {
  const context = useContext(CartContext);
  return context;
};

const Checkout: React.FC = () => {
  const cart = useRemoteCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
  });

  if (!cart) {
    return (
      <div>
        <h2>Checkout</h2>
        <p>Running standalone</p>
      </div>
    );
  }

  const totalItems = cart.getTotalItems();
  const totalPrice = cart.getTotalPrice();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Order placed for ${totalItems} items - Total: $${totalPrice.toFixed(2)}`);
    cart.clearCart();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (totalItems === 0) {
    return (
      <section className="checkout-section">
        <h2 className="checkout-title">Checkout</h2>
        <div className="checkout-empty">
          <p>Your cart is empty</p>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-section">
      <h2 className="checkout-title">Checkout</h2>
      
      <div className="checkout-grid">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Main St"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="New York"
                />
              </div>

              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="10001"
                />
              </div>
            </div>

            <button type="submit" className="btn-submit">
              Place Order · ${totalPrice.toFixed(2)}
            </button>
          </form>
        </div>

        <div className="checkout-summary">
          <h3 className="summary-title">Order Summary</h3>
          <div className="summary-items">
            {cart.items.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-info">
                  <span className="summary-item-name">{item.name}</span>
                  <span className="summary-item-quantity">× {item.quantity}</span>
                </div>
                <div className="summary-item-actions">
                  <span className="summary-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    type="button"
                    onClick={() => cart.removeFromCart(item.id)}
                    className="btn-remove-summary"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span className="summary-total-price">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
export { CartContext };
