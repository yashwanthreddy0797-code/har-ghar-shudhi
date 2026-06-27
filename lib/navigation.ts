export const ANNOUNCEMENTS = [
  "Get 10% OFF on orders above ₹3000 | Use code SHUDHI10",
  "Free Shipping on orders above ₹1499",
  "Pure Ayurvedic wellness — Shilajit, Ashwagandha, superfoods & more",
];

export const PRIMARY_NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "Our Story" },
  { href: "/science-trust", label: "Science" },
  { href: "/philosophy", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;

export const CONCERN_LINKS = [
  { href: "/products/diabetes-shudhi", label: "Diabetes Shudhi" },
  { href: "/shop/concern/diabetes", label: "Diabetes Care" },
  { href: "/shop/concern/gut-health", label: "Gut Health" },
  { href: "/shop/concern/weight-loss", label: "Weight Loss" },
];

export const SHOP_LINKS = [
  { href: "/shop", label: "All Products" },
  ...CONCERN_LINKS,
];

export const ABOUT_LINKS = [
  { href: "/about", label: "Our Story" },
  { href: "/about#vision-mission", label: "Vision & Mission" },
  { href: "/about#why-we-exist", label: "Why We Exist" },
  { href: "/about#promise", label: "Our Promise" },
  { href: "/about#journey", label: "From Nature to You" },
  { href: "/about#transparency", label: "Transparency" },
  { href: "/about#quality", label: "Quality Standards" },
  { href: "/about#value", label: "Fair Value" },
  { href: "/about#delivery", label: "Delivery & Care" },
];

export const PHILOSOPHY_LINKS = [
  { href: "/philosophy", label: "Our Philosophy" },
  { href: "/philosophy#wellness", label: "Natural Wellness" },
  { href: "/philosophy#purity", label: "Purity & Trust" },
  { href: "/philosophy#transparency", label: "Transparency" },
  { href: "/philosophy#community", label: "Our Community" },
];

export const CUSTOMER_LINKS = [
  { href: "/track-order", label: "Track Order" },
  { href: "/contact", label: "Contact Us" },
  { href: "/policies/refunds", label: "Refund & Cancellation" },
  { href: "/policies/shipping", label: "Shipping & Delivery" },
  { href: "/policies/privacy", label: "Privacy Policy" },
  { href: "/policies/terms", label: "Terms of Service" },
];
