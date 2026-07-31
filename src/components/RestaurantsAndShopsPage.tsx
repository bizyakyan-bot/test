import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Utensils, 
  Coffee, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Check, 
  ExternalLink, 
  Star, 
  ArrowLeft,
  Compass,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

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

export const RestaurantsAndShopsPage = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'coffee' | 'dining' | 'shops'>('all');

  // Featured Kavarna Julian (Host's #1 Pick)
  const kavarnaJulian = {
    name: 'Kavarna Julian',
    category: 'coffee',
    tag: 'Coffee & Pastries',
    recommendationNote: 'Host’s #1 top pick for morning Italian coffee, freshly baked croissants & local desserts in Bovec main square.',
    distance: 'Bovec Center Square (500m / 5 min walk)',
    hours: '07:30 – 21:00 daily',
    description: 'A vibrant, friendly café in the main square offering rich espresso, freshly baked morning croissants, traditional Slovenian Gibanica cake, and artisan ice cream on a sunny terrace.',
    highlights: ['Fresh morning croissants & pastries', 'Sun-drenched main square terrace', 'Artisan espresso & local cakes', 'Child & dog friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kavarna+Julian+Bovec'
  };

  // Restaurants & Shops Data
  const spots = [
    {
      name: 'Gostilna Sovdat',
      category: 'dining',
      tag: 'Traditional Slovenian',
      distance: '450m from Bovec center',
      hours: '12:00 – 22:00',
      description: 'Authentic local tavern serving mouthwatering Slovenian meat dishes, wild game stews, and homemade Bovec frika cheese pie.',
      highlights: ['Local meat specialties', 'Bovec cheese appetizers', 'Warm alpine hospitality'],
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gostilna+Sovdat+Bovec'
    },
    {
      name: 'Letni Vrt',
      category: 'dining',
      tag: 'Terrace & Grill',
      distance: '550m from center',
      hours: '11:30 – 22:00',
      description: 'Atmospheric garden restaurant featuring wood-fired pizzas, fresh Soča trout, and rich Mediterranean-Slovenian cuisine.',
      highlights: ['Shaded garden seating', 'Fresh Soča trout', 'Great local wines'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Letni+Vrt+Bovec'
    },
    {
      name: 'Gostišče Vančar',
      category: 'dining',
      tag: 'Village Inn in Čezsoča',
      distance: '250m from Apartment pr Fejtne',
      hours: '11:00 – 22:00',
      description: 'Traditional village inn located right in Čezsoča, serving authentic mountain meals just a 3-minute stroll from our apartments.',
      highlights: ['Walkable from Čezsoča apts', 'Authentic cottage feel', 'Local cheese & goulash'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gostisce+Vancar+Cezsoca'
    },
    {
      name: 'Gostilna pod Lipco',
      category: 'dining',
      tag: 'Traditional & Grill',
      distance: '600m from center',
      hours: '12:00 – 21:30',
      description: 'Generous portions of classic Slovenian comfort food served under old linden trees in a friendly family setting.',
      highlights: ['Hearty portions', 'Grilled steaks & trout', 'Great family value'],
      image: 'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Gostilna+pod+Lipco+Bovec'
    },
    {
      name: 'Bistro 9.45',
      category: 'dining',
      tag: 'Modern Alpine Bistro',
      distance: '400m from center',
      hours: '11:00 – 22:00',
      description: 'Stylish, contemporary dining offering creative seasonal menus, craft cocktails, and high-quality local ingredients.',
      highlights: ['Modern gastronomy', 'Creative vegetarian dishes', 'Craft beers & wines'],
      image: 'https://images.unsplash.com/photo-1424847651672-bf2c98a3002f?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Bistro+9.45+Bovec'
    },
    {
      name: 'Od ovce do izdelka',
      category: 'shops',
      tag: 'Local Cheese & Wool',
      distance: '350m from center',
      hours: '09:00 – 18:00',
      description: 'Authentic local artisan boutique offering famous Bovec sheep cheese, cottage cheese, organic wool socks, and traditional crafts.',
      highlights: ['Famous Bovec sheep cheese', 'Handmade woolen goods', '100% regional delicacies'],
      image: 'https://www.slovenec.org/wp-content/uploads/2023/10/Rokodelski-atelje-ustanovljen-od-Drustva-od-ovce-do-izdelka-je-velika-pridobitev-za-Bovec-.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Od+ovce+do+izdelka+Bovec'
    },
    {
      name: 'SPAR Bovec (Polica)',
      category: 'shops',
      tag: 'Supermarket',
      distance: '700m from center',
      hours: '08:00 – 20:00 (Mon-Sat)',
      description: 'Large modern supermarket at the entrance of Bovec with fresh produce, complete bakery, local cheeses, and large parking lot.',
      highlights: ['Full grocery selection', 'Freshly baked bread', 'Spacious parking'],
      image: 'https://www.spar.si/content/dam/sparsiwebsite/mediji/v-bovcu-se-odpira-112-trgovina-spar/nova-trgovina-sparboveclarge.jpg/_jcr_content/renditions/responsive.665.337.0,113,1619,933.noborder.1e623b2782b81839.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SPAR+Bovec'
    },
    {
      name: 'Mercator Bovec',
      category: 'shops',
      tag: 'Supermarket (Center)',
      distance: '400m from center square',
      hours: '07:30 – 19:30 daily',
      description: 'Convenient grocery market right in the center of Bovec for quick daily shopping, cold drinks, trail snacks, and essentials.',
      highlights: ['Central location', 'Snacks & drinks', 'Daily groceries'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bovec_-_Mercator.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercator+Bovec'
    },
    {
      name: 'Šport Tekstil Bovec',
      category: 'shops',
      tag: 'Outdoor Apparel',
      distance: '500m from center',
      hours: '08:30 – 19:00',
      description: 'High-quality technical hiking boots, waterproof rain jackets, cycling jerseys, and alpine apparel for all weather conditions.',
      highlights: ['Top outdoor brands', 'Hiking footwear', 'Weatherproof gear'],
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Sport+Tekstil+Bovec'
    },
    {
      name: 'Alpska šola Bovec',
      category: 'shops',
      tag: 'Mountaineering & Ferrata',
      distance: '600m from center',
      hours: '08:00 – 18:00',
      description: 'Specialized mountain climbing and via ferrata shop offering equipment sales, rentals, topo maps, and alpine safety gear.',
      highlights: ['Via ferrata sets', 'Climbing helmets & harnesses', 'Expert route advice'],
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alpska+sola+Bovec'
    }
  ];

  const filteredSpots = spots.filter(spot => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'coffee') return spot.category === 'coffee';
    if (activeCategory === 'dining') return spot.category === 'dining';
    if (activeCategory === 'shops') return spot.category === 'shops';
    return true;
  });

  return (
    <div className="bg-transparent min-h-screen text-white pt-20">
      <StickyBackButton to="/#local-guide" />

      {/* Hero Header */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80" 
          alt="Restaurants & Shops in Bovec" 
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
            <Utensils size={14} /> Dining, Cafes & Local Shops
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight"
          >
            Restaurants & <span className="text-emerald-400 glow-text-emerald">Shops</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Discover host-recommended dining, coffee spots like Kavarna Julian, local sheep cheese boutiques, and essential outdoor shops.
          </motion.p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 px-4 md:px-16 max-w-7xl mx-auto space-y-16">

        {/* Filter Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all ${
              activeCategory === 'all'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            All Locations
          </button>
          <button
            onClick={() => setActiveCategory('coffee')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeCategory === 'coffee'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Coffee size={14} /> Coffee & Pastries
          </button>
          <button
            onClick={() => setActiveCategory('dining')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeCategory === 'dining'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <Utensils size={14} /> Restaurants & Dining
          </button>
          <button
            onClick={() => setActiveCategory('shops')}
            className={`px-6 py-2.5 rounded-full font-extrabold text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
              activeCategory === 'shops'
                ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
            }`}
          >
            <ShoppingBag size={14} /> Markets & Gear Shops
          </button>
        </div>

        {/* HOST'S #1 FEATURED SPOT: KAVARNA JULIAN */}
        {(activeCategory === 'all' || activeCategory === 'coffee') && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-r from-emerald-500/10 via-black/80 to-black/95 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-6 relative h-64 lg:h-full min-h-[300px]">
                <img 
                  src={kavarnaJulian.image} 
                  alt={kavarnaJulian.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-emerald-500 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 shadow-lg">
                  <Star size={14} className="fill-slate-950" /> Host’s #1 Coffee Pick
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-emerald-400 font-bold uppercase tracking-widest">
                    <Coffee size={16} /> Bovec Town Center Square
                  </div>

                  <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight">
                    {kavarnaJulian.name}
                  </h3>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-medium leading-relaxed">
                    "{kavarnaJulian.recommendationNote}"
                  </div>

                  <p className="text-slate-300 text-sm font-light leading-relaxed">
                    {kavarnaJulian.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
                      <span>{kavarnaJulian.distance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-emerald-400 flex-shrink-0" />
                      <span>{kavarnaJulian.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    {kavarnaJulian.highlights.slice(0, 2).map((h, idx) => (
                      <span key={idx} className="bg-white/5 text-slate-200 text-xs px-2.5 py-1 rounded-lg">
                        {h}
                      </span>
                    ))}
                  </div>
                  <a
                    href={kavarnaJulian.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* SPOTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredSpots.map((spot, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all shadow-2xl flex flex-col justify-between group bg-slate-900/40"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={spot.image} 
                  alt={spot.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-xl bg-slate-950/80 backdrop-blur-md text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider border border-emerald-500/30">
                    {spot.tag}
                  </span>
                </div>

                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                    {spot.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {spot.description}
                </p>

                <div className="space-y-2 text-xs text-slate-300 py-2 border-y border-white/10">
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{spot.distance}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>{spot.hours}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Highlights:</p>
                  <ul className="space-y-1">
                    {spot.highlights.map((h, idx) => (
                      <li key={idx} className="flex items-center text-xs text-slate-300">
                        <Check size={14} className="text-emerald-400 mr-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <a
                    href={spot.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-emerald-500 hover:text-slate-950 border border-white/10 hover:border-emerald-400 text-slate-200 font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all"
                  >
                    <span>View Location on Map</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};
