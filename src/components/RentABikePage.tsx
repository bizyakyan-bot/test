import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bike, Calendar, Clock, MapPin, ShieldCheck, Zap, ArrowLeft, Check, Compass, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EBikeBookingSystem } from './EBikeBookingSystem';
import { ScrollReveal, StaggerContainer, StaggerItem, ScrollScale } from './ScrollEffects';

export const RentABikePage = () => {
  return (
    <div className="bg-[#040c0d] min-h-screen text-white pb-24 pt-28">
      {/* Sticky Top Back Button */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold uppercase tracking-wider transition-all"
        >
          <ArrowLeft size={16} />
          <span>Back to Basecamp Home</span>
        </Link>
      </div>

      {/* Hero Banner */}
      <ScrollScale className="max-w-7xl mx-auto px-4 md:px-16 mb-16">
        <div className="relative rounded-3xl overflow-hidden glass-panel p-8 sm:p-12 md:p-16 border border-emerald-500/20 bg-gradient-to-r from-emerald-950/40 via-teal-950/20 to-black/80 shadow-2xl">
          {/* Ambient light */}
          <div className="absolute -top-10 -right-10 w-80 h-80 bg-emerald-500/15 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-3xl space-y-4 relative z-10">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest">
              <Zap size={14} /> In-House Basecamp Fleet
            </span>

            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight text-white leading-tight">
              Rent a Bike & E-Bike Basecamp
            </h1>

            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              Conquer mountain trails, scenic valley loops, and steep alpine passes. We provide premium E-Bikes and Mountain Bikes with flexible hourly or multi-day rentals, full gear, and free apartment delivery.
            </p>

            {/* Quick Benefits Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <ShieldCheck size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Helmet & Lock Included</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <MapPin size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Free Delivery to Apts</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <Zap size={16} className="text-emerald-400 flex-shrink-0" />
                <span>Bosch 625Wh Motors</span>
              </div>
              <div className="bg-white/5 border border-white/10 p-3 rounded-xl flex items-center gap-2 text-xs font-semibold">
                <Compass size={16} className="text-emerald-400 flex-shrink-0" />
                <span>GPS Route Maps</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollScale>

      {/* Main Reservation Component */}
      <ScrollReveal className="max-w-7xl mx-auto px-4 md:px-16">
        <EBikeBookingSystem />
      </ScrollReveal>

      {/* Recommended Trails & GPS Routes */}
      <div className="max-w-7xl mx-auto px-4 md:px-16 mt-20">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2 block">
            Curated Cycling Adventures
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Top Soča Valley Bike Routes
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: 'Čezsoča & Soča River Loop',
              dist: '14 km • Easy / Leisure',
              time: '1.5 – 2 hours',
              desc: 'Scenic flat trail along the turquoise Soča riverbanks, perfect for families and leisure riders starting directly from Apartment pr Fejtne.',
              img: 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_215336_6f5fe074-5598-494e-a05e-8d7a66ff1981.png&w=1280&q=85'
            },
            {
              name: 'Mangart Saddle E-Climb',
              dist: '36 km • Moderate to Challenging',
              time: '3 – 4 hours',
              desc: 'Ascend Slovenia’s highest paved road with powerful Bosch E-Bike assist, taking in breathtaking views over Italy and Austria.',
              img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80'
            },
            {
              name: 'Koritnica Valley & Fortress Trail',
              dist: '22 km • Moderate Mountain Bike',
              time: '2.5 hours',
              desc: 'Explore historic WW1 Kluže fortress, crystal clear alpine creeks, and pine forest singletracks.',
              img: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&q=80'
            }
          ].map((route, i) => (
            <StaggerItem key={i}>
              <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-48 overflow-hidden">
                    <img src={route.img} alt={route.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                    <div className="absolute top-3 left-3 bg-black/75 px-3 py-1 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-500/30">
                      {route.dist}
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="font-heading text-xl font-bold uppercase tracking-tight text-white">{route.name}</h3>
                    <p className="text-xs text-slate-300 font-light leading-relaxed">{route.desc}</p>
                  </div>
                </div>
                <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5 text-emerald-300 font-semibold"><Clock size={14} /> {route.time}</span>
                  <span className="text-[11px] text-slate-400">GPS Track Provided</span>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </div>
  );
};
