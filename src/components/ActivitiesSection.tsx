import React from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
  Wind, 
  ExternalLink, 
  Bike, 
  Check, 
  ArrowRight, 
  Shield, 
  Zap, 
  Sparkles,
  Compass
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActivitiesSectionProps {
  onOpenInquiry?: (experienceTitle: string) => void;
}

export const ActivitiesSection: React.FC<ActivitiesSectionProps> = () => {
  // Official Partner URLs
  const PARTNERS = {
    AQUA_TOURS: 'https://aquatoursbovec.com/sl/',
    SOCA_ADVENTURE: 'https://www.soca-adventure.com/',
    EVERYTHING_BOVEC: 'https://everythingbovec.com/',
    SOCA_RAFTING: 'https://www.socarafting.si/',
    SKYDIVE_BOVEC: 'https://www.skydivebovec.com/sl/'
  };

  return (
    <section id="activities" className="py-24 px-4 md:px-16 bg-gradient-to-b from-[#061011] via-[#08181a] to-[#061011] relative text-white border-t border-emerald-500/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <Compass size={14} /> Direct Partner Connections & In-House Rentals
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white">
            Activities & Adventures
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Experience the thrilling white-water rapids, high-flying zipline canyons, tandem skydives, and alpine bike rentals directly through our trusted Bovec partners and in-house fleet.
          </p>
        </div>

        {/* ==================== 1. WATER ACTIVITIES (RAFTING & CANYONING COMBINED) ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-black/80 to-black/95 shadow-2xl group"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Image Showcase */}
            <div className="lg:col-span-6 relative h-64 lg:h-full min-h-[320px] overflow-hidden">
              <img
                src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85"
                alt="White Water Rafting & Canyoning in Soča Valley"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/90" />
              
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-emerald-500 text-slate-950 font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-xl shadow-lg">
                  Water Activities Combined
                </span>
                <span className="bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-xl">
                  Rafting & Canyoning
                </span>
              </div>
            </div>

            {/* Content & Direct Partner Booking Buttons */}
            <div className="lg:col-span-6 p-6 sm:p-8 md:p-10 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest">
                  <Waves size={16} /> Soča Water Showcase
                </div>
                
                <h3 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase text-white tracking-tight leading-tight">
                  White-Water Rafting & Canyon Plunges
                </h3>

                <p className="text-slate-300 text-xs sm:text-sm font-light leading-relaxed">
                  Navigate class II–IV emerald white-water rapids through limestone gorges or leap into turquoise waterfall pools and abseil natural rock chutes in Sušec and Fratarica canyons.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>Class II–IV rapids & deep pools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>Waterfall abseiling & slides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>Licensed professional local guides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-emerald-400 flex-shrink-0" />
                    <span>Full neoprene suit & safety gear</span>
                  </div>
                </div>
              </div>

              {/* 3 Partner Action Buttons */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Shield size={14} /> Book Direct via Our 3 Trusted Partners:
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Button 1: Aqua Tours Bovec */}
                  <a
                    href={PARTNERS.AQUA_TOURS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-emerald-500/30 text-center cursor-pointer"
                  >
                    <span>Aqua Tours</span>
                    <ExternalLink size={13} />
                  </a>

                  {/* Button 2: Soča Adventure */}
                  <a
                    href={PARTNERS.SOCA_ADVENTURE}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-emerald-500/30 text-center cursor-pointer"
                  >
                    <span>Soča Adventure</span>
                    <ExternalLink size={13} />
                  </a>

                  {/* Button 3: Everything Bovec */}
                  <a
                    href={PARTNERS.EVERYTHING_BOVEC}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3 px-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all shadow-md hover:shadow-emerald-500/30 text-center cursor-pointer"
                  >
                    <span>Everything Bovec</span>
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </motion.div>

        {/* ==================== 2. OTHER ACTIVITIES GRID (ZIPLINE, SKYDIVING, BIKE RENTAL) ==================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* A) DEDICATED ZIPLINE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800&q=80"
                  alt="Zipline over Učja Gorge in Bovec"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  High-Fly Zipline
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                  Zipline Canyon Flythrough
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Soar over 10 steel zip lines suspended up to 200 meters above the roaring Učja Canyon at speeds up to 60 km/h with panoramic alpine views.
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>10 cables spanning 4 km length</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>200m high above canyon floor</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>Speeds up to 60 km/h with instructors</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-[11px] text-emerald-300 font-semibold text-center">
                Partner: Soča Rafting
              </div>

              <a
                href={PARTNERS.SOCA_RAFTING}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
              >
                <span>Book via Soča Rafting</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* B) DEDICATED SKYDIVING CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215229_27d6bf17-7da2-4df9-8026-b33b2b90e9c1.jpeg&w=1280&q=85"
                  alt="Tandem Skydiving over Bovec Airfield"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-md">
                  Extreme Air Thrill
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                  Tandem Skydiving over Julian Alps
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Experience 60 seconds of pure adrenaline freefall from 4,000 meters altitude above Bovec Airfield with unrivaled 360° views of Mt. Triglav.
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>4,000 meters (13,000 ft) altitude jump</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>60s pure freefall at 200 km/h</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>Certified tandem master + HD video/photo</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-3">
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-[11px] text-emerald-300 font-semibold text-center">
                Partner: Skydive Bovec
              </div>

              <a
                href={PARTNERS.SKYDIVE_BOVEC}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/30 cursor-pointer"
              >
                <span>Book via Skydive Bovec</span>
                <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>

          {/* C) OUR IN-HOUSE BIKE RENTAL CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl overflow-hidden border border-emerald-500/40 bg-gradient-to-br from-emerald-500/10 via-black/80 to-black/95 transition-all duration-300 shadow-2xl flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&q=80"
                  alt="In-House E-Bike Rental in Bovec Basecamp"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061011] via-black/20 to-transparent" />
                <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider shadow-md flex items-center gap-1">
                  <Bike size={12} /> BZC In-House Fleet
                </div>
              </div>

              <div className="p-6 space-y-3">
                <h3 className="font-heading text-2xl font-bold text-white uppercase tracking-tight">
                  Bosch E-Bikes & Bike Rentals
                </h3>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  Explore alpine valleys and river trails with our premium Bosch E-Bikes and mountain bikes. Delivered directly to your apartment door.
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>Bosch Performance 625/750Wh motors</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>Helmets, locks & repair kits included</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-300">
                    <Check size={13} className="text-emerald-400 mr-2 flex-shrink-0" />
                    <span>Free custom GPX trail maps & support</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 space-y-3">
              <div className="bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl text-[11px] text-emerald-300 font-semibold text-center">
                Official BZC Basecamp Service
              </div>

              <Link
                to="/rent-a-bike"
                className="w-full py-3.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] cursor-pointer"
              >
                <span>Rent a Bike</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
