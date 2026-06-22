import type { Metadata, Viewport } from "next";
import {
  Cormorant_Garamond,
  Inter,
  Lora,
  Playfair_Display,
  Source_Sans_3,
} from "next/font/google";
import "@/styles/globals.css";
import BrandHeader from "@/components/BrandHeader";
import NavScrollReset from "@/components/NavScrollReset";
import ScrollBootstrap from "@/components/ScrollBootstrap";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-source-sans",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Har Ghar Shudhi | Luxury Ayurvedic Wellness",
  description:
    "Rooted in Nature, Driven by Purpose. Natural, organic and herbal wellness products with complete transparency — delivered to your doorstep.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cormorant.variable} ${inter.variable} ${playfair.variable} ${lora.variable} ${sourceSans.variable}`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if('scrollRestoration'in history)history.scrollRestoration='manual';window.scrollTo(0,0);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <ScrollBootstrap />
        <NavScrollReset />
        <CartProvider>
          <BrandHeader />
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
