import { Product } from '@/types'
import { atomWithStorage } from 'jotai/utils'
import { getDefaultStore } from 'jotai'
import { useToast } from '@/hooks/useToast';
import { axiosInstance } from '../services/axios'
type CartItem = {
  item: Product
  quantity: number
}

const cartAtom = atomWithStorage<CartItem[] | null>('cart', null)

const updateItemCart = async (product: Product, quantity: number) => {
  const store = getDefaultStore();
  const cart = store.get(cartAtom);
  let newCart: CartItem[];

  if (cart) {
    const existingItem = cart.find((item) => item.item.id === product.id);
    if (existingItem) {
      newCart = cart.map((item) =>
        item.item.id === product.id ? { ...item, quantity: existingItem.quantity + quantity } : item
      );
    } else {
      newCart = [...cart, { item: product, quantity }];
    }

    if (quantity === 0) {
      newCart = newCart.filter((item) => item.item.id !== product.id);
    }

    if (quantity === -1 && existingItem?.quantity! > 0) {
      if (existingItem?.quantity! - 1 === 0) {
        return newCart;
      }
    }
  } else {
    newCart = [{ item: product, quantity }];
  }

  // Call backend API to update the cart
  try {
    await axiosInstance.post(`/cart/add/${product.id}`, { quantity });
    store.set(cartAtom, newCart);
    useToast().success('Cart updated successfully!');
  } catch (error) {
    useToast().error('Failed to update cart');
  }
};


export { cartAtom, updateItemCart }