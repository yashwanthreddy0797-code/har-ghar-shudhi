"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCart } from "@/lib/shopify/cart";
import {
  type CheckoutFormData,
  type CompletedOrder,
  ORDER_COOKIE,
} from "@/lib/checkout";

const CART_COOKIE = "shopify_cart_id";

function orderNumber() {
  return `HGS-${Date.now().toString(36).toUpperCase()}`;
}

export async function placeOrderAction(
  form: CheckoutFormData
): Promise<{ error?: string }> {
  const cookieStore = await cookies();
  const cartId = cookieStore.get(CART_COOKIE)?.value;
  if (!cartId) {
    return { error: "Your cart is empty. Add items before checkout." };
  }

  const cart = await getCart(cartId);
  if (!cart || cart.lines.length === 0) {
    return { error: "Your cart is empty. Add items before checkout." };
  }

  if (!form.email?.includes("@")) {
    return { error: "Please enter a valid email address." };
  }
  if (!form.firstName?.trim() || !form.lastName?.trim()) {
    return { error: "Please enter your first and last name." };
  }
  if (!form.address?.trim() || !form.city?.trim() || !form.pinCode?.trim()) {
    return { error: "Please complete your delivery address." };
  }
  if (!form.phone?.trim()) {
    return { error: "Please enter a phone number for delivery." };
  }

  const order: CompletedOrder = {
    orderNumber: orderNumber(),
    placedAt: new Date().toISOString(),
    email: form.email,
    shipping: form,
    subtotal: cart.subtotal,
    currencyCode: cart.currencyCode,
    lines: cart.lines.map((line) => ({
      productTitle: line.productTitle,
      title: line.title,
      quantity: line.quantity,
      lineTotal: line.lineTotal,
      image: line.image,
    })),
  };

  cookieStore.set(ORDER_COOKIE, JSON.stringify(order), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  cookieStore.delete(CART_COOKIE);

  redirect("/checkout/complete");
}

export async function getCompletedOrderAction(): Promise<CompletedOrder | null> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(ORDER_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(raw) as CompletedOrder;
  } catch {
    return null;
  }
}
