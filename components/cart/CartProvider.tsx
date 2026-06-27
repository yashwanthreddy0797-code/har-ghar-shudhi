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
import { isStaleServerActionError } from "@/lib/server-action-error";
import {
  addToCartAction,
  removeCartLineAction,
  updateCartLineAction,
} from "@/app/actions/cart";

interface CartProviderProps {
  children: React.ReactNode;
  initialCart?: Cart | null;
}

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

function recoverFromStaleServerAction() {
  if (typeof window !== "undefined") {
    window.location.reload();
  }
}

export function CartProvider({ children, initialCart = null }: CartProviderProps) {
  const [cart, setCart] = useState<Cart | null>(initialCart);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setCart(initialCart);
  }, [initialCart]);

  const addItem = useCallback(async (variantId: string, quantity = 1) => {
    try {
      const updated = await addToCartAction(variantId, quantity);
      setCart(updated);
      setIsOpen(true);
      return updated;
    } catch (error) {
      if (isStaleServerActionError(error)) {
        recoverFromStaleServerAction();
      }
      throw error;
    }
  }, []);

  const updateLine = useCallback(async (lineId: string, quantity: number) => {
    startTransition(async () => {
      try {
        const updated = await updateCartLineAction(lineId, quantity);
        setCart(updated);
      } catch (error) {
        if (isStaleServerActionError(error)) {
          recoverFromStaleServerAction();
        }
        throw error;
      }
    });
  }, []);

  const removeLine = useCallback(async (lineId: string) => {
    startTransition(async () => {
      try {
        const updated = await removeCartLineAction(lineId);
        setCart(updated);
      } catch (error) {
        if (isStaleServerActionError(error)) {
          recoverFromStaleServerAction();
        }
        throw error;
      }
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
