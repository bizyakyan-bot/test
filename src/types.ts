export interface ShopOrderItem {
  productId: string;
  productName: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  unitPrice: number;
  image: string;
}

export interface ShopOrder {
  id: string;
  orderRef: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryMethod: 'bovec-pickup' | 'postal-delivery';
  shippingAddress?: string;
  notes?: string;
  items: ShopOrderItem[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface EBikeModel {
  id: string;
  name: string;
  category: 'e-mtb' | 'e-trekking' | 'e-gravel' | 'e-kids' | 'e-cruiser';
  tag: string;
  motor: string;
  battery: string;
  range: string;
  shortCruisePrice?: number;
  halfDayPrice: number;
  fullDayPrice: number;
  multiDayPricePerDay: number;
  sizes: ('S' | 'M' | 'L' | 'XL' | 'One Size')[];
  totalStockPerSize: Record<string, number>;
  image: string;
  description: string;
  specs: string[];
}

export interface EBikeReservation {
  id: string;
  bookingRef: string;
  bikeId: string;
  bikeName: string;
  bikeImage: string;
  size: 'S' | 'M' | 'L' | 'XL' | 'One Size';
  riderHeight: string;
  quantity: number;
  startDate: string;
  pickupTime?: string;
  duration: 'short-cruise' | 'half-day' | 'full-day' | 'multi-day' | 'half-day-morning' | 'half-day-afternoon';
  numDays: number;
  totalAmount: number;
  pickupLocation: string;
  addons: string[];
  customer: {
    fullName: string;
    email: string;
    phone: string;
    notes?: string;
  };
  createdAt: string;
  status: 'confirmed' | 'active' | 'completed' | 'cancelled';
}
