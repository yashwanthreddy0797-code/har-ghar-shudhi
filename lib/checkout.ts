export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
] as const;

export interface CheckoutFormData {
  email: string;
  marketingOptIn: boolean;
  firstName: string;
  lastName: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  pinCode: string;
  phone: string;
}

export interface CompletedOrder {
  orderNumber: string;
  placedAt: string;
  email: string;
  shipping: CheckoutFormData;
  subtotal: number;
  currencyCode: string;
  lines: {
    productTitle: string;
    title: string;
    quantity: number;
    lineTotal: number;
    image?: string;
  }[];
}

export const ORDER_COOKIE = "hgs_completed_order";
