"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import type { Cart } from "@/lib/shopify/cart";
import {
  addToCartAction,
  fetchCartAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/app/actions/cart";

interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (variantId: string, quantity?: number) => Promise<Cart>;
  updateLine: (lineId: string, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetchCartAction().then(setCart).catch(console.error);
  }, []);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    const updated = await addToCartAction(variantId, quantity);
    setCart(updated);
    setIsOpen(true);
    return updated;
  }, []);

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    startTransition(async () => {
      const updated = await updateCartLineAction(lineId, quantity);
      setCart(updated);
    });
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    startTransition(async () => {
      const updated = await removeCartLineAction(lineId);
      setCart(updated);
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      isOpen,
      isLoading: isPending,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      updateLine,
      removeLine,
    }),
    [cart, isOpen, isPending, addItem, updateLine, removeLine]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
