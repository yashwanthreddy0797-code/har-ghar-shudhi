import { shopifyFetch } from "./client";
import {
  CART_CREATE_MUTATION,
  CART_LINES_ADD_MUTATION,
  CART_LINES_REMOVE_MUTATION,
  CART_LINES_UPDATE_MUTATION,
  GET_CART_QUERY,
} from "./queries";

export interface CartLine {
  id: string;
  quantity: number;
  variantId: string;
  title: string;
  productTitle: string;
  productHandle: string;
  image?: string;
  price: number;
  lineTotal: number;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  subtotal: number;
  currencyCode: string;
  lines: CartLine[];
}

interface ShopifyCartResponse {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost?: {
    subtotalAmount?: { amount: string; currencyCode: string };
    totalAmount?: { amount: string; currencyCode: string };
  };
  lines?: {
    edges: {
      node: {
        id: string;
        quantity: number;
        merchandise?: {
          id: string;
          title: string;
          price: { amount: string };
          product: {
            title: string;
            handle: string;
            featuredImage?: { url: string } | null;
          };
        };
        cost?: { totalAmount?: { amount: string } };
      };
    }[];
  };
}

function mapCart(cart: ShopifyCartResponse | null | undefined): Cart | null {
  if (!cart) return null;

  return {
    id: cart.id,
    checkoutUrl: cart.checkoutUrl,
    totalQuantity: cart.totalQuantity,
    subtotal: parseFloat(cart.cost?.subtotalAmount?.amount ?? "0"),
    currencyCode: cart.cost?.subtotalAmount?.currencyCode ?? "INR",
    lines: (cart.lines?.edges ?? [])
      .filter(({ node }) => node.merchandise)
      .map(({ node }) => ({
        id: node.id,
        quantity: node.quantity,
        variantId: node.merchandise!.id,
        title: node.merchandise!.title,
        productTitle: node.merchandise!.product.title,
        productHandle: node.merchandise!.product.handle,
        image: node.merchandise!.product.featuredImage?.url,
        price: parseFloat(node.merchandise!.price.amount),
        lineTotal: parseFloat(node.cost?.totalAmount?.amount ?? "0"),
      })),
  };
}

function assertNoErrors(
  userErrors: { field?: string[] | null; message: string }[] | undefined,
  action: string
) {
  if (userErrors?.length) {
    throw new Error(userErrors.map((e) => e.message).join(", ") || action);
  }
}

export async function createCart(): Promise<Cart> {
  const data = await shopifyFetch<{
    cartCreate: {
      cart: ShopifyCartResponse | null;
      userErrors: { message: string }[];
    };
  }>(CART_CREATE_MUTATION);

  assertNoErrors(data.cartCreate.userErrors, "Failed to create cart");
  const cart = mapCart(data.cartCreate.cart);
  if (!cart) throw new Error("Failed to create cart");
  return cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<{ cart: ShopifyCartResponse | null }>(
      GET_CART_QUERY,
      { cartId }
    );
    return mapCart(data.cart);
  } catch {
    return null;
  }
}

export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesAdd: {
      cart: ShopifyCartResponse | null;
      userErrors: { message: string }[];
    };
  }>(CART_LINES_ADD_MUTATION, {
    cartId,
    lines: [{ merchandiseId: variantId, quantity }],
  });

  assertNoErrors(data.cartLinesAdd.userErrors, "Failed to add to cart");
  const cart = mapCart(data.cartLinesAdd.cart);
  if (!cart) throw new Error("Failed to add to cart");
  return cart;
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesUpdate: {
      cart: ShopifyCartResponse | null;
      userErrors: { message: string }[];
    };
  }>(CART_LINES_UPDATE_MUTATION, {
    cartId,
    lines: [{ id: lineId, quantity }],
  });

  assertNoErrors(data.cartLinesUpdate.userErrors, "Failed to update cart");
  const cart = mapCart(data.cartLinesUpdate.cart);
  if (!cart) throw new Error("Failed to update cart");
  return cart;
}

export async function removeCartLine(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await shopifyFetch<{
    cartLinesRemove: {
      cart: ShopifyCartResponse | null;
      userErrors: { message: string }[];
    };
  }>(CART_LINES_REMOVE_MUTATION, { cartId, lineIds: [lineId] });

  assertNoErrors(data.cartLinesRemove.userErrors, "Failed to remove from cart");
  const cart = mapCart(data.cartLinesRemove.cart);
  if (!cart) throw new Error("Failed to remove from cart");
  return cart;
}
