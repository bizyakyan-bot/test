import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  Bike,
  Calendar, 
  Clock, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Plus, 
  Minus, 
  Trash2, 
  QrCode, 
  Printer, 
  BatteryCharging, 
  Navigation,
  SlidersHorizontal,
  Info,
  CalendarDays,
  Shield,
  Search,
  Download,
  UserCheck,
  TrendingUp,
  FileSpreadsheet,
  RefreshCw,
  PhoneCall,
  CheckCircle,
  XCircle,
  AlertCircle,
  Lock,
  Unlock,
  KeyRound
} from 'lucide-react';
import { ebikeModels } from '../data';
import { EBikeModel, EBikeReservation } from '../types';

const HEADEER_IMAGE = "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260730_121504_8ddc24e2-8e83-416a-80b8-66af2dbfed94.png&w=1280&q=85";

interface EBikeBookingSystemProps {
  initialBikeId?: string | null;
  onCloseModal?: () => void;
}

const SAMPLE_INITIAL_RESERVATIONS: EBikeReservation[] = [
  {
    id: 'sample-1',
    bookingRef: 'EB-8492-401',
    bikeId: 'headeer-bk20',
    bikeName: 'Headeer BK20 All-Terrain Fat-Tire E-Bike',
    bikeImage: HEADEER_IMAGE,
    size: 'One Size',
    riderHeight: '180 cm',
    quantity: 1,
    startDate: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    duration: 'half-day',
    numDays: 1,
    totalAmount: 25.00,
    pickupLocation: 'Čezsoča 21 (Apartma Pr Fejtne Hub)',
    addons: ['Helmet & Safety Kit'],
    customer: {
      fullName: 'Marko Horvat',
      email: 'marko.horvat@gmail.com',
      phone: '+386 41 892 310',
      notes: 'Saddle height set for 180cm. Cruising to Slap Boka & Čezsoča.'
    },
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    status: 'confirmed'
  },
  {
    id: 'sample-2',
    bookingRef: 'EB-7193-205',
    bikeId: 'headeer-bk20',
    bikeName: 'Headeer BK20 All-Terrain Fat-Tire E-Bike',
    bikeImage: HEADEER_IMAGE,
    size: 'One Size',
    riderHeight: '172 cm',
    quantity: 1,
    startDate: new Date().toISOString().split('T')[0], // Today
    duration: 'full-day',
    numDays: 1,
    totalAmount: 35.00,
    pickupLocation: 'Hotel / Apartment Delivery (+€10)',
    addons: ['Helmet & Safety Kit'],
    customer: {
      fullName: 'Sarah Jenkins',
      email: 'sarah.j@outlook.com',
      phone: '+44 7700 900077',
      notes: 'Delivery to Hotel Soča Bovec lobby at 9:00 AM.'
    },
    createdAt: new Date(Date.now() - 14400000).toISOString(),
    status: 'active'
  }
];

