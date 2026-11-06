interface NavigationProps {
  currentView: 'products' | 'checkout';
  onViewChange: (view: 'products' | 'checkout') => void;
}

const Navigation = ({ currentView, onViewChange }: NavigationProps) => {
  return (
    <nav className="nav-tabs">
      <button
        onClick={() => onViewChange('products')}
        className={`nav-tab ${currentView === 'products' ? 'active' : ''}`}
      >
        Products
      </button>
      <button
        onClick={() => onViewChange('checkout')}
        className={`nav-tab ${currentView === 'checkout' ? 'active' : ''}`}
      >
        Checkout
      </button>
    </nav>
  );
};

export default Navigation;
