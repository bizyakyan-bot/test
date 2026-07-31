import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mountain, 
  Bike, 
  Compass, 
  ArrowLeft, 
  Check, 
  MapPin, 
  Clock, 
  Zap, 
  ChevronRight,
  Shield,
  ExternalLink
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { EBikeBookingSystem } from './EBikeBookingSystem';

export const StickyBackButton = ({ to = '/' }: { to?: string }) => (
  <div className="fixed top-24 left-4 md:left-8 z-40">
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/90 text-white font-bold text-xs uppercase tracking-wider border border-white/20 hover:border-emerald-400 hover:text-emerald-400 transition-all shadow-xl backdrop-blur-md"
    >
      <ArrowLeft size={16} /> Back to Guide
    </Link>
  </div>
);

export const HikeAndCyclePage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'all' | 'hiking' | 'cycling'>('all');

  // Hiking Trails Data
  const hikingTrails = [
    {
      id: 'hike-soca-trail',
      name: 'Soča Trail (Soška Pot)',
      category: 'hiking',
      difficulty: 'Easy to Moderate',
      diffColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      distance: '25 km total (Modular 8 km sections)',
      duration: '2 - 7 hrs',
      elevation: '+350m',
      highlight: 'Great Soča Gorge & Suspension Bridges',
      description: 'The legendary river trail connecting Trenta spring to Bovec. Walk through ancient forests, emerald river pools, and wooden footbridges over deep gorges.',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
      tips: ['Modular sections allow easy 2-hour family walks', 'Passes right by Kršovec gorges', 'Wear sturdy trail shoes']
    },
    {
      id: 'hike-virje',
      name: 'Slap Virje & Glijun Spring',
      category: 'hiking',
      difficulty: 'Easy Family Walk',
      diffColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      distance: '3.5 km roundtrip',
      duration: '1 - 1.5 hrs',
      elevation: '+110m',
      highlight: 'Fairytale Emerald Waterfall Pool',
      description: 'Fairytale waterfall dropping into an icy turquoise pool near Plužna village. Follow the path further to discover Izvir Glijuna karst spring.',
      image: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=800&q=80',
      tips: ['Great morning or evening stroll from Bovec', 'Picturesque photo spot', 'Shaded forest trail']
    },
    {
      id: 'hike-mangart',
      name: 'Mangartsko Sedlo Saddle',
      category: 'hiking',
      difficulty: 'Moderate Alpine',
      diffColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      distance: '5 - 8 km ridge loops',
      duration: '2.5 - 4 hrs',
      elevation: '+450m',
      highlight: 'Slovenia’s Highest Alpine Panorama',
      description: 'Drive up Slovenia’s highest road to Mangart Saddle (2,055m) and hike along panoramic alpine ridges overlooking Italy and Austria.',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
      tips: ['Accessible by car/shuttle in summer', 'Uninterrupted 360° Alpine views', 'Bring warm windproof layer']
    },
    {
      id: 'hike-boka',
      name: 'Slap Boka Waterfall Viewpoint',
      category: 'hiking',
      difficulty: 'Moderate Climb',
      diffColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      distance: '4 km roundtrip',
      duration: '1.5 hrs',
      elevation: '+230m',
      highlight: '144m Vertical Waterfall',
      description: 'A rewarding climb to the upper wooden viewpoint of Slovenia’s most magnificent waterfall, cascading 144 meters down sheer limestone cliffs.',
      image: 'https://images.unsplash.com/photo-1434725039720-aaad6dd32dfe?w=800&q=80',
      tips: ['Most impressive in spring & after rain', 'Rocky trail with steps', 'Located 5 min drive from Bovec']
    }
  ];

  // Cycling Routes Data
  const cyclingRoutes = [
    {
      id: 'cycle-soca-trail',
      name: 'Soča River Valley Bike Path',
      category: 'cycling',
      difficulty: 'Easy / Leisure',
      diffColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
      distance: '16 km',
      duration: '1.5 - 2 hrs',
      elevation: '+180m',
      highlight: 'Riverside Riding Čezsoča – Žaga',
      description: 'Gentle, picturesque ride along gravel and quiet paved backroads through Čezsoča and Žaga. Ideal for family e-bike excursions.',
      image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=800&q=80',
      tips: ['Suitable for all bike types & E-bikes', 'Stops at beach picnic spots', 'Direct access from our apartments']
    },
    {
      id: 'cycle-lepena',
      name: 'Lepena Valley Scenic Ride',
      category: 'cycling',
      difficulty: 'Moderate',
      diffColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
      distance: '24 km roundtrip',
      duration: '2.5 hrs',
      elevation: '+380m',
      highlight: 'Great Soča Gorge & Šumnik Grove',
      description: 'Scenic climb through romantic Lepena valley ending at Dom dr. Klementa Juga, featuring crystal clear stream pools.',
      image: 'https://images.unsplash.com/photo-1544192240-4a34fed0104c?w=800&q=80',
      tips: ['Very little traffic', 'Perfect for E-Bike battery range', 'Charming alpine mountain hut at top']
    },
    {
      id: 'cycle-predel',
      name: 'Predel Pass & Lake Predil Challenge',
      category: 'cycling',
      difficulty: 'Hard Road Cycling',
      diffColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
      distance: '36 km roundtrip',
      duration: '3 - 4 hrs',
      elevation: '+980m',
      highlight: 'Cross-Border Alpine Lake Ride',
      description: 'Legendary road climb up Predel mountain pass (1,156m) into Tarvisio, Italy, descending to turquoise Lake Predil.',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?w=800&q=80',
      tips: ['Bring passport for Italian border', 'Exceptional road asphalt quality', 'Stop at Lake Predil beach cafe']
    },
    {
      id: 'cycle-stol',
      name: 'Mt. Stol Ridge MTB Singletrack',
      category: 'cycling',
      difficulty: 'Challenging Mountain Bike',
      diffColor: 'bg-red-500/20 text-red-300 border-red-500/40',
      distance: '28 km loop',
      duration: '3.5 - 5 hrs',
      elevation: '+1,150m',
      highlight: 'Longest Panoramic Ridge in Julian Alps',
      description: 'Epic mountain bike ascent up Mt. Stol ridge, rewarding riders with 360° views stretching from Kanin to the Adriatic Sea.',
      image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&q=80',
      tips: ['Requires solid MTB technique or E-MTB', 'Unmatched ridge panoramas', 'Download offline GPS GPX track']
    }
  ];

  return (
    <div className="bg-transparent min-h-screen text-white pt-20">
      <StickyBackButton to="/#local-guide" />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1920&q=80" 
          alt="Hike & Cycle in Bovec" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-[#061011]/60 to-black/50" />
        
        <div className="relative z-10 text-center px-4 max-w-4xl space-y-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-widest backdrop-blur-md"
          >
            <Mountain size={14} /> Trails & Cycling Routes Guide
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight"
          >
            Hike & <span className="text-emerald-400 glow-text-emerald">Cycle</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Discover handpicked hiking trails, river paths, road cycling passes, and mountain bike singletracks in the Julian Alps.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 px-4 md:px-16 max-w-7xl mx-auto space-y-16">

        {/* Filter Tab Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all ${
              activeTab === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            All Trails & Routes
          </button>
          <button
            onClick={() => setActiveTab('hiking')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === 'hiking'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Mountain size={14} /> Hiking Trails
          </button>
          <button
            onClick={() => setActiveTab('cycling')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeTab === 'cycling'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Bike size={14} /> Cycling Routes
          </button>
        </div>

        {/* Rent a Bike Highlight Banner */}
        <div className="glass-panel rounded-3xl p-8 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/10 via-black/80 to-black/90 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
              <Zap size={14} /> In-House E-Bike Rental Available
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase text-white">
              Need a High-End Bosch E-Bike or Mountain Bike?
            </h3>
            <p className="text-slate-300 text-sm max-w-2xl font-light">
              We provide brand-new Bosch powered electric bikes delivered directly to your apartment with helmet, heavy lock, and trail GPS routes.
            </p>
          </div>
          <Link
            to="/rent-a-bike"
            className="px-8 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest whitespace-nowrap shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5"
          >
            Rent a Bike Now →
          </Link>
        </div>

        {/* HIKING TRAILS SECTION */}
        {(activeTab === 'all' || activeTab === 'hiking') && (
          <div className="space-y-10">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Mountain size={20} />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-extrabold uppercase text-white tracking-tight">
                  Top Recommended Hiking Trails
                </h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Alpine Gorges, Waterfalls & Mountain Peaks</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {hikingTrails.map((trail) => (
                <motion.div
                  key={trail.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all shadow-2xl flex flex-col justify-between group bg-slate-900/40"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={trail.image} 
                      alt={trail.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-xl font-extrabold text-[11px] uppercase tracking-wider border backdrop-blur-md ${trail.diffColor}`}>
                        {trail.difficulty}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                        {trail.name}
                      </h3>
                      <p className="text-emerald-400 text-xs font-semibold">{trail.highlight}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {trail.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Distance</p>
                        <p className="text-xs font-bold text-white mt-0.5">{trail.distance}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Duration</p>
                        <p className="text-xs font-bold text-white mt-0.5">{trail.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Elevation</p>
                        <p className="text-xs font-bold text-white mt-0.5">{trail.elevation}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Local Tips & Highlights:</p>
                      <ul className="space-y-1.5">
                        {trail.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-center text-xs text-slate-300">
                            <Check size={14} className="text-emerald-400 mr-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* CYCLING ROUTES SECTION */}
        {(activeTab === 'all' || activeTab === 'cycling') && (
          <div className="space-y-10 pt-8">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Bike size={20} />
              </div>
              <div>
                <h2 className="font-heading text-3xl font-extrabold uppercase text-white tracking-tight">
                  Top Cycling & Mountain Bike Routes
                </h2>
                <p className="text-xs text-slate-400 uppercase tracking-widest">Valley Paths, Mountain Passes & MTB Trails</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {cyclingRoutes.map((route) => (
                <motion.div
                  key={route.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all shadow-2xl flex flex-col justify-between group bg-slate-900/40"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img 
                      src={route.image} 
                      alt={route.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-xl font-extrabold text-[11px] uppercase tracking-wider border backdrop-blur-md ${route.diffColor}`}>
                        {route.difficulty}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-6 right-6">
                      <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                        {route.name}
                      </h3>
                      <p className="text-emerald-400 text-xs font-semibold">{route.highlight}</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                    <p className="text-slate-300 text-sm font-light leading-relaxed">
                      {route.description}
                    </p>

                    <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/10 text-center">
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Distance</p>
                        <p className="text-xs font-bold text-white mt-0.5">{route.distance}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Duration</p>
                        <p className="text-xs font-bold text-white mt-0.5">{route.duration}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase text-emerald-400 font-bold tracking-widest">Elevation</p>
                        <p className="text-xs font-bold text-white mt-0.5">{route.elevation}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase font-bold text-slate-400 tracking-wider">Route Highlights & Tips:</p>
                      <ul className="space-y-1.5">
                        {route.tips.map((tip, idx) => (
                          <li key={idx} className="flex items-center text-xs text-slate-300">
                            <Check size={14} className="text-emerald-400 mr-2 flex-shrink-0" />
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
