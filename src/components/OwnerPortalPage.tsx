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
  ArrowLeft,
  Trash2,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EBikeReservation, ShopOrder } from '../types';

export const OwnerPortalIcon = ({ isUnlocked }: { isUnlocked?: boolean }) => (
  <span className="relative inline-flex items-center justify-center flex-shrink-0">
    <User className={isUnlocked ? "text-amber-400" : "text-slate-200"} size={16} />
    {isUnlocked ? (
      <Unlock className="absolute -bottom-1 -right-1.5 text-emerald-400 bg-slate-900 rounded-full p-0.5 border border-emerald-500/40" size={11} />
    ) : (
      <Lock className="absolute -bottom-1 -right-1.5 text-amber-400 bg-slate-900 rounded-full p-0.5 border border-amber-500/40" size={11} />
    )}
  </span>
);

export const OwnerPortalPage: React.FC = () => {
  const navigate = useNavigate();

  // Authentication state
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ebike_owner_unlocked') === 'true';
    } catch {
      return false;
    }
  });

  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPinHint, setShowPinHint] = useState(false);
  const [activeTab, setActiveTab] = useState<'rentals' | 'shop' | 'overview'>('rentals');

  // Real reservations state from localStorage (defaults to empty array [] so no sample examples show!)
  const [reservations, setReservations] = useState<EBikeReservation[]>(() => {
    try {
      const saved = localStorage.getItem('ebike_reservations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Real shop orders state from localStorage (defaults to empty array [])
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

  // Refresh from local storage
  const handleRefreshData = () => {
    try {
      const savedRentals = localStorage.getItem('ebike_reservations');
      setReservations(savedRentals ? JSON.parse(savedRentals) : []);

      const savedOrders = localStorage.getItem('ebike_shop_orders');
      setShopOrders(savedOrders ? JSON.parse(savedOrders) : []);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const unsubRentals = subscribeToReservations((items) => {
      setReservations(items);
    });
    const unsubOrders = subscribeToShopOrders((items) => {
      setShopOrders(items);
    });
    return () => {
      unsubRentals();
      unsubOrders();
    };
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPin = pinInput.trim().toLowerCase();
    if (cleanPin === '1234' || cleanPin === 'bovec') {
      setIsUnlocked(true);
      setPinError('');
      setPinInput('');
      try {
        sessionStorage.setItem('ebike_owner_unlocked', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setPinError('Incorrect Passcode! Try default PIN: 1234');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    try {
      sessionStorage.removeItem('ebike_owner_unlocked');
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBikeStatus = (id: string, status: EBikeReservation['status']) => {
    updateReservationStatusInFirebase(id, status);
    setReservations(prev => {
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
    setReservations(prev => {
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
    const headers = ['Ref', 'Date', 'Time/Duration', 'Customer', 'Phone', 'Email', 'Bike', 'Size', 'Location', 'Total (€)', 'Status'];
    const rows = reservations.map(r => [
      r.bookingRef,
      r.startDate,
      r.duration,
      `"${r.customer.fullName}"`,
      `"${r.customer.phone}"`,
      `"${r.customer.email}"`,
      `"${r.bikeName}"`,
      r.size,
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
    <div className="min-h-screen bg-[#050c0d] text-white pt-24 pb-16 px-4 sm:px-6 lg:px-12 selection:bg-amber-400 selection:text-black">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#09181a] border border-amber-500/20 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-amber-400 transition-all bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-2xl border border-white/10"
            >
              <ArrowLeft size={16} />
              <span>Back to Main Site</span>
            </Link>

            <div className="h-8 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-amber-500/20 border border-amber-500/40 rounded-2xl flex items-center justify-center text-amber-400 shadow-inner">
                <Shield size={24} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase text-amber-400 tracking-widest">
                    Host Portal & Business Ledger
                  </span>
                  {isUnlocked && (
                    <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30 flex items-center gap-1">
                      <Unlock size={11} /> Unlocked
                    </span>
                  )}
                </div>
                <h1 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Owner Management System
                </h1>
              </div>
            </div>
          </div>

          {isUnlocked && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefreshData}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-white/10 transition-all"
                title="Refresh Real Data"
              >
                <RefreshCw size={14} />
                <span>Refresh</span>
              </button>
              <button
                onClick={handleLock}
                className="flex items-center gap-1.5 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 hover:text-rose-200 rounded-xl text-xs font-bold border border-rose-500/30 transition-all"
              >
                <Lock size={14} />
                <span>Lock Dashboard</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {!isUnlocked ? (
          /* LOCKED LOGIN GATE */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto my-12 bg-[#0a181a] border border-amber-500/30 rounded-3xl p-8 sm:p-10 shadow-2xl text-center space-y-6"
          >
            <div className="w-16 h-16 bg-amber-500/20 border border-amber-500/40 rounded-3xl flex items-center justify-center text-amber-400 mx-auto shadow-inner">
              <OwnerPortalIcon isUnlocked={false} />
            </div>

            <div>
              <h2 className="text-2xl font-bold font-heading text-white mb-2">Host Authentication Required</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your 4-digit PIN to access real customer e-bike bookings, shop apparel orders, and customer contact ledgers.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter Owner PIN (1234)"
                  className="w-full bg-slate-900 border border-amber-500/30 rounded-2xl px-5 py-4 text-center font-mono text-2xl tracking-[0.5em] text-amber-300 focus:outline-none focus:border-amber-400 transition-all placeholder:text-slate-600 placeholder:text-sm placeholder:tracking-normal"
                  autoFocus
                />
              </div>

              {pinError && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400 text-xs font-bold flex items-center justify-center gap-2">
                  <AlertCircle size={15} />
                  <span>{pinError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Unlock size={16} />
                <span>Unlock Owner Portal</span>
              </button>
            </form>

            <div className="pt-2">
              <button
                onClick={() => setShowPinHint(!showPinHint)}
                className="text-[11px] text-slate-500 hover:text-amber-400 underline transition-colors"
              >
                {showPinHint ? 'Hide Passcode Hint' : 'Forgot Passcode / Need Hint?'}
              </button>
              {showPinHint && (
                <div className="mt-2 p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-[11px] text-amber-300 font-mono">
                  Default Host PIN is: <strong>1234</strong>
                </div>
              )}
            </div>
          </motion.div>
        ) : (
          /* UNLOCKED DASHBOARD CONTENT */
          <div className="space-y-8">
            {/* TABS HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10">
                <button
                  onClick={() => setActiveTab('rentals')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'rentals'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Bike size={16} />
                  <span>E-Bike Bookings ({reservations.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('shop')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'shop'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <ShoppingBag size={16} />
                  <span>Apparel Orders ({shopOrders.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    activeTab === 'overview'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <TrendingUp size={16} />
                  <span>Financial Stats</span>
                </button>
              </div>

              {/* CSV EXPORT ACTIONS */}
              <div className="flex items-center gap-3">
                {activeTab === 'rentals' && (
                  <button
                    onClick={handleExportRentalsCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Export Bookings CSV</span>
                  </button>
                )}

                {activeTab === 'shop' && (
                  <button
                    onClick={handleExportShopCSV}
                    className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold transition-all"
                  >
                    <FileSpreadsheet size={15} />
                    <span>Export Orders CSV</span>
                  </button>
                )}
              </div>
            </div>

            {/* TAB 1: E-BIKE RENTALS */}
            {activeTab === 'rentals' && (
              <div className="space-y-6">
                {/* Search & Status Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search customer name, email, phone, ref..."
                      value={rentalSearch}
                      onChange={(e) => setRentalSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    {['all', 'confirmed', 'active', 'completed', 'cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => setRentalStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                          rentalStatusFilter === st
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of Real Reservations */}
                {filteredReservations.length === 0 ? (
                  <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-12 text-center space-y-4">
                    <Bike size={48} className="text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-300">No Real Bike Bookings Found</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      All new bike rentals placed by guests through the website will appear here automatically with complete customer details.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredReservations.map((res) => (
                      <div
                        key={res.id}
                        className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 transition-all hover:border-amber-500/40 space-y-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                              {res.bookingRef}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">
                              Created {new Date(res.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={res.status}
                              onChange={(e) => handleUpdateBikeStatus(res.id, e.target.value as any)}
                              className="bg-slate-950 border border-white/20 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="active">Active (On Trail)</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDeleteBikeReservation(res.id)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Delete from ledger"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                          {/* Customer Details */}
                          <div className="space-y-2">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Customer Details</span>
                            <div className="text-sm font-bold text-white flex items-center gap-1.5">
                              <User size={14} className="text-amber-400" />
                              <span>{res.customer.fullName}</span>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <Mail size={13} className="text-slate-400" />
                              <a href={`mailto:${res.customer.email}`} className="hover:text-amber-300 underline">{res.customer.email}</a>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <Phone size={13} className="text-slate-400" />
                              <a href={`tel:${res.customer.phone}`} className="hover:text-amber-300 font-mono">{res.customer.phone}</a>
                            </div>
                            {res.customer.notes && (
                              <p className="text-[11px] text-slate-400 bg-black/40 p-2 rounded-lg italic">
                                "{res.customer.notes}"
                              </p>
                            )}
                          </div>

                          {/* Rental & Bike Info */}
                          <div className="space-y-2">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Bike & Time Specs</span>
                            <div className="font-bold text-slate-200 flex items-center gap-1.5">
                              <Bike size={14} className="text-emerald-400" />
                              <span>{res.bikeName} (x{res.quantity})</span>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <CalendarDays size={13} className="text-slate-400" />
                              <span>Start Date: <strong>{res.startDate}</strong></span>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <Clock size={13} className="text-slate-400" />
                              <span className="capitalize">Duration: <strong>{res.duration}</strong></span>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <MapPin size={13} className="text-slate-400" />
                              <span>Pickup: {res.pickupLocation}</span>
                            </div>
                          </div>

                          {/* Pricing & Addons */}
                          <div className="space-y-2 bg-black/30 p-4 rounded-xl border border-white/5">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Payment Summary</span>
                            <div className="text-xl font-extrabold text-emerald-400 font-mono">
                              €{res.totalAmount.toFixed(2)}
                            </div>
                            {res.addons && res.addons.length > 0 && (
                              <div className="pt-1">
                                <span className="text-[10px] text-slate-400 block font-bold">Add-ons:</span>
                                <p className="text-[11px] text-slate-300">{res.addons.join(', ')}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: SHOP APPAREL ORDERS */}
            {activeTab === 'shop' && (
              <div className="space-y-6">
                {/* Search & Status Filters */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-white/10">
                  <div className="relative w-full sm:w-80">
                    <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search buyer name, email, order ref..."
                      value={shopSearch}
                      onChange={(e) => setShopSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                    {['all', 'pending', 'shipped', 'completed', 'cancelled'].map(st => (
                      <button
                        key={st}
                        onClick={() => setShopStatusFilter(st)}
                        className={`px-3 py-1.5 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                          shopStatusFilter === st
                            ? 'bg-amber-400 text-slate-950'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {st}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Table of Real Shop Orders */}
                {filteredShopOrders.length === 0 ? (
                  <div className="bg-slate-900/40 border border-white/10 rounded-3xl p-12 text-center space-y-4">
                    <ShoppingBag size={48} className="text-slate-600 mx-auto" />
                    <h3 className="text-lg font-bold text-slate-300">No Real Apparel Orders Found</h3>
                    <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                      All new T-shirt and cap purchases made by customers through the shop will display here automatically.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredShopOrders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 transition-all hover:border-amber-500/40 space-y-4"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-amber-400 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/30">
                              {order.orderRef}
                            </span>
                            <span className="text-xs text-slate-400 font-semibold">
                              Placed {new Date(order.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateShopOrderStatus(order.id, e.target.value as any)}
                              className="bg-slate-950 border border-white/20 rounded-xl px-3 py-1.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400"
                            >
                              <option value="pending">Pending</option>
                              <option value="shipped">Shipped</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleDeleteShopOrder(order.id)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors"
                              title="Delete order"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                          {/* Customer Contact */}
                          <div className="space-y-2">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Customer Contact</span>
                            <div className="text-sm font-bold text-white flex items-center gap-1.5">
                              <User size={14} className="text-amber-400" />
                              <span>{order.customerName}</span>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <Mail size={13} className="text-slate-400" />
                              <a href={`mailto:${order.customerEmail}`} className="hover:text-amber-300 underline">{order.customerEmail}</a>
                            </div>
                            <div className="text-slate-300 flex items-center gap-1.5">
                              <Phone size={13} className="text-slate-400" />
                              <a href={`tel:${order.customerPhone}`} className="hover:text-amber-300 font-mono">{order.customerPhone}</a>
                            </div>
                            <div className="pt-1">
                              <span className="text-[10px] text-slate-400 font-bold block">Delivery Method:</span>
                              <span className="text-xs font-semibold text-emerald-300 capitalize">{order.deliveryMethod.replace('-', ' ')}</span>
                            </div>
                          </div>

                          {/* Ordered Items */}
                          <div className="space-y-2">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Items Ordered</span>
                            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                              {order.items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-black/30 p-2 rounded-lg border border-white/5">
                                  {item.image && <img src={item.image} alt={item.productName} className="w-8 h-8 rounded object-cover" />}
                                  <div>
                                    <p className="font-bold text-slate-200 text-[11px]">{item.productName}</p>
                                    <p className="text-[10px] text-slate-400">
                                      {item.selectedColor} • {item.selectedSize} • Qty: {item.quantity} x €{item.unitPrice.toFixed(2)}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Total */}
                          <div className="space-y-2 bg-black/30 p-4 rounded-xl border border-white/5">
                            <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">Order Total</span>
                            <div className="text-xl font-extrabold text-emerald-400 font-mono">
                              €{order.totalAmount.toFixed(2)}
                            </div>
                            {order.shippingAddress && (
                              <div className="pt-2">
                                <span className="text-[10px] text-slate-400 block font-bold">Shipping Address:</span>
                                <p className="text-[11px] text-slate-300">{order.shippingAddress}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: FINANCIAL OVERVIEW */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">E-Bike Revenue</span>
                  <div className="text-3xl font-black text-emerald-400 font-mono">€{totalRentalRevenue.toFixed(2)}</div>
                  <span className="text-xs text-slate-500 block">{reservations.length} total bike reservations</span>
                </div>

                <div className="bg-slate-900/80 border border-white/10 rounded-3xl p-6 space-y-2">
                  <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Apparel Shop Revenue</span>
                  <div className="text-3xl font-black text-amber-400 font-mono">€{totalShopRevenue.toFixed(2)}</div>
                  <span className="text-xs text-slate-500 block">{shopOrders.length} apparel orders</span>
                </div>

                <div className="bg-slate-900/80 border border-amber-500/30 rounded-3xl p-6 space-y-2 bg-gradient-to-br from-amber-500/10 to-transparent">
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Combined Total Revenue</span>
                  <div className="text-3xl font-black text-white font-mono">€{totalCombinedRevenue.toFixed(2)}</div>
                  <span className="text-xs text-slate-400 block">All active business operations</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
