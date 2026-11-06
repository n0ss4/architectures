import React, { createContext, useContext, useState } from 'react';
import './ProviderComponent.css';
// @ts-ignore
import { Product, CartContextType } from 'host_app/types';
// @ts-ignore
import { PRODUCTS } from 'host_app/products';

const CartContext = createContext<CartContextType | null>(null);

export const useRemoteCart = () => {
  const context = useContext(CartContext);
  return context;
};

const ProductCard: React.FC<{ product: Product; onAdd: (product: Product) => void }> = ({ product, onAdd }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  const handleAddToCart = () => {
    onAdd(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 600);
  };

  return (
    <>
      <article 
        className="product-card"
      >
        <div className="product-image" onClick={() => setShowImageModal(true)}>
          <img src={product.image} alt={product.name} />
        </div>
      <div className="product-content">
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
        <button
          onClick={handleAddToCart}
          className={`btn-add ${isAdded ? 'btn-added' : ''}`}
        >
          Add to cart
        </button>
      </div>
    </article>
    
    {showImageModal && (
      <div className="image-modal" onClick={() => setShowImageModal(false)}>
        <div className="image-modal-content">
          <img src={product.image} alt={product.name} />
          <button className="close-modal">&times;</button>
        </div>
      </div>
    )}
    </>
  );
};

const Provider: React.FC = () => {
  const cart = useRemoteCart();

  if (!cart) {
    return (
      <div>
        <h2>Product Catalog</h2>
        <p>Running standalone</p>
      </div>
    );
  }

  return (
    <section className="products-section">
      <h2 className="products-title">Products</h2>
      <div className="products-grid">
        {PRODUCTS.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAdd={cart.addToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default Provider;
export { CartContext };
