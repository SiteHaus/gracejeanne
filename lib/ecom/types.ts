// Types derived from the sitehaus-commerce API contracts

export type Availability = "in_stock" | "low_stock" | "out_of_stock";

export type VariantOptionValue = {
  optionId: string;
  optionName: string;
  valueId: string;
  value: string;
};

export type PublicVariant = {
  id: string;
  name: string;
  priceCents: number;
  compareAtCents: number | null;
  availability: Availability;
  optionValues: VariantOptionValue[];
};

export type ProductImage = {
  cdnUrl: string;
  altText: string | null;
} | null;

export type OptionValue = {
  id: string;
  value: string;
  sortOrder: number;
};

export type Option = {
  id: string;
  name: string;
  sortOrder: number;
  values: OptionValue[];
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  scheduled: boolean;
  goesLiveAt: string | null;
  primaryImage: ProductImage;
  variants: PublicVariant[] | null;
};

export type ProductDetail = {
  id: string;
  name: string;
  description: string | null;
  brand: string | null;
  scheduled: boolean;
  goesLiveAt: string | null;
  primaryImage: ProductImage;
  images: { cdnUrl: string; altText: string | null }[];
  options: Option[];
  variants: PublicVariant[] | null;
};

export type ProductList = {
  items: Product[];
  total: number;
};

export type CartItem = {
  variantId: string;
  productId: string;
  productName: string;
  variantName: string;
  sku: string | null;
  priceCents: number;
  compareAtCents: number | null;
  primaryImageUrl: string | null;
  quantity: number;
  lineTotalCents: number;
  availability: "in_stock" | "low_stock" | "out_of_stock";
};

export type Cart = {
  id: string | null;
  items: CartItem[];
  subtotalCents: number;
  itemCount: number;
  expiresAt: string | null;
};

export type OrderShipping = {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  zip: string;
  country: string;
};

export type OrderItem = {
  productName: string;
  variantName: string;
  sku: string | null;
  quantity: number;
  unitPriceCents: number;
  totalCents: number;
};

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "shipped"
  | "delivered"
  | "failed"
  | "refunded"
  | "cancelled";

export type Order = {
  id: string;
  status: OrderStatus;
  email: string;
  createdAt: string;
  confirmedAt: string | null;
  shippedAt: string | null;
  deliveredAt: string | null;
  trackingNumber: string | null;
  shipping: OrderShipping;
  items: OrderItem[];
  subtotalCents: number;
  shippingCents: number;
  taxCents: number;
  totalCents: number;
  currency: string;
};

export type CheckoutIntentResponse = {
  orderId: string;
  checkoutUrl: string;
  subtotalCents: number;
  shippingCents: number;
  totalCents: number;
};

export type CheckoutIntentRequest = {
  email?: string;
  address?: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  successUrl: string;
  cancelUrl: string;
  shippingRateId?: string;
};

export type ApiError = {
  message: string;
};
