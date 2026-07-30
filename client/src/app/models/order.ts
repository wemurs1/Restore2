export type Order = {
  id: number;
  buyerEmail: string;
  shippingAddress: ShippingAddress;
  orderDate: string;
  orderItems: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  orderStatus: string;
  paymentSummary: PaymentSummary;
};

export type ShippingAddress = {
  name: string;
  line1: string;
  line2?: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
};

export type OrderItem = {
  productId: number;
  name: string;
  pictureUrl: string;
  price: number;
  quantity: number;
};

export type PaymentSummary = {
  last4: number | string;
  brand: string;
  exp_month: number;
  exp_year: number;
};

export type CreateOrder = {
  shippingAddress: ShippingAddress;
  paymentSummary: PaymentSummary;
};
