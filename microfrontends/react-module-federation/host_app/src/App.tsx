import { useState } from 'react';
import './App.css';
import { useCartStore } from './store/useCartStore';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainView from './views/MainView';

const App = () => {
  const cart = useCartStore();
  const [view, setView] = useState<'products' | 'checkout'>('products');
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="content">
      <Header
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        totalItems={cart.getTotalItems()}
        totalPrice={cart.getTotalPrice()}
        onViewChange={setView}
      />

      <Navigation currentView={view} onViewChange={setView} />

      <MainView currentView={view} />
    </div>
  );
};

export default App;
