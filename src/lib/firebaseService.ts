import {
  collection,
  doc,
  setDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from './firebase';
import { EBikeReservation, ShopOrder } from '../types';

const RESERVATIONS_COLLECTION = 'reservations';
const SHOP_ORDERS_COLLECTION = 'shop_orders';

// Helper to strip undefined values which crash Firestore setDoc
const sanitizeForFirestore = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

// Save Reservation to Firestore & localStorage
export const saveReservationToFirebase = async (reservation: EBikeReservation): Promise<void> => {
  try {
    // 1. Save locally first for instant feedback
    const savedLocal = localStorage.getItem('ebike_reservations');
    const existingLocal: EBikeReservation[] = savedLocal ? JSON.parse(savedLocal) : [];
    const updatedLocal = [reservation, ...existingLocal.filter(r => r.id !== reservation.id)];
    localStorage.setItem('ebike_reservations', JSON.stringify(updatedLocal));

    // 2. Save to Firestore database (sanitized)
    const docRef = doc(db, RESERVATIONS_COLLECTION, reservation.id);
    await setDoc(docRef, sanitizeForFirestore(reservation));
    console.log('Reservation saved to Firestore successfully:', reservation.bookingRef);
  } catch (err) {
    console.warn('Error saving reservation to Firestore (saved to localStorage):', err);
  }
};

// Save Shop Order to Firestore & localStorage
export const saveShopOrderToFirebase = async (order: ShopOrder): Promise<void> => {
  try {
    // 1. Save locally first for instant feedback
    const savedLocal = localStorage.getItem('ebike_shop_orders');
    const existingLocal: ShopOrder[] = savedLocal ? JSON.parse(savedLocal) : [];
    const updatedLocal = [order, ...existingLocal.filter(o => o.id !== order.id)];
    localStorage.setItem('ebike_shop_orders', JSON.stringify(updatedLocal));

    // 2. Save to Firestore database (sanitized)
    const docRef = doc(db, SHOP_ORDERS_COLLECTION, order.id);
    await setDoc(docRef, sanitizeForFirestore(order));
    console.log('Shop order saved to Firestore successfully:', order.orderRef);
  } catch (err) {
    console.warn('Error saving shop order to Firestore (saved to localStorage):', err);
  }
};

// Update Reservation Status in Firestore & localStorage
export const updateReservationStatusInFirebase = async (
  id: string,
  newStatus: 'confirmed' | 'active' | 'completed' | 'cancelled'
): Promise<void> => {
  try {
    // Update local storage
    const savedLocal = localStorage.getItem('ebike_reservations');
    if (savedLocal) {
      const list: EBikeReservation[] = JSON.parse(savedLocal);
      const updated = list.map(item => item.id === id ? { ...item, status: newStatus } : item);
      localStorage.setItem('ebike_reservations', JSON.stringify(updated));
    }

    // Update Firestore
    const docRef = doc(db, RESERVATIONS_COLLECTION, id);
    await updateDoc(docRef, { status: newStatus });
  } catch (err) {
    console.warn('Error updating reservation in Firestore:', err);
  }
};

// Update Shop Order Status in Firestore & localStorage
export const updateShopOrderStatusInFirebase = async (
  id: string,
  newStatus: 'pending' | 'shipped' | 'completed' | 'cancelled'
): Promise<void> => {
  try {
    // Update local storage
    const savedLocal = localStorage.getItem('ebike_shop_orders');
    if (savedLocal) {
      const list: ShopOrder[] = JSON.parse(savedLocal);
      const updated = list.map(item => item.id === id ? { ...item, status: newStatus } : item);
      localStorage.setItem('ebike_shop_orders', JSON.stringify(updated));
    }

    // Update Firestore
    const docRef = doc(db, SHOP_ORDERS_COLLECTION, id);
    await updateDoc(docRef, { status: newStatus });
  } catch (err) {
    console.warn('Error updating shop order in Firestore:', err);
  }
};

// Real-time listener for Reservations
export const subscribeToReservations = (
  onData: (reservations: EBikeReservation[]) => void
) => {
  try {
    const colRef = collection(db, RESERVATIONS_COLLECTION);
    return onSnapshot(colRef, (snapshot) => {
      const items: EBikeReservation[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as EBikeReservation);
      });
      // Sort in memory by createdAt descending
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      
      // Sync local storage
      if (items.length > 0) {
        localStorage.setItem('ebike_reservations', JSON.stringify(items));
      }
      onData(items);
    }, (err) => {
      console.warn('Firestore reservations subscription fallback to local:', err);
      const savedLocal = localStorage.getItem('ebike_reservations');
      if (savedLocal) onData(JSON.parse(savedLocal));
    });
  } catch (err) {
    console.warn('Failed to subscribe to Firestore reservations:', err);
    const savedLocal = localStorage.getItem('ebike_reservations');
    if (savedLocal) onData(JSON.parse(savedLocal));
    return () => {};
  }
};

// Real-time listener for Shop Orders
export const subscribeToShopOrders = (
  onData: (orders: ShopOrder[]) => void
) => {
  try {
    const colRef = collection(db, SHOP_ORDERS_COLLECTION);
    return onSnapshot(colRef, (snapshot) => {
      const items: ShopOrder[] = [];
      snapshot.forEach(docSnap => {
        items.push(docSnap.data() as ShopOrder);
      });
      // Sort in memory by createdAt descending
      items.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));

      // Sync local storage
      if (items.length > 0) {
        localStorage.setItem('ebike_shop_orders', JSON.stringify(items));
      }
      onData(items);
    }, (err) => {
      console.warn('Firestore shop orders subscription fallback to local:', err);
      const savedLocal = localStorage.getItem('ebike_shop_orders');
      if (savedLocal) onData(JSON.parse(savedLocal));
    });
  } catch (err) {
    console.warn('Failed to subscribe to Firestore shop orders:', err);
    const savedLocal = localStorage.getItem('ebike_shop_orders');
    if (savedLocal) onData(JSON.parse(savedLocal));
    return () => {};
  }
};
