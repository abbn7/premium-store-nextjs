'use client';

import { useCartStore } from '@/store/cart-store';
import type { Product } from '@/types';

export function useCart() {
  const store = useCartStore();

  const addToCart = (product: Product, quantity = 1) => {
    store.addItem(product, quantity);
  };

  const removeFromCart = (productId: string) => {
    store.removeItem(productId);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    store.updateQuantity(productId, quantity);
  };

  const isInCart = (productId: string) => {
    return store.items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = store.items.find((item) => item.product.id === productId);
    return item?.quantity || 0;
  };

  const freeShippingThreshold = 100;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - store.totalPrice());

  return {
    items: store.items,
    isOpen: store.isOpen,
    totalItems: store.totalItems(),
    totalPrice: store.totalPrice(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart: store.clearCart,
    toggleCart: store.toggleCart,
    openCart: store.openCart,
    closeCart: store.closeCart,
    isInCart,
    getItemQuantity,
    freeShippingThreshold,
    amountToFreeShipping,
  };
}
