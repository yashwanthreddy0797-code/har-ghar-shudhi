import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "@/styles/globals.css";
import BrandHeader from "@/components/BrandHeader";
import { CartProvider } from "@/components/cart/CartProvider";
import CartDrawer from "@/components/cart/CartDrawer";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Har Ghar Shudhi | Luxury Ayurvedic Wellness",
  description:
    "Ancient herbal wisdom for modern living. Premium adaptogenic supplements crafted with organic ingredients.",
  icons: {
    icon: "/brand/har-ghar-shudhi-logo.png",
    apple: "/brand/har-ghar-shudhi-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>
          <BrandHeader />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
