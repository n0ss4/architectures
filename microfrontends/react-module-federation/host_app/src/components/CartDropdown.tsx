import { useCartStore } from '../store/useCartStore';

interface CartDropdownProps {
  totalPrice: number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const CartDropdown = ({ totalPrice, onContinueShopping, onCheckout }: CartDropdownProps) => {
  const cart = useCartStore();

  if (cart.items.length === 0) {
    return (
      <div className="cart-dropdown">
        <div className="cart-dropdown-empty">Your cart is empty</div>
      </div>
    );
  }

  return (
    <div className="cart-dropdown">
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
            onClick={onContinueShopping}
            className="btn-dropdown-secondary"
          >
            Continue Shopping
          </button>
          <button
            onClick={onCheckout}
            className="btn-dropdown-primary"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
