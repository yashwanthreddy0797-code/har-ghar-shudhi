"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "./CartProvider";
import { formatPrice } from "@/lib/types/product";

export default function CartDrawer() {
  const { cart, isOpen, closeCart, updateLine, removeLine, isLoading } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={closeCart}
        aria-hidden
      />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-brand-white shadow-xl">
        <div className="flex items-center justify-between border-b border-brand-border px-6 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-brand-green" />
            <h2 className="font-serif text-xl text-brand-text">Your Cart</h2>
            {cart && cart.totalQuantity > 0 && (
              <span className="rounded-full bg-brand-green-light px-2 py-0.5 font-sans text-xs text-brand-green">
                {cart.totalQuantity}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="text-brand-muted hover:text-brand-text"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-brand-border" />
              <p className="font-sans text-sm text-brand-muted">
                Your cart is empty
              </p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 rounded-md bg-brand-green px-6 py-2.5 font-sans text-xs font-medium uppercase tracking-wider text-white hover:bg-brand-green-dark"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className="space-y-5">
              {cart.lines.map((line) => (
                <li
                  key={line.id}
                  className="flex gap-4 border-b border-brand-border pb-5"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md border border-brand-border bg-brand-cream">
                    {line.image && (
                      <Image
                        src={line.image}
                        alt={line.productTitle}
                        fill
                        className="object-contain p-1"
                        sizes="80px"
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col">
                    <Link
                      href={`/products/${line.productHandle}`}
                      onClick={closeCart}
                      className="font-sans text-sm font-medium text-brand-text hover:text-brand-green"
                    >
                      {line.productTitle}
                    </Link>
                    {line.title !== "Default Title" && (
                      <p className="mt-0.5 font-sans text-xs text-brand-muted">
                        {line.title}
                      </p>
                    )}
                    <p className="mt-1 font-sans text-sm font-semibold text-brand-text">
                      {formatPrice(line.price)}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-md border border-brand-border">
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() =>
                            line.quantity <= 1
                              ? removeLine(line.id)
                              : updateLine(line.id, line.quantity - 1)
                          }
                          className="px-2 py-1 text-brand-muted hover:text-brand-green disabled:opacity-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[2rem] text-center font-sans text-sm">
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          disabled={isLoading}
                          onClick={() => updateLine(line.id, line.quantity + 1)}
                          className="px-2 py-1 text-brand-muted hover:text-brand-green disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <button
                        type="button"
                        disabled={isLoading}
                        onClick={() => removeLine(line.id)}
                        className="text-brand-muted hover:text-red-500 disabled:opacity-50"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {cart && cart.lines.length > 0 && (
          <div className="border-t border-brand-border px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-sans text-sm text-brand-muted">Subtotal</span>
              <span className="font-sans text-lg font-semibold text-brand-text">
                {formatPrice(cart.subtotal)}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-md bg-brand-green py-3.5 text-center font-sans text-xs font-medium uppercase tracking-wider text-white transition-colors hover:bg-brand-green-dark"
            >
              Checkout
            </Link>
            <button
              type="button"
              onClick={closeCart}
              className="mt-3 w-full py-2 font-sans text-xs text-brand-muted hover:text-brand-green"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
