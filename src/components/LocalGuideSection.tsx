import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Coffee, Utensils, ShoppingBag, MapPin, Clock, Star, ExternalLink, Compass, Check, ArrowRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LocalGuideSection = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'coffee' | 'dining' | 'groceries' | 'gear'>('all');

  const kavarnaJulian = {
    name: 'Kavarna Julian',
    category: 'coffee',
    tag: 'Coffee & Pastries',
    recommendationNote: 'Our top pick for morning coffee and local pastries in Bovec center',
    distance: '500m from Bovec center (5 min walk / 2 min drive)',
    hours: '07:30 – 21:00 daily',
    description: 'A cozy, vibrant café in the main square offering aromatic Italian-style coffee, freshly baked croissants, homemade ice cream, and traditional Slovenian Gibanica cake.',
    highlights: ['Fresh morning croissants & pastries', 'Sun-drenched outdoor terrace', 'Artisan coffee & local cakes', 'Child & dog friendly'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80',
    location: 'Trg golobarskih žrtev 18, 5230 Bovec'
  };

  const localSpots = [
    {
      name: 'Gostilna Sovdat',
      category: 'dining',
      tag: 'Traditional Slovenian',
      distance: '450m from center',
      hours: '12:00 – 22:00',
      description: 'Authentic local tavern serving mouthwatering Slovenian meat dishes, wild game stews, and homemade Bovec frika.',
      highlights: ['Local meat specialties', 'Bovec cheese appetizers', 'Warm alpine hospitality'],
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=600&q=80'
    },
    {
      name: 'Letni Vrt',
      category: 'dining',
      tag: 'Terrace & Grill',
      distance: '550m from center',
      hours: '11:30 – 22:00',
      description: 'Atmospheric garden restaurant featuring wood-fired pizzas, fresh trout, and rich Mediterranean-Slovenian cuisine.',
      highlights: ['Shaded garden seating', 'Fresh Soča trout', 'Great local wines'],
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80'
    },
    {
      name: 'Gostilna pod Lipco',
      category: 'dining',
      tag: 'Traditional & Grill',
      distance: '600m from center',
      hours: '12:00 – 21:30',
      description: 'Generous portions of classic Slovenian comfort food served under old linden trees in a friendly family setting.',
      highlights: ['Hearty portions', 'Grilled steaks & trout', 'Great family value'],
      image: 'https://images.unsplash.com/photo-1484156818044-c040038b0719?w=600&q=80'
    },
    {
      name: 'Bistro 9.45',
      category: 'dining',
      tag: 'Modern Alpine Bistro',
      distance: '400m from center',
      hours: '11:00 – 22:00',
      description: 'Stylish, contemporary dining offering creative seasonal menus, craft cocktails, and high-quality local ingredients.',
      highlights: ['Modern gastronomy', 'Creative vegetarian dishes', 'Craft beers & wines'],
      image: 'https://images.unsplash.com/photo-1424847651672-bf2c98a3002f?w=600&q=80'
    },
    {
      name: 'Gostišče Vančar',
      category: 'dining',
      tag: 'Local Spot in Čezsoča',
      distance: '250m from Apartment pr Fejtne',
      hours: '11:00 – 22:00',
      description: 'Traditional village inn located right in Čezsoča, serving authentic mountain meals just a 3-minute stroll from our apartments.',
      highlights: ['Walkable from Čezsoča apts', 'Authentic cottage feel', 'Local cheese & goulash'],
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80'
    },
    {
      name: 'Od ovce do izdelka',
      category: 'groceries',
      tag: 'Local Cheese & Wool',
      distance: '350m from center',
      hours: '09:00 – 18:00',
      description: 'Authentic local artisan boutique offering famous Bovec sheep cheese, cottage cheese, organic wool socks, and local delicacies.',
      highlights: ['Famous Bovec sheep cheese', 'Handmade woolen goods', '100% regional products'],
      image: 'https://www.slovenec.org/wp-content/uploads/2023/10/Rokodelski-atelje-ustanovljen-od-Drustva-od-ovce-do-izdelka-je-velika-pridobitev-za-Bovec-.jpg'
    },
    {
      name: 'SPAR Bovec',
      category: 'groceries',
      tag: 'Supermarket',
      distance: '700m from center',
      hours: '08:00 – 20:00 (Mon-Sat)',
      description: 'Large, modern supermarket stocked with fresh produce, full bakery, cold cuts, beverages, and daily supplies.',
      highlights: ['Full grocery selection', 'Freshly baked bread', 'Free parking lot'],
      image: 'https://www.spar.si/content/dam/sparsiwebsite/mediji/v-bovcu-se-odpira-112-trgovina-spar/nova-trgovina-sparboveclarge.jpg/_jcr_content/renditions/responsive.665.337.0,113,1619,933.noborder.1e623b2782b81839.jpg'
    },
    {
      name: 'Mercator Bovec',
      category: 'groceries',
      tag: 'Local Market',
      distance: '400m from center',
      hours: '07:30 – 19:30 daily',
      description: 'Convenient grocery market in the center of Bovec for quick daily shopping, drinks, and trail snacks.',
      highlights: ['Central location', 'Snacks & drinks', 'Quick checkout'],
      image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Bovec_-_Mercator.jpg'
    },
    {
      name: 'Šport Tekstil Bovec',
      category: 'gear',
      tag: 'Outdoor Apparel',
      distance: '500m from center',
      hours: '08:30 – 19:00',
      description: 'High quality technical hiking boots, waterproof rain jackets, mountain biking shorts, and alpine gear.',
      highlights: ['Top outdoor brands', 'Hiking footwear', 'Weatherproof gear'],
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=600&q=80'
    },
    {
      name: 'Alpska šola Bovec',
      category: 'gear',
      tag: 'Mountaineering & Ferrata',
      distance: '600m from center',
      hours: '08:00 – 18:00',
      description: 'Specialized mountain climbing and via ferrata shop offering equipment sales, rentals, and local mountain guides.',
      highlights: ['Via ferrata sets', 'Climbing helmets & harnesses', 'Expert route advice'],
      image: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=600&q=80'
    }
  ];

  const filteredSpots = localSpots.filter((spot) => {
    if (activeTab === 'all') return true;
    return spot.category === activeTab;
  });

  return (
    <section id="local-guide" className="py-24 px-4 md:px-16 bg-gradient-to-b from-[#061011] via-[#071517] to-[#061011] relative text-white border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-3.5 py-1.5 rounded-full text-xs uppercase tracking-widest mb-3">
              <Compass size={14} /> Curated Basecamp Guide
            </div>
            <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
              Local Guide & Dining
            </h2>
            <p className="text-slate-300 mt-2 max-w-xl text-base md:text-lg font-light">
              Handpicked local coffee spots, authentic dining taverns, regional shops, and supermarkets around Bovec.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/where-to-eat"
              className="px-5 py-2.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>Full Dining Guide</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/local-shops"
              className="px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-slate-200 font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
            >
              <span>All Shops</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* 1. FEATURED HERO HIGHLIGHT: KAVARNA JULIAN */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel p-6 sm:p-8 md:p-10 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-emerald-500/5 to-black/60 shadow-2xl mb-16 relative overflow-hidden group"
        >
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-md">
            <Star size={14} className="fill-amber-300" /> Host's #1 Recommendation
          </div>

          <div className="grid md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <h3 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight">
                {kavarnaJulian.name}
              </h3>

              {/* Personal recommendation note callout box */}
              <div className="bg-amber-500/15 border-l-4 border-amber-400 p-4 rounded-r-2xl text-amber-100 italic text-sm sm:text-base font-medium leading-relaxed">
                "{kavarnaJulian.recommendationNote}"
              </div>

              <p className="text-slate-300 text-sm sm:text-base font-light leading-relaxed">
                {kavarnaJulian.description}
              </p>

              {/* Tags & Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <MapPin size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>{kavarnaJulian.distance}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                  <Clock size={15} className="text-emerald-400 flex-shrink-0" />
                  <span>{kavarnaJulian.hours}</span>
                </div>
              </div>

              {/* Bullet points */}
              <ul className="grid grid-cols-2 gap-2 pt-2">
                {kavarnaJulian.highlights.map((h, i) => (
                  <li key={i} className="flex items-center text-xs text-slate-300">
                    <Check size={14} className="text-amber-400 mr-2 flex-shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-5 h-[260px] md:h-[320px] rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 group-hover:scale-[1.01] transition-transform">
              <img
                src={kavarnaJulian.image}
                alt={kavarnaJulian.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-amber-500/30">
                  Bovec Main Square
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 2. CATEGORY FILTER TABS */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {[
            { id: 'all', label: 'All Local Spots', icon: <Compass size={14} /> },
            { id: 'coffee', label: 'Coffee & Pastries', icon: <Coffee size={14} /> },
            { id: 'dining', label: 'Restaurants & Dining', icon: <Utensils size={14} /> },
            { id: 'groceries', label: 'Shops & Supermarkets', icon: <ShoppingBag size={14} /> },
            { id: 'gear', label: 'Outdoor Gear', icon: <Tag size={14} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 scale-105'
                  : 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* 3. LOCAL SPOTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSpots.map((spot, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-emerald-500/30 hover:scale-[1.01] transition-all duration-300 shadow-xl"
            >
              <div>
                {/* Spot Image */}
                <div className="relative h-48 overflow-hidden">
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

                {/* Spot Content */}
                <div className="p-5 space-y-3">
                  <h4 className="font-heading text-xl font-bold text-white uppercase tracking-tight">
                    {spot.name}
                  </h4>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    {spot.description}
                  </p>

                  <div className="space-y-1.5 pt-2">
                    {spot.highlights.map((h, i) => (
                      <div key={i} className="flex items-center text-[11px] text-slate-300">
                        <Check size={12} className="text-emerald-400 mr-1.5 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Distance & Open Hours Tags */}
              <div className="p-4 bg-black/40 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] text-slate-300 gap-2">
                <div className="flex items-center gap-1.5 text-emerald-300 font-semibold">
                  <MapPin size={13} className="text-emerald-400" />
                  <span>{spot.distance}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Clock size={13} />
                  <span>{spot.hours}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
