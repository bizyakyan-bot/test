import React from 'react';
import { motion } from 'motion/react';
import { Compass, Sparkles, Waves, Wind, Bike, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ActivitiesSection } from './ActivitiesSection';

interface ActivitiesPageProps {
  onOpenInquiry?: (activityName?: string) => void;
}

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

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({ onOpenInquiry }) => {
  return (
    <div className="bg-transparent min-h-screen text-white pt-20">
      <StickyBackButton to="/#local-guide" />

      {/* Hero Banner Header */}
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_387shkKkmXDrcfmHjvQKC7VHsui%2Fhf_20260222_214627_1bb348aa-0921-45b8-b0cd-7cba3b6debae.jpeg&w=1280&q=85" 
          alt="Bovec Activities & Adventures" 
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
            <Compass size={14} /> Adrenaline & Water Adventures
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-heading text-4xl sm:text-6xl md:text-7xl font-extrabold text-white uppercase tracking-tight"
          >
            Activities in <span className="text-emerald-400 glow-text-emerald">Bovec</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-base md:text-xl text-slate-200 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Explore white-water rafting on the emerald Soča River, canyoning waterfall plunges, Europe's largest zipline park, and skydiving over the Julian Alps.
          </motion.p>
        </div>
      </section>

      {/* Full Activities Showcase */}
      <div className="relative z-10">
        <ActivitiesSection onOpenInquiry={onOpenInquiry} />
      </div>
    </div>
  );
};