export const EBikeBookingSystem: React.FC<EBikeBookingSystemProps> = ({ 
  initialBikeId = null,
  onCloseModal 
}) => {
  // Persistence state
  const [reservations, setReservations] = useState<EBikeReservation[]>(() => {
    try {
      const saved = localStorage.getItem('ebike_reservations');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : SAMPLE_INITIAL_RESERVATIONS;
      }
      return SAMPLE_INITIAL_RESERVATIONS;
    } catch {
      return SAMPLE_INITIAL_RESERVATIONS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('ebike_reservations', JSON.stringify(reservations));
    } catch (e) {
      console.error('Failed to save reservations to local storage', e);
    }
  }, [reservations]);

  // Total shop fleet size constraint: Exactly 2 units of Headeer BK20 owned by host
  const TOTAL_FLEET_SIZE = 2;

  // Helper: calculate available stock (out of 2 bikes) for a specific date
  const getAvailableStock = (bikeId: string, date: string): number => {
    const reservedOnDate = reservations
      .filter(r => (r.bikeId === bikeId || r.bikeId === 'headeer-bk20') && r.startDate === date && r.status !== 'cancelled')
      .reduce((acc, curr) => acc + curr.quantity, 0);
    return Math.max(0, TOTAL_FLEET_SIZE - reservedOnDate);
  };

  // View mode: 'catalog' | 'my-reservations' | 'owner-dashboard'
  const [activeTab, setActiveTab] = useState<'catalog' | 'my-reservations' | 'owner-dashboard'>('catalog');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Owner Security & Authentication State
  const [isOwnerUnlocked, setIsOwnerUnlocked] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('ebike_owner_unlocked') === 'true';
    } catch {
      return false;
    }
  });
  const [ownerPinInput, setOwnerPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [showPinHint, setShowPinHint] = useState<boolean>(false);

  const DEFAULT_OWNER_PIN = '1234';

  const handleUnlockDashboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (ownerPinInput.trim() === DEFAULT_OWNER_PIN || ownerPinInput.trim().toLowerCase() === 'bovec') {
      setIsOwnerUnlocked(true);
      setPinError('');
      setOwnerPinInput('');
      try {
        sessionStorage.setItem('ebike_owner_unlocked', 'true');
      } catch (err) {
        console.error(err);
      }
    } else {
      setPinError('Incorrect Passcode! Try default PIN: 1234');
    }
  };

  const handleLockDashboard = () => {
    setIsOwnerUnlocked(false);
    try {
      sessionStorage.removeItem('ebike_owner_unlocked');
    } catch (err) {
      console.error(err);
    }
  };

  // Owner Admin Filters State
  const [adminSearch, setAdminSearch] = useState<string>('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<string>('all');

  // Booking Modal Wizard State
  const [bookingBike, setBookingBike] = useState<EBikeModel | null>(() => {
    return ebikeModels[0] || null;
  });

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Date/Time/Duration, 2: Rider Details & Addons, 3: Contact Info, 4: Pass
  
  // Booking Form State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(defaultDateStr);
  const [duration, setDuration] = useState<'short-cruise' | 'half-day' | 'full-day' | 'multi-day'>('full-day');
  const [numDays, setNumDays] = useState<number>(1);
  const [selectedSize, setSelectedSize] = useState<'S' | 'M' | 'L' | 'XL' | 'One Size'>('One Size');
  const [riderHeight, setRiderHeight] = useState<string>('178 cm');
  const [quantity, setQuantity] = useState<number>(1);
  const [pickupLocation, setPickupLocation] = useState<string>('Čezsoča 21 (Apartma Pr Fejtne Hub)');
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['Helmet & Safety Kit']);
  
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');

  const [lastConfirmedReservation, setLastConfirmedReservation] = useState<EBikeReservation | null>(null);

  // Synchronize quantity with available stock whenever date or reservations change
  useEffect(() => {
    if (bookingBike) {
      const avail = getAvailableStock(bookingBike.id, startDate);
      if (avail === 0) {
        setQuantity(0);
      } else if (quantity > avail) {
        setQuantity(avail);
      } else if (quantity === 0 && avail > 0) {
        setQuantity(1);
      }
    }
  }, [startDate, reservations, bookingBike]);

  // Available add-ons list
  const availableAddons = [
    { id: 'Helmet & Safety Kit', name: 'Helmet & High-Vis Safety Kit', price: 0, icon: '🪖' },
    { id: 'Phone Mount', name: 'Handlebar Phone Mount & Route GPS', price: 0, icon: '📱' },
    { id: 'Child Seat', name: 'Thule RideAlong Rear Child Seat', price: 8, icon: '👶' },
    { id: 'Extra Battery', name: '48V Extra Range Battery Pack', price: 10, icon: '🔋' }
  ];

  const handleStartBooking = (bike: EBikeModel) => {
    setBookingBike(bike);
    setSelectedSize('One Size');
    const avail = getAvailableStock(bike.id, startDate);
    setQuantity(avail > 0 ? 1 : 0);
    setStep(1);
  };

  const toggleAddon = (addonId: string) => {
    if (addonId === 'Helmet & Safety Kit' || addonId === 'Phone Mount') return;
    if (selectedAddons.includes(addonId)) {
      setSelectedAddons(selectedAddons.filter(a => a !== addonId));
    } else {
      setSelectedAddons([...selectedAddons, addonId]);
    }
  };

  // Price Calculation according to user's official price list
  const calculateTotal = (): number => {
    if (!bookingBike) return 0;
    let baseRate = bookingBike.fullDayPrice; // €35 default
    if (duration === 'short-cruise') {
      baseRate = bookingBike.shortCruisePrice || 15.00;
    } else if (duration === 'half-day' || (duration as string) === 'half-day-morning' || (duration as string) === 'half-day-afternoon') {
      baseRate = bookingBike.halfDayPrice || 25.00;
    } else if (duration === 'full-day') {
      baseRate = bookingBike.fullDayPrice || 35.00;
    } else if (duration === 'multi-day') {
      baseRate = (bookingBike.multiDayPricePerDay || 30.00) * numDays;
    }

    const addonsCost = selectedAddons.reduce((acc, addonId) => {
      const item = availableAddons.find(a => a.id === addonId);
      return acc + (item ? item.price * (duration === 'multi-day' ? numDays : 1) : 0);
    }, 0);

    const locationFee = pickupLocation.includes('Delivery') ? 10 : 0;

    return (baseRate * quantity) + (addonsCost * quantity) + locationFee;
  };

  // Automated Confirmation Generator
  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingBike) return;

    const randomRef = 'EB-' + Math.floor(1000 + Math.random() * 9000) + '-' + Math.floor(100 + Math.random() * 900);
    
    const newReservation: EBikeReservation = {
      id: Date.now().toString(),
      bookingRef: randomRef,
      bikeId: bookingBike.id,
      bikeName: bookingBike.name,
      bikeImage: bookingBike.image,
      size: selectedSize,
      riderHeight,
      quantity,
      startDate,
      duration,
      numDays: duration === 'multi-day' ? numDays : 1,
      totalAmount: calculateTotal(),
      pickupLocation,
      addons: selectedAddons,
      customer: {
        fullName,
        email,
        phone,
        notes
      },
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    setReservations(prev => [newReservation, ...prev]);
    setLastConfirmedReservation(newReservation);
    setStep(4);
  };


  const handleUpdateStatus = (id: string, status: 'confirmed' | 'active' | 'completed' | 'cancelled') => {
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleCancelReservation = (id: string) => {
    if (window.confirm('Are you sure you want to cancel this e-bike reservation?')) {
      handleUpdateStatus(id, 'cancelled');
    }
  };

  const handleResetSampleData = () => {
    setReservations(SAMPLE_INITIAL_RESERVATIONS);
  };

  const handleExportCSV = () => {
    const headers = ['Booking Ref', 'Customer Name', 'Email', 'Phone', 'Bike Name', 'Size', 'Height', 'Quantity', 'Date', 'Duration', 'Location', 'Addons', 'Total (€)', 'Status', 'Created At'];
    const rows = reservations.map(r => [
      r.bookingRef,
      `"${r.customer.fullName.replace(/"/g, '""')}"`,
      r.customer.email,
      r.customer.phone,
      `"${r.bikeName.replace(/"/g, '""')}"`,
      r.size,
      r.riderHeight,
      r.quantity,
      r.startDate,
      r.duration,
      `"${r.pickupLocation.replace(/"/g, '""')}"`,
      `"${r.addons.join(', ')}"`,
      r.totalAmount.toFixed(2),
      r.status,
      r.createdAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ebike_reservations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredBikes = ebikeModels.filter(bike => {
    if (selectedCategory === 'all') return true;
    return bike.category === selectedCategory;
  });

  // Owner admin filtered list
  const adminFilteredReservations = reservations.filter(res => {
    const matchesSearch = 
      res.customer.fullName.toLowerCase().includes(adminSearch.toLowerCase()) ||
      res.customer.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
      res.customer.phone.toLowerCase().includes(adminSearch.toLowerCase()) ||
      res.bookingRef.toLowerCase().includes(adminSearch.toLowerCase()) ||
      res.bikeName.toLowerCase().includes(adminSearch.toLowerCase());
    
    const matchesStatus = adminStatusFilter === 'all' || res.status === adminStatusFilter;
    return matchesSearch && matchesStatus;
  });

  // Revenue & Stats summary for Owner
  const totalRevenue = reservations.reduce((sum, r) => r.status !== 'cancelled' ? sum + r.totalAmount : sum, 0);
  const activeCount = reservations.filter(r => r.status === 'active').length;
  const confirmedCount = reservations.filter(r => r.status === 'confirmed').length;

  return (
    <div className="w-full text-slate-100 font-sans">
      {/* HEADER CONTROLS */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 bg-slate-900/60 p-4 sm:p-6 rounded-2xl border border-white/10 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 border border-emerald-500/30">
              <Zap size={13} /> Automatic E-Bike Rental & Owner Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
            Reserve & Manage Alpine E-Bikes
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Real-time automated inventory, rider height tuning, and complete owner reservation management.
          </p>
        </div>

        {/* TOP TAB SWITCHER */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === 'catalog' 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <Zap size={16} /> E-Bike Fleet
          </button>
          
          <button
            onClick={() => setActiveTab('my-reservations')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 relative ${
              activeTab === 'my-reservations' 
                ? 'bg-emerald-500 text-black shadow-lg shadow-emerald-500/20' 
                : 'bg-white/5 hover:bg-white/10 text-slate-300'
            }`}
          >
            <CalendarDays size={16} /> My Reservations
            {reservations.filter(r => r.status === 'confirmed').length > 0 && (
              <span className="w-5 h-5 bg-emerald-400 text-black font-extrabold text-[10px] rounded-full flex items-center justify-center">
                {reservations.filter(r => r.status === 'confirmed').length}
              </span>
            )}
          </button>

          {/* OWNER DASHBOARD TAB */}
          <button
            onClick={() => setActiveTab('owner-dashboard')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
              activeTab === 'owner-dashboard' 
                ? 'bg-amber-500 text-black border-amber-400 shadow-lg shadow-amber-500/20' 
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/30'
            }`}
          >
            {isOwnerUnlocked ? <Unlock size={16} className="text-emerald-950" /> : <Lock size={16} />}
            <span>Owner / Host Dashboard</span>
            <span className={`w-5 h-5 font-extrabold text-[10px] rounded-full flex items-center justify-center border ${
              isOwnerUnlocked ? 'bg-black/40 text-amber-300 border-amber-400/30' : 'bg-red-500/30 text-red-300 border-red-500/40'
            }`}>
              {isOwnerUnlocked ? reservations.length : '!'}
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: FLEET CATALOG & AVAILABILITY */}
      {activeTab === 'catalog' && (
        <div className="space-y-8">
          {/* CATEGORY FILTERS */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {[
              { id: 'all', label: 'All E-Bikes' },
              { id: 'e-mtb', label: 'Full-Suspension E-MTB' },
              { id: 'e-trekking', label: 'Trekking & SUV E-Bikes' },
              { id: 'e-gravel', label: 'Lightweight Gravel E-Bikes' },
              { id: 'e-kids', label: 'Junior / Kids E-Bikes' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-900/40 border-white/10 text-slate-400 hover:text-white hover:border-white/20'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* FLEET CARDS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredBikes.map(bike => (
              <motion.div
                key={bike.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="bg-slate-900/80 rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between shadow-xl backdrop-blur-sm group"
              >
                <div>
                  {/* IMAGE & BADGES */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-950">
                    <img 
                      src={bike.image} 
                      alt={bike.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    <span className="absolute top-4 left-4 bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                      {bike.tag}
                    </span>

                    <div className="absolute bottom-4 right-4 bg-emerald-500 text-black font-extrabold text-sm px-3.5 py-1.5 rounded-xl shadow-lg">
                      €{bike.fullDayPrice} <span className="text-[10px] font-medium opacity-90">/ day</span>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-xl font-bold text-white font-heading leading-tight group-hover:text-emerald-400 transition-colors">
                      {bike.name}
                    </h3>
                    
                    <p className="text-slate-300 text-xs font-light leading-relaxed">
                      {bike.description}
                    </p>

                    {/* SPECS GRID */}
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                      <div className="flex items-center gap-1.5 truncate">
                        <Zap size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{bike.motor}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <BatteryCharging size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{bike.battery}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Navigation size={13} className="text-emerald-400 flex-shrink-0" />
                        <span className="truncate">{bike.range}</span>
                      </div>
                      <div className="flex items-center gap-1.5 truncate">
                        <Clock size={13} className="text-emerald-400 flex-shrink-0" />
                        <span>Half day: €{bike.halfDayPrice}</span>
                      </div>
                    </div>

                    {/* FRAME SIZES AVAILABILITY */}
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">
                        Available Fleet Capacity (Total 2 Bikes)
                      </span>
                      <div className="flex items-center gap-2">
                        {(() => {
                          const stock = getAvailableStock(bike.id, startDate);
                          return (
                            <div 
                              className={`px-3 py-1 rounded-lg border text-xs font-bold flex items-center gap-1.5 ${
                                stock > 0 
                                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                                  : 'bg-red-500/10 border-red-500/20 text-slate-500 opacity-60'
                              }`}
                            >
                              <span>{stock} of 2 Available for {startDate}</span>
                              <span className={`w-1.5 h-1.5 rounded-full ${stock > 0 ? 'bg-emerald-400' : 'bg-red-500'}`} />
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ACTION */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleStartBooking(bike)}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                  >
                    <Calendar size={16} /> Reserve & Book Bike Now <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: MY RESERVATIONS (CUSTOMER PASS VIEW) */}
      {activeTab === 'my-reservations' && (
        <div className="space-y-6">
          {reservations.length === 0 ? (
            <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-white/5 p-8">
              <Bike size={48} className="mx-auto text-slate-600 mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No active reservations yet</h3>
              <p className="text-slate-400 text-sm max-w-md mx-auto mb-6">
                You haven't reserved any e-bikes. Choose a model from our fleet to instantly confirm your alpine ride!
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="px-6 py-3 bg-emerald-500 text-black font-bold rounded-xl text-sm uppercase tracking-wider hover:bg-emerald-400 transition-all inline-flex items-center gap-2"
              >
                Browse Fleet & Book
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {reservations.map(res => (
                <div 
                  key={res.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    res.status === 'confirmed' 
                      ? 'bg-slate-900/90 border-emerald-500/40 shadow-xl' 
                      : res.status === 'active'
                      ? 'bg-slate-900/90 border-amber-500/40 shadow-xl'
                      : 'bg-slate-900/30 border-white/5 opacity-60'
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                      <img 
                        src={res.bikeImage} 
                        alt={res.bikeName} 
                        className="w-20 h-20 object-cover rounded-xl border border-white/10 flex-shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            res.status === 'active' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                            res.status === 'completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                            'bg-red-500/20 text-red-400 border border-red-500/30'
                          }`}>
                            {res.status === 'confirmed' ? 'Confirmed & Reserved' : 
                             res.status === 'active' ? 'Active / Out on Trail' :
                             res.status === 'completed' ? 'Completed & Returned' : 'Cancelled'}
                          </span>
                          <span className="text-xs font-mono text-slate-400">{res.bookingRef}</span>
                        </div>
                        <h4 className="text-lg font-bold text-white font-heading">{res.bikeName}</h4>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 mt-1">
                          <span>📅 Date: <strong>{res.startDate}</strong></span>
                          <span>📏 Size: <strong>{res.size}</strong></span>
                          <span>🚲 Qty: <strong>{res.quantity}</strong></span>
                          <span>⏱️ {res.duration.replace('-', ' ')}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-2 w-full md:w-auto border-t md:border-t-0 border-white/10 pt-4 md:pt-0">
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block">Total Rental Fee</span>
                        <span className="text-2xl font-bold text-emerald-400 font-heading">€{res.totalAmount.toFixed(2)}</span>
                      </div>

                      {res.status === 'confirmed' && (
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => {
                              setLastConfirmedReservation(res);
                              setStep(4);
                              setBookingBike(ebikeModels.find(b => b.id === res.bikeId) || ebikeModels[0]);
                            }}
                            className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                          >
                            <QrCode size={13} /> View Pass
                          </button>
                          <button
                            onClick={() => handleCancelReservation(res.id)}
                            className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
                          >
                            <Trash2 size={13} /> Cancel
                          </button>
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

      {/* TAB 3: OWNER & HOST DASHBOARD (WHERE THE BIKE OWNER GETS ALL BOOKING INFO) */}
      {activeTab === 'owner-dashboard' && (
        <>
          {!isOwnerUnlocked ? (
            /* LOCKED AUTHENTICATION GATE */
            <div className="max-w-md mx-auto py-12 px-4">
              <div className="bg-slate-900/90 p-8 rounded-3xl border border-amber-500/30 text-center space-y-6 shadow-2xl relative overflow-hidden backdrop-blur-md">
                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
                  <Lock size={32} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-widest bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
                    Host & Owner Security Lock
                  </span>
                  <h3 className="text-2xl font-extrabold text-white font-heading">
                    Owner Access Required
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    To protect customer privacy (phone numbers, full names, addresses), the booking ledger is password-protected.
                  </p>
                </div>

                {/* PIN INPUT FORM */}
                <form onSubmit={handleUnlockDashboard} className="space-y-4 text-left">
                  <div>
                    <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                      <span>Owner Passcode / PIN</span>
                      <button
                        type="button"
                        onClick={() => setShowPinHint(!showPinHint)}
                        className="text-[11px] text-amber-400 hover:underline font-normal"
                      >
                        {showPinHint ? 'Hide Default PIN' : 'View Default PIN'}
                      </button>
                    </label>

                    <div className="relative">
                      <KeyRound size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="password"
                        placeholder="Enter Owner PIN (e.g. 1234)"
                        value={ownerPinInput}
                        onChange={(e) => setOwnerPinInput(e.target.value)}
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
                      onClick={() => setActiveTab('catalog')}
                      className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs transition-all"
                    >
                      Return to Fleet
                    </button>
                    
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-amber-500 hover:bg-amber-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                    >
                      <Unlock size={16} /> Unlock Portal
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            /* UNLOCKED OWNER PORTAL CONTENT */
            <div className="space-y-8">
              {/* OWNER INSTRUCTION BANNER */}
              <div className="bg-gradient-to-r from-amber-500/15 via-slate-900 to-slate-900 border border-amber-500/30 p-6 rounded-2xl relative overflow-hidden">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-500 text-black font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Shield size={12} /> Bike Hub Owner Portal
                      </span>
                      <span className="text-xs text-emerald-400 font-mono flex items-center gap-1">
                        <Unlock size={12} /> Authenticated Host Session
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white font-heading">
                      All Booking Reservations & Customer Contact List
                    </h3>
                    <p className="text-slate-300 text-xs leading-relaxed max-w-3xl">
                      As the e-bike rental manager, this dashboard centralizes every reservation made through the automated engine. View customer names, phone numbers, pickup dates, frame sizing requirements, and manage pickup/return statuses.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-2 flex-shrink-0">
                    <button
                      onClick={handleExportCSV}
                      className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
                    >
                      <FileSpreadsheet size={15} /> Export CSV
                    </button>

                    <button
                      onClick={handleLockDashboard}
                      className="px-3.5 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-300 border border-red-500/30 font-bold text-xs rounded-xl transition-all flex items-center gap-1.5"
                      title="Lock dashboard to protect guest privacy"
                    >
                      <Lock size={14} /> Lock Dashboard
                    </button>
                  </div>
                </div>
              </div>

          {/* KEY METRICS OVERVIEW */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Total Bookings</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white font-heading">{reservations.length}</span>
                <CalendarDays size={20} className="text-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 block">All time reservations</span>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Confirmed Upcoming</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-emerald-400 font-heading">{confirmedCount}</span>
                <CheckCircle size={20} className="text-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 block">Ready for bike prep & tuning</span>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Out On Trail (Active)</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-amber-400 font-heading">{activeCount}</span>
                <Bike size={20} className="text-amber-400" />
              </div>
              <span className="text-[11px] text-slate-400 block">Currently rented out</span>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-2">
              <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider block">Total Earnings</span>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-extrabold text-white font-heading">€{totalRevenue.toFixed(0)}</span>
                <TrendingUp size={20} className="text-emerald-400" />
              </div>
              <span className="text-[11px] text-slate-400 block">Gross rental revenue</span>
            </div>
          </div>

          {/* FILTERS & SEARCH BAR */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-2xl border border-white/5">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by customer name, phone (+386...), email, or booking ref..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <select
                value={adminStatusFilter}
                onChange={(e) => setAdminStatusFilter(e.target.value)}
                className="bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="all">All Statuses ({reservations.length})</option>
                <option value="confirmed">Confirmed ({confirmedCount})</option>
                <option value="active">Active / Out on Trail ({activeCount})</option>
                <option value="completed">Completed / Returned</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* RESERVATIONS TABLE / DETAILED LEDGER */}
          <div className="space-y-4">
            {adminFilteredReservations.length === 0 ? (
              <div className="text-center py-12 bg-slate-900/30 rounded-2xl border border-white/5">
                <AlertCircle size={36} className="mx-auto text-slate-500 mb-2" />
                <p className="text-slate-400 text-sm">No reservations match your search or filter.</p>
              </div>
            ) : (
              adminFilteredReservations.map(res => (
                <div
                  key={res.id}
                  className={`p-6 rounded-2xl border transition-all space-y-4 ${
                    res.status === 'confirmed'
                      ? 'bg-slate-900/90 border-emerald-500/40'
                      : res.status === 'active'
                      ? 'bg-slate-900/90 border-amber-500/50'
                      : res.status === 'completed'
                      ? 'bg-slate-900/50 border-blue-500/20 opacity-80'
                      : 'bg-slate-900/20 border-red-500/20 opacity-60'
                  }`}
                >
                  {/* TOP HEADER OF CARD */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-base font-extrabold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                        {res.bookingRef}
                      </span>

                      <span className={`text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full flex items-center gap-1.5 ${
                        res.status === 'confirmed' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        res.status === 'active' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        res.status === 'completed' ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30' :
                        'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}>
                        {res.status === 'confirmed' && <CheckCircle size={13} />}
                        {res.status === 'active' && <Bike size={13} />}
                        {res.status === 'completed' && <UserCheck size={13} />}
                        {res.status === 'cancelled' && <XCircle size={13} />}
                        {res.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400">
                      Booked on: {new Date(res.createdAt).toLocaleString()}
                    </div>
                  </div>

                  {/* MAIN CONTENT GRID */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* CUSTOMER CONTACT INFORMATION */}
                    <div className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block">
                        👤 Customer & Contact Details
                      </span>
                      <h4 className="text-base font-bold text-white">{res.customer.fullName}</h4>
                      
                      <div className="space-y-1 text-xs text-slate-300">
                        <a 
                          href={`tel:${res.customer.phone}`} 
                          className="flex items-center gap-2 text-emerald-400 hover:underline font-medium"
                        >
                          <PhoneCall size={13} /> {res.customer.phone}
                        </a>
                        <a 
                          href={`mailto:${res.customer.email}`} 
                          className="flex items-center gap-2 text-slate-300 hover:text-white truncate"
                        >
                          <Mail size={13} className="flex-shrink-0" /> {res.customer.email}
                        </a>
                      </div>

                      {res.customer.notes && (
                        <div className="mt-2 text-[11px] bg-slate-950 p-2.5 rounded-lg border border-white/10 text-slate-300 italic">
                          "{res.customer.notes}"
                        </div>
                      )}
                    </div>

                    {/* RENTAL & BIKE SPECIFICATIONS */}
                    <div className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                        🚴 E-Bike & Setup Info
                      </span>
                      <h4 className="text-sm font-bold text-white leading-tight">{res.bikeName}</h4>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 mt-2">
                        <div>Frame Size: <strong className="text-emerald-400">Size {res.size}</strong></div>
                        <div>Rider Height: <strong>{res.riderHeight}</strong></div>
                        <div>Quantity: <strong>{res.quantity}x Bike(s)</strong></div>
                        <div>Pickup Date: <strong className="text-white">{res.startDate}</strong></div>
                      </div>

                      <div className="text-xs text-slate-400 pt-1 border-t border-white/5">
                        Duration: <strong className="text-slate-200">{res.duration.replace('-', ' ')}</strong>
                      </div>
                    </div>

                    {/* PICKUP LOCATION, EXTRAS & PRICE */}
                    <div className="space-y-2 bg-white/[0.02] p-4 rounded-xl border border-white/5 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                          📍 Pickup & Extras
                        </span>
                        <div className="text-xs text-slate-200 mt-1 font-medium">
                          {res.pickupLocation}
                        </div>

                        {res.addons.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {res.addons.map((add, i) => (
                              <span key={i} className="text-[10px] bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded-md">
                                {add}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Due</span>
                          <span className="text-xl font-extrabold text-emerald-400 font-heading">€{res.totalAmount.toFixed(2)}</span>
                        </div>

                        {/* STATUS UPDATER BUTTONS FOR OWNER */}
                        <div className="flex items-center gap-1.5">
                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => handleUpdateStatus(res.id, 'active')}
                              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-lg text-xs transition-all flex items-center gap-1"
                              title="Mark bike as picked up / active"
                            >
                              <Bike size={13} /> Hand Over Bike
                            </button>
                          )}

                          {res.status === 'active' && (
                            <button
                              onClick={() => handleUpdateStatus(res.id, 'completed')}
                              className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-lg text-xs transition-all flex items-center gap-1"
                              title="Mark bike as returned safely"
                            >
                              <CheckCircle size={13} /> Mark Returned
                            </button>
                          )}

                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => handleCancelReservation(res.id)}
                              className="px-2.5 py-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs font-medium transition-all"
                              title="Cancel reservation"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  )}

      {/* BOOKING WIZARD MODAL */}
      <AnimatePresence>
        {bookingBike && (
          <motion.div
            key="ebike-booking-modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <div
              onClick={() => {
                setBookingBike(null);
                if (onCloseModal) onCloseModal();
              }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              key="modal-card"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-[#0a1617] border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              {/* MODAL HEADER */}
              <div className="p-6 bg-slate-900/80 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                    <Zap size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Step {step} of 4 • Reservation Engine
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading">{bookingBike.name}</h3>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setBookingBike(null);
                    if (onCloseModal) onCloseModal();
                  }}
                  className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL BODY */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
                {/* STEP 1: DATE & DURATION */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
                      <Sparkles size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">Host Fleet Inventory: 2 x Headeer BK20 All-Terrain E-Bikes</p>
                        <p className="text-slate-300">
                          Select your rental date below to verify real-time availability. If 1 bike is booked, only 1 bike remains for that slot!
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Date Picker */}
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                          1. Select Rental Date
                        </label>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        />
                      </div>

                      {/* Pickup Hub Selection */}
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                          2. Pickup Location
                        </label>
                        <select
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500 transition-colors"
                        >
                          <option value="Čezsoča 21 (Apartma Pr Fejtne Hub)">Hub Čezsoča 21 (Free Pickup)</option>
                          <option value="Bovec Town Center Depot">Bovec Town Center Hub (Free Pickup)</option>
                          <option value="Hotel / Apartment Delivery (+€10)">Hotel / Apartment Delivery (+€10)</option>
                        </select>
                      </div>
                    </div>

                    {/* Duration Options matching Host's Official Price Structure */}
                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-3">
                        3. Select Duration & Pricing Rate
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { 
                            id: 'short-cruise', 
                            label: 'Quick Soča Cruise', 
                            time: '1 – 2 hours', 
                            price: bookingBike.shortCruisePrice || 15.00,
                            desc: 'Quick spin to Čezsoča bridge & riverbanks'
                          },
                          { 
                            id: 'half-day', 
                            label: 'Half-Day Trail Loop', 
                            time: 'Up to 4 hours', 
                            price: bookingBike.halfDayPrice || 25.00,
                            desc: 'Ideal for Slap Boka & Čezsoča loop'
                          },
                          { 
                            id: 'full-day', 
                            label: 'All-Day Explorer', 
                            time: '8 – 10 hours', 
                            price: bookingBike.fullDayPrice || 35.00,
                            desc: 'Best value for passes & entire valley'
                          },
                        ].map(opt => (
                          <div
                            key={opt.id}
                            onClick={() => {
                              setDuration(opt.id as any);
                              setNumDays(1);
                            }}
                            className={`p-4 rounded-xl border cursor-pointer transition-all ${
                              duration === opt.id
                                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                                : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm">{opt.label}</span>
                              <span className="text-emerald-400 font-extrabold text-sm">€{opt.price}</span>
                            </div>
                            <span className="text-xs text-slate-300 block font-semibold mb-0.5">{opt.time}</span>
                            <span className="text-[11px] text-slate-400 block">{opt.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: LIVE INVENTORY CHECK & RIDER FIT */}
                {step === 2 && (
                  <div className="space-y-6">
                    {/* Live Fleet Capacity Status Banner */}
                    {(() => {
                      const avail = getAvailableStock(bookingBike.id, startDate);
                      if (avail === 2) {
                        return (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="font-bold text-sm text-white">2 of 2 Headeer BK20 Bikes Available</span>
                            </div>
                            <span className="text-emerald-400 font-mono text-xs font-bold">Both bikes ready for {startDate}</span>
                          </div>
                        );
                      } else if (avail === 1) {
                        return (
                          <div className="bg-amber-500/15 border border-amber-500/40 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
                            <Lock size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-amber-300 text-sm mb-0.5">⚠️ 1 Bike Already Reserved for {startDate}</p>
                              <p>
                                Another guest has booked 1 of the 2 bikes for this date. <strong>Only 1 bike remains available</strong> for you to book for this slot!
                              </p>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-2xl flex items-start gap-3 text-xs text-red-200">
                            <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-red-300 text-sm mb-0.5">❌ Fully Booked for {startDate}</p>
                              <p>
                                All 2 Headeer BK20 e-bikes in our host fleet are reserved for this date. Please click <strong>Back</strong> and choose another date!
                              </p>
                            </div>
                          </div>
                        );
                      }
                    })()}

                    {/* Frame & Fit Note */}
                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">Universal All-Terrain Geometry</span>
                        <span className="text-xs text-slate-400 block">Saddle height & handlebars adjust for riders 155 cm – 195 cm</span>
                      </div>
                      <span className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-bold border border-emerald-500/30">
                        One Size Fits All
                      </span>
                    </div>

                    {/* Rider Height & Quantity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                          Rider Height (for custom saddle setup)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., 178 cm"
                          value={riderHeight}
                          onChange={(e) => setRiderHeight(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                          Number of Bikes
                        </label>
                        {(() => {
                          const avail = getAvailableStock(bookingBike.id, startDate);
                          return (
                            <div className="flex items-center bg-slate-900 border border-white/20 rounded-xl px-3 py-1.5 justify-between">
                              <button
                                disabled={quantity <= 1 || avail === 0}
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Minus size={16} />
                              </button>
                              <div className="text-center">
                                <span className="font-bold text-white text-base block">{quantity}</span>
                                <span className="text-[10px] text-slate-400">Max {avail} available</span>
                              </div>
                              <button
                                disabled={quantity >= avail || avail === 0}
                                onClick={() => setQuantity(Math.min(avail, quantity + 1))}
                                className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {/* Optional Extras */}
                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-3">
                        Included Equipment & Add-ons
                      </label>
                      <div className="space-y-2">
                        {availableAddons.map(addon => (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              selectedAddons.includes(addon.id)
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-xl">{addon.icon}</span>
                              <span className="text-sm font-medium">{addon.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-emerald-400">
                                {addon.price === 0 ? 'FREE INCLUDED' : `+€${addon.price}`}
                              </span>
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                selectedAddons.includes(addon.id) ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/30'
                              }`}>
                                {selectedAddons.includes(addon.id) && <Check size={14} className="stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CUSTOMER DETAILS */}
                {step === 3 && (
                  <form onSubmit={handleConfirmReservation} className="space-y-4">
                    <div className="bg-slate-900/80 p-4 rounded-2xl border border-white/10 mb-4">
                      <h4 className="text-xs uppercase tracking-wider font-bold text-emerald-400 mb-2">
                        Reservation Summary
                      </h4>
                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
                        <div>Bike: <strong>{bookingBike.name}</strong></div>
                        <div>Date: <strong>{startDate}</strong></div>
                        <div>Size: <strong>Size {selectedSize}</strong> ({quantity}x)</div>
                        <div>Duration: <strong>{duration.replace('-', ' ')}</strong></div>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Jane Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="jane@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1">
                          Mobile Phone *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+386 40 123 456"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1">
                        Special Requests / Hotel Delivery Address
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Need extra helmet size, specific pedal type, or apartment name..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                      />
                    </div>
                  </form>
                )}

                {/* STEP 4: INSTANT CONFIRMATION PASS */}
                {step === 4 && lastConfirmedReservation && (
                  <div className="space-y-6 text-center py-4">
                    <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                      <CheckCircle2 size={36} />
                    </div>

                    <div>
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                        Automated Reservation Confirmed
                      </span>
                      <h3 className="text-2xl font-extrabold text-white font-heading">
                        You're All Set for the Trails!
                      </h3>
                      <p className="text-slate-300 text-xs mt-1">
                        Your e-bike is locked into our inventory and will be tuned to your specifications upon arrival.
                      </p>
                    </div>

                    {/* VIRTUAL RESERVATION PASS */}
                    <div className="bg-slate-900 p-6 rounded-2xl border border-emerald-500/30 text-left space-y-4 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                      
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 block">Booking Reference</span>
                          <span className="font-mono text-lg font-bold text-emerald-400">{lastConfirmedReservation.bookingRef}</span>
                        </div>
                        <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-slate-300">
                          <QrCode size={24} />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Rider</span>
                          <strong className="text-white">{lastConfirmedReservation.customer.fullName}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Pickup Date</span>
                          <strong className="text-white">{lastConfirmedReservation.startDate}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">E-Bike Model</span>
                          <strong className="text-white">{lastConfirmedReservation.bikeName}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Frame Size</span>
                          <strong className="text-emerald-400">Size {lastConfirmedReservation.size}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Pickup Location</span>
                          <strong className="text-white">{lastConfirmedReservation.pickupLocation}</strong>
                        </div>
                        <div>
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Total Due at Pickup</span>
                          <strong className="text-emerald-400 text-sm">€{lastConfirmedReservation.totalAmount.toFixed(2)}</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* MODAL FOOTER */}
              <div className="p-6 bg-slate-900/80 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Total Price</span>
                  <span className="text-2xl font-bold text-emerald-400 font-heading">
                    €{calculateTotal().toFixed(2)}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {step > 1 && step < 4 && (
                    <button
                      onClick={() => setStep((step - 1) as any)}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs transition-all flex items-center gap-1"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}

                  {step === 1 && (
                    <button
                      disabled={bookingBike ? getAvailableStock(bookingBike.id, startDate) === 0 : false}
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      {bookingBike && getAvailableStock(bookingBike.id, startDate) === 0 ? 'Date Sold Out' : 'Configure Fit & Extras'} <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      disabled={bookingBike ? getAvailableStock(bookingBike.id, startDate) === 0 : false}
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      Enter Details <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      onClick={handleConfirmReservation}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 size={16} /> Confirm & Reserve Bike
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      onClick={() => {
                        setBookingBike(null);
                        setActiveTab('my-reservations');
                        if (onCloseModal) onCloseModal();
                      }}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      Done & View Reservations
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
