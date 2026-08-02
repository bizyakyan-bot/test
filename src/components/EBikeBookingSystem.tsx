import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { saveReservationToFirebase, updateReservationStatusInFirebase, subscribeToReservations } from '../lib/firebaseService';
import { sendOrderEmailNotification } from '../lib/sendEmail';
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
  KeyRound,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';
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
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    const unsubscribe = subscribeToReservations((items) => {
      setReservations(items);
    });
    return () => unsubscribe();
  }, []);

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

  // Bike Detail Modal State (View Bike First)
  const [selectedBikeForDetails, setSelectedBikeForDetails] = useState<EBikeModel | null>(null);

  // Booking Modal Wizard State
  const [bookingBike, setBookingBike] = useState<EBikeModel | null>(null);

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1); // 1: Price Plan, 2: Working Calendar Date, 3: Pickup Hour, 4: Pickup Location, 5: Rider & Contact Details, 6: Pass
  
  // Booking Form State
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState<string>(defaultDateStr);
  const [pickupTime, setPickupTime] = useState<string>('09:00 AM');
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

  // Available pickup time slots
  const pickupTimeOptions = [
    { value: '08:00 AM', label: '08:00 AM', desc: 'Early Morning' },
    { value: '09:00 AM', label: '09:00 AM', desc: 'Recommended Morning' },
    { value: '10:00 AM', label: '10:00 AM', desc: 'Mid-Morning' },
    { value: '11:00 AM', label: '11:00 AM', desc: 'Late Morning' },
    { value: '12:00 PM', label: '12:00 PM', desc: 'Mid-Day' },
    { value: '01:00 PM', label: '01:00 PM', desc: 'Early Afternoon' },
    { value: '02:00 PM', label: '02:00 PM', desc: 'Afternoon Loop' },
    { value: '03:00 PM', label: '03:00 PM', desc: 'Late Afternoon' },
    { value: '05:30 PM', label: '05:30 PM', desc: 'Sunset Soča Cruise' },
  ];

  // Helper: check if a pickup hour has already passed for the selected date
  const isHourPast = (timeStr: string, dateStr: string): boolean => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];

    if (dateStr < todayStr) return true;
    if (dateStr > todayStr) return false;

    let hourNum = 0;
    let minNum = 0;
    const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
    if (match) {
      hourNum = parseInt(match[1], 10);
      minNum = parseInt(match[2], 10);
      const ampm = match[3].toUpperCase();
      if (ampm === 'PM' && hourNum < 12) hourNum += 12;
      if (ampm === 'AM' && hourNum === 12) hourNum = 0;
    }

    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    if (hourNum < currentHour) return true;
    if (hourNum === currentHour && minNum <= currentMin) return true;

    return false;
  };

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

    // Auto-adjust pickup time if current time is past for selected date
    if (isHourPast(pickupTime, startDate)) {
      const validOpt = pickupTimeOptions.find(opt => !isHourPast(opt.value, startDate));
      if (validOpt) {
        setPickupTime(validOpt.value);
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
      pickupTime,
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

    saveReservationToFirebase(newReservation);
    sendOrderEmailNotification('reservation', newReservation);
    setReservations(prev => [newReservation, ...prev]);
    setLastConfirmedReservation(newReservation);
    setStep(6);
  };


  const handleUpdateStatus = (id: string, status: 'confirmed' | 'active' | 'completed' | 'cancelled') => {
    updateReservationStatusInFirebase(id, status);
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleCancelReservation = (id: string) => {
    handleUpdateStatus(id, 'cancelled');
  };

  const handleDeleteReservationDirect = (id: string) => {
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
                  <div 
                    onClick={() => setSelectedBikeForDetails(bike)}
                    className="relative aspect-[16/10] overflow-hidden bg-slate-950 cursor-pointer"
                  >
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
                      From €15 <span className="text-[10px] font-medium opacity-90">/ 2 hrs</span>
                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-6 space-y-4">
                    <h3 
                      onClick={() => setSelectedBikeForDetails(bike)}
                      className="text-xl font-bold text-white font-heading leading-tight group-hover:text-emerald-400 transition-colors cursor-pointer flex items-center justify-between"
                    >
                      <span>{bike.name}</span>
                      <Eye size={18} className="text-slate-400 group-hover:text-emerald-400" />
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

                {/* ACTIONS */}
                <div className="p-6 pt-0 space-y-2.5">
                  <button
                    onClick={() => setSelectedBikeForDetails(bike)}
                    className="w-full py-2.5 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white font-bold rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs"
                  >
                    <Eye size={15} className="text-emerald-400" /> View Bike Details & Available Hours
                  </button>

                  <button
                    onClick={() => handleStartBooking(bike)}
                    className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center justify-center gap-2 uppercase tracking-wider text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                  >
                    <Calendar size={16} /> Book This E-Bike Now <ChevronRight size={16} />
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
              <div className="p-6 bg-slate-900/80 border-b border-white/10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-400">
                      <Zap size={20} />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                        {step === 6 ? 'Pass Generated' : `Step ${step} of 5 • Booking Wizard`}
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

                {/* VISUAL WIZARD PROGRESS BAR (Steps 1 to 5) */}
                {step <= 5 && (
                  <div className="grid grid-cols-5 gap-1.5 pt-1 border-t border-white/5">
                    {[
                      { num: 1, label: '1. Price' },
                      { num: 2, label: '2. Date' },
                      { num: 3, label: '3. Hour' },
                      { num: 4, label: '4. Location' },
                      { num: 5, label: '5. Confirm' },
                    ].map(s => (
                      <div 
                        key={s.num} 
                        className={`py-1 px-2 rounded-lg text-center transition-all ${
                          step === s.num
                            ? 'bg-emerald-500 text-black font-extrabold shadow-md shadow-emerald-500/20'
                            : step > s.num
                            ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                            : 'bg-white/5 text-slate-500 font-normal'
                        }`}
                      >
                        <span className="text-[10px] block truncate">{s.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* MODAL BODY */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">

                {/* STEP 1: SELECT PRICE & DURATION */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
                      <Sparkles size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">Step 1: Choose Your Price & Duration Plan</p>
                        <p className="text-slate-300">
                          Select how long you want to ride {bookingBike.name}. Next, you will select your rental date on the working calendar.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-3">
                        Select Price Plan (Click to Select)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {[
                          { 
                            id: 'short-cruise', 
                            label: 'Quick Soča Cruise', 
                            time: '1 – 2 Hours', 
                            price: bookingBike.shortCruisePrice || 15.00,
                            desc: 'Ideal for quick spin to Čezsoča riverbanks & town'
                          },
                          { 
                            id: 'half-day', 
                            label: 'Half-Day Trail Loop', 
                            time: 'Up to 4 Hours', 
                            price: bookingBike.halfDayPrice || 25.00,
                            desc: 'Slap Boka waterfall & Čezsoča panorama trail'
                          },
                          { 
                            id: 'full-day', 
                            label: 'All-Day Explorer', 
                            time: 'Full Day (08:00 – 19:00)', 
                            price: bookingBike.fullDayPrice || 35.00,
                            desc: 'Best value for Vršič pass & full Soča valley loop'
                          },
                          { 
                            id: 'multi-day', 
                            label: 'Multi-Day Adventure', 
                            time: '2+ Days Pass', 
                            price: 30.00,
                            desc: 'Keep the e-bike overnight at your apartment (€30/day)'
                          },
                        ].map(opt => (
                          <div
                            key={opt.id}
                            onClick={() => {
                              setDuration(opt.id as any);
                              setNumDays(1);
                            }}
                            className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                              duration === opt.id
                                ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10 scale-[1.01]'
                                : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-sm text-white">{opt.label}</span>
                              <span className="text-emerald-400 font-extrabold text-base">€{opt.price}</span>
                            </div>
                            <span className="text-xs text-emerald-300 block font-semibold mb-1">{opt.time}</span>
                            <span className="text-[11px] text-slate-400 block leading-normal">{opt.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: WORKING CALENDAR & DATE AVAILABILITY */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
                      <Calendar size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">Step 2: Working Calendar & Free Dates</p>
                        <p className="text-slate-300">
                          Select your desired rental date. Green indicates available inventory in our host fleet.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                        Working Calendar Availability (Next 14 Days)
                      </label>

                      <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
                        {Array.from({ length: 14 }).map((_, idx) => {
                          const dateObj = new Date();
                          dateObj.setDate(dateObj.getDate() + idx);
                          const dateStr = dateObj.toISOString().split('T')[0];
                          const stock = getAvailableStock(bookingBike.id, dateStr);
                          const isSelected = startDate === dateStr;

                          return (
                            <button
                              key={dateStr}
                              type="button"
                              onClick={() => setStartDate(dateStr)}
                              className={`flex flex-col items-center justify-center min-w-[78px] p-3 rounded-2xl border transition-all flex-shrink-0 ${
                                isSelected
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-lg shadow-emerald-500/20 scale-105'
                                  : 'bg-slate-900 border-white/10 text-slate-300 hover:border-white/30'
                              }`}
                            >
                              <span className="text-[10px] uppercase font-bold opacity-80">
                                {idx === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                              </span>
                              <span className="text-sm font-extrabold my-0.5 font-mono">
                                {dateObj.getDate()} {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                              </span>
                              <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                                isSelected
                                  ? 'bg-slate-950 text-emerald-300'
                                  : stock === 2
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : stock === 1
                                  ? 'bg-amber-500/20 text-amber-300'
                                  : 'bg-rose-500/20 text-rose-400'
                              }`}>
                                {stock > 0 ? `${stock} left` : 'Sold Out'}
                              </span>
                            </button>
                          );
                        })}
                      </div>

                      <div className="mt-3 p-3 bg-slate-900/60 rounded-xl border border-white/10 flex items-center justify-between text-xs text-slate-300">
                        <span>Or enter specific rental date:</span>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="bg-slate-950 border border-white/20 rounded-xl px-3 py-1.5 text-white text-xs focus:outline-none focus:border-emerald-500 font-mono"
                        />
                      </div>
                    </div>

                    {/* Stock Status Box */}
                    {(() => {
                      const avail = getAvailableStock(bookingBike.id, startDate);
                      if (avail === 2) {
                        return (
                          <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between text-xs text-emerald-300">
                            <div className="flex items-center gap-2.5">
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="font-bold text-sm text-white">2 of 2 Bikes Free</span>
                            </div>
                            <span className="text-emerald-400 font-mono text-xs font-bold">Both bikes ready for {startDate}</span>
                          </div>
                        );
                      } else if (avail === 1) {
                        return (
                          <div className="bg-amber-500/15 border border-amber-500/40 p-4 rounded-2xl flex items-start gap-3 text-xs text-amber-200">
                            <Lock size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-amber-300 text-sm mb-0.5">⚠️ 1 Bike Available for {startDate}</p>
                              <p>1 bike is already reserved. <strong>1 bike remains available</strong> for booking.</p>
                            </div>
                          </div>
                        );
                      } else {
                        return (
                          <div className="bg-red-500/15 border border-red-500/40 p-4 rounded-2xl flex items-start gap-3 text-xs text-red-200">
                            <X size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold text-red-300 text-sm mb-0.5">❌ Fully Booked for {startDate}</p>
                              <p>All bikes reserved for this date. Please choose another date on the calendar.</p>
                            </div>
                          </div>
                        );
                      }
                    })()}
                  </div>
                )}

                {/* STEP 3: PICKUP HOUR SELECTION */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
                      <Clock size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">Step 3: Real-Time Pickup Hour Selection</p>
                        <p className="text-slate-300">
                          Choose what time you want to collect your e-bike on <strong>{startDate}</strong>. Past hours for today are automatically hidden/disabled.
                        </p>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300">
                          Select Free Pickup Hour Window
                        </label>
                        <span className="text-[11px] font-mono">
                          {startDate === new Date().toISOString().split('T')[0] ? (
                            <span className="text-amber-400 font-semibold flex items-center gap-1">
                              <Clock size={12} /> Today (Real-Time Live Filter)
                            </span>
                          ) : (
                            <span className="text-emerald-400 font-semibold">
                              All Hours Available
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                        {pickupTimeOptions.map(opt => {
                          const past = isHourPast(opt.value, startDate);
                          const isSelected = pickupTime === opt.value;

                          return (
                            <button
                              key={opt.value}
                              type="button"
                              disabled={past}
                              onClick={() => setPickupTime(opt.value)}
                              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                                past
                                  ? 'bg-slate-950/60 border-white/5 text-slate-600 cursor-not-allowed opacity-40'
                                  : isSelected
                                  ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20 scale-102'
                                  : 'bg-slate-900 border-white/10 text-slate-200 hover:border-emerald-500/50 hover:bg-slate-800'
                              }`}
                            >
                              <span className="text-sm font-mono font-extrabold">{opt.label}</span>
                              <span className={`text-[9px] font-bold mt-0.5 ${
                                past
                                  ? 'text-rose-500/80'
                                  : isSelected
                                  ? 'text-slate-950'
                                  : 'text-slate-400'
                              }`}>
                                {past ? 'Passed' : opt.desc}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/10 flex items-center justify-between text-xs text-slate-300">
                      <span>Selected Pickup Time:</span>
                      <strong className="text-emerald-400 font-mono text-sm">{pickupTime}</strong>
                    </div>
                  </div>
                )}

                {/* STEP 4: PICKUP LOCATION */}
                {step === 4 && (
                  <div className="space-y-6">
                    <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-start gap-3 text-xs text-emerald-300">
                      <MapPin size={18} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-white mb-0.5">Step 4: Select Pickup Location</p>
                        <p className="text-slate-300">
                          Choose where you prefer to collect your e-bike or request direct hotel delivery.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block">
                        Pickup Hub / Delivery Point
                      </label>

                      {[
                        {
                          id: 'Čezsoča 21 (Apartma Pr Fejtne Hub)',
                          name: 'Hub Čezsoča 21 (Apartma Pr Fejtne Hub)',
                          price: 'Free Pickup',
                          desc: 'Main host garage station right next to the river trail.'
                        },
                        {
                          id: 'Bovec Town Center Depot',
                          name: 'Bovec Town Center Hub',
                          price: 'Free Pickup',
                          desc: 'Central square meeting point in Bovec town.'
                        },
                        {
                          id: 'Hotel / Apartment Delivery (+€10)',
                          name: 'Direct Hotel / Apartment Delivery',
                          price: '+€10.00 Surcharge',
                          desc: 'We bring the tuned e-bike directly to your doorstep in Bovec/Čezsoča.'
                        }
                      ].map(loc => (
                        <div
                          key={loc.id}
                          onClick={() => setPickupLocation(loc.id)}
                          className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            pickupLocation === loc.id
                              ? 'bg-emerald-500/20 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                              : 'bg-slate-900/60 border-white/10 text-slate-300 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm text-white">{loc.name}</span>
                            <span className="text-emerald-400 font-extrabold text-xs bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                              {loc.price}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-normal">{loc.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 5: RIDER DETAILS, ADD-ONS & CONTACT INFORMATION */}
                {step === 5 && (
                  <form onSubmit={handleConfirmReservation} className="space-y-6">
                    {/* SUMMARY OF CHOICES */}
                    <div className="bg-slate-900/90 p-4 rounded-2xl border border-emerald-500/30 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider block">
                        📋 Your Selected Booking Details
                      </span>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-slate-200">
                        <div>Plan: <strong className="text-white block capitalize">{duration.replace('-', ' ')}</strong></div>
                        <div>Date: <strong className="text-white block font-mono">{startDate}</strong></div>
                        <div>Pickup Hour: <strong className="text-emerald-400 block font-mono">{pickupTime}</strong></div>
                        <div>Location: <strong className="text-white block truncate">{pickupLocation}</strong></div>
                      </div>
                    </div>

                    {/* RIDER HEIGHT & QUANTITY */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1.5">
                          Rider Height (for saddle adjustment)
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
                        <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-1.5">
                          Number of E-Bikes
                        </label>
                        {(() => {
                          const avail = getAvailableStock(bookingBike.id, startDate);
                          return (
                            <div className="flex items-center bg-slate-900 border border-white/20 rounded-xl px-3 py-1.5 justify-between">
                              <button
                                type="button"
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
                                type="button"
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

                    {/* ADD-ONS */}
                    <div>
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block mb-2">
                        Included Equipment & Extras
                      </label>
                      <div className="space-y-2">
                        {availableAddons.map(addon => (
                          <div
                            key={addon.id}
                            onClick={() => toggleAddon(addon.id)}
                            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                              selectedAddons.includes(addon.id)
                                ? 'bg-emerald-500/15 border-emerald-500/40 text-white'
                                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:border-white/15'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-lg">{addon.icon}</span>
                              <span className="text-xs font-medium">{addon.name}</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs font-bold text-emerald-400">
                                {addon.price === 0 ? 'FREE INCLUDED' : `+€${addon.price}`}
                              </span>
                              <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                                selectedAddons.includes(addon.id) ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/30'
                              }`}>
                                {selectedAddons.includes(addon.id) && <Check size={12} className="stroke-[3]" />}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CUSTOMER FORM */}
                    <div className="space-y-3 pt-2 border-t border-white/10">
                      <label className="text-xs uppercase tracking-wider font-bold text-slate-300 block">
                        Customer Contact Information
                      </label>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Jane Doe"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="jane@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                          />
                        </div>

                        <div>
                          <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                            Mobile Phone *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+386 40 123 456"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                          Special Requests / Delivery Notes
                        </label>
                        <textarea
                          rows={2}
                          placeholder="Need specific pedal type, child seat size, apartment delivery room number..."
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          className="w-full bg-slate-900 border border-white/20 rounded-xl px-4 py-2 text-white text-sm focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>
                  </form>
                )}

                {/* STEP 6: INSTANT CONFIRMATION PASS */}
                {step === 6 && lastConfirmedReservation && (
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
                          <span className="text-[10px] text-slate-400 block uppercase font-bold">Pickup Date & Hour</span>
                          <strong className="text-emerald-400">{lastConfirmedReservation.startDate} ({lastConfirmedReservation.pickupTime})</strong>
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
                  {step > 1 && step < 6 && (
                    <button
                      type="button"
                      onClick={() => setStep((step - 1) as any)}
                      className="px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs transition-all flex items-center gap-1"
                    >
                      <ChevronLeft size={16} /> Back
                    </button>
                  )}

                  {step === 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      Next: Working Calendar <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 2 && (
                    <button
                      type="button"
                      disabled={bookingBike ? getAvailableStock(bookingBike.id, startDate) === 0 : false}
                      onClick={() => setStep(3)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      {bookingBike && getAvailableStock(bookingBike.id, startDate) === 0 ? 'Date Sold Out' : 'Next: Pickup Hour'} <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="button"
                      onClick={() => setStep(4)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      Next: Location <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 4 && (
                    <button
                      type="button"
                      onClick={() => setStep(5)}
                      className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      Next: Contact & Specs <ChevronRight size={16} />
                    </button>
                  )}

                  {step === 5 && (
                    <button
                      type="button"
                      onClick={handleConfirmReservation}
                      className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20"
                    >
                      <CheckCircle2 size={16} /> Confirm & Reserve Bike
                    </button>
                  )}

                  {step === 6 && (
                    <button
                      type="button"
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

      {/* DETAILED BIKE VIEW & CALENDAR HOURS MODAL */}
      <AnimatePresence>
        {selectedBikeForDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-slate-950 border border-emerald-500/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto text-left relative flex flex-col max-h-[90vh]"
            >
              {/* MODAL HEADER */}
              <div className="p-6 bg-slate-900/90 border-b border-white/10 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <Bike size={22} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-400 tracking-widest block">
                      {selectedBikeForDetails.tag}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading">
                      {selectedBikeForDetails.name}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedBikeForDetails(null)}
                  className="p-2 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-full transition-all"
                >
                  <X size={20} />
                </button>
              </div>

              {/* MODAL CONTENT */}
              <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-left">
                {/* Image & Key Badges */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-lg">
                  <img 
                    src={selectedBikeForDetails.image} 
                    alt={selectedBikeForDetails.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <span className="bg-emerald-500 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-xl shadow-lg uppercase tracking-wider">
                      Fleet Capacity: 2 Units
                    </span>
                    <span className="bg-black/70 backdrop-blur-md text-emerald-400 text-xs font-extrabold px-3 py-1.5 rounded-xl border border-emerald-500/30">
                      High-Torque All-Terrain E-Bike
                    </span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-2">
                    E-Bike Overview
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed font-light">
                    {selectedBikeForDetails.description}
                  </p>
                </div>

                {/* Detailed Technical Specs */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-3 flex items-center gap-2">
                    <Zap size={14} /> Full Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200">
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Motor</span>
                      <strong className="text-white text-sm">{selectedBikeForDetails.motor}</strong>
                      <span className="text-[10px] text-slate-400 block">750W Peak Torque</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Battery</span>
                      <strong className="text-white text-sm">{selectedBikeForDetails.battery}</strong>
                      <span className="text-[10px] text-slate-400 block">48V 15Ah LG Lithium</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Range</span>
                      <strong className="text-white text-sm">{selectedBikeForDetails.range}</strong>
                      <span className="text-[10px] text-slate-400 block">Eco Assist Mode</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Fat Tires</span>
                      <strong className="text-white text-sm">20" x 4.0" All-Terrain</strong>
                      <span className="text-[10px] text-slate-400 block">CST Puncture Resistant</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Brakes</span>
                      <strong className="text-white text-sm">Hydraulic Disc Brakes</strong>
                      <span className="text-[10px] text-slate-400 block">Front & Rear 180mm</span>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-white/5 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Gears & Shifter</span>
                      <strong className="text-white text-sm">Shimano 7-Speed</strong>
                      <span className="text-[10px] text-slate-400 block">Seamless Hill Climbing</span>
                    </div>
                  </div>
                </div>

                {/* Rental Rates Breakdown */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3 flex items-center gap-2">
                    <Clock size={14} className="text-emerald-400" /> Official Rental Pricing Rates
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                      <div>
                        <strong className="text-white block font-bold">Quick Cruise</strong>
                        <span className="text-[11px] text-slate-400">1 – 2 Hours</span>
                      </div>
                      <span className="text-emerald-400 font-extrabold text-lg">€{selectedBikeForDetails.shortCruisePrice || 15}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between">
                      <div>
                        <strong className="text-white block font-bold">Half-Day Loop</strong>
                        <span className="text-[11px] text-slate-400">Up to 4 Hours</span>
                      </div>
                      <span className="text-emerald-400 font-extrabold text-lg">€{selectedBikeForDetails.halfDayPrice || 25}</span>
                    </div>

                    <div className="p-3.5 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-between bg-emerald-500/10 border-emerald-500/30">
                      <div>
                        <strong className="text-white block font-bold">All-Day Explorer</strong>
                        <span className="text-[11px] text-emerald-300 font-semibold">Best Value (8-11h)</span>
                      </div>
                      <span className="text-emerald-400 font-extrabold text-lg">€{selectedBikeForDetails.fullDayPrice || 35}</span>
                    </div>
                  </div>
                </div>

                {/* Live Availability Calendar & Hourly Time Slots */}
                <div className="bg-slate-900/90 border border-emerald-500/20 p-5 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs uppercase tracking-widest font-extrabold text-emerald-400 flex items-center gap-2">
                        <Calendar size={14} /> Interactive Calendar & Available Hours
                      </h4>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Select a date below to inspect hourly availability for {selectedBikeForDetails.name}.
                      </p>
                    </div>
                    <span className="text-xs font-bold text-slate-300 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
                      Total Stock: 2 Bikes
                    </span>
                  </div>

                  {/* Date Selection Strip */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                    {Array.from({ length: 14 }).map((_, idx) => {
                      const dateObj = new Date();
                      dateObj.setDate(dateObj.getDate() + idx);
                      const dateStr = dateObj.toISOString().split('T')[0];
                      const stock = getAvailableStock(selectedBikeForDetails.id, dateStr);
                      const isSelected = startDate === dateStr;

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          onClick={() => setStartDate(dateStr)}
                          className={`flex flex-col items-center justify-center min-w-[72px] p-2 rounded-xl border transition-all flex-shrink-0 ${
                            isSelected
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950 font-bold shadow-md scale-105'
                              : 'bg-slate-950 border-white/10 text-slate-300 hover:border-white/30'
                          }`}
                        >
                          <span className="text-[9px] uppercase font-bold opacity-80">
                            {idx === 0 ? 'Today' : dateObj.toLocaleDateString('en-US', { weekday: 'short' })}
                          </span>
                          <span className="text-xs font-extrabold my-0.5 font-mono">
                            {dateObj.getDate()} {dateObj.toLocaleDateString('en-US', { month: 'short' })}
                          </span>
                          <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full ${
                            isSelected
                              ? 'bg-slate-950 text-emerald-300'
                              : stock === 2
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : stock === 1
                              ? 'bg-amber-500/20 text-amber-300'
                              : 'bg-rose-500/20 text-rose-400'
                          }`}>
                            {stock > 0 ? `${stock} left` : 'Sold Out'}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Hourly Timeline Availability Indicator */}
                  <div>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                      Real-Time Hourly Schedule Availability for {startDate}:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 text-center">
                      {[
                        { time: '08:00 AM', label: '08:00' },
                        { time: '09:00 AM', label: '09:00' },
                        { time: '10:00 AM', label: '10:00' },
                        { time: '11:00 AM', label: '11:00' },
                        { time: '12:00 PM', label: '12:00' },
                        { time: '01:00 PM', label: '13:00' },
                        { time: '02:00 PM', label: '14:00' },
                        { time: '03:00 PM', label: '15:00' },
                        { time: '05:30 PM', label: '17:30' },
                      ].map((slot) => {
                        const stock = getAvailableStock(selectedBikeForDetails.id, startDate);
                        const past = isHourPast(slot.time, startDate);
                        const isAvail = stock > 0 && !past;
                        return (
                          <div 
                            key={slot.time}
                            className={`p-2 rounded-xl border text-[11px] font-mono flex flex-col items-center gap-0.5 ${
                              past
                                ? 'bg-slate-950/60 border-white/5 text-slate-600 opacity-50'
                                : isAvail 
                                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' 
                                : 'bg-red-500/10 border-red-500/20 text-red-400 opacity-60'
                            }`}
                          >
                            <span className="font-bold">{slot.label}</span>
                            <span className="text-[9px] uppercase font-sans font-semibold">
                              {past ? 'Passed' : isAvail ? `${stock} free` : 'Booked'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
              <div className="p-6 bg-slate-900/90 border-t border-white/10 flex items-center justify-between sticky bottom-0 z-20 backdrop-blur-md">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 font-bold block">Day Rate</span>
                  <span className="text-2xl font-bold text-emerald-400 font-heading">
                    €{selectedBikeForDetails.fullDayPrice}
                    <span className="text-xs text-slate-400 font-normal ml-1">/ day</span>
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedBikeForDetails(null)}
                    className="px-4 py-3 bg-white/5 hover:bg-white/10 text-slate-300 font-bold rounded-xl text-xs uppercase tracking-wider transition-all"
                  >
                    Close
                  </button>

                  <button
                    onClick={() => {
                      const bike = selectedBikeForDetails;
                      setSelectedBikeForDetails(null);
                      handleStartBooking(bike);
                    }}
                    className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:scale-[1.02]"
                  >
                    <Calendar size={16} /> Book This E-Bike Now <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
