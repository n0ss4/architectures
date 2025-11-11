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
  const [isHovered, setIsHovered] = useState(false);

  return (
    <article 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image">
        {product.image}
      </div>
      <div className="product-content">
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="btn-add"
          style={{
            background: isHovered ? 'var(--color-foreground)' : 'var(--color-surface)',
            color: isHovered ? 'var(--color-surface)' : 'var(--color-foreground)'
          }}
        >
          Add to cart
        </button>
      </div>
    </article>
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
