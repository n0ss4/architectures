import { useState, useRef, useEffect } from 'react';
import './App.css';
import { useCartStore } from './store/useCartStore';
// @ts-ignore
import ProductCatalog, { CartContext as ProductCartContext } from 'mfe1_app';
// @ts-ignore
import Checkout, { CartContext as CheckoutCartContext } from 'mfe2_app';

const App = () => {
  const cart = useCartStore();
  const [view, setView] = useState<'products' | 'checkout'>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);
  const totalItems = cart.getTotalItems();
  const totalPrice = cart.getTotalPrice();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen]);

  return (
    <div className="content">
      <header className="header">
        <h1 className="header-title">Store</h1>
        <div className="cart-container" ref={cartRef}>
          <button
            className="cart-summary"
            onClick={() => setIsCartOpen(!isCartOpen)}
            aria-expanded={isCartOpen}
          >
            <div className="cart-label">Cart</div>
            <div className="cart-details">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} · ${totalPrice.toFixed(2)}
            </div>
          </button>

          {isCartOpen && (
            <div className="cart-dropdown">
              {cart.items.length === 0 ? (
                <div className="cart-dropdown-empty">Your cart is empty</div>
              ) : (
                <>
                  <div className="cart-dropdown-items">
                    {cart.items.map(item => (
                      <div key={item.id} className="cart-dropdown-item">
                        <div className="cart-dropdown-item-info">
                          <span className="cart-dropdown-item-name">{item.name}</span>
                          <span className="cart-dropdown-item-quantity">× {item.quantity}</span>
                        </div>
                        <div className="cart-dropdown-item-actions">
                          <span className="cart-dropdown-item-price">
                            ${(item.price * item.quantity).toFixed(2)}
                          </span>
                          <button
                            onClick={() => cart.removeFromCart(item.id)}
                            className="btn-remove-dropdown"
                            aria-label={`Remove ${item.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="cart-dropdown-footer">
                    <div className="cart-dropdown-total">
                      <span>Total</span>
                      <span className="cart-dropdown-total-price">${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="cart-dropdown-actions">
                      <button
                        onClick={() => {
                          setView('products');
                          setIsCartOpen(false);
                        }}
                        className="btn-dropdown-secondary"
                      >
                        Continue Shopping
                      </button>
                      <button
                        onClick={() => {
                          setView('checkout');
                          setIsCartOpen(false);
                        }}
                        className="btn-dropdown-primary"
                      >
                        Checkout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </header>

      <nav className="nav-tabs">
        <button
          onClick={() => setView('products')}
          className={`nav-tab ${view === 'products' ? 'active' : ''}`}
        >
          Products
        </button>
        <button
          onClick={() => setView('checkout')}
          className={`nav-tab ${view === 'checkout' ? 'active' : ''}`}
        >
          Checkout
        </button>
      </nav>

      {view === 'products' && (
        <ProductCartContext.Provider value={cart}>
          <ProductCatalog />
        </ProductCartContext.Provider>
      )}

      {view === 'checkout' && (
        <CheckoutCartContext.Provider value={cart}>
          <Checkout />
        </CheckoutCartContext.Provider>
      )}
    </div>
  );
};

export default App;
