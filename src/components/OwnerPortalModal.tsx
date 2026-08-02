import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  subscribeToReservations, 
  subscribeToShopOrders, 
  updateReservationStatusInFirebase, 
  updateShopOrderStatusInFirebase,
  deleteReservationFromFirebase,
  deleteShopOrderFromFirebase
} from '../lib/firebaseService';
import { sendStatusUpdateEmailNotification } from '../lib/sendEmail';
import {
  Shield,
  Lock,
  Unlock,
  KeyRound,
  X,
  Search,
  FileSpreadsheet,
  CalendarDays,
  CheckCircle,
  CheckCircle2,
  Bike,
  ShoppingBag,
  TrendingUp,
  AlertCircle,
  Info,
  Phone,
  Mail,
  MapPin,
  Truck,
  Tag,
  RefreshCw,
  User,
  Clock,
  DollarSign,
  Trash2
} from 'lucide-react';
import { EBikeReservation, ShopOrder } from '../types';
import { SAMPLE_INITIAL_SHOP_ORDERS } from '../data';

interface OwnerPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  isUnlocked: boolean;
  onUnlock: (pin: string) => boolean;
  onLock: () => void;
  ebikeReservations?: EBikeReservation[];
  onUpdateReservationStatus?: (id: string, status: EBikeReservation['status']) => void;
}

