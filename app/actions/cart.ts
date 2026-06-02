"use server";

import { cookies } from "next/headers";
import {
  addToCart as shopifyAddToCart,
  createCart,
  getCart,
  removeCartLine,
  updateCartLine,
  type Cart,
} from "@/lib/shopify/cart";

const CART_COOKIE = "shopify_cart_id";

async function getCartId(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(CART_COOKIE)?.value;
}

async function setCartId(cartId: string) {
  const cookieStore = await cookies();
  cookieStore.set(CART_COOKIE, cartId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 14,
    path: "/",
  });
}

async function ensureCart(): Promise<Cart> {
  const existingId = await getCartId();
  if (existingId) {
    const cart = await getCart(existingId);
    if (cart) return cart;
  }

  const newCart = await createCart();
  await setCartId(newCart.id);
  return newCart;
}

export async function fetchCartAction(): Promise<Cart | null> {
  const cartId = await getCartId();
  if (!cartId) return null;
  return getCart(cartId);
}

export async function addToCartAction(
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const cart = await ensureCart();
  const updated = await shopifyAddToCart(cart.id, variantId, quantity);
  await setCartId(updated.id);
  return updated;
}

export async function updateCartLineAction(
  lineId: string,
  quantity: number
): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) throw new Error("No cart found");
  return updateCartLine(cartId, lineId, quantity);
}

export async function removeCartLineAction(lineId: string): Promise<Cart> {
  const cartId = await getCartId();
  if (!cartId) throw new Error("No cart found");
  return removeCartLine(cartId, lineId);
}
