import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Star, ArrowRight, Check, Menu, X, ArrowLeft, ChevronLeft, ChevronRight, Wifi, Coffee, Tv, Wind, Utensils, Bath, ExternalLink, Globe } from 'lucide-react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { apartments, Apartment, hikingActivities, HikingActivity, raftingPartners, RaftingPartner, roadCyclingRoutes, mtbRoutes, CyclingRoute } from './data';
import { Bike, Map as MapIcon, Shield, Users, Heart, Zap, Compass, Settings, Calendar } from 'lucide-react';

const LanguageTranslator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'sl', name: 'Slovenian', flag: '🇸🇮' },
    { code: 'de', name: 'German', flag: '🇩🇪' },
    { code: 'it', name: 'Italian', flag: '🇮🇹' },
  ];

  const changeLanguage = (langCode: string) => {
    const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event('change'));
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('.language-translator')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative language-translator">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-forest hover:text-accent transition-colors p-2 rounded-full hover:bg-black/5"
        aria-label="Select Language"
      >
        <Globe size={18} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-2xl border border-forest/5 overflow-hidden z-[60]"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-beige transition-colors text-xs font-bold tracking-widest uppercase text-forest"
              >
                <span className="text-base">{lang.flag}</span>
                <span>{lang.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <div id="google_translate_element" className="hidden"></div>
    </div>
  );
};

