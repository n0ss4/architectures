// @ts-ignore
import ProductCatalog, { CartContext as ProductCartContext } from 'mfe1_app';
// @ts-ignore
import Checkout, { CartContext as CheckoutCartContext } from 'mfe2_app';
import { useCartStore } from '../store/useCartStore';

interface MainViewProps {
  currentView: 'products' | 'checkout';
}

const MainView = ({ currentView }: MainViewProps) => {
  const cart = useCartStore();

  if (currentView === 'products') {
    return (
      <ProductCartContext.Provider value={cart}>
        <ProductCatalog />
      </ProductCartContext.Provider>
    );
  }

  return (
    <CheckoutCartContext.Provider value={cart}>
      <Checkout />
    </CheckoutCartContext.Provider>
  );
};

export default MainView;
