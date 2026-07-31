import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Compass, 
  ExternalLink, 
  Bike, 
  Coffee, 
  Utensils, 
  ShoppingBag, 
  MapPin, 
  Clock, 
  Star, 
  Check, 
  ArrowRight, 
  Mountain, 
  Waves, 
  Wind, 
  Navigation,
  Tag
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const ActivitiesAndGuideSection = () => {
  const [activeGuideTab, setActiveGuideTab] = useState<'all' | 'coffee' | 'dining' | 'groceries' | 'gear'>('all');

  // Adrenaline & Water Activities with Direct Partner Links
  const adrenalineActivities = [
    {
      title: "Rafting on the Soča River",
      category: "Water Adventure",
      partners: "Aqua Tours Bovec & Soča Adventure",
      partnerUrl: "https://www.aquatours.si/",
      image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85",
      description: "Navigate class II-IV emerald white-water rapids through breathtaking limestone canyons with certified guides.",
      highlights: ["Class II-IV rapids", "Full neoprene & safety gear", "Family & group friendly"]
    },
    {
      title: "Canyoning in Hidden Gorges",
      category: "Water & Cliff Adventure",
      partners: "Soča Adventure & Aqua Tours Bovec",
      partnerUrl: "https://soca-adventure.com/",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80",
      description: "Slide down natural rock chutes, jump into turquoise pools, and abseil waterfall drop-offs in Sušec gorge.",
      highlights: ["Natural water slides", "Waterfall abseiling", "Adrenaline plunge pools"]
    },
    {
      title: "Tandem Skydiving over Julian Alps",
      category: "Air Adventure",
      partners: "Everything Bovec",
      partnerUrl: "https://everythingbovec.com/",
      image: "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215229_27d6bf17-7da2-4df9-8026-b33b2b90e9c1.jpeg&w=1280&q=85",
      description: "Experience 60 seconds of thrilling freefall from 4,000 meters above Bovec Airfield with 360° views of Mt. Triglav.",
      highlights: ["4,000m altitude takeoff", "Certified tandem master", "HD video recording available"]
    },
    {
      title: "Kayaking & River Boarding",
      category: "Water Sports",
      partners: "Aqua Tours Bovec & Everything Bovec",
      partnerUrl: "https://www.aquatours.si/",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
      description: "Master the emerald river on sit-on-top kayaks or ride hydro-speed river boards through thrilling wave trains.",
      highlights: ["Beginner kayak courses", "Hydro-speed boards", "Crystal clear river stretches"]
    }
  ];

  // Featured Kavarna Julian
  const kavarnaJulian = {
    name: 'Kavarna Julian',
    category: 'coffee',
    tag: 'Coffee & Pastries',
    recommendationNote: 'Host’s #1 top pick for morning Italian coffee, freshly baked pastries & local desserts in Bovec square.',
    distance: 'Bovec Center Square (500m / 5 min walk)',
    hours: '07:30 – 21:00 daily',
    description: 'A vibrant, friendly café in the main square offering rich espresso, homemade croissants, traditional Slovenian Gibanica cake, and artisan ice cream on a sunny terrace.',
    highlights: ['Fresh morning croissants & pastries', 'Sun-drenched main square terrace', 'Artisan espresso & local cakes', 'Child & dog friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Kavarna+Julian+Bovec'
  };

  // Local Dining & Shops
  const localSpots = [
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
      name: 'Mercator Bovec',
      category: 'groceries',
      tag: 'Supermarket (Center)',
      distance: '400m from center square',
      hours: '07:30 – 19:30 daily',
      description: 'Convenient grocery market right in the center of Bovec for quick daily shopping, cold drinks, trail snacks, and essentials.',
      highlights: ['Central location', 'Snacks & drinks', 'Daily groceries'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bovec_-_Mercator.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Mercator+Bovec'
    },
    {
      name: 'SPAR Bovec (Polica)',
      category: 'groceries',
      tag: 'Supermarket',
      distance: '700m from center',
      hours: '08:00 – 20:00 (Mon-Sat)',
      description: 'Large modern supermarket at the entrance of Bovec with fresh produce, complete bakery, local cheeses, and large parking lot.',
      highlights: ['Full grocery selection', 'Freshly baked bread', 'Spacious parking'],
      image: 'https://www.spar.si/content/dam/sparsiwebsite/mediji/v-bovcu-se-odpira-112-trgovina-spar/nova-trgovina-sparboveclarge.jpg/_jcr_content/renditions/responsive.665.337.0,113,1619,933.noborder.1e623b2782b81839.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=SPAR+Bovec'
    },
    {
      name: 'Od ovce do izdelka',
      category: 'groceries',
      tag: 'Local Cheese & Wool',
      distance: '350m from center',
      hours: '09:00 – 18:00',
      description: 'Authentic local artisan boutique offering famous Bovec sheep cheese, cottage cheese, organic wool socks, and traditional crafts.',
      highlights: ['Famous Bovec sheep cheese', 'Handmade woolen goods', '100% regional delicacies'],
      image: 'https://www.slovenec.org/wp-content/uploads/2023/10/Rokodelski-atelje-ustanovljen-od-Drustva-od-ovce-do-izdelka-je-velika-pridobitev-za-Bovec-.jpg',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Od+ovce+do+izdelka+Bovec'
    },
    {
      name: 'Šport Tekstil Bovec',
      category: 'gear',
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
      category: 'gear',
      tag: 'Mountaineering & Ferrata',
      distance: '600m from center',
      hours: '08:00 – 18:00',
      description: 'Specialized mountain climbing and via ferrata shop offering equipment sales, rentals, topo maps, and alpine safety gear.',
      highlights: ['Via ferrata sets', 'Climbing helmets & harnesses', 'Expert route advice'],
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80',
      mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Alpska+sola+Bovec'
    }
  ];

  const filteredGuideSpots = localSpots.filter((spot) => {
    if (activeGuideTab === 'all') return true;
    return spot.category === activeGuideTab;
  });

  return (
    <section id="activities-guide" className="py-24 px-4 md:px-16 bg-gradient-to-b from-[#061011] via-[#081719] to-[#061011] relative text-white border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* ==================== SECTION HEADER ==================== */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Compass size={14} /> Basecamp Guide & Partner Activities
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Activities & Local Guide
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Direct access to top adrenaline partner adventures, curated hiking & cycling routes, host-recommended dining, and practical local shops.
          </p>
        </div>

        {/* ==================== A) ADRENALINE & WATER ACTIVITIES ==================== */}
        <div className="space-y-8">
          <div className="border-b border-white/10 pb-4 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Direct Booking via Trusted Partners
              </span>
              <h3 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-white flex items-center gap-3">
                <Waves className="text-emerald-400" /> Adrenaline & Water Adventures
              </h3>
            </div>
            <p className="text-xs text-slate-400 max-w-md">
              Official partner links open directly on partner sites. Partners include <strong className="text-emerald-300">Everything Bovec</strong>, <strong className="text-emerald-300">Soča Adventure</strong>, and <strong className="text-emerald-300">Aqua Tours Bovec</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adrenalineActivities.map((act, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={act.image}
                      alt={act.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-black/20 to-transparent" />
                    <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                      {act.category}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <h4 className="font-heading text-xl font-bold text-white uppercase tracking-tight leading-snug">
                      {act.title}
                    </h4>
                    
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {act.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      {act.highlights.map((h, i) => (
                        <div key={i} className="flex items-center text-[11px] text-slate-300">
                          <Check size={12} className="text-emerald-400 mr-2 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Direct Partner Link */}
                <div className="p-5 pt-0 space-y-3">
                  <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-[10.5px] text-emerald-300 font-semibold text-center">
                    Trusted Partner: {act.partners}
                  </div>

                  <a
                    href={act.partnerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
                  >
                    <span>Book Adventure</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* ==================== B) HIKING & CYCLING ROUTES ==================== */}
        <div className="space-y-8">
          <div className="border-b border-white/10 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
              Trail Guides & In-House Bike Fleet
            </span>
            <h3 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-white flex items-center gap-3">
              <Mountain className="text-emerald-400" /> Hiking & Cycling Routes
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Hiking Recommendations Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all shadow-2xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    <Navigation size={14} /> Top Trail Picks
                  </div>
                  <span className="text-xs text-slate-400">Around Bovec & Čezsoča</span>
                </div>

                <h4 className="font-heading text-2xl font-bold uppercase text-white tracking-tight">
                  Recommended Alpine Hiking Trails
                </h4>

                <div className="space-y-4 pt-2">
                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">1. Soča Trail (Soška Pot)</h5>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md">25 km Total / Modular</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light">
                      The famous turquoise river trail from Trenta to Bovec. <em>Local tip:</em> Walk the scenic 8 km section around the Great Soča Gorge.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">2. Slap Virje & Glijun Spring</h5>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md">3 km / 1 hr Easy</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light">
                      Fairytale emerald waterfall pool and icy karst spring near Plužna village. Ideal for relaxed family walks.
                    </p>
                  </div>

                  <div className="bg-black/40 p-4 rounded-2xl border border-white/5 space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-white text-sm">3. Mangartsko Sedlo Ridge</h5>
                      <span className="text-[10px] text-emerald-400 font-bold uppercase bg-emerald-500/10 px-2 py-0.5 rounded-md">Alpine Panorama</span>
                    </div>
                    <p className="text-xs text-slate-300 font-light">
                      Slovenia’s highest panoramic mountain road leading to dramatic summit hikes on the Italian/Austrian border.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <span className="text-xs text-slate-400">Ask us at check-in for detailed GPX maps!</span>
                <Link 
                  to="/hiking"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 border border-white/10 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all"
                >
                  <span>Full Trail Guide</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

            {/* Cycling & In-House E-Bike Promotion Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-black/60 to-black/80 transition-all shadow-2xl space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider">
                    <Bike size={14} /> In-House Rental Fleet
                  </div>
                  <span className="text-xs text-emerald-400 font-bold uppercase">BZC Basecamp Exclusive</span>
                </div>

                <h4 className="font-heading text-2xl font-bold uppercase text-white tracking-tight">
                  Cycling Routes & Bike Rentals
                </h4>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  Explore valley trails starting directly from your apartment doorstep. Our basecamp features premium Bosch E-Bikes and mountain bikes ready for adventure.
                </p>

                {/* Popular Route Badges */}
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-slate-200">
                    <span className="font-semibold">🚲 Čezsoča River Bank Trail</span>
                    <span className="text-emerald-400 text-[11px] font-mono">Flat / Scenic</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-slate-200">
                    <span className="font-semibold">🚵 Koritnica & Kluže Fortress Loop</span>
                    <span className="text-emerald-400 text-[11px] font-mono">18 km / History</span>
                  </div>
                  <div className="flex items-center justify-between bg-black/40 p-3 rounded-xl border border-white/5 text-xs text-slate-200">
                    <span className="font-semibold">⚡ Mangart Pass E-Climb</span>
                    <span className="text-emerald-400 text-[11px] font-mono">1,400m Vertical</span>
                  </div>
                </div>

                <div className="bg-emerald-500/15 border border-emerald-500/30 p-4 rounded-2xl text-emerald-200 text-xs leading-relaxed space-y-1">
                  <p className="font-bold uppercase tracking-wider text-emerald-300">Included with Every Rental:</p>
                  <p>Helmet, heavy-duty lock, repair kit, route recommendations & direct apartment delivery.</p>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <Link
                  to="/rent-a-bike"
                  className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <span>Rent a Bike Now</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>


        {/* ==================== C) WHERE TO EAT & LOCAL SHOPS ==================== */}
        <div className="space-y-12">
          
          {/* Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 block mb-1">
                Dining, Supermarkets & Essentials
              </span>
              <h3 className="font-heading text-3xl font-extrabold uppercase tracking-tight text-white flex items-center gap-3">
                <Utensils className="text-emerald-400" /> Where to Eat & Local Shops
              </h3>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Local Spots', icon: <Compass size={13} /> },
                { id: 'coffee', label: 'Coffee & Pastries', icon: <Coffee size={13} /> },
                { id: 'dining', label: 'Restaurants', icon: <Utensils size={13} /> },
                { id: 'groceries', label: 'Supermarkets', icon: <ShoppingBag size={13} /> },
                { id: 'gear', label: 'Outdoor Gear', icon: <Tag size={13} /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveGuideTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeGuideTab === tab.id
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 1. FEATURED HIGHLIGHT: KAVARNA JULIAN */}
          {(activeGuideTab === 'all' || activeGuideTab === 'coffee') && (
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-500/40 bg-gradient-to-r from-amber-500/15 via-emerald-500/5 to-black/70 shadow-2xl relative overflow-hidden group"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
                <Star size={14} className="fill-amber-300" /> Host's #1 Morning Pick in Bovec Center
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-center">
                <div className="md:col-span-7 space-y-4">
                  <h4 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                    {kavarnaJulian.name}
                  </h4>

                  <div className="bg-amber-500/15 border-l-4 border-amber-400 p-4 rounded-r-2xl text-amber-100 italic text-xs sm:text-sm font-medium leading-relaxed">
                    "{kavarnaJulian.recommendationNote}"
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                    {kavarnaJulian.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-200 bg-black/40 p-2.5 rounded-xl border border-white/10">
                      <MapPin size={15} className="text-emerald-400 flex-shrink-0" />
                      <span>{kavarnaJulian.distance}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-200 bg-black/40 p-2.5 rounded-xl border border-white/10">
                      <Clock size={15} className="text-emerald-400 flex-shrink-0" />
                      <span>{kavarnaJulian.hours}</span>
                    </div>
                  </div>

                  <ul className="grid grid-cols-2 gap-2 pt-2">
                    {kavarnaJulian.highlights.map((h, i) => (
                      <li key={i} className="flex items-center text-xs text-slate-300">
                        <Check size={14} className="text-amber-400 mr-2 flex-shrink-0" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-3">
                    <a
                      href={kavarnaJulian.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-md hover:shadow-amber-500/30 transition-all"
                    >
                      <span>Google Maps Location</span>
                      <ExternalLink size={14} />
                    </a>
                  </div>
                </div>

                <div className="md:col-span-5 h-[240px] md:h-[300px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10">
                  <img
                    src={kavarnaJulian.image}
                    alt={kavarnaJulian.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/70 px-3 py-1 rounded-lg backdrop-blur-md border border-amber-500/30">
                      Bovec Main Square
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* 2. LOCAL DINING & SHOPS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGuideSpots.map((spot, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 hover:scale-[1.01] transition-all duration-300 shadow-xl"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={spot.image}
                      alt={spot.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-emerald-400 border border-emerald-500/30">
                      {spot.tag}
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <h5 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
                      {spot.name}
                    </h5>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">
                      {spot.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      {spot.highlights.map((h, i) => (
                        <div key={i} className="flex items-center text-[11px] text-slate-300">
                          <Check size={12} className="text-emerald-400 mr-1.5 flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-black/40 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-300 gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                      <MapPin size={13} className="text-emerald-400" />
                      <span>{spot.distance}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Clock size={13} />
                      <span>{spot.hours}</span>
                    </div>
                  </div>

                  <a
                    href={spot.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-emerald-400 hover:text-emerald-300 font-bold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>Google Maps</span>
                    <ExternalLink size={12} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
