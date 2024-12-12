import { useToast } from '@/hooks/useToast'
import { axiosInstance } from './axios'

export const cartService = {
  addProductToCart: async () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      return useToast().error('Nothing in cart to add!');
    }

    try {
      const promises = cart.map((cartItem: CartItem) => {
        const { item, quantity } = cartItem;
        return axiosInstance.post(`/cart/add/${item.id}`, { quantity });
      });
      await Promise.all(promises);
      localStorage.removeItem('cart');
      useToast().success('Added to cart successfully!');
    } catch (error) {
      useToast().error('Failed to add items to cart');
    }
  },
}