const SAMPLE_INITIAL_BIKE_RESERVATIONS: EBikeReservation[] = [
  {
    id: 'sample-1',
    bookingRef: 'EB-8492-401',
    bikeId: 'scott-genius-eride',
    bikeName: 'Scott Genius eRIDE 920 Full-Suspension',
    bikeImage: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80',
    size: 'L',
    riderHeight: '185 cm',
    quantity: 1,
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    duration: 'full-day',
    numDays: 1,
    totalAmount: 72.00,
    pickupLocation: 'Čezsoča 21 (Apartma Pr Fejtne Hub)',
    addons: ['Helmet & Safety Kit', 'Extra Battery'],
    customer: {
      fullName: 'Marko Horvat',
      email: 'marko.horvat@gmail.com',
      phone: '+386 41 892 310',
      notes: 'Please adjust saddle height for 185cm. Planning Vršič Pass climb.'
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'sample-2',
    bookingRef: 'EB-7193-205',
    bikeId: 'specialized-turbo-tero',
    bikeName: 'Specialized Turbo Tero 4.0 SUV',
    bikeImage: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&q=80',
    size: 'M',
    riderHeight: '172 cm',
    quantity: 2,
    startDate: new Date().toISOString().split('T')[0],
    duration: 'full-day',
    numDays: 1,
    totalAmount: 116.00,
    pickupLocation: 'Hotel / Apartment Delivery (+€10)',
    addons: ['Helmet & Safety Kit', 'Child Seat'],
    customer: {
      fullName: 'Sarah & David Jenkins',
      email: 'sarah.j@outlook.com',
      phone: '+44 7700 900077',
      notes: 'Delivery to Hotel Soča Bovec lobby at 8:30 AM if possible.'
    },
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    status: 'active'
  },
  {
    id: 'sample-3',
    bookingRef: 'EB-3829-118',
    bikeId: 'cannondale-topstone-neo',
    bikeName: 'Cannondale Topstone Neo SL Gravel E-Bike',
    bikeImage: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
    size: 'M',
    riderHeight: '178 cm',
    quantity: 1,
    startDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
    duration: 'half-day-morning',
    numDays: 1,
    totalAmount: 46.00,
    pickupLocation: 'Bovec Town Center Depot',
    addons: ['Helmet & Safety Kit', 'Garmin GPS'],
    customer: {
      fullName: 'Luka Kovač',
      email: 'luka.kovac@slovenia.si',
      phone: '+386 51 339 211',
      notes: 'Garmin pre-loaded with Mangart Saddle route.'
    },
    createdAt: new Date(Date.now() - 90000000).toISOString(),
    status: 'completed'
  }
];

export const OwnerPortalModal: React.FC<OwnerPortalModalProps> = ({
  isOpen,
  onClose,
  isUnlocked,
  onUnlock,
  onLock,
  ebikeReservations: externalReservations,
  onUpdateReservationStatus
}) => {
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPinHint, setShowPinHint] = useState(false);
  const [activeTab, setActiveTab] = useState<'rentals' | 'shop' | 'overview'>('rentals');

  // Internal state for reservations if external not passed
  const [internalReservations, setInternalReservations] = useState<EBikeReservation[]>(() => {
    try {
      const saved = localStorage.getItem('ebike_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Shop orders state
  const [shopOrders, setShopOrders] = useState<ShopOrder[]>(() => {
    try {
      const saved = localStorage.getItem('ebike_shop_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Filters
  const [rentalSearch, setRentalSearch] = useState('');
  const [rentalStatusFilter, setRentalStatusFilter] = useState('all');

  const [shopSearch, setShopSearch] = useState('');
  const [shopStatusFilter, setShopStatusFilter] = useState('all');

  // Sync shop orders & rentals from Firebase in real-time
  useEffect(() => {
    if (isOpen) {
      const unsubRentals = subscribeToReservations((items) => {
        setInternalReservations(items);
      });
      const unsubOrders = subscribeToShopOrders((items) => {
        setShopOrders(items);
      });
      return () => {
        unsubRentals();
        unsubOrders();
      };
    }
  }, [isOpen]);

  const reservations = externalReservations || internalReservations;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onUnlock(pinInput);
    if (!success) {
      setPinError('Incorrect Passcode! Try default PIN: 1234');
    } else {
      setPinError('');
      setPinInput('');
    }
  };

  const handleUpdateBikeStatus = (id: string, status: EBikeReservation['status']) => {
    updateReservationStatusInFirebase(id, status);
    if (onUpdateReservationStatus) {
      onUpdateReservationStatus(id, status);
    }
    const target = internalReservations.find(r => r.id === id);
    if (target) {
      sendStatusUpdateEmailNotification('reservation', { ...target, status }, status);
    }
    setInternalReservations(prev => {
      const updated = prev.map(r => r.id === id ? { ...r, status } : r);
      try {
        localStorage.setItem('ebike_reservations', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleUpdateShopOrderStatus = (id: string, status: ShopOrder['status']) => {
    updateShopOrderStatusInFirebase(id, status);
    const target = shopOrders.find(o => o.id === id);
    if (target) {
      sendStatusUpdateEmailNotification('shop_order', { ...target, status }, status);
    }
    setShopOrders(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, status } : o);
      try {
        localStorage.setItem('ebike_shop_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleDeleteBikeReservation = (id: string) => {
    deleteReservationFromFirebase(id);
    setInternalReservations(prev => {
      const updated = prev.filter(r => r.id !== id);
      try {
        localStorage.setItem('ebike_reservations', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const handleDeleteShopOrder = (id: string) => {
    deleteShopOrderFromFirebase(id);
    setShopOrders(prev => {
      const updated = prev.filter(o => o.id !== id);
      try {
        localStorage.setItem('ebike_shop_orders', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  const filteredReservations = reservations.filter(res => {
    if (!res) return false;
    const name = (res.customer?.fullName || '').toLowerCase();
    const email = (res.customer?.email || '').toLowerCase();
    const phone = res.customer?.phone || '';
    const ref = (res.bookingRef || '').toLowerCase();
    const bike = (res.bikeName || '').toLowerCase();
    const query = rentalSearch.toLowerCase();

    const matchesSearch =
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(rentalSearch) ||
      ref.includes(query) ||
      bike.includes(query);

    const matchesStatus = rentalStatusFilter === 'all' || res.status === rentalStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredShopOrders = shopOrders.filter(order => {
    if (!order) return false;
    const name = (order.customerName || '').toLowerCase();
    const email = (order.customerEmail || '').toLowerCase();
    const phone = order.customerPhone || '';
    const ref = (order.orderRef || '').toLowerCase();
    const query = shopSearch.toLowerCase();

    const matchesSearch =
      name.includes(query) ||
      email.includes(query) ||
      phone.includes(shopSearch) ||
      ref.includes(query);

    const matchesStatus = shopStatusFilter === 'all' || order.status === shopStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Financial calculations
  const totalRentalRevenue = reservations
    .filter(r => r.status !== 'cancelled')
    .reduce((sum, r) => sum + r.totalAmount, 0);

  const totalShopRevenue = shopOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalCombinedRevenue = totalRentalRevenue + totalShopRevenue;

  // CSV Exports
  const handleExportRentalsCSV = () => {
    const headers = ['Ref', 'Date', 'Customer', 'Phone', 'Email', 'Bike', 'Size', 'Duration', 'Location', 'Total (€)', 'Status'];
    const rows = reservations.map(r => [
      r.bookingRef,
      r.startDate,
      `"${r.customer.fullName}"`,
      `"${r.customer.phone}"`,
      `"${r.customer.email}"`,
      `"${r.bikeName}"`,
      r.size,
      r.duration,
      `"${r.pickupLocation}"`,
      r.totalAmount.toFixed(2),
      r.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bovec_EBike_Reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportShopCSV = () => {
    const headers = ['Order Ref', 'Date', 'Customer', 'Phone', 'Email', 'Fulfillment', 'Address', 'Items Count', 'Total (€)', 'Status'];
    const rows = shopOrders.map(o => [
      o.orderRef,
      new Date(o.createdAt).toLocaleDateString(),
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail}"`,
      o.deliveryMethod,
      `"${o.shippingAddress || 'N/A'}"`,
      o.items.reduce((acc, i) => acc + i.quantity, 0),
      o.totalAmount.toFixed(2),
      o.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Bovec_Shop_Orders_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="owner-portal-modal-wrapper"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[160] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          <div
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            key="modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[#081415] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-4 max-h-[92vh] flex flex-col text-white"
          >
          {/* MODAL HEADER */}
          <div className="p-5 sm:p-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500/20 border border-amber-500/40 rounded-xl flex items-center justify-center text-amber-400">
                <Shield size={22} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-extrabold text-amber-400 tracking-wider">
                    J.Bizjak Bovec Host Portal
                  </span>
                  {isUnlocked && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Unlock size={10} /> Authenticated
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white font-heading">
                  Owner Management Dashboard
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {isUnlocked && (
                <button
                  onClick={onLock}
                  className="px-3.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Lock Session"
                >
                  <Lock size={14} /> Lock Session
                </button>
              )}

              <button
                onClick={onClose}
                className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* MODAL BODY */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {!isUnlocked ? (
              /* PIN LOCK SCREEN */
              <div className="max-w-md mx-auto py-8 text-center space-y-6">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                  <Lock size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Security Access Gate
                  </span>
                  <h4 className="text-2xl font-extrabold text-white font-heading">
                    Owner Passcode Required
                  </h4>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    To protect customer privacy (phone numbers, full names, addresses), please enter the owner PIN code.
                  </p>
                </div>

                <form onSubmit={handlePinSubmit} className="space-y-4 text-left">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-bold text-slate-300">
                        Enter Owner PIN / Passcode
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPinHint(!showPinHint)}
                        className="text-[11px] text-amber-400 hover:underline font-normal"
                      >
                        {showPinHint ? 'Hide Hint' : 'View Default PIN'}
                      </button>
                    </div>

                    <div className="relative">
                      <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Enter Owner PIN (e.g. 1234)"
                        value={pinInput}
                        onChange={(e) => setPinInput(e.target.value)}
                        className="w-full bg-slate-950 border border-white/20 rounded-xl pl-10 pr-4 py-3 text-white text-sm focus:outline-none focus:border-amber-400 tracking-wider font-mono"
                        autoFocus
                      />
                    </div>

                    {showPinHint && (
                      <div className="mt-2 p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs text-amber-300 flex items-center gap-2">
                        <Info size={14} className="flex-shrink-0" />
                        <span>Default Demo Owner PIN is: <strong className="font-mono text-white bg-black/40 px-2 py-0.5 rounded">1234</strong></span>
                      </div>
                    )}

                    {pinError && (
                      <p className="text-xs text-red-400 mt-2 font-semibold flex items-center gap-1">
                        <AlertCircle size={14} /> {pinError}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs transition-all"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      <Unlock size={16} /> Unlock Dashboard
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* UNLOCKED OWNER PORTAL CONTENT */
              <div className="space-y-6">
                {/* SUB-TAB NAVIGATOR */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-2 p-1.5 bg-slate-950 border border-white/10 rounded-2xl">
                    <button
                      onClick={() => setActiveTab('rentals')}
                      className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === 'rentals'
                          ? 'bg-amber-500 text-black shadow-lg scale-105'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Bike size={16} />
                      <span>E-Bike Rentals ({reservations.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('shop')}
                      className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === 'shop'
                          ? 'bg-amber-500 text-black shadow-lg scale-105'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <ShoppingBag size={16} />
                      <span>Shop Apparel Orders ({shopOrders.length})</span>
                    </button>

                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 ${
                        activeTab === 'overview'
                          ? 'bg-amber-500 text-black shadow-lg scale-105'
                          : 'text-slate-300 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <TrendingUp size={16} />
                      <span>Financial Overview</span>
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    {activeTab === 'rentals' && (
                      <button
                        onClick={handleExportRentalsCSV}
                        className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                      >
                        <FileSpreadsheet size={15} /> Export Rentals CSV
                      </button>
                    )}

                    {activeTab === 'shop' && (
                      <button
                        onClick={handleExportShopCSV}
                        className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center gap-2"
                      >
                        <FileSpreadsheet size={15} /> Export Shop CSV
                      </button>
                    )}
                  </div>
                </div>

                {/* TAB 1: E-BIKE RENTALS LEDGER */}
                {activeTab === 'rentals' && (
                  <div className="space-y-6">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Total Bookings</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-white">{reservations.length}</span>
                          <CalendarDays size={18} className="text-amber-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Confirmed Upcoming</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-emerald-400">
                            {reservations.filter(r => r.status === 'confirmed').length}
                          </span>
                          <CheckCircle size={18} className="text-emerald-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Active On Trail</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-amber-400">
                            {reservations.filter(r => r.status === 'active').length}
                          </span>
                          <Bike size={18} className="text-amber-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Rental Gross</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-white">€{totalRentalRevenue.toFixed(0)}</span>
                          <TrendingUp size={18} className="text-emerald-400" />
                        </div>
                      </div>
                    </div>

                    {/* Rental Search & Filter */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10">
                      <div className="relative flex-1 w-full">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search rental customer name, phone, email, ref..."
                          value={rentalSearch}
                          onChange={(e) => setRentalSearch(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                          value={rentalStatusFilter}
                          onChange={(e) => setRentalStatusFilter(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
                        >
                          <option value="all">All Rental Statuses</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="active">Active On Trail</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Rental Cards List */}
                    <div className="space-y-4">
                      {filteredReservations.length === 0 ? (
                        <div className="text-center py-12 bg-slate-950 rounded-2xl border border-white/10 text-slate-400 text-xs">
                          No e-bike reservations found matching search query.
                        </div>
                      ) : (
                        filteredReservations.map(res => (
                          <div
                            key={res.id}
                            className="bg-slate-950 p-5 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                                  {res.bookingRef}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Date: <strong className="text-white">{res.startDate}</strong> ({res.duration})
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                                  res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                  res.status === 'active' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  res.status === 'completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                  'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                  {res.status}
                                </span>

                                <select
                                  value={res.status}
                                  onChange={(e) => handleUpdateBikeStatus(res.id, e.target.value as any)}
                                  className="bg-slate-900 border border-white/20 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
                                >
                                  <option value="confirmed">Set Confirmed</option>
                                  <option value="active">Hand Over Bike</option>
                                  <option value="completed">Mark Returned</option>
                                  <option value="cancelled">Cancel Booking</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteBikeReservation(res.id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                  title="Delete from ledger"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                              {/* Customer info */}
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Customer Details</span>
                                <p className="font-bold text-white text-sm">{res.customer.fullName}</p>
                                <p className="text-slate-300 flex items-center gap-1.5">
                                  <Phone size={12} className="text-amber-400" /> {res.customer.phone}
                                </p>
                                <p className="text-slate-300 flex items-center gap-1.5">
                                  <Mail size={12} className="text-amber-400" /> {res.customer.email}
                                </p>
                              </div>

                              {/* Bike Specs & Size */}
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Bike Sizing & Hub</span>
                                <p className="font-semibold text-white">{res.bikeName}</p>
                                <p className="text-emerald-400 font-bold">
                                  Frame Size: Size {res.size} ({res.quantity}x) • Height: {res.riderHeight || 'Standard'}
                                </p>
                                <p className="text-slate-300 flex items-center gap-1">
                                  <MapPin size={12} className="text-slate-400" /> {res.pickupLocation}
                                </p>
                              </div>

                              {/* Price & Addons */}
                              <div className="space-y-1 md:text-right">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Total Amount Due</span>
                                <p className="text-xl font-extrabold text-amber-400 font-heading">€{res.totalAmount.toFixed(2)}</p>
                                {res.addons.length > 0 && (
                                  <p className="text-[11px] text-slate-400">
                                    Extras: {res.addons.join(', ')}
                                  </p>
                                )}
                              </div>
                            </div>

                            {res.customer.notes && (
                              <div className="p-2.5 bg-slate-900/60 rounded-xl border border-white/5 text-[11px] text-amber-200/90 italic">
                                Note from rider: "{res.customer.notes}"
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: SHOP APPAREL ORDERS */}
                {activeTab === 'shop' && (
                  <div className="space-y-6">
                    {/* Metrics Row */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Shop Orders</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-white">{shopOrders.length}</span>
                          <ShoppingBag size={18} className="text-amber-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Pending Processing</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-amber-400">
                            {shopOrders.filter(o => o.status === 'pending').length}
                          </span>
                          <Clock size={18} className="text-amber-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Shipped / Completed</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-emerald-400">
                            {shopOrders.filter(o => o.status === 'completed' || o.status === 'shipped').length}
                          </span>
                          <CheckCircle size={18} className="text-emerald-400" />
                        </div>
                      </div>

                      <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 space-y-1">
                        <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Apparel Sales Gross</span>
                        <div className="flex items-baseline justify-between">
                          <span className="text-2xl font-extrabold text-white">€{totalShopRevenue.toFixed(0)}</span>
                          <TrendingUp size={18} className="text-emerald-400" />
                        </div>
                      </div>
                    </div>

                    {/* Shop Search & Filter */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-white/10">
                      <div className="relative flex-1 w-full">
                        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Search order ref, customer name, email, address..."
                          value={shopSearch}
                          onChange={(e) => setShopSearch(e.target.value)}
                          className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                        />
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <select
                          value={shopStatusFilter}
                          onChange={(e) => setShopStatusFilter(e.target.value)}
                          className="bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 w-full sm:w-auto"
                        >
                          <option value="all">All Order Statuses</option>
                          <option value="pending">Pending</option>
                          <option value="shipped">Shipped</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>

                    {/* Shop Orders List */}
                    <div className="space-y-4">
                      {filteredShopOrders.length === 0 ? (
                        <div className="text-center py-12 bg-slate-950 rounded-2xl border border-white/10 text-slate-400 text-xs">
                          No shop orders found matching search criteria.
                        </div>
                      ) : (
                        filteredShopOrders.map(order => (
                          <div
                            key={order.id}
                            className="bg-slate-950 p-5 rounded-2xl border border-white/10 hover:border-amber-500/30 transition-all space-y-4"
                          >
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                              <div className="flex items-center gap-3">
                                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                                  {order.orderRef}
                                </span>
                                <span className="text-xs text-slate-400">
                                  Placed: <strong className="text-white">{new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong>
                                </span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
                                  order.status === 'pending' ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                  order.status === 'shipped' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                                  order.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                                  'bg-red-500/20 text-red-400 border border-red-500/30'
                                }`}>
                                  {order.status}
                                </span>

                                <select
                                  value={order.status}
                                  onChange={(e) => handleUpdateShopOrderStatus(order.id, e.target.value as any)}
                                  className="bg-slate-900 border border-white/20 rounded-lg px-2 py-1 text-xs text-slate-200 focus:outline-none"
                                >
                                  <option value="pending">Mark Pending</option>
                                  <option value="shipped">Mark Shipped</option>
                                  <option value="completed">Mark Completed</option>
                                  <option value="cancelled">Cancel Order</option>
                                </select>

                                <button
                                  onClick={() => handleDeleteShopOrder(order.id)}
                                  className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                                  title="Delete order from ledger"
                                >
                                  <Trash2 size={15} />
                                </button>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                              {/* Customer info */}
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Buyer Contact</span>
                                <p className="font-bold text-white text-sm">{order.customerName}</p>
                                <p className="text-slate-300 flex items-center gap-1.5">
                                  <Phone size={12} className="text-emerald-400" /> {order.customerPhone}
                                </p>
                                <p className="text-slate-300 flex items-center gap-1.5">
                                  <Mail size={12} className="text-emerald-400" /> {order.customerEmail}
                                </p>
                              </div>

                              {/* Delivery & Shipping */}
                              <div className="space-y-1">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Fulfillment Method</span>
                                <p className="font-semibold text-white flex items-center gap-1.5">
                                  <Truck size={14} className="text-amber-400" />
                                  {order.deliveryMethod === 'bovec-pickup' ? 'Local Pickup in Bovec / Čezsoča' : 'Postal Mail Shipping'}
                                </p>
                                {order.shippingAddress && (
                                  <p className="text-slate-300 text-[11px]">
                                    Address: <strong className="text-slate-100">{order.shippingAddress}</strong>
                                  </p>
                                )}
                              </div>

                              {/* Price */}
                              <div className="space-y-1 md:text-right">
                                <span className="text-[10px] text-slate-400 uppercase font-bold block">Order Value</span>
                                <p className="text-xl font-extrabold text-emerald-400 font-heading">€{order.totalAmount.toFixed(2)}</p>
                              </div>
                            </div>

                            {/* Order Purchased Items */}
                            <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5 space-y-2">
                              <span className="text-[10px] uppercase font-bold text-slate-400 block">Purchased Items:</span>
                              <div className="divide-y divide-white/5">
                                {order.items.map((item, idx) => (
                                  <div key={idx} className="py-1.5 flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                      {item.image && (
                                        <img src={item.image} alt={item.productName} className="w-8 h-8 object-cover rounded-lg border border-white/10" />
                                      )}
                                      <div>
                                        <span className="font-medium text-white">{item.productName}</span>
                                        <span className="text-[11px] text-slate-400 ml-2">({item.selectedColor}, Size: {item.selectedSize})</span>
                                      </div>
                                    </div>
                                    <span className="font-bold text-amber-300">{item.quantity}x €{item.unitPrice.toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {order.notes && (
                              <div className="p-2.5 bg-slate-900/40 rounded-xl border border-white/5 text-[11px] text-emerald-200/90 italic">
                                Buyer Note: "{order.notes}"
                              </div>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 3: BUSINESS FINANCIAL OVERVIEW */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-500/15 via-slate-950 to-emerald-500/15 border border-amber-500/30 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
                            Total Business Combined Revenue
                          </span>
                          <h3 className="text-4xl font-black text-white font-heading mt-1">
                            €{totalCombinedRevenue.toFixed(2)}
                          </h3>
                        </div>
                        <div className="w-14 h-14 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl flex items-center justify-center text-emerald-400">
                          <DollarSign size={28} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
                          <div className="flex justify-between items-center text-slate-400">
                            <span>🚲 E-Bike Rental Gross:</span>
                            <span className="font-bold text-emerald-400">
                              {totalCombinedRevenue > 0 ? ((totalRentalRevenue / totalCombinedRevenue) * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-white">€{totalRentalRevenue.toFixed(2)}</p>
                          <span className="text-[11px] text-slate-400 block">{reservations.length} total bike reservations</span>
                        </div>

                        <div className="bg-slate-900/80 p-4 rounded-xl border border-white/10 space-y-1">
                          <div className="flex justify-between items-center text-slate-400">
                            <span>🛍️ Apparel & Shop Gross:</span>
                            <span className="font-bold text-emerald-400">
                              {totalCombinedRevenue > 0 ? ((totalShopRevenue / totalCombinedRevenue) * 100).toFixed(1) : 0}%
                            </span>
                          </div>
                          <p className="text-2xl font-bold text-white">€{totalShopRevenue.toFixed(2)}</p>
                          <span className="text-[11px] text-slate-400 block">{shopOrders.length} merchandise orders</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-950 p-6 rounded-2xl border border-white/10 space-y-4">
                      <h4 className="font-heading text-lg font-bold text-white uppercase tracking-tight">
                        Host Operational Checklist
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                        <div className="p-3 bg-slate-900 rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block">Pre-ride Battery Diagnostics</strong>
                            <span>Ensure all Bosch 625Wh batteries are 100% charged prior to guest arrival.</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block">Tire & Brake Safety Verification</strong>
                            <span>Verify tire pressure (2.2 bar) and brake pad wear before handing keys to riders.</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block">Local Pickup Hub at Čezsoča 21</strong>
                            <span>Direct guests to Hub Čezsoča 21 for free helmet & lock fittings.</span>
                          </div>
                        </div>

                        <div className="p-3 bg-slate-900 rounded-xl border border-white/5 flex items-start gap-3">
                          <CheckCircle2 size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block">Apparel Shipping Fulfillment</strong>
                            <span>Pack postal mail orders within 24 hours via Pošta Slovenije.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