const Navbar = () => {
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
    <nav className="flex items-center justify-between py-6 px-8 md:px-16 bg-beige sticky top-0 z-50">
      <Link to="/" className="font-heading font-bold text-sm tracking-widest uppercase">J.Bizjak</Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <div className="flex space-x-8 text-xs font-semibold tracking-widest uppercase">
          {navLinks.map((link) => (
            isHomePage ? (
              <a key={link.name} href={link.href.replace('/', '')} className="hover:text-accent transition-colors">{link.name}</a>
            ) : (
              <Link key={link.name} to={link.href} className="hover:text-accent transition-colors">{link.name}</Link>
            )
          ))}
        </div>
        <LanguageTranslator />
      </div>

      {/* Mobile Menu Toggle */}
      <div className="flex items-center space-x-4 md:hidden">
        <LanguageTranslator />
        <button onClick={() => setIsOpen(!isOpen)}>
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
            className="absolute top-full left-0 w-full bg-beige p-8 flex flex-col space-y-4 shadow-lg md:hidden"
          >
            {navLinks.map((link) => (
              isHomePage ? (
                <a key={link.name} href={link.href.replace('/', '')} onClick={() => setIsOpen(false)} className="text-sm font-semibold tracking-widest uppercase">{link.name}</a>
              ) : (
                <Link key={link.name} to={link.href} onClick={() => setIsOpen(false)} className="text-sm font-semibold tracking-widest uppercase">{link.name}</Link>
              )
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

const StickyBackButton = ({ to }: { to: string }) => {
  const navigate = useNavigate();
  return (
    <button 
      onClick={() => navigate(to)}
      className="fixed top-28 left-4 md:left-16 z-[45] flex items-center bg-white/80 backdrop-blur-md text-forest px-5 py-2.5 rounded-full hover:bg-white hover:scale-105 transition-all font-bold tracking-widest uppercase text-[10px] group shadow-xl border border-forest/5"
    >
      <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" />
      Back
    </button>
  );
};

const Hero = () => {
  return (
    <section id="about" className="px-4 md:px-16 pt-8 pb-16 relative">
      <div className="mb-8">
        <h1 className="font-heading text-5xl md:text-8xl lg:text-[10rem] font-bold leading-none tracking-tight text-forest uppercase">
          Soca Valley<br />Apartments
        </h1>
      </div>
      
      <div className="relative w-full h-[60vh] md:h-[80vh] rounded-xl overflow-hidden">
        <img 
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260219_225914_78050ddb-90c2-4464-bfbf-117e0c1c14b8.jpeg&w=1280&q=85" 
          alt="Bovec Town Square at Sunset" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 max-w-sm">
          <p className="text-white text-lg md:text-xl font-medium drop-shadow-md">
            Comfort in the heart of the Soca Valley
          </p>
        </div>

        <button className="absolute top-8 right-8 md:top-16 md:right-16 w-24 h-24 md:w-32 md:h-32 bg-accent rounded-full flex flex-col items-center justify-center text-white hover:scale-105 transition-transform shadow-xl">
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase mb-1">Book</span>
          <span className="text-xs md:text-sm font-semibold tracking-widest uppercase flex items-center">Now <ArrowRight size={16} className="ml-1" /></span>
        </button>
      </div>
    </section>
  );
}

const Accommodation = () => {
  return (
    <section id="accommodation" className="py-20 px-4 md:px-16 bg-white">
      <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-forest">Accommodation</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {apartments.map((apt) => {
          const isAvailable = apt.id === 'apartment-kuhala';
          const CardContent = (
            <div className={`group block ${!isAvailable ? 'cursor-default' : 'cursor-pointer'}`}>
              <div className="overflow-hidden rounded-xl mb-6 aspect-[4/3] relative">
                <motion.img 
                  whileHover={isAvailable ? { scale: 1.05 } : {}}
                  transition={{ duration: 0.5 }}
                  src={apt.images[0]} 
                  alt={apt.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                {!isAvailable && (
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded shadow-lg border border-white/10 z-10">
                    Not yet available
                  </div>
                )}
              </div>
              <h3 className={`font-heading text-2xl font-bold mb-2 transition-colors ${isAvailable ? 'group-hover:text-accent' : ''}`}>{apt.name}</h3>
              <div className="flex flex-wrap gap-4 text-sm text-forest/70 mb-4">
                <span>{apt.size}</span>
                <span>•</span>
                <span>{apt.beds}</span>
              </div>
              <ul className="grid grid-cols-2 gap-2 mb-6">
                {apt.amenities.slice(0, 6).map((amenity, i) => (
                  <li key={i} className="flex items-center text-sm">
                    <Check size={16} className="text-accent mr-2" />
                    {amenity}
                  </li>
                ))}
              </ul>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-lg">{apt.price}</span>
                {isAvailable ? (
                  <button className="px-6 py-2 border border-forest rounded-full group-hover:bg-forest group-hover:text-white transition-all text-sm font-semibold uppercase tracking-wider">
                    View Details
                  </button>
                ) : (
                  <button disabled className="px-6 py-2 border border-forest/30 text-forest/50 rounded-full text-sm font-semibold uppercase tracking-wider cursor-not-allowed opacity-70">
                    Coming Soon
                  </button>
                )}
              </div>
            </div>
          );

          return isAvailable ? (
            <Link to={`/apartment/${apt.id}`} key={apt.id}>
              {CardContent}
            </Link>
          ) : (
            <div key={apt.id}>
              {CardContent}
            </div>
          );
        })}
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
      <button 
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute top-8 right-8 text-white/70 hover:text-white transition-colors z-[110]"
      >
        <X size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110]"
      >
        <ChevronLeft size={32} />
      </button>

      <button 
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-16 md:h-16 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-all z-[110]"
      >
        <ChevronRight size={32} />
      </button>

      <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="max-w-full max-h-full object-contain shadow-2xl cursor-grab active:cursor-grabbing"
            referrerPolicy="no-referrer"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x > 100) onPrev();
              else if (info.offset.x < -100) onNext();
            }}
          />
        </AnimatePresence>
      </div>
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

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const apartment = apartments.find(a => a.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-beige">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Apartment not found</h2>
          <button onClick={() => navigate('/')} className="text-accent flex items-center justify-center">
            <ArrowLeft className="mr-2" /> Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-beige min-h-screen pb-20">
      <StickyBackButton to="/#accommodation" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-16 pt-20">
        <Slideshow images={apartment.images} />

        <div className="mt-12 grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h1 className="font-heading text-4xl md:text-6xl font-bold text-forest mb-4 uppercase tracking-tight">
              {apartment.name}
            </h1>
            <p className="text-xl text-forest/60 mb-8 font-medium">
              {apartment.size} • {apartment.beds}
            </p>
            
            <div className="prose prose-lg text-forest/80 max-w-none mb-12">
              <p>{apartment.description}</p>
            </div>

            <div className="border-t border-forest/10 pt-12">
              <h3 className="font-heading text-2xl font-bold text-forest mb-8 uppercase tracking-widest">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {apartment.amenities.map((amenity, i) => (
                  <div key={i} className="flex items-center text-forest/80">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-4 shadow-sm">
                      <Check size={18} className="text-accent" />
                    </div>
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-xl sticky top-32">
              <div className="mb-8">
                <p className="text-sm text-forest/60 uppercase tracking-widest mb-1">Price from</p>
                <p className="text-4xl font-bold text-forest">{apartment.price.split(' ')[0]}</p>
                <p className="text-sm text-forest/60">per night</p>
              </div>

              <div className="space-y-4">
                {apartment.id === 'apartment-kuhala' ? (
                  <a 
                    href="https://www.booking.com/hotel/si/trnovo-ob-soci-kuhala.sl.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 uppercase tracking-widest text-sm text-center block"
                  >
                    Book Now
                  </a>
                ) : (
                  <button className="w-full bg-accent text-white font-bold py-4 rounded-xl hover:bg-accent/90 transition-all shadow-lg shadow-accent/20 uppercase tracking-widest text-sm">
                    Book Now
                  </button>
                )}
                <button className="w-full border border-forest/10 text-forest font-bold py-4 rounded-xl hover:bg-forest hover:text-white transition-all uppercase tracking-widest text-sm">
                  Check Availability
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-forest/5 space-y-4">
                <div className="flex items-center text-sm text-forest/60">
                  <Check size={16} className="text-accent mr-3" />
                  <span>Free cancellation up to 7 days</span>
                </div>
                <div className="flex items-center text-sm text-forest/60">
                  <Check size={16} className="text-accent mr-3" />
                  <span>No prepayment required</span>
                </div>
                <div className="flex items-center text-sm text-forest/60">
                  <Check size={16} className="text-accent mr-3" />
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

const Activities = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activities = [
    { name: "Hiking", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215737_4353f19e-15e6-47a2-a55e-7702fe41a357.png&w=1280&q=85", link: "/hiking" },
    { name: "Skydiving", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215229_27d6bf17-7da2-4df9-8026-b33b2b90e9c1.jpeg&w=1280&q=85", link: "/skydiving" },
    { name: "Where to Eat", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215911_133805b3-a453-4b3c-ab4d-39d41aa1b21a.jpeg&w=1280&q=85", link: "/where-to-eat" },
    { name: "Local Shops", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215619_993cef2e-43fb-4094-9ed1-6b22c236b021.png&w=1280&q=85", link: "/local-shops" },
    { name: "Cycling", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215336_6f5fe074-5598-494e-a05e-8d7a66ff1981.png&w=1280&q=85", link: "/cycling" },
    { name: "Soca River Adventures", image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85", link: "/soca-river" },
  ];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="activities" className="py-20 px-4 md:px-16 bg-forest text-beige relative overflow-hidden">
      <div className="flex items-center justify-between mb-12">
        <h2 className="font-heading text-4xl md:text-5xl font-bold">Activities</h2>
        <div className="flex space-x-4">
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full border border-beige/20 flex items-center justify-center hover:bg-beige hover:text-forest transition-all duration-300"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full border border-beige/20 flex items-center justify-center hover:bg-beige hover:text-forest transition-all duration-300"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative group">
        <div 
          ref={scrollRef}
          className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory scroll-smooth no-scrollbar"
        >
          {activities.map((act, idx) => (
            act.link ? (
              <Link to={act.link} key={idx} className="min-w-[280px] md:min-w-[350px] snap-center relative rounded-xl overflow-hidden aspect-[3/4] group/card block">
                <img 
                  src={act.image} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
                  <h3 className="font-heading text-2xl font-bold text-white">{act.name}</h3>
                </div>
              </Link>
            ) : (
              <div key={idx} className="min-w-[280px] md:min-w-[350px] snap-center relative rounded-xl overflow-hidden aspect-[3/4] group/card">
                <img 
                  src={act.image} 
                  alt={act.name} 
                  className="w-full h-full object-cover group-hover/card:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
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
    <section id="location" className="py-20 px-4 md:px-16 bg-beige">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8 text-forest">Location</h2>
          <p className="text-lg mb-8 text-forest/80">
            Perfectly situated for your mountain adventures. We are located right in the heart of Bovec, giving you easy access to all major attractions.
          </p>
          <ul className="space-y-6">
            <li className="flex items-start">
              <MapPin className="text-accent mr-4 mt-1" />
              <div>
                <h4 className="font-bold">Soca River</h4>
                <p className="text-forest/70">5 minutes walk</p>
              </div>
            </li>
            <li className="flex items-start">
              <MapPin className="text-accent mr-4 mt-1" />
              <div>
                <h4 className="font-bold">Kanin Ski Resort</h4>
                <p className="text-forest/70">10 minutes drive</p>
              </div>
            </li>
            <li className="flex items-start">
              <MapPin className="text-accent mr-4 mt-1" />
              <div>
                <h4 className="font-bold">Restaurants & Shops</h4>
                <p className="text-forest/70">2 minutes walk</p>
              </div>
            </li>
            <li className="flex items-start">
              <MapPin className="text-accent mr-4 mt-1" />
              <div>
                <h4 className="font-bold">Hiking Trails</h4>
                <p className="text-forest/70">Starting right outside</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="h-[500px] bg-gray-200 rounded-xl overflow-hidden relative">
          {/* Placeholder for Map */}
          <img 
            src="https://picsum.photos/seed/map/800/1000" 
            alt="Map of Bovec" 
            className="w-full h-full object-cover opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white px-6 py-3 rounded-full shadow-lg font-bold text-forest flex items-center">
              <MapPin className="text-accent mr-2" size={20} />
              Soca Valley Apartments
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const Reviews = () => {
  return (
    <section id="reviews" className="py-20 px-4 md:px-16 bg-white">
      <div className="text-center mb-16">
        <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-forest">Guest Reviews</h2>
        <div className="flex items-center justify-center gap-2 text-xl font-bold">
          <span className="text-accent flex"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /></span>
          <span>4.9/5</span>
        </div>
        <p className="text-forest/70 mt-2">Based on Booking.com & Airbnb ratings</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { text: "Absolutely stunning location and the apartment was spotless. The hosts were incredibly welcoming and gave us great tips for hiking.", author: "Sarah M.", country: "UK" },
          { text: "Perfect base for our rafting trip. The beds were so comfortable after a long day on the river. Will definitely return!", author: "Markus T.", country: "Germany" },
          { text: "Beautiful modern design while keeping the cozy cabin feel. The view from the balcony in the morning is breathtaking.", author: "Elena R.", country: "Italy" }
        ].map((review, idx) => (
          <div key={idx} className="bg-beige p-8 rounded-xl">
            <div className="flex text-accent mb-4">
              <Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" />
            </div>
            <p className="text-forest/80 mb-6 italic">"{review.text}"</p>
            <div>
              <p className="font-bold">{review.author}</p>
              <p className="text-sm text-forest/60">{review.country}</p>
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
    <section id="contact" className="py-20 px-4 md:px-16 bg-forest text-beige">
      <div className="grid md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-8">Get in Touch</h2>
          <p className="mb-12 text-beige/80 text-lg">
            Ready to book your stay or have some questions? We'd love to hear from you.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-6">
                <Phone className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-beige/60 uppercase tracking-wider mb-1">Phone</p>
                <p className="font-bold text-xl">+386 70 316 806</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-6">
                <Mail className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-beige/60 uppercase tracking-wider mb-1">Email</p>
                <p className="font-bold text-xl">bizyakyan@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center mr-6">
                <MapPin className="text-accent" />
              </div>
              <div>
                <p className="text-sm text-beige/60 uppercase tracking-wider mb-1">Address</p>
                <p className="font-bold text-xl">Brdo 24<br/>5230 Bovec, Slovenia</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white text-forest p-8 rounded-xl min-h-[400px] flex flex-col">
          <h3 className="font-heading text-2xl font-bold mb-6">Send a Request</h3>
          
          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex-1 flex flex-col items-center justify-center text-center space-y-4"
            >
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <Check size={32} />
              </div>
              <p className="text-xl font-bold text-forest">Thank you!</p>
              <p className="text-forest/70">Your request has been sent successfully. We will contact you soon.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="text-accent font-bold uppercase tracking-widest text-sm hover:underline mt-4"
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
                  <label className="block text-sm font-semibold mb-2">First Name</label>
                  <input type="text" name="firstName" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Last Name</label>
                  <input type="text" name="lastName" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input type="email" name="email" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-in</label>
                  <input type="date" name="checkin" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Check-out</label>
                  <input type="date" name="checkout" required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Message</label>
                <textarea name="message" rows={4} required className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-accent"></textarea>
              </div>
              
              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">Something went wrong. Please try again.</p>
              )}
              
              <button 
                type="submit" 
                disabled={status === 'submitting'}
                className="w-full bg-accent text-white font-bold py-4 rounded-lg hover:bg-accent/90 transition-colors uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
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
    <footer className="bg-forest text-beige/60 py-8 px-4 md:px-16 border-t border-beige/10 flex flex-col md:flex-row items-center justify-between">
      <p>&copy; {new Date().getFullYear()} Soca Valley Apartments. All rights reserved.</p>
      <div className="flex space-x-6 mt-4 md:mt-0">
        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
      </div>
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const officialTrailsUrl = "https://www.soca-valley.com/en/in-search-of-adventure/activities/2021022411543267/hiking-trails/";

  const hikingGroups = [
    {
      title: "Scenic Valley Walks",
      description: "Enjoy peaceful walks along crystal-clear rivers and through lush green valleys. Perfect for families and those seeking tranquility.",
      hikes: ["Soca Trail", "Lepena Valley", "Tolmin Gorges"],
      image: "https://picsum.photos/seed/valley-walks/800/600"
    },
    {
      title: "Waterfalls & Natural Wonders",
      description: "Discover the most spectacular water features of the region, from hidden pools to Slovenia's highest falls.",
      hikes: ["Virje Waterfall", "Boka Waterfall"],
      image: "https://picsum.photos/seed/waterfalls/800/600"
    },
    {
      title: "Alpine Viewpoints",
      description: "Hike to stunning vantage points that offer panoramic views of the Julian Alps and the valleys below.",
      hikes: ["Slemenova Špica", "Mangart Saddle", "Svinjak"],
      image: "https://picsum.photos/seed/alpine-views/800/600"
    },
    {
      title: "High Mountain Adventures",
      description: "Challenge yourself with high-altitude treks to iconic summits and pristine alpine lakes.",
      hikes: ["Mount Krn", "Krn Lakes"],
      image: "https://picsum.photos/seed/mountain-adv/800/600"
    }
  ];

  return (
    <div className="bg-beige min-h-screen pb-0">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/hiking-hero/1920/1080" 
          alt="Hiking in the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Hiking in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-2xl text-forest leading-relaxed font-medium">
              Bovec is one of Slovenia’s most spectacular hiking destinations. Surrounded by dramatic peaks, turquoise rivers, waterfalls, and alpine meadows, it offers trails for every level — from relaxed valley walks to challenging mountain summits.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/hiking-intro-2/800/600" 
              alt="Hiking adventure in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED HIKING EXPERIENCES */}
      <section className="py-24 px-4 md:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-32">
          {hikingGroups.map((group, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 md:gap-24 items-center`}
            >
              <div className="flex-1 space-y-6">
                <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">{group.title}</h2>
                <p className="text-xl text-forest/70 leading-relaxed">{group.description}</p>
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-widest text-forest/50 font-bold">Recommended Hikes</p>
                  <ul className="space-y-3">
                    {group.hikes.map((hike, idx) => (
                      <li key={idx} className="flex items-center text-forest/80">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check size={14} className="text-accent" />
                        </div>
                        <span className="font-semibold">{hike}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={group.image} 
                  alt={group.title} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. OFFICIAL TRAILS LINK SECTION */}
      <section className="py-24 px-4 md:px-16 bg-beige text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-forest uppercase tracking-tight">
            Looking for more hiking routes?
          </h2>
          <a 
            href={officialTrailsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-5 border-2 border-forest text-forest font-bold rounded-full hover:bg-forest hover:text-white transition-all uppercase tracking-widest text-sm"
          >
            Explore All Hiking Trails
          </a>
        </motion.div>
      </section>

      {/* 5. FINAL CTA */}
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to explore Bovec on foot?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige min-h-screen">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/skydiving-hero/1920/1080" 
          alt="Skydiving above the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Skydiving in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-xl text-forest leading-relaxed">
              Experience the ultimate adrenaline rush above the breathtaking Julian Alps. Skydiving in Bovec offers unforgettable panoramic views of the Soca Valley, emerald rivers, and dramatic mountain peaks.
            </p>
            <p className="text-xl text-forest leading-relaxed">
              Whether you are a first-time jumper or an experienced skydiver, Bovec provides a safe and professionally guided adventure in one of Europe’s most scenic drop zones.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/skydiving-intro/800/600" 
              alt="Skydiving adventure" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. TANDEM SKYDIVING SECTION */}
      <section className="py-24 px-4 md:px-16 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">Tandem Skydiving Experience</h2>
              <p className="text-xl text-forest/70 leading-relaxed">
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
                  <li key={idx} className="flex items-center text-forest/80">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-accent" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/skydiving-tandem/800/600" 
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
      <section className="py-24 px-4 md:px-16 bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row-reverse gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">For Experienced Skydivers</h2>
              <p className="text-xl text-forest/70 leading-relaxed">
                Bovec is a well-known European skydiving location attracting international jumpers.
              </p>
              <ul className="space-y-4">
                {[
                  "International drop zone",
                  "Stunning alpine panorama",
                  "Training camps and events",
                  "Stable weather conditions during the season"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-forest/80">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-accent" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/skydiving-pro/800/600" 
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
      <section className="py-24 px-4 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img 
              src="https://picsum.photos/seed/skydiving-scenic/800/600" 
              alt="Aerial view of Bovec" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-widest">Why Skydive in Bovec?</h2>
            <ul className="space-y-6">
              {[
                "Unique alpine mountain scenery",
                "Emerald Soca River from above",
                "One of Europe’s most scenic drop zones",
                "High safety standards",
                "Unforgettable bucket-list experience"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-forest/80">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. WHO IS IT FOR SECTION */}
      <section className="py-24 px-4 md:px-16 bg-beige">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-forest mb-16 uppercase tracking-widest">Who is it for?</h2>
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
                className="bg-white p-8 rounded-2xl shadow-md text-center font-bold text-forest border border-forest/5"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Official Skydiving Provider Section */}
      <section className="py-24 px-4 md:px-16 bg-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">Official Skydiving Provider in Bovec</h2>
          <p className="text-xl text-forest/70 leading-relaxed">
            For bookings, detailed information, tandem jumps and training programs, we recommend Skydive Bovec – the official skydiving provider in the Soca Valley.
          </p>
          <a 
            href="https://www.skydivebovec.com/sl"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-10 py-5 bg-forest text-white font-bold rounded-full hover:bg-forest/90 hover:scale-105 transition-all uppercase tracking-widest text-sm shadow-xl shadow-forest/20 group"
          >
            Visit Skydive Bovec <ExternalLink size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to experience Bovec from the sky?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-beige min-h-screen">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/cycling-hero/1920/1080" 
          alt="Cycling in the Julian Alps" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Cycling in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-xl text-forest leading-relaxed">
              Cycling in Bovec offers breathtaking alpine scenery, legendary mountain climbs, and peaceful valley rides along the emerald Soca River. Whether you are a road cyclist, mountain biker, or leisure rider, Bovec provides routes for every level.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/cycling-intro/800/600" 
              alt="Cycling adventure" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. ROAD CYCLING ROUTES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-forest mb-16 uppercase tracking-widest">Road Cycling Routes</h2>
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
                  <h3 className="text-3xl font-bold text-forest">{route.title}</h3>
                  <div className="grid grid-cols-2 gap-6">
                    {route.elevation && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-1">Elevation</p>
                        <p className="font-semibold">{route.elevation}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-1">Difficulty</p>
                      <p className="font-semibold">{route.difficulty}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-2">Highlights</p>
                    <ul className="space-y-2">
                      {route.highlights.map((h, idx) => (
                        <li key={idx} className="flex items-center text-forest/80">
                          <Check size={16} className="text-accent mr-3" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex-1 w-full aspect-video rounded-2xl overflow-hidden shadow-xl">
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
      <section className="py-24 px-4 md:px-16 max-w-7xl mx-auto">
        <h2 className="font-heading text-4xl font-bold text-center text-forest mb-16 uppercase tracking-widest">Mountain Biking</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {mtbRoutes.map((route) => (
            <motion.div 
              key={route.id}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-forest/5"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={route.image} 
                  alt={route.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-forest">{route.title}</h3>
                <p className="text-forest/70 text-sm">{route.description}</p>
                <div className="pt-2">
                  <p className="text-xs uppercase tracking-widest text-forest/50 font-bold mb-1">Difficulty</p>
                  <p className="font-semibold text-sm">{route.difficulty}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. CYCLING ACTIVITIES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-beige">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-heading text-4xl font-bold text-center text-forest mb-16 uppercase tracking-widest">Cycling Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Compass className="text-accent" />, title: "Guided mountain biking tours" },
              { icon: <Users className="text-accent" />, title: "Road cycling group tours" },
              { icon: <Zap className="text-accent" />, title: "E-bike rentals" },
              { icon: <MapIcon className="text-accent" />, title: "GPS route planning" },
              { icon: <Settings className="text-accent" />, title: "Bike rental shops" },
              { icon: <Heart className="text-accent" />, title: "MTB skills courses" },
              { icon: <Calendar className="text-accent" />, title: "Multi-day cycling adventures" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="bg-white p-8 rounded-2xl shadow-sm text-center space-y-4 border border-forest/5"
              >
                <div className="w-12 h-12 bg-beige rounded-xl flex items-center justify-center mx-auto">
                  {item.icon}
                </div>
                <p className="font-bold text-forest text-sm leading-snug">{item.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHY CYCLE IN BOVEC SECTION */}
      <section className="py-24 px-4 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
            <img 
              src="https://picsum.photos/seed/cycling-scenic/800/600" 
              alt="Scenic alpine cycling" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-widest">Why Cycle in Bovec?</h2>
            <ul className="space-y-6">
              {[
                "Clean alpine air",
                "Light traffic",
                "Diverse terrain for all levels",
                "Spectacular Julian Alps views",
                "Combination of adventure and tranquility"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-forest/80">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to explore Bovec by bike?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      image: "https://picsum.photos/seed/soca-rafting/800/600"
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
      image: "https://picsum.photos/seed/soca-kayak/800/600"
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
      image: "https://picsum.photos/seed/soca-canyon/800/600"
    }
  ];

  return (
    <div className="bg-beige min-h-screen">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/soca-hero/1920/1080" 
          alt="Turquoise Soca River" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Soca River Adventures
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-xl text-forest leading-relaxed">
              The Soca River is the jewel of the Julian Alps and the center of outdoor adventure in Bovec. Its crystal-clear emerald water offers unforgettable experiences for adrenaline lovers and nature enthusiasts alike.
            </p>
            <p className="text-xl text-forest leading-relaxed">
              From exciting white-water rafting to canyoning in hidden gorges and scenic kayaking routes — the Soca River offers something for everyone.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/soca-intro/800/600" 
              alt="Emerald Soca River" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. MAIN ACTIVITIES SECTION */}
      <section className="py-24 px-4 md:px-16 bg-white overflow-hidden">
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
                <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">{activity.title}</h2>
                <p className="text-xl text-forest/70 leading-relaxed">{activity.description}</p>
                <ul className="space-y-4">
                  {activity.highlights.map((h, idx) => (
                    <li key={idx} className="flex items-center text-forest/80">
                      <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Check size={14} className="text-accent" />
                      </div>
                      <span className="font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="py-24 px-4 md:px-16 bg-beige">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]"
          >
            <img 
              src="https://picsum.photos/seed/soca-aerial/800/600" 
              alt="Aerial view of Soca River" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          <div className="space-y-8">
            <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-widest">Why the Soca River is Special</h2>
            <ul className="space-y-6">
              {[
                "Unique emerald color",
                "One of Europe's cleanest alpine rivers",
                "Protected natural environment",
                "Suitable for beginners and professionals",
                "Long adventure season"
              ].map((item, i) => (
                <li key={i} className="flex items-center text-xl text-forest/80">
                  <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <Check size={18} className="text-accent" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. TRUSTED LOCAL PARTNERS SECTION */}
      <section className="py-24 px-4 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl font-bold text-forest mb-6 uppercase tracking-widest">Our Trusted Adventure Partners</h2>
            <p className="text-xl text-forest/70 max-w-2xl mx-auto">
              We cooperate with professional and certified local companies to ensure safe and unforgettable river experiences.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {raftingPartners.map((partner, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -8 }}
                className="bg-beige p-8 rounded-2xl shadow-md border border-forest/5 group"
              >
                <h3 className="text-2xl font-bold text-forest mb-3">{partner.name}</h3>
                <p className="text-forest/70 mb-6 leading-relaxed">{partner.description}</p>
                {partner.website && (
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-accent font-bold uppercase tracking-widest text-sm hover:underline"
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
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready for your Soca River adventure?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const restaurants = [
    {
      name: "Gostilna Sovdat",
      description: "Traditional Slovenian cuisine in a cozy alpine atmosphere.",
      highlights: ["Local meat dishes", "Homemade desserts", "Central location", "Warm hospitality"],
      image: "https://picsum.photos/seed/sovdat/800/600"
    },
    {
      name: "Letni Vrt",
      description: "Relaxed dining with Mediterranean and Slovenian dishes.",
      highlights: ["Seasonal ingredients", "Outdoor terrace", "Vegetarian options"],
      image: "https://picsum.photos/seed/letnivrt/800/600"
    },
    {
      name: "Gostilna pod Lipco",
      description: "Authentic local recipes with generous portions.",
      highlights: ["Grilled specialties", "Family-friendly atmosphere", "Traditional flavors"],
      image: "https://picsum.photos/seed/podlipco/800/600"
    },
    {
      name: "Bistro 9.45",
      description: "A modern and stylish bistro offering creative dishes made from fresh local ingredients in a relaxed alpine setting.",
      highlights: ["Contemporary cuisine", "Fresh seasonal ingredients", "Elegant yet casual atmosphere", "Great for lunch or relaxed dinner"],
      image: "https://picsum.photos/seed/bistro945/800/600"
    },
    {
      name: "Hotel Mangart Restaurant",
      description: "Modern alpine dining experience.",
      highlights: ["Refined Slovenian dishes", "Elegant setting", "Ideal for special occasions"],
      image: "https://picsum.photos/seed/mangart-food/800/600"
    }
  ];

  return (
    <div className="bg-beige min-h-screen">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/bovec-food-hero/1920/1080" 
          alt="Where to Eat in Bovec" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Where to Eat in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-xl text-forest leading-relaxed">
              Bovec offers a charming selection of restaurants where you can enjoy traditional Slovenian cuisine, fresh local ingredients, and warm alpine hospitality. After a day of adventure, there’s nothing better than a relaxed dinner with mountain views and a glass of local wine.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/restaurant-interior/800/600" 
              alt="Restaurant in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. RECOMMENDED RESTAURANTS */}
      <section className="py-24 px-4 md:px-16 bg-white overflow-hidden">
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
                <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">{restaurant.name}</h2>
                <p className="text-xl text-forest/70 leading-relaxed">{restaurant.description}</p>
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {restaurant.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-forest/80">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check size={14} className="text-accent" />
                        </div>
                        <span className="font-semibold">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="py-24 px-4 md:px-16 bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/slovenian-dish/800/600" 
                alt="Local Slovenian dishes" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">What to Try in Bovec</h2>
              <p className="text-xl text-forest/70 leading-relaxed">
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
                  <li key={idx} className="flex items-center text-forest/80">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-accent" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Ready to experience the flavors of Bovec?</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const shops = [
    {
      name: "Od ovce do izdelka",
      description: "A charming local shop offering authentic sheep-based and regional products from the Soca Valley.",
      highlights: ["Local cheeses", "Dairy products", "Traditional specialties", "Authentic Slovenian flavors"],
      image: "https://picsum.photos/seed/sheep-shop/800/600"
    },
    {
      name: "SPAR Bovec",
      description: "Modern supermarket with a wide selection of groceries and daily essentials.",
      highlights: ["Fresh produce", "Bakery section", "Household essentials", "Convenient central location"],
      image: "https://picsum.photos/seed/spar-bovec/800/600"
    },
    {
      name: "Mercator Bovec",
      description: "Local grocery store offering daily shopping convenience.",
      highlights: ["Groceries and beverages", "Local food products", "Snacks for outdoor trips", "Quick and easy shopping"],
      image: "https://picsum.photos/seed/mercator-bovec/800/600"
    },
    {
      name: "Šport Tekstil Bovec",
      description: "Outdoor and sports shop providing clothing and equipment for alpine activities.",
      highlights: ["Hiking apparel", "Outdoor footwear", "Sports gear", "Winter clothing"],
      image: "https://picsum.photos/seed/sport-tekstil/800/600"
    },
    {
      name: "Alpska šola Bovec",
      description: "Professional outdoor and mountaineering shop connected to the local alpine school.",
      highlights: ["Climbing gear", "Via ferrata equipment", "Mountaineering supplies", "Expert local advice"],
      image: "https://picsum.photos/seed/alpska-sola/800/600"
    },
    {
      name: "MERKUR Bovec",
      description: "Hardware and practical supplies store for everyday needs.",
      highlights: ["Tools and maintenance items", "Household products", "Basic repair supplies", "Travel necessities"],
      image: "https://picsum.photos/seed/merkur-bovec/800/600"
    }
  ];

  return (
    <div className="bg-beige min-h-screen">
      <StickyBackButton to="/#activities" />

      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <img 
          src="https://picsum.photos/seed/bovec-shops-hero/1920/1080" 
          alt="Local Shops in Bovec" 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-5xl md:text-7xl font-bold text-white mb-6 uppercase tracking-tight"
          >
            Local Shops in Bovec
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 font-medium"
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
            <p className="text-xl text-forest leading-relaxed">
              Bovec offers a variety of local shops where you can buy fresh food, traditional products, outdoor equipment, and daily essentials. Whether you're preparing for a hiking trip, cooking in your apartment, or looking for authentic local flavors, everything is conveniently located within walking distance.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-2xl aspect-video"
          >
            <img 
              src="https://picsum.photos/seed/shop-interior/800/600" 
              alt="Local shop in Bovec" 
              className="w-full h-full object-cover"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </section>

      {/* 3. FEATURED LOCAL SHOPS */}
      <section className="py-24 px-4 md:px-16 bg-white overflow-hidden">
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
                <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">{shop.name}</h2>
                <p className="text-xl text-forest/70 leading-relaxed">{shop.description}</p>
                <div className="space-y-3">
                  <ul className="space-y-3">
                    {shop.highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-center text-forest/80">
                        <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                          <Check size={14} className="text-accent" />
                        </div>
                        <span className="font-semibold">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
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
      <section className="py-24 px-4 md:px-16 bg-beige overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-12 md:gap-24 items-center"
          >
            <div className="flex-1 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/local-products/800/600" 
                alt="Local products in Bovec" 
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex-1 space-y-6">
              <h2 className="font-heading text-4xl font-bold text-forest uppercase tracking-tight">What You Can Find in Bovec</h2>
              <p className="text-xl text-forest/70 leading-relaxed">
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
                  <li key={idx} className="flex items-center text-forest/80">
                    <div className="w-6 h-6 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <Check size={14} className="text-accent" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. FINAL CTA SECTION */}
      <section className="py-32 px-4 md:px-16 bg-forest text-beige text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="font-heading text-5xl md:text-6xl font-bold uppercase tracking-tight">Everything you need for a comfortable and adventure-filled stay is just steps away.</h2>
          <button 
            onClick={() => navigate('/#contact')}
            className="bg-accent text-white px-12 py-5 rounded-full font-bold text-xl uppercase tracking-widest hover:scale-105 transition-transform shadow-xl shadow-accent/20"
          >
            Book Your Stay
          </button>
        </motion.div>
      </section>
    </div>
  );
};

const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);

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

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen font-sans selection:bg-accent selection:text-white">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apartment/:id" element={<ApartmentDetail />} />
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
    </HashRouter>
  );
}
