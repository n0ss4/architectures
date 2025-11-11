import { useRef, useEffect } from 'react';
import CartDropdown from './CartDropdown';

interface HeaderProps {
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
  onViewChange: (view: 'products' | 'checkout') => void;
}

const Header = ({ isCartOpen, setIsCartOpen, totalItems, totalPrice, onViewChange }: HeaderProps) => {
  const cartRef = useRef<HTMLDivElement>(null);

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
  }, [isCartOpen, setIsCartOpen]);

  return (
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
          <CartDropdown
            totalPrice={totalPrice}
            onContinueShopping={() => {
              onViewChange('products');
              setIsCartOpen(false);
            }}
            onCheckout={() => {
              onViewChange('checkout');
              setIsCartOpen(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Header;
