import { create } from 'zustand';
import { Product, CartItem, CartContextType } from '../types/cart';

export const useCartStore = create<CartContextType>((set, get) => ({
  items: [],

  addToCart: (product: Product) => set((state) => {
    const existingItem = state.items.find(item => item.id === product.id);

    if (existingItem) {
      return {
        items: state.items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      };
    }

    return {
      items: [...state.items, { ...product, quantity: 1 }]
    };
  }),

  removeFromCart: (productId: number) => set((state) => ({
    items: state.items.filter(item => item.id !== productId)
  })),

  clearCart: () => set({ items: [] }),

  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0);
  },

  getTotalPrice: () => {
    return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
  },
}));
