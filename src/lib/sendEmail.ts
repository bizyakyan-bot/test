import { EBikeReservation, ShopOrder } from '../types';

export const sendOrderEmailNotification = async (type: 'reservation' | 'shop_order', data: EBikeReservation | ShopOrder) => {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    });
    const result = await response.json();
    console.log('Email notification result:', result);
    return result;
  } catch (err) {
    console.warn('Failed to trigger email notification API:', err);
    return { success: false, error: String(err) };
  }
};
