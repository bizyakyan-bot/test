import React from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Mountain, 
  Utensils, 
  ArrowRight, 
  Compass, 
  Bike, 
  ShoppingBag,
  Sparkles,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LocalGuideSection = () => {
  const guidePanels = [
    {
      id: 'activities',
      badge: '01. Adrenaline & Water',
      title: 'Activities & Adventure',
      subtitle: 'White-water rafting, canyoning, zipline & skydiving',
      description: 'Experience white-water rafting on the emerald Soča, canyoning plunges in Sušec, zipline over Učja canyon, and tandem skydiving over the Julian Alps.',
      highlights: ['Soča Rafting & Canyoning', 'Bovec Zipline Park', 'Tandem Skydiving', 'In-House E-Bikes'],
      image: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85',
      link: '/activities',
      icon: <Waves className="text-emerald-400" size={24} />,
      btnText: 'Explore Activities'
    },
    {
      id: 'hike-cycle',
      badge: '02. Trails & Rides',
      title: 'Hike & Cycle',
      subtitle: 'Scenic alpine hiking trails & top cycling routes',
      description: 'Explore the famous Soča River Trail, Slap Virje waterfall, Mangart Saddle, Predel Pass road cycling, and thrilling Stol Ridge mountain bike trails.',
      highlights: ['Soča River Trail', 'Slap Virje & Glijun', 'Mangart Alpine Saddle', 'MTB & Road Cycling'],
      image: 'https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=1280&q=80',
      link: '/hike-and-cycle',
      icon: <Mountain className="text-emerald-400" size={24} />,
      btnText: 'Explore Hike & Cycle'
    },
    {
      id: 'restaurants-shops',
      badge: '03. Dining & Stores',
      title: 'Restaurants & Shops',
      subtitle: 'Local dining, coffee spots & essential shops',
      description: 'Discover host-recommended restaurants like Gostilna Sovdat, Kavarna Julian for morning espresso & croissants, local supermarkets, and outdoor gear stores.',
      highlights: ['Kavarna Julian Cafe', 'Gostilna Sovdat & Letni Vrt', 'Bovec Sheep Cheese', 'Supermarkets & Gear'],
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1280&q=80',
      link: '/restaurants-and-shops',
      icon: <Utensils className="text-emerald-400" size={24} />,
      btnText: 'Explore Dining & Shops'
    }
  ];

  return (
    <section id="local-guide" className="py-24 px-4 md:px-16 bg-gradient-to-b from-[#061011] via-[#08181a] to-[#061011] relative text-white border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Compass size={14} /> Curated Bovec & Soča Valley Guide
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Local Guide
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Everything you need for your Bovec adventure — select a guide section below to view activities, hiking & cycling trails, and local dining recommendations.
          </p>
        </div>

        {/* 3 Main Interactive Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guidePanels.map((panel, index) => (
            <motion.div
              key={panel.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group relative flex flex-col justify-between rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-emerald-500/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_30px_rgba(16,185,129,0.2)] bg-slate-900/60"
            >
              {/* Top Banner Image with Gradient */}
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={panel.image} 
                  alt={panel.title} 
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Badge & Icon Floating Header */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-slate-950/80 backdrop-blur-md text-emerald-400 font-extrabold text-[11px] uppercase tracking-wider px-3 py-1 rounded-xl border border-emerald-500/30">
                    {panel.badge}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md">
                    {panel.icon}
                  </div>
                </div>

                {/* Card Title inside image bottom */}
                <div className="absolute bottom-4 left-6 right-6">
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight group-hover:text-emerald-400 transition-colors">
                    {panel.title}
                  </h3>
                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                    {panel.subtitle}
                  </p>
                </div>
              </div>

              {/* Card Body & Description */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-6">
                <p className="text-slate-300 text-sm font-light leading-relaxed">
                  {panel.description}
                </p>

                {/* Highlight Pills */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {panel.highlights.map((h, i) => (
                    <span 
                      key={i} 
                      className="bg-white/5 border border-white/10 text-slate-200 text-xs font-medium px-2.5 py-1 rounded-lg"
                    >
                      {h}
                    </span>
                  ))}
                </div>

                {/* Action CTA Button */}
                <div className="pt-4 border-t border-white/10">
                  <Link
                    to={panel.link}
                    className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 group-hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                  >
                    <span>{panel.btnText}</span>
                    <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
