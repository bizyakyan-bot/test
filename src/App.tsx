import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Star, ArrowRight, Check, Menu, X, ArrowLeft, ChevronLeft, ChevronRight, Wifi, Coffee, Tv, Wind, Utensils, Bath, ExternalLink, LayoutGrid, List, SlidersHorizontal, Mountain, Waves, Clock, Activity } from 'lucide-react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation, useNavigationType } from 'react-router-dom';
import { apartments, Apartment, hikingActivities, HikingActivity, raftingPartners, RaftingPartner, roadCyclingRoutes, mtbRoutes, CyclingRoute } from './data';
import { Bike, Map as MapIcon, Shield, Users, Heart, Zap, Compass, Settings, Calendar } from 'lucide-react';
import { ThreeCanvas } from './components/ThreeCanvas';

// Scroll to top component that only scrolls on PUSH/REPLACE, not POP (back button)
const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [pathname, navigationType]);

  return null;
};

const Navbar = ({ onOpenAbout }: { onOpenAbout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const navLinks = [
    { name: 'About Us', href: '/#about' },
    { name: 'Accommodation', href: '/#accommodation' },
    { name: 'Activities', href: '/#activities' },
    { name: 'Reviews', href: '/#reviews' },
    { name: 'Contacts', href: '/#contact' },
  ];

  return (
    <nav className="flex items-center justify-between py-6 px-8 md:px-16 bg-[#061011]/85 backdrop-blur-md fixed top-0 left-0 right-0 w-full z-50 text-white/90 border-b border-emerald-500/10 shadow-lg">
      <a 
        href="https://www.instagram.com/b.i.z.i.c/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-2.5 font-heading font-bold text-sm tracking-widest uppercase hover:text-accent transition-all duration-300 drop-shadow-md text-emerald-400 glow-text-emerald"
        id="header-logo-link"
      >
        <img 
          src="/IMG_9899.png" 
          alt="J.Bizjak Logo" 
          className="h-8 md:h-9 w-auto object-contain brightness-110" 
          id="header-logo-img"
          referrerPolicy="no-referrer"
        />
        <span>J.Bizjak</span>
      </a>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex space-x-8 text-xs font-semibold tracking-widest uppercase">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.href} 
              onClick={(e) => {
                if (link.name === 'About Us') {
                  e.preventDefault();
                  onOpenAbout();
                }
              }}
              className="hover:text-accent hover:scale-105 transition-all text-white/70 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center space-x-4 md:hidden">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#081315]/95 border-b border-emerald-500/10 p-8 flex flex-col space-y-4 shadow-lg md:hidden backdrop-blur-xl"
          >
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.href} 
                onClick={(e) => {
                  if (link.name === 'About Us') {
                    e.preventDefault();
                    onOpenAbout();
                  }
                  setIsOpen(false);
                }} 
                className="text-sm font-semibold tracking-widest uppercase text-white/80 hover:text-accent transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const StickyBackButton = ({ to, onClick }: { to?: string, onClick?: () => void }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleBack = () => {
    if (onClick) {
      onClick();
    } else if (location.state?.from) {
      // We have a known return path within the app. 
      // navigate(-1) is preferred to restore the exact scroll position.
      navigate(-1);
    } else if (to) {
      // Fallback for direct links or when state is lost
      navigate(to);
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
      <button 
        onClick={handleBack}
        className="fixed top-28 left-4 md:left-16 z-[45] flex items-center bg-black/60 backdrop-blur-md text-emerald-400 px-5 py-2.5 rounded-full border border-emerald-500/25 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 hover:scale-105 transition-all font-bold tracking-widest uppercase text-[10px] group shadow-2xl"
      >
        <ArrowLeft size={18} className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back
      </button>
  );
};

const Hero = () => {
  return (
    <section id="about" className="px-4 md:px-16 pt-24 md:pt-28 pb-16 relative">
      <div className="mb-12">
        <h1 className="font-heading font-black text-white uppercase leading-[0.85] flex flex-col w-full overflow-hidden">
          <span className="text-[11.2vw] font-black tracking-tight select-none drop-shadow-2xl">
            {"SOCA VALLEY".split("").map((char, i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </span>
          <span className="text-[11.2vw] flex items-center select-none mt-2 w-full">
            <motion.span 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="font-heading font-black text-emerald-400 tracking-tighter text-[11.2vw] glow-text-emerald"
            >
              {"HUB".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.7 }}
                className="text-emerald-300 inline-block glow-text-emerald"
              >
                .
              </motion.span>
            </motion.span>
            <motion.span 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left h-[0.8vw] bg-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)] flex-grow ml-6 rounded-full self-center" 
            />
          </span>
        </h1>
      </div>
      
      <div className="relative w-full h-[60vh] md:h-[80vh] rounded-3xl overflow-hidden shadow-3xl glass-panel">
        <img 
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260219_225914_78050ddb-90c2-4464-bfbf-117e0c1c14b8.jpeg&w=1280&q=85" 
          alt="Bovec Town Square at Sunset" 
          className="w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/30 to-black/20" />
        
        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-sm z-10 p-6 rounded-2xl glass-panel border border-white/5 shadow-xl">
          <p className="text-white text-lg md:text-xl font-medium drop-shadow-md">
            Comfort in the heart of the Soca Valley
          </p>
        </div>
      </div>
    </section>
  );
}

interface AccommodationCardProps {
  apt: Apartment;
  viewMode?: 'grid' | 'list';
  origin?: 'home' | 'list';
  key?: React.Key;
}

const AccommodationCard = ({ apt, viewMode = 'grid', origin }: AccommodationCardProps) => {
  const isAvailable = apt.isAvailable;
  const location = useLocation();
  
  const CardContent = (
    <div className={`group glass-panel rounded-3xl transition-all duration-300 shadow-2xl border border-white/5 ${
      viewMode === 'grid' 
        ? 'flex flex-col h-full overflow-hidden' 
        : 'flex flex-row w-full overflow-hidden md:overflow-visible'
    } ${!isAvailable ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02]'}`}>
      <div className={`relative overflow-hidden flex-shrink-0 ${
        viewMode === 'grid' 
          ? 'aspect-[4/3] w-full' 
          : 'w-[120px] md:w-[40%] h-auto md:h-auto aspect-square md:aspect-auto'
      } ${viewMode === 'list' ? 'rounded-l-xl md:rounded-l-2xl md:rounded-t-none' : ''}`}>
        <motion.img 
          whileHover={isAvailable ? { scale: 1.05 } : {}}
          transition={{ duration: 0.5 }}
          src={apt.images[0]} 
          alt={apt.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        {!isAvailable && (
          <div className={`absolute ${viewMode === 'grid' ? 'top-2 right-2' : 'top-1 right-1'} md:top-4 md:right-4 bg-black/75 backdrop-blur-sm text-emerald-400 border border-emerald-500/30 text-[8px] md:text-[10px] font-bold uppercase tracking-widest px-1.5 py-0.5 md:px-3 md:py-1.5 rounded shadow-lg z-10`}>
            {viewMode === 'grid' ? 'N/A' : 'Not available'}
          </div>
        )}
      </div>

      <div className={`flex flex-col justify-between ${
        viewMode === 'grid' ? 'p-3 md:p-6 flex-1' : 'p-4 md:p-8 flex-1 md:w-[60%]'
      }`}>
        <div>
          <h3 className={`font-heading font-bold mb-1 md:mb-2 transition-colors leading-tight text-white ${
            viewMode === 'grid' ? 'text-sm md:text-2xl' : 'text-base md:text-3xl'
          } ${isAvailable ? 'group-hover:text-emerald-400' : ''}`}>
            {apt.name}
          </h3>
          <div className={`flex items-center text-emerald-400 font-bold mb-2 uppercase tracking-widest ${
            viewMode === 'grid' ? 'text-[8px] md:text-xs' : 'text-[10px] md:text-sm'
          }`}>
            <MapPin size={viewMode === 'grid' ? 10 : 14} className="mr-1 flex-shrink-0 text-emerald-400" />
            <span>{apt.location}</span>
          </div>
          <div className={`flex flex-wrap gap-x-2 gap-y-1 md:gap-4 text-slate-300 mb-2 md:mb-4 font-medium ${
            viewMode === 'grid' ? 'text-[10px] md:text-sm' : 'text-xs md:text-sm'
          }`}>
            <span>{apt.size}</span>
            <span className="opacity-30">•</span>
            <span>{apt.beds}</span>
          </div>
          
          <ul className={`grid gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-2 mb-3 md:mb-6 ${
            viewMode === 'grid' 
              ? 'hidden md:grid grid-cols-2' 
              : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {apt.amenities.slice(0, viewMode === 'grid' ? 4 : 6).map((amenity, i) => (
              <li key={i} className="flex items-center text-[10px] md:text-sm text-slate-300">
                <Check size={16} className="text-emerald-400 mr-1 md:mr-2 flex-shrink-0" />
                <span className="truncate">{amenity}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className={`flex flex-col items-center gap-2 md:gap-3 pt-2 md:pt-4 border-t border-white/10 text-center`}>
          <span className={`font-bold text-emerald-400 glow-text-emerald ${
            viewMode === 'grid' ? 'text-sm md:text-2xl' : 'text-base md:text-2xl'
          }`}>{apt.price}</span>
          {isAvailable ? (
            <button className={`bg-emerald-500 hover:bg-emerald-400 text-black rounded-full hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all font-bold uppercase tracking-widest whitespace-nowrap ${
              viewMode === 'grid' ? 'px-3 py-1 text-[8px] md:text-xs md:px-6 md:py-2' : 'px-4 py-1.5 text-[10px] md:text-xs md:px-6 md:py-2'
            }`}>
              View Details
            </button>
          ) : (
            <button disabled className={`bg-white/5 text-slate-500 rounded-full font-bold uppercase tracking-widest cursor-not-allowed whitespace-nowrap ${
              viewMode === 'grid' ? 'px-3 py-1 text-[8px] md:text-xs md:px-6 md:py-2' : 'px-4 py-1.5 text-[10px] md:text-xs md:px-6 md:py-2'
            }`}>
              Coming Soon
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return isAvailable ? (
    <Link to={`/apartment/${apt.id}`} state={{ from: location.pathname + location.hash }} key={apt.id} className={viewMode === 'grid' ? 'h-full block' : 'block'}>
      {CardContent}
    </Link>
  ) : (
    <div key={apt.id} className={viewMode === 'grid' ? 'h-full' : ''}>
      {CardContent}
    </div>
  );
};

const AccommodationsAllPage = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="bg-transparent min-h-screen w-full overflow-x-hidden text-white">
      <StickyBackButton to="/#accommodation" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=1920&q=80" 
          alt="Soca Valley Accommodations" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/45 to-black/30" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            All Accommodations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Find your perfect home in the heart of the Julian Alps.
          </motion.p>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <div className="bg-black/40 p-1 rounded-xl border border-white/10 flex">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-emerald-400'}`}
                >
                  <LayoutGrid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-emerald-500 text-black shadow-md' : 'text-slate-400 hover:text-emerald-400'}`}
                >
                  <List size={18} />
                </button>
              </div>
              <p className="text-sm text-slate-300 font-medium">{apartments.length} properties found</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          {/* Results Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8' : 'space-y-4 md:space-y-8 max-w-4xl mx-auto'}>
            {apartments.map((apt) => (
              <AccommodationCard 
                key={apt.id} 
                apt={apt} 
                viewMode={viewMode} 
                origin="list"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Accommodation = () => {
  return (
    <section id="accommodation" className="py-20 px-4 md:px-16 bg-transparent text-white">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white uppercase tracking-tight">Accommodation</h2>
          <p className="text-slate-300 mt-4 max-w-xl text-lg font-light">
            Discover our range of carefully curated apartments in the heart of Bovec. From cozy studios to spacious family suites.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-12">
        {apartments.map((apt) => (
          <AccommodationCard 
            key={apt.id} 
            apt={apt} 
            origin="home"
          />
        ))}
        <div className="flex items-center justify-center lg:col-span-3 lg:justify-center lg:mt-8 h-full">
          <Link 
            to="/accommodations/all"
            state={{ from: '/#accommodation' }}
            className="inline-block px-12 py-4 bg-emerald-500 hover:bg-emerald-400 text-black rounded-full font-bold uppercase tracking-widest hover:scale-105 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] text-xs md:text-sm text-center"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
}

const Lightbox = ({ images, currentIndex, onClose, onNext, onPrev }: { 
  images: string[], 
  currentIndex: number, 
  onClose: () => void,
  onNext: () => void,
  onPrev: () => void
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
      onClick={onClose}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain shadow-2xl cursor-grab active:cursor-grabbing z-10"
            referrerPolicy="no-referrer"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) onPrev();
              else if (info.offset.x < -100) onNext();
            }}
          />
        </AnimatePresence>
      </div>

      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[120] cursor-pointer"
        aria-label="Close Lightbox"
      >
        <X size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[120] cursor-pointer"
        aria-label="Previous Image"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[120] cursor-pointer"
        aria-label="Next Image"
      >
        <ChevronRight size={32} />
      </button>
    </motion.div>
  );
};

const Slideshow = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <>
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-2xl group">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full object-cover cursor-zoom-in"
            referrerPolicy="no-referrer"
            onClick={() => setIsLightboxOpen(true)}
          />
        </AnimatePresence>

        <button 
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/40"
        >
          <ChevronRight size={24} />
        </button>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, i) => (
            <div 
              key={i} 
              className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-white w-6' : 'bg-white/50'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen && (
          <Lightbox 
            images={images} 
            currentIndex={currentIndex} 
            onClose={() => setIsLightboxOpen(false)}
            onNext={next}
            onPrev={prev}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const BentralWidget = ({ scriptUrl, height = '1200px' }: { scriptUrl: string, height?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create an iframe to host the script safely. This is often necessary for 
    // third-party embed scripts that use document.write or expect a clean environment.
    const iframe = document.createElement('iframe');
    iframe.style.width = '100%';
    iframe.style.height = height;
    iframe.style.border = 'none';
    iframe.setAttribute('scrolling', 'auto');
    iframe.title = "Bentral Booking Widget";
    
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(iframe);

    const doc = iframe.contentDocument || iframe.contentWindow?.document;
    if (doc) {
      // Ensure we use https
      const fullUrl = scriptUrl.startsWith('//') ? 'https:' + scriptUrl : scriptUrl;
      
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body { margin: 0; padding: 0; background: transparent; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
              /* Hide any powered by if the script doesn't respect the param */
              .powered-by { display: none !important; }
            </style>
          </head>
          <body>
            <script src="${fullUrl}"></script>
          </body>
        </html>
      `);
      doc.close();
    }

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [scriptUrl, height]);

  return <div ref={containerRef} id="booking-widget" className="bentral-container w-full mt-8 overflow-hidden rounded-2xl bg-white" />;
};

const ExpandableDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      // If content height is more than 300px, we should show the expand button
      setShouldShowButton(contentRef.current.scrollHeight > 300);
    }
  }, [description]);

  return (
    <div className="relative mb-12">
      <div 
        ref={contentRef}
        className={`markdown-body prose prose-lg prose-invert text-slate-200 font-light max-w-none transition-all duration-500 ease-in-out overflow-hidden ${
          !isExpanded && shouldShowButton ? 'max-h-[300px]' : 'max-h-[5000px]'
        }`}
      >
        <ReactMarkdown>{description}</ReactMarkdown>
      </div>
      
      {!isExpanded && shouldShowButton && (
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#061011] to-transparent flex items-end justify-center pb-2">
          <button 
            onClick={() => setIsExpanded(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bold uppercase tracking-wider text-xs transition-all transform hover:scale-105"
          >
            Read More
          </button>
        </div>
      )}

      {isExpanded && shouldShowButton && (
        <div className="flex justify-center mt-6">
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-emerald-400 hover:text-emerald-300 font-bold uppercase tracking-wider text-xs transition-all"
          >
            Show Less
          </button>
        </div>
      )}
    </div>
  );
};

const ExpandableAmenities = ({ amenities }: { amenities: string[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const initialCount = 8;
  const hasMore = amenities.length > initialCount;
  const displayedAmenities = isExpanded ? amenities : amenities.slice(0, initialCount);

  return (
    <div className="border-t border-white/10 pt-12">
      <h3 className="font-heading text-2xl font-bold text-white mb-8 uppercase tracking-widest">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {displayedAmenities.map((amenity, i) => (
          <div key={i} className="flex items-center text-slate-300 font-light">
            <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4">
              <Check size={18} className="text-emerald-400" />
            </div>
            <span className="font-medium text-slate-200">{amenity}</span>
          </div>
        ))}
      </div>
      
      {hasMore && (
        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-8 py-3 rounded-full shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] font-bold uppercase tracking-wider text-xs transition-all transform hover:scale-105"
          >
            {isExpanded ? 'Show Less' : 'View All Amenities'}
          </button>
        </div>
      )}
    </div>
  );
};

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const apartment = apartments.find(a => a.id === id);

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent text-white">
        <div className="text-center glass-panel p-12 rounded-3xl border border-white/10 shadow-2xl">
          <h2 className="text-4xl font-bold mb-4 font-heading text-white">Apartment not found</h2>
          <StickyBackButton to="/accommodations/all" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-20 text-white">
      <StickyBackButton to="/accommodations/all" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-16 pt-28 md:pt-32">
        <Slideshow images={apartment.images} />

        <div className="mt-12 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-4 uppercase tracking-tight">
              {apartment.name}
            </h1>
            <div className="flex items-center text-emerald-400 font-bold mb-4 uppercase tracking-widest text-sm">
              <MapPin size={18} className="mr-2 flex-shrink-0" />
              <span>{apartment.location}</span>
            </div>
            <p className="text-xl text-slate-300 mb-8 font-medium">
              {apartment.size} • {apartment.beds}
            </p>
            
            <ExpandableDescription description={apartment.description} />

            <ExpandableAmenities amenities={apartment.amenities} />
          </div>

          <div className="lg:col-span-1">
            <div className="glass-panel-heavy p-8 border border-white/10 rounded-3xl shadow-2xl sticky top-32 text-white">
              <div className="mb-8">
                <p className="text-sm text-slate-400 uppercase tracking-widest mb-1">Price from</p>
                <p className="text-4xl font-bold text-emerald-400 glow-text-emerald">{apartment.price.split(' ')[0]}</p>
                <p className="text-sm text-slate-400">per night</p>
              </div>

              <div className="space-y-4">
                {apartment.bookingScript ? (
                  <button 
                    onClick={() => navigate(`/booking/${id}`, { state: { from: location.pathname } })}
                    className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm"
                  >
                    Book Now
                  </button>
                ) : apartment.bookingUrl ? (
                  <a 
                    href={apartment.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm text-center block"
                  >
                    Book Now
                  </a>
                ) : (
                  <button className="w-full bg-emerald-500 text-black font-bold py-4 rounded-xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 uppercase tracking-widest text-sm">
                    Book Now
                  </button>
                )}
                
                <button 
                  onClick={() => {
                    if (apartment.calendarScript) {
                      navigate(`/booking/${id}`, { state: { from: location.pathname } });
                    } else {
                      // Fallback if no script
                      const element = document.getElementById('amenities');
                      if (element) {
                        const yOffset = -100;
                        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }
                  }}
                  className="w-full border border-emerald-500/30 text-emerald-400 font-bold py-4 rounded-xl hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all uppercase tracking-widest text-sm"
                >
                  Check Availability
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10 space-y-4">
                <div className="flex items-center text-sm text-slate-300">
                  <Check size={16} className="text-emerald-400 mr-3" />
                  <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <Check size={16} className="text-emerald-400 mr-3" />
                  <span>No prepayment required</span>
                </div>
                <div className="flex items-center text-sm text-slate-300">
                  <Check size={16} className="text-emerald-400 mr-3" />
                  <span>Instant confirmation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingPage = () => {
  const { id } = useParams();
  const apartment = apartments.find(a => a.id === id);

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-transparent">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">Apartment not found</h2>
          <StickyBackButton to="/accommodations/all" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-transparent min-h-screen pb-20 text-white">
      <StickyBackButton to={`/apartment/${id}`} />
      
      <div className="max-w-7xl mx-auto px-4 md:px-16 pt-32">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">
            {apartment.name}
          </h1>
          <div className="flex items-center justify-center text-emerald-400 font-bold mb-4 uppercase tracking-widest text-xs">
            <MapPin size={14} className="mr-1 flex-shrink-0" />
            <span>{apartment.location}</span>
          </div>
          <p className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Booking & Availability</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Side: Booking */}
          <div id="booking-section" className="lg:col-span-1 glass-panel p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 h-fit">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
              Pricing & Booking
            </h3>
            {apartment.bookingScript ? (
              <BentralWidget scriptUrl={apartment.bookingScript} height="1100px" />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-slate-400 italic">
                Booking system not available for this property.
              </div>
            )}
          </div>

          {/* Right Side: Calendar */}
          <div id="calendar-section" className="lg:col-span-1 glass-panel p-6 md:p-8 rounded-3xl shadow-2xl border border-white/10 h-fit">
            <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4">
              Availability Calendar
            </h3>
            {apartment.calendarScript ? (
              <BentralWidget scriptUrl={apartment.calendarScript} height="1850px" />
            ) : (
              <div className="flex items-center justify-center h-[400px] text-slate-400 italic">
                Calendar not available for this property.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Activities = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activities = [
    { name: "Water Activities", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85", link: "/soca-river" },
    { name: "Hiking", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215737_4353f19e-15e6-47a2-a55e-7702fe41a357.png&w=1280&q=85", link: "/hiking" },
    { name: "Skydiving", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215229_27d6bf17-7da2-4df9-8026-b33b2b90e9c1.jpeg&w=1280&q=85", link: "/skydiving" },
    { name: "Cycling", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215336_6f5fe074-5598-494e-a05e-8d7a66ff1981.png&w=1280&q=85", link: "/cycling" },
    { name: "Where to Eat", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215911_133805b3-a453-4b3c-ab4d-39d41aa1b21a.jpeg&w=1280&q=85", link: "/where-to-eat" },
    { name: "Local Shops", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215619_993cef2e-43fb-4094-9ed1-6b22c236b021.png&w=1280&q=85", link: "/local-shops" },
  ];

  return (
    <section id="activities" className="py-20 px-4 md:px-16 bg-transparent text-white relative overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase tracking-tight">Activities</h2>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scroll-smooth custom-scrollbar"
        >
          {activities.map((act, idx) => (
            act.link ? (
              <Link to={act.link} state={{ from: '/#activities' }} key={idx} className="min-w-[280px] md:min-w-[350px] snap-center relative rounded-3xl overflow-hidden aspect-[3/4] group/card border border-emerald-500/15 hover:border-emerald-500/30 transition-all duration-300 shadow-2xl block hover:scale-[1.01]">
                <img 
                  src={act.image} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 opacity-90 group-hover/card:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8">
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">{act.name}</h3>
                  <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest flex items-center">Explore adventure <ArrowRight size={12} className="ml-1 animate-pulse" /></span>
                </div>
              </Link>
            ) : (
              <div key={idx} className="min-w-[280px] md:min-w-[350px] snap-center relative rounded-3xl overflow-hidden aspect-[3/4] group/card border border-emerald-500/15 shadow-2xl hover:scale-[1.01]">
                <img 
                  src={act.image} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 opacity-90"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-8">
                  <h3 className="font-heading text-2xl font-bold text-white">{act.name}</h3>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

const Location = () => {
  return (
    <section id="location" className="py-20 px-4 md:px-16 bg-transparent text-white">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight text-white">Location</h2>
          <p className="text-lg mb-8 text-slate-300 font-light leading-relaxed">
            Our apartments are nestled in the heart of the breathtaking Soča Valley, a peaceful alpine setting surrounded by the majestic Julian Alps. This emerald paradise offers a perfect blend of tranquil nature and exhilarating outdoor adventures, with the stunning Soča River just moments away.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Waves className="text-emerald-400 font-bold" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Soča River</h4>
                <p className="text-slate-300 text-xs mt-1">Famous emerald river known for rafting, kayaking and scenery.</p>
              </div>
            </li>
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Mountain className="text-emerald-400" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Julian Alps</h4>
                <p className="text-slate-300 text-xs mt-1">Spectacular alpine landscape perfect for hiking and nature.</p>
              </div>
            </li>
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Compass className="text-emerald-400" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Hiking Trails</h4>
                <p className="text-slate-300 text-xs mt-1">Numerous scenic trails with panoramic mountain views.</p>
              </div>
            </li>
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Bike className="text-emerald-400" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Cycling Routes</h4>
                <p className="text-slate-300 text-xs mt-1">Beautiful cycling routes through valleys and forests.</p>
              </div>
            </li>
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Zap className="text-emerald-400" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Adrenaline</h4>
                <p className="text-slate-300 text-xs mt-1">Rafting, canyoning, paragliding and adventures.</p>
              </div>
            </li>
            <li className="flex items-start glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mr-4 shrink-0">
                <Utensils className="text-emerald-400" size={22} />
              </div>
              <div>
                <h4 className="font-bold text-white">Dining</h4>
                <p className="text-slate-300 text-xs mt-1">Traditional Slovenian cuisine and local restaurants.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="h-[600px] rounded-3xl overflow-hidden relative shadow-3xl border border-emerald-500/15 glass-panel group">
          <img 
            src="https://www.socavalley.com/wp-content/uploads/slider/cache/914173898ae5d95346d7229c72f6ef2b/Soca_bridge_BRV-scaled.webp" 
            alt="Beautiful Soča Valley" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#061011]/80 via-transparent to-black/10" />
        </div>
      </div>
    </section>
  );
}

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 px-4 md:px-16 bg-transparent text-white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tight text-white text-shadow-emerald">Guest Reviews</h2>
        <div className="flex items-center justify-center gap-2 text-xl font-bold text-emerald-400">
          <span className="text-emerald-400 flex"><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /><Star fill="currentColor" size={20} /></span>
          <span className="glow-text-emerald">4.9/5</span>
        </div>
        <p className="text-slate-300 mt-2 text-lg font-light">Based on Booking.com & Airbnb ratings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { text: "Absolutely stunning location and the apartment was spotless. The hosts were incredibly welcoming and gave us great tips for hiking.", author: "Sarah M.", country: "UK" },
          { text: "Perfect base for our rafting trip. The beds were so comfortable after a long day on the river. Will definitely return!", author: "Markus T.", country: "Germany" },
          { text: "Beautiful modern design while keeping the cozy cabin feel. The view from the balcony in the morning is breathtaking.", author: "Elena R.", country: "Italy" }
        ].map((review, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col justify-between hover:scale-[1.02] transition-all duration-300">
            <div>
              <div className="flex text-emerald-400 mb-4 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
              </div>
              <p className="text-slate-200 mb-6 italic leading-relaxed font-light">"{review.text}"</p>
            </div>
            <div>
              <p className="font-bold text-white text-base">{review.author}</p>
              <p className="text-xs text-emerald-400 tracking-wider font-semibold uppercase mt-1">{review.country}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    // Honeypot check
    if (formData.get('_gotcha')) {
      return;
    }

    setStatus('submitting');

    try {
      const response = await fetch("https://formspree.io/f/xnjblayq", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-16 bg-transparent text-white">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight text-white text-shadow-emerald">Get in Touch</h2>
          <p className="mb-12 text-slate-300 text-lg font-light leading-relaxed">
            Ready to book your stay or have some questions? We'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mr-6 shrink-0">
                <Phone className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-1">Phone</p>
                <p className="font-bold text-xl text-white">+386 70 316 806</p>
              </div>
            </div>
            <div className="flex items-center glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mr-6 shrink-0">
                <Mail className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-1">Email</p>
                <p className="font-bold text-xl text-white">bizyakyan@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center glass-panel p-5 rounded-2xl border border-white/5 shadow-xl hover:scale-[1.01] transition-transform duration-300">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mr-6 shrink-0">
                <MapPin className="text-emerald-400" />
              </div>
              <div>
                <p className="text-xs text-emerald-400 uppercase tracking-widest font-bold mb-1">Address</p>
                <p className="font-bold text-xl text-white">Brdo 24<br/>5230 Bovec, Slovenia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-panel-heavy text-white p-8 md:p-12 rounded-3xl min-h-[400px] flex flex-col border border-emerald-500/20 shadow-3xl">
          <h3 className="font-heading text-2xl font-bold mb-6 text-white uppercase tracking-tight">Send a Request</h3>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/10">
                <Check size={32} />
              </div>
              <p className="text-2xl font-bold text-white uppercase tracking-tight">Thank you!</p>
              <p className="text-slate-300 font-light">Your request has been sent successfully. We will contact you soon.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-emerald-400 font-bold uppercase tracking-widest text-xs hover:underline mt-4 transition-all"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New Booking Request - Bizjak Apartments" />
              <input type="text" name="_gotcha" style={{ display: 'none' }} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">First Name</label>
                  <input type="text" name="firstName" required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Last Name</label>
                  <input type="text" name="lastName" required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Email</label>
                <input type="email" name="email" required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Check-in</label>
                  <input type="date" name="checkin" required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Check-out</label>
                  <input type="date" name="checkout" required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider font-bold text-slate-300 mb-2">Message</label>
                <textarea name="message" rows={4} required className="w-full p-3 bg-black/40 border border-white/10 rounded-lg text-white focus:outline-none focus:border-emerald-500 font-light transition-all"></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
              )}
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-bold py-4 rounded-lg hover:scale-[1.01] transition-all uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] cursor-pointer mt-4"
              >
                {status === 'submitting' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

const Footer = () => {
  return (
    <footer className="bg-transparent text-slate-400 py-12 px-4 md:px-16 border-t border-white/5 flex flex-col md:flex-row items-center justify-between z-10 relative">
      <p className="text-sm font-light tracking-wide">&copy; {new Date().getFullYear()} Soca Valley Hub. All rights reserved.</p>
      <p className="text-xs text-white/45 mt-2 md:mt-0 font-mono">ADRENALINE & ECO LUXURY RESORT</p>
    </footer>
  );
}

interface HikingActivityCardProps {
  activity: HikingActivity;
  index: number;
  key?: React.Key;
}

const HikingActivityCard = ({ activity, index }: HikingActivityCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index % 3 * 0.1 }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 items-center py-12 border-b border-forest/10 last:border-0`}
    >
      <div className="flex-1 space-y-4">
        <h3 className="font-heading text-3xl font-bold text-forest">{activity.title}</h3>
        <p className="text-lg text-forest/80 leading-relaxed">{activity.description}</p>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-1">Difficulty</p>
            <p className="font-semibold">{activity.difficulty}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-1">Duration</p>
            <p className="font-semibold">{activity.duration}</p>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-2">Highlights</p>
          <ul className="space-y-1">
            {activity.highlights.map((h, i) => (
              <li key={i} className="flex items-center text-sm text-forest/70">
                <Check size={14} className="text-accent mr-2 flex-shrink-0" />
                {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1 w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
        <img 
          src={activity.image} 
          alt={activity.title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
};

const HikingPage = () => {
  const navigate = useNavigate();
  const [selectedHike, setSelectedHike] = useState<any>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (selectedHike) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedHike]);

  const rightColumnRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);

  // Wheel scroll forward handler for photo column (scrolls right content panel)
  const handlePhotoWheel = (e: React.WheelEvent) => {
    if (rightColumnRef.current) {
      rightColumnRef.current.scrollTop += e.deltaY;
    }
  };

  // Touch scroll forwarding for mobile swipe on photo column (scrolls right content panel)
  const handlePhotoTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handlePhotoTouchMove = (e: React.TouchEvent) => {
    if (!rightColumnRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = touchStartY.current - currentY;
    
    rightColumnRef.current.scrollTop += deltaY;
    touchStartY.current = currentY;
  };

  const officialTrailsUrl = "https://www.soca-valley.com/en/in-search-of-adventure/activities/2021022411543267/hiking-trails/";

  const hikingGroups = [
    {
      title: "Scenic Valley Walks",
      description: "Enjoy peaceful walks along crystal-clear rivers and through lush green valleys. Perfect for families and those seeking tranquility.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      hikes: [
        {
          name: "Soca Trail (Soška pot)",
          image: "/soca_trail_river.png",
          difficulty: "Easy",
          duration: "3 - 5 hours",
          distance: "12 km (modular sections)",
          elevation: "+150 m",
          startPoint: "Trenta (Soca River Source)",
          routeHighlights: ["Wooden suspension bridges", "Great Soca Gorges", "Triglav National Park scenery"],
          routeDescription: "This is the most famous nature trail in the valley. It follows the incredible emerald river crossing numerous romantic hanging wooden bridges. You can walk the whole stretch or pick shorter, extremely picturesque segments.",
          gallery: [
            { url: "/soca_trail_river.png", label: "Spectacular turquoise-emerald Soca River flowing through the lush green valley" },
            { url: "/soca_trail_steps.png", label: "Rustic handmade logs and wooden stairs descending into lush alpine undergrowth" },
            { url: "/soca_trail_moss.png", label: "Fairytale-like walking trails through ancient moss-carpeted pine forests" },
            { url: "/soca_trail_heather.png", label: "Clean gravel paths bordered by bright purple wild heather and fresh mountain air" },
            { url: "/soca_trail_sign.png", label: "Informative trail boards and educational markers next to rushing crystal-clear water" }
          ]
        },
        {
          name: "Lepena Valley Walk",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
          difficulty: "Easy",
          duration: "2 hours",
          distance: "5 km",
          elevation: "+100 m",
          startPoint: "Klin Camp (Soca-Lepenca confluence)",
          routeHighlights: ["Shaded forest paths", "Deep crystal-clear rock pools", "Lepena valley meadows"],
          routeDescription: "A gentle, refreshing route exploring deep forest trails, lush fields, and the sparkling, deep pools of the Lepenjica creek. It is ideal for warm summer days under the mountain canopies."
        },
        {
          name: "Tolmin Gorges Loop",
          image: "https://images.unsplash.com/photo-1542332213-9b5a5a3fda35?w=800&q=80",
          difficulty: "Easy",
          duration: "1.5 hours",
          distance: "2 km (circular loop)",
          elevation: "+80 m",
          startPoint: "Tolmin Gorge Entrance",
          routeHighlights: ["Devil's Bridge", "Dante's Cave", "Smaragdos Thermal Spring"],
          routeDescription: "The lowest entry point of the Triglav National Park. It guides you through a narrow, highly dramatic rocky canyon with carved cliff tunnels, emerald waters, and unique rock structures."
        }
      ]
    },
    {
      title: "Waterfalls & Natural Wonders",
      description: "Discover the most spectacular water features of the region, from hidden pools to Slovenia's highest falls.",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
      hikes: [
        {
          name: "Virje Waterfall (Slap Virje)",
          image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
          difficulty: "Easy",
          duration: "45 minutes",
          distance: "1.5 km",
          elevation: "+50 m",
          startPoint: "Plužna Village",
          routeHighlights: ["Slap Virje plunge pool", "Gljun karst spring", "Lush vibrant green moss walls"],
          routeDescription: "A magical walk downhill from Plužna to view the cartoonish Slap Virje, where the Gljun stream fans out over delicate, green mossy rock shelves into a deep emerald pristine pool."
        },
        {
          name: "Boka Waterfall (Slap Boka)",
          image: "https://images.unsplash.com/photo-1472214222541-d510753a4707?w=800&q=80",
          difficulty: "Easy to Moderate",
          duration: "1.5 hours",
          distance: "2.5 km",
          elevation: "+150 m",
          startPoint: "Boka Hotel Parking",
          routeHighlights: ["Towering 106m vertical drop", "Panoramic viewing platform", "Dry karst riverbed"],
          routeDescription: "A slightly stony forest trail leading up to the main viewing platforms to admire Slovenia's most majestic and thunderous waterfall. The water flows directly from a high subterranean cave system."
        }
      ]
    },
    {
      title: "Alpine Viewpoints",
      description: "Hike to stunning vantage points that offer panoramic views of the Julian Alps and the valleys below.",
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80",
      hikes: [
        {
          name: "Slemenova Špica",
          image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
          difficulty: "Moderate",
          duration: "3 - 4 hours",
          distance: "6 km",
          elevation: "+640 m",
          startPoint: "Vršič Pass Summit",
          routeHighlights: ["Views of the giant Jalovec peak", "Autumn colors in larch woods", "High alpine grassy plateau"],
          routeDescription: "A legendary high-altitude hike starting at the Vršič Pass. The path climbs through lovely larch forests and over sheep pastures to an breathtaking vertical meadow view over the Planica valley."
        },
        {
          name: "Mangart Saddle (Mangartsko sedlo)",
          image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&q=80",
          difficulty: "Moderate",
          duration: "2.5 hours",
          distance: "4.5 km",
          elevation: "+350 m",
          startPoint: "Mangart Hut Parking",
          routeHighlights: ["Highest mountain road in Slovenia", "Panoramas of Italian Lakes", "Magnificent steep cliffs"],
          routeDescription: "Walk along Slovenia's highest road mountain saddle (2055m). Perfect way to experience serious alpine air, blooming mountain flora, and vertical cliffs without a massive vertical climb."
        },
        {
          name: "Svinjak",
          image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80",
          difficulty: "Challenging",
          duration: "4 - 5 hours",
          distance: "7.5 km",
          elevation: "+1,200 m",
          startPoint: "Kal-Koritnica Village",
          routeHighlights: ["Svinjak pointed summit profile", "Cunegonde castle ruins", "Bovec airfields viewpoint"],
          routeDescription: "Known as the 'Matterhorn of Bovec' due to its pyramid-like silhouette. This steep, relentless, and hot climb awards mountaineers with an absolute 360-degree aerial panorama of Bovec basins."
        }
      ]
    },
    {
      title: "High Mountain Adventures",
      description: "Challenge yourself with high-altitude treks to iconic summits and pristine alpine lakes.",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
      hikes: [
        {
          name: "Mount Krn (2,244 m)",
          image: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=800&q=80",
          difficulty: "Challenging",
          duration: "6 - 7 hours",
          distance: "11 km",
          elevation: "+1,250 m",
          startPoint: "Planina Kuhinja",
          routeHighlights: ["WWI trenches and fort ruins", "Spectacular 2,244m peak", "Meadow pastures with cheese makers"],
          routeDescription: "Climb through steep, sunny slopes and rocky fields to reach the summit of Krn. Highly historical route full of WWI relics, trenches, and barbed wire from the Isonzo Front, leading to massive 360 views."
        },
        {
          name: "Krn Lakes (Krnsko jezero)",
          image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
          difficulty: "Moderate to Challenging",
          duration: "5 hours",
          distance: "13 km",
          elevation: "+800 m",
          startPoint: "Lepena Valley Hut",
          routeHighlights: ["Slovenia's largest high-alpine lake", "Historic military mule trails", "Peaceful reflection pools"],
          routeDescription: "Ascend via high shade forests from the Lepena Valley. Resting silently at 1,391m altitude, Krnsko jezero is the largest mountain lake in Slovenia, sitting tucked under majestic limestone peaks."
        }
      ]
    }
  ];

  return (
    <div className="bg-transparent min-h-screen pb-0 text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1551632811-561732d1e306?w=1920&q=80" 
          alt="Hiking in the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Hiking in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Explore the breathtaking trails of the Julian Alps and Soca Valley.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SPLIT SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-2xl text-slate-200 leading-relaxed font-light">
              Bovec is one of Slovenia’s most spectacular hiking destinations. Surrounded by dramatic peaks, turquoise rivers, waterfalls, and alpine meadows, it offers trails for every level — from relaxed valley walks to challenging mountain summits.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1472214222541-d510753a4707?w=800&q=80" 
              alt="Hiking adventure in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED HIKING EXPERIENCES */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {hikingGroups.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-stretch`}
            >
              <div className="flex-1 space-y-6 flex flex-col justify-between">
                <div>
                  <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight mb-4">{group.title}</h2>
                  <p className="text-lg text-slate-300 leading-relaxed font-light">{group.description}</p>
                </div>
                
                <div className="space-y-4 mt-6">
                  <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold">Recommended Hikes</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {group.hikes.map((hike, idx) => (
                      <div 
                        key={idx} 
                        onClick={() => {
                          setSelectedHike(hike);
                          setActivePhotoIdx(0);
                        }}
                        className="group flex flex-col justify-between p-5 bg-white/[0.03] hover:bg-emerald-500/10 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer shadow-md hover:shadow-emerald-500/5 hover:-translate-y-1 duration-300"
                        id={`hike-card-${i}-${idx}`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="font-heading font-semibold text-slate-100 group-hover:text-emerald-400 transition-colors text-base leading-snug">{hike.name}</span>
                            <span className={`text-[9px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-full flex-shrink-0 ${
                              hike.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                              hike.difficulty === 'Moderate' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                              'bg-red-500/10 text-red-400 border border-red-500/20'
                            }`}>
                              {hike.difficulty}
                            </span>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs text-slate-400 font-light mt-3">
                            <div className="flex items-center gap-1.5">
                              <Clock size={12} className="text-emerald-400/70" />
                              <span>{hike.duration}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <Activity size={12} className="text-emerald-400/70" />
                              <span>{hike.distance}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest mt-4 flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform duration-300">
                          <span>View Trail & Photo</span> 
                          <ArrowRight size={11} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex-1 w-full min-h-[300px] lg:min-h-[auto] rounded-3xl overflow-hidden shadow-2xl border border-white/5 relative group/img">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover/img:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ACTIVE HIKE MODAL ROUTE GUIDE VIEW */}
      <AnimatePresence>
        {selectedHike && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedHike(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-[#061011] border border-white/10 rounded-3xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-[0_0_50px_rgba(16,185,129,0.15)] z-10"
              id="hike-detail-modal"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedHike(null)}
                className="absolute top-4 right-4 text-slate-300 hover:text-white bg-black/60 hover:bg-black/90 p-2.5 rounded-full z-20 transition-all border border-white/10"
                id="close-hike-modal"
              >
                <X size={20} />
              </button>

              {/* Left Column: Hike Photo Slideshow/Gallery & Immersive Stats */}
              <div 
                onWheel={handlePhotoWheel} 
                onTouchStart={handlePhotoTouchStart} 
                onTouchMove={handlePhotoTouchMove} 
                className="md:w-1/2 relative min-h-[350px] md:min-h-[auto] bg-slate-950 border-r border-[#10b981]/10 flex flex-col justify-between overflow-hidden touch-none"
              >
                {selectedHike.gallery ? (
                  <div className="absolute inset-0 w-full h-full">
                    {/* Active Image */}
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activePhotoIdx}
                        src={selectedHike.gallery[activePhotoIdx].url} 
                        alt={selectedHike.gallery[activePhotoIdx].label || selectedHike.name} 
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </AnimatePresence>

                    {/* Gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

                    {/* Left/Right Navigation Arrows */}
                    {selectedHike.gallery.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIdx((prev) => (prev === 0 ? selectedHike.gallery.length - 1 : prev - 1));
                          }}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-emerald-500 hover:text-black text-white p-2 rounded-full border border-white/10 transition-all z-20 shadow-lg active:scale-95"
                          title="Previous image"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIdx((prev) => (prev === selectedHike.gallery.length - 1 ? 0 : prev + 1));
                          }}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-emerald-500 hover:text-black text-white p-2 rounded-full border border-white/10 transition-all z-20 shadow-lg active:scale-95"
                          title="Next image"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </>
                    )}

                    {/* Carousel Indicators / Micro-Dots */}
                    <div className="absolute top-4 left-4 z-20 flex gap-1.5 bg-black/55 backdrop-blur-md p-1.5 rounded-full border border-white/10">
                      {selectedHike.gallery.map((_: any, idx: number) => (
                        <button
                          key={idx}
                          onClick={() => setActivePhotoIdx(idx)}
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            idx === activePhotoIdx ? 'bg-emerald-400 w-6' : 'bg-white/40 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <>
                    <img 
                      src={selectedHike.image} 
                      alt={selectedHike.name} 
                      className="absolute inset-0 w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/40 to-black/30" />
                  </>
                )}
                
                {/* Text Content Overlay at the bottom */}
                <div className="absolute bottom-6 left-6 right-6 z-10 text-left pointer-events-none">
                  <span className={`text-[10px] uppercase tracking-widest font-extrabold px-3 py-1 rounded-full inline-block mb-3 ${
                    selectedHike.difficulty === 'Easy' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                    selectedHike.difficulty === 'Moderate' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                    'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}>
                    {selectedHike.difficulty} Route
                  </span>
                  <h3 className="font-heading font-extrabold text-2xl md:text-3xl text-white uppercase leading-tight tracking-tight drop-shadow-md">
                    {selectedHike.name}
                  </h3>
                  
                  {/* Photo Caption Label */}
                  {selectedHike.gallery && selectedHike.gallery[activePhotoIdx]?.label && (
                    <div className="text-xs text-slate-200 font-light mt-2 bg-black/60 backdrop-blur-sm p-3 rounded-2xl border border-white/5 w-full drop-shadow-md">
                      <span className="font-bold text-emerald-400 mr-1.5 uppercase tracking-wider text-[10px]">Photo {activePhotoIdx + 1} of {selectedHike.gallery.length}:</span>
                      <span className="leading-relaxed">{selectedHike.gallery[activePhotoIdx].label}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Information Sheet & Highlights */}
              <div 
                ref={rightColumnRef} 
                className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto max-h-[55vh] md:max-h-[80vh] bg-[#061011] text-left overscroll-contain"
              >
                <div className="space-y-6">
                  {/* Route Quick Stats Panel */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-3">Trail Statistics</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Duration</span>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                          <Clock size={13} className="text-emerald-400" />
                          <span>{selectedHike.duration}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Distance</span>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                          <Activity size={13} className="text-emerald-400" />
                          <span>{selectedHike.distance}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Elevation Gain</span>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-white">
                          <Mountain size={13} className="text-emerald-400" />
                          <span>{selectedHike.elevation}</span>
                        </div>
                      </div>
                      <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
                        <span className="text-[10px] uppercase font-bold text-slate-500 block mb-0.5">Start Point</span>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-white truncate">
                          <MapPin size={13} className="text-emerald-400 flex-shrink-0" />
                          <span className="truncate" title={selectedHike.startPoint}>{selectedHike.startPoint}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Route Guidance */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Route Guide</h4>
                    <p className="text-sm text-slate-300 leading-relaxed font-light">
                      {selectedHike.routeDescription}
                    </p>
                  </div>

                  {/* Key Highlights Checkmarks */}
                  <div>
                    <h4 className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Route Highlights</h4>
                    <ul className="space-y-2">
                      {selectedHike.routeHighlights.map((highlight: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light">
                          <div className="w-4 h-4 bg-emerald-500/10 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                            <Check size={10} className="text-emerald-400" />
                          </div>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    onClick={() => setSelectedHike(null)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-black py-3 rounded-xl font-bold uppercase tracking-wider text-xs transition-colors"
                  >
                    Close Route Details & Maps
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 4. OFFICIAL TRAILS LINK SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent text-center border-t border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-white uppercase tracking-tight">
            Looking for more hiking routes?
          </h2>
          <a 
            href={officialTrailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 border-2 border-emerald-500/30 text-emerald-400 font-bold rounded-full hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all uppercase tracking-widest text-sm"
          >
            Explore All Hiking Trails
          </a>
        </motion.div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to explore Bovec on foot?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const SkydivingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent min-h-screen text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=1920&q=80" 
          alt="Skydiving above the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Skydiving in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Feel the freedom. Jump above the Alps.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Experience the ultimate adrenaline rush above the breathtaking Julian Alps. Skydiving in Bovec offers unforgettable panoramic views of the Soca Valley, emerald rivers, and dramatic mountain peaks.
            </p>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Whether you are a first-time jumper or an experienced skydiver, Bovec provides a safe and professionally guided adventure in one of Europe’s most scenic drop zones.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80" 
              alt="Skydiving adventure" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. TANDEM SKYDIVING SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Tandem Skydiving Experience</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                No previous experience required — jump together with a certified instructor.
              </p>
              <ul className="space-y-4">
                {[
                  "Jump from up to 4,000 meters",
                  "40–50 seconds of freefall",
                  "Professional certified instructors",
                  "Safe landing in Bovec Valley",
                  "Optional photo and video package"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-300">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <span className="font-medium text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1510519138101-570d1dca3d66?w=800&q=80" 
                alt="Tandem Skydiving" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4. LICENSED SKYDIVING SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">For Experienced Skydivers</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Bovec is a well-known European skydiving location attracting international jumpers.
              </p>
              <ul className="space-y-4">
                {[
                  "International drop zone",
                  "Stunning alpine panorama",
                  "Training camps and events",
                  "Stable weather conditions during the season"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-300">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <span className="font-medium text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80" 
                alt="Experienced Skydiving" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. WHY SKYDIVE IN BOVEC */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" 
              alt="Aerial view of Bovec" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-widest">Why Skydive in Bovec?</h2>
            <ul className="space-y-6">
              {[
                "Unique alpine mountain scenery",
                "Emerald Soca River from above",
                "One of Europe’s most scenic drop zones",
                "High safety standards",
                "Unforgettable bucket-list experience"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-slate-200 font-light">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. WHO IS IT FOR SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-white mb-16 uppercase tracking-widest">Who is it for?</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              "Adrenaline lovers",
              "First-time jumpers",
              "Couples seeking unique experiences",
              "Groups of friends",
              "Bucket list adventurers"
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-8 rounded-2xl shadow-2xl text-center font-bold text-white border border-white/10"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Skydiving Provider Section */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">Official Skydiving Provider in Bovec</h2>
          <p className="text-xl text-slate-300 leading-relaxed font-light">
            For bookings, detailed information, tandem jumps and training programs, we recommend Skydive Bovec – the official skydiving provider in the Soca Valley.
          </p>
          <a 
            href="https://www.skydivebovec.com/sl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-emerald-500 text-black font-bold rounded-full hover:bg-emerald-400 hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-[0_0_20px_rgba(16,185,129,0.3)] group"
          >
            Visit Skydive Bovec <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to experience Bovec from the sky?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const CyclingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-transparent min-h-screen text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1920&q=80" 
          alt="Cycling in the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Cycling in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Explore the Soca Valley on two wheels.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Cycling in Bovec offers breathtaking alpine scenery, legendary mountain climbs, and peaceful valley rides along the emerald Soca River. Whether you are a road cyclist, mountain biker, or leisure rider, Bovec provides routes for every level.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1544192240-4a34fed0104c?w=800&q=80" 
              alt="Cycling adventure" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. ROAD CYCLING ROUTES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-white mb-16 uppercase tracking-widest">Road Cycling Routes</h2>
          <div className="space-y-20">
            {roadCyclingRoutes.map((route, i) => (
              <motion.div 
                key={route.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
              >
                <div className="flex-1 space-y-6">
                  <h3 className="text-3xl font-bold text-white">{route.title}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {route.elevation && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Elevation</p>
                        <p className="font-semibold text-slate-100">{route.elevation}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Difficulty</p>
                      <p className="font-semibold text-slate-100">{route.difficulty}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Highlights</p>
                    <ul className="space-y-2">
                      {route.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center text-slate-300">
                          <Check size={16} className="text-emerald-400 mr-3" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden shadow-xl border border-white/5">
                  <img 
                    src={route.image} 
                    alt={route.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MOUNTAIN BIKING SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto border-t border-white/5">
        <h2 className="font-heading text-4xl font-bold text-center text-white mb-16 uppercase tracking-widest">Mountain Biking</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mtbRoutes.map((route) => (
            <motion.div 
              key={route.id}
              whileHover={{ y: -10 }}
              className="glass-panel rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            >
              <div className="aspect-video overflow-hidden border-b border-white/5">
                <img 
                  src={route.image} 
                  alt={route.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-white">{route.title}</h3>
                <p className="text-slate-300 text-sm font-light leading-relaxed">{route.description}</p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Difficulty</p>
                  <p className="font-semibold text-sm text-slate-200">{route.difficulty}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CYCLING ACTIVITIES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-white mb-16 uppercase tracking-widest">Cycling Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Compass className="text-emerald-400" />, title: "Guided mountain biking tours" },
              { icon: <Users className="text-emerald-400" />, title: "Road cycling group tours" },
              { icon: <Zap className="text-emerald-400" />, title: "E-bike rentals" },
              { icon: <MapIcon className="text-emerald-400" />, title: "GPS route planning" },
              { icon: <Settings className="text-emerald-400" />, title: "Bike rental shops" },
              { icon: <Heart className="text-emerald-400" />, title: "MTB skills courses" },
              { icon: <Calendar className="text-emerald-400" />, title: "Multi-day cycling adventures" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass-panel p-8 rounded-2xl shadow-xl text-center space-y-4 border border-white/10"
              >
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <p className="font-bold text-white text-sm leading-snug">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CYCLE IN BOVEC SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/5">
            <img 
              src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80" 
              alt="Scenic alpine cycling" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-widest">Why Cycle in Bovec?</h2>
            <ul className="space-y-6">
              {[
                "Clean alpine air",
                "Light traffic",
                "Diverse terrain for all levels",
                "Spectacular Julian Alps views",
                "Combination of adventure and tranquility"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-slate-200 font-light">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to explore Bovec by bike?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const SocaRiverPage = () => {
  const navigate = useNavigate();

  const riverActivities = [
    {
      title: "RAFTING ON THE SOČA RIVER",
      description: "Experience thrilling white-water rapids guided by professional instructors. Suitable for beginners, families, and adrenaline seekers.",
      highlights: [
        "Guided tours with certified instructors",
        "Safety equipment included",
        "Fun rapids for all levels",
        "Stunning alpine scenery"
      ],
      image: "https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800&q=80"
    },
    {
      title: "KAYAKING",
      description: "Explore the emerald river at your own pace or challenge yourself on dynamic white-water sections.",
      highlights: [
        "Beginner and advanced routes",
        "Kayak courses available",
        "Calm scenic sections",
        "Technical rapids for experts"
      ],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"
    },
    {
      title: "CANYONING",
      description: "Discover hidden gorges, waterfalls, natural slides and crystal-clear pools.",
      highlights: [
        "Jumping and natural slides",
        "Rappelling down waterfalls",
        "Professional guides",
        "Fully equipped and safe tours"
      ],
      image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80"
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80" 
          alt="Turquoise Soca River" 
          className="absolute inset-0 w-full h-full object-cover opacity-75"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Soca River Adventures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Rafting, kayaking and canyoning in the emerald heart of the Julian Alps.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              The Soca River is the jewel of the Julian Alps and the center of outdoor adventure in Bovec. Its crystal-clear emerald water offers unforgettable experiences for adrenaline lovers and nature enthusiasts alike.
            </p>
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              From exciting white-water rafting to canyoning in hidden gorges and scenic kayaking routes — the Soca River offers something for everyone.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" 
              alt="Emerald Soca River" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. MAIN ACTIVITIES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          {riverActivities.map((activity, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 space-y-6">
                <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">{activity.title}</h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light">{activity.description}</p>
                <ul className="space-y-4">
                  {activity.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center text-slate-300">
                      <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Check size={14} className="text-emerald-400" />
                      </div>
                      <span className="font-medium text-slate-200">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src={activity.image} 
                  alt={activity.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHY THE SOČA RIVER IS SPECIAL */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3] border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" 
              alt="Aerial view of Soca River" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-widest">Why the Soca River is Special</h2>
            <ul className="space-y-6">
              {[
                "Unique emerald color",
                "One of Europe's cleanest alpine rivers",
                "Protected natural environment",
                "Suitable for beginners and professionals",
                "Long adventure season"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-slate-200 font-light">
                  <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-emerald-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED LOCAL PARTNERS SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-white mb-6 uppercase tracking-widest">Our Trusted Adventure Partners</h2>
            <p className="text-xl text-slate-350 max-w-2xl mx-auto font-light leading-relaxed">
              We cooperate with professional and certified local companies to ensure safe and unforgettable river experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {raftingPartners.map((partner, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="glass-panel p-8 rounded-3xl shadow-2xl border border-white/10 group text-white"
              >
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">{partner.name}</h3>
                <p className="text-slate-300 mb-6 leading-relaxed font-light">{partner.description}</p>
                {partner.website && (
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-emerald-400 font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Visit Website <ArrowRight size={16} className="ml-2" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CALL TO ACTION */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready for your Soca River adventure?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const WhereToEatPage = () => {
  const navigate = useNavigate();

  const restaurants = [
    {
      name: "Gostilna Sovdat",
      description: "Traditional Slovenian cuisine in a cozy alpine atmosphere.",
      highlights: ["Local meat dishes", "Homemade desserts", "Central location", "Warm hospitality"],
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80"
    },
    {
      name: "Letni Vrt",
      description: "Relaxed dining with Merditerranean and Slovenian dishes.",
      highlights: ["Seasonal ingredients", "Outdoor terrace", "Vegetarian options"],
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80"
    },
    {
      name: "Gostilna pod Lipco",
      description: "Authentic local recipes with generous portions.",
      highlights: ["Grilled specialties", "Family-friendly atmosphere", "Traditional flavors"],
      image: "https://images.unsplash.com/photo-1484156818044-c040038b0719?w=600&q=80"
    },
    {
      name: "Bistro 9.45",
      description: "A modern and stylish bistro offering creative dishes made from fresh local ingredients in a relaxed alpine setting.",
      highlights: ["Contemporary cuisine", "Fresh seasonal ingredients", "Elegant yet casual atmosphere", "Great for lunch or relaxed dinner"],
      image: "https://images.unsplash.com/photo-1424847651672-bf2c98a3002f?w=600&q=80"
    },
    {
      name: "Hotel Mangart Restaurant",
      description: "Modern alpine dining experience.",
      highlights: ["Refined Slovenian dishes", "Elegant setting", "Ideal for special occasions"],
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1920&q=80" 
          alt="Where to Eat in Bovec" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Where to Eat in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Discover authentic local flavors in the heart of the Soca Valley.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Bovec offers a charming selection of restaurants where you can enjoy traditional Slovenian cuisine, fresh local ingredients, and warm alpine hospitality. After a day of adventure, there’s nothing better than a relaxed dinner with mountain views and a glass of local wine.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=850&q=80" 
              alt="Restaurant in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. RECOMMENDED RESTAURANTS */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          {restaurants.map((restaurant, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 space-y-6">
                <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">{restaurant.name}</h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light">{restaurant.description}</p>
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {restaurant.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 font-light">
                        <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check size={14} className="text-emerald-400" />
                        </div>
                        <span className="font-medium text-slate-200">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src={restaurant.image} 
                  alt={restaurant.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. LOCAL SPECIALTIES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=800&q=80" 
                alt="Local Slovenian dishes" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">What to Try in Bovec</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Traditional alpine cuisine in the Soca Valley is characterized by simple, hearty ingredients that reflect the region's mountain heritage.
              </p>
              <ul className="space-y-4">
                {[
                  "Soca trout",
                  "Kobarid štruklji",
                  "Local cheeses",
                  "Game dishes",
                  "Slovenian wines"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-300 font-light">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <span className="font-medium text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight text-white animate-pulse">Ready to experience the flavors of Bovec?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_25px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const LocalShopsPage = () => {
  const navigate = useNavigate();

  const shops = [
    {
      name: "Od ovce do izdelka",
      description: "A charming local shop offering authentic sheep-based and regional products from the Soca Valley.",
      highlights: ["Local cheeses", "Dairy products", "Traditional specialties", "Authentic Slovenian flavors"],
      image: "https://www.slovenec.org/wp-content/uploads/2023/10/Rokodelski-atelje-ustanovljen-od-Drustva-od-ovce-do-izdelka-je-velika-pridobitev-za-Bovec-.jpg"
    },
    {
      name: "SPAR Bovec",
      description: "Modern supermarket with a wide selection of groceries and daily essentials.",
      highlights: ["Fresh produce", "Bakery section", "Household essentials", "Convenient central location"],
      image: "https://www.spar.si/content/dam/sparsiwebsite/mediji/v-bovcu-se-odpira-112-trgovina-spar/nova-trgovina-sparboveclarge.jpg/_jcr_content/renditions/responsive.665.337.0,113,1619,933.noborder.1e623b2782b81839.jpg"
    },
    {
      name: "Mercator Bovec",
      description: "Local grocery store offering daily shopping convenience.",
      highlights: ["Groceries and beverages", "Local food products", "Snacks for outdoor trips", "Quick and easy shopping"],
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Bovec_-_Mercator.jpg"
    },
    {
      name: "Šport Tekstil Bovec",
      description: "Outdoor and sports shop providing clothing and equipment for alpine activities.",
      highlights: ["Hiking apparel", "Outdoor footwear", "Sports gear", "Winter clothing"],
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80"
    },
    {
      name: "Alpska šola Bovec",
      description: "Professional outdoor and mountaineering shop connected to the local alpine school.",
      highlights: ["Climbing gear", "Via ferrata equipment", "Mountaineering supplies", "Expert local advice"],
      image: "https://scontent.fmbx2-1.fna.fbcdn.net/v/t1.6435-9/136946622_3627124394020711_1502190629321812009_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=13d280&_nc_ohc=6ASzIizFE9kQ7kNvwH3uJdS&_nc_oc=Admob2pXodN235OVxs58M562y6awOSZ9sWEHyL_NoG_DuuOprcaa2huZcZ4QcInLncMe3Ng2Fy9SJH3ynV3hSTD1&_nc_zt=23&_nc_ht=scontent.fmbx2-1.fna&_nc_gid=JfQIholvcE7IhmYZkN7uhQ&_nc_ss=8&oh=00_AfzozG5mMpCP6yKwh4q9xsAA-PqMvlwFEJ_QnYhLEt8leQ&oe=69D40119"
    },
    {
      name: "MERKUR Bovec",
      description: "Hardware and practical supplies store for everyday needs.",
      highlights: ["Tools and maintenance items", "Household products", "Basic repair supplies", "Travel necessities"],
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&q=80"
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-white">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&q=80" 
          alt="Local Shops in Bovec" 
          className="absolute inset-0 w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/50 to-black/40" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Local Shops in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-slate-200 font-light"
          >
            Everything you need — from local specialties to outdoor gear.
          </motion.p>
        </div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <p className="text-xl text-slate-200 leading-relaxed font-light">
              Bovec offers a variety of local shops where you can buy fresh food, traditional products, outdoor equipment, and daily essentials. Whether you're preparing for a hiking trip, cooking in your apartment, or looking for authentic local flavors, everything is conveniently located within walking distance.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video border border-white/5"
          >
            <img 
              src="https://images.unsplash.com/photo-1473186578172-c141e6798cf4?w=800&q=80" 
              alt="Local shop in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED LOCAL SHOPS */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto space-y-32">
          {shops.map((shop, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 space-y-6">
                <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">{shop.name}</h2>
                <p className="text-xl text-slate-300 leading-relaxed font-light">{shop.description}</p>
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {shop.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-slate-300 font-light">
                        <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check size={14} className="text-emerald-400" />
                        </div>
                        <span className="font-semibold text-slate-200">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src={shop.image} 
                  alt={shop.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. WHAT YOU CAN FIND IN BOVEC SECTION */}
      <section className="py-24 px-4 md:px-16 bg-transparent overflow-hidden border-t border-white/5">
        <div className="max-w-7xl mx-auto border-t border-white/5 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1488459718432-01055e67e44a?w=800&q=80" 
                alt="Local products in Bovec" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-white uppercase tracking-tight">What You Can Find in Bovec</h2>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                Supporting local businesses not only gives you access to the freshest products but also helps preserve the unique character of our alpine community.
              </p>
              <ul className="space-y-4">
                {[
                  "Fresh bread and pastries",
                  "Local cheeses and dairy",
                  "Slovenian wines",
                  "Outdoor snacks and supplies",
                  "Hiking and climbing equipment",
                  "Everyday essentials"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-slate-300 font-light">
                    <div className="w-6 h-6 bg-emerald-500/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-emerald-400" />
                    </div>
                    <span className="font-medium text-slate-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-black/40 border-t border-white/5 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight mb-8">Everything you need for a comfortable and adventure-filled stay is just steps away.</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-emerald-500 hover:bg-emerald-400 text-black px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-[0_0_20px_rgba(16,185,129,0.4)]"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const Home = ({ setCurrentSection }: { setCurrentSection: (sec: string) => void }) => {
  const { hash, state } = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    // If it's a back/forward navigation, let the browser handle scroll restoration
    if (navigationType === 'POP') return;

    const scrollToElement = (id: string, smooth = true) => {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -100; // Offset for sticky navbar
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: smooth ? 'smooth' : 'auto' });
      }
    };

    if (state?.scrollTo) {
      setTimeout(() => scrollToElement(state.scrollTo, false), 100);
    } else if (hash) {
      const id = hash.replace('#', '');
      setTimeout(() => scrollToElement(id, true), 100);
    }
  }, [hash, state, navigationType]);

  // Section visibility tracking utilizing standard IntersectionObserver
  useEffect(() => {
    const sections = ['about', 'accommodation', 'activities', 'location', 'reviews', 'contact'];
    const observers = sections.map(id => {
      const el = document.getElementById(id);
      if (!el) return null;
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setCurrentSection(id);
          }
        });
      }, {
        rootMargin: '-30% 0px -40% 0px' // Focus intersection triggers
      });
      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach(obs => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, [setCurrentSection]);

  return (
    <>
      <Hero />
      <Accommodation />
      <Activities />
      <Location />
      <Reviews />
      <Contact />
    </>
  );
};

const AboutModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="relative w-full max-w-2xl glass-panel-heavy border border-white/10 rounded-3xl shadow-3xl overflow-hidden max-h-[90vh] flex flex-col text-white"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 transition-colors z-10"
            >
              <X size={24} className="text-white hover:text-emerald-400" />
            </button>
            
            <div className="p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2 uppercase tracking-tight">Soca Valley Hub</h2>
                <p className="text-emerald-400 font-semibold tracking-widest uppercase text-xs">Apartments near Bovec, Slovenia</p>
              </div>
              
              <div className="max-w-none text-slate-300">
                <p className="text-lg font-medium text-white mb-6">Welcome to Soca Valley Hub.</p>
                <p className="mb-6 font-light leading-relaxed">
                  Nestled in the heart of the Soca Valley near Bovec, we offer comfortable and carefully designed apartments for guests seeking nature, adventure, and relaxation.
                </p>
                <p className="mb-6 font-light leading-relaxed">
                  Our mission is simple — to provide a welcoming place that feels like home while you explore one of Slovenia’s most beautiful regions.
                </p>
                <p className="mb-8 font-light leading-relaxed">
                  Located near Bovec, our apartments are the perfect starting point for hiking, cycling, rafting, skiing, and discovering the emerald Soca River.
                </p>
                
                <div className="glass-panel rounded-2xl p-6 border border-white/5">
                  <p className="font-bold text-emerald-400 mb-4 uppercase tracking-widest text-xs">We focus on:</p>
                  <ul className="space-y-3">
                    {['Clean and modern interiors', 'Fully equipped kitchens', 'Free WiFi', 'Private parking', 'Personal hospitality'].map((item, i) => (
                      <li key={i} className="flex items-center text-slate-200 text-sm">
                        <Check size={16} className="text-emerald-400 mr-3 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <p className="mt-8 text-white font-bold italic">We look forward to welcoming you to Soca Valley.</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const AppContent = ({ onOpenAbout }: { onOpenAbout: () => void }) => {
  const [currentSection, setCurrentSection] = useState('about');
  const location = useLocation();

  // Set appropriate backdrop focal targets on route change
  useEffect(() => {
    if (location.pathname !== '/') {
      if (location.pathname.startsWith('/apartment') || location.pathname.startsWith('/accommodations')) {
        setCurrentSection('accommodation');
      } else if (location.pathname.startsWith('/hiking') || location.pathname.startsWith('/skydiving') || location.pathname.startsWith('/cycling') || location.pathname.startsWith('/soca-river')) {
        setCurrentSection('activities');
      } else if (location.pathname.startsWith('/booking')) {
        setCurrentSection('contact');
      } else {
        setCurrentSection('about');
      }
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-400 selection:text-black relative">
      {/* 3D background canvas layer */}
      <ThreeCanvas currentSection={currentSection} />
      
      <Navbar onOpenAbout={onOpenAbout} />
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<Home setCurrentSection={setCurrentSection} />} />
          <Route path="/accommodations/all" element={<AccommodationsAllPage />} />
          <Route path="/apartment/:id" element={<ApartmentDetail />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/hiking" element={<HikingPage />} />
          <Route path="/skydiving" element={<SkydivingPage />} />
          <Route path="/cycling" element={<CyclingPage />} />
          <Route path="/soca-river" element={<SocaRiverPage />} />
          <Route path="/where-to-eat" element={<WhereToEatPage />} />
          <Route path="/local-shops" element={<LocalShopsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent onOpenAbout={() => setIsAboutOpen(true)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
    </HashRouter>
  );
}
