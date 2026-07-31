import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Waves, Mountain, Compass, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export const LocationMapSection = () => {
  return (
    <section id="location" className="py-24 px-4 md:px-16 bg-transparent text-white relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-xs uppercase tracking-widest">
            <MapPin size={14} /> Prime Alpine Basecamp
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-white">
            Basecamp Location & Maps
          </h2>
          <p className="text-slate-300 text-base md:text-lg font-light leading-relaxed">
            Nestled between emerald waters and majestic Julian Alps peaks in Bovec, Čezsoča, and Soča.
          </p>
        </div>

        {/* Maps & Details Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Apartment Location Cards */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  Čezsoča 21
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Čezsoča+21+5230+Bovec+Slovenia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">Apartment pr Fejtne</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Situated in peaceful Čezsoča village, just a 5-minute walk (250m) to the Soča River beach.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  Soča Valley
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Soča+5232+Bovec+Slovenia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">Apartment Flajs</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Garden-view studio retreat near Soča village with panoramic mountain backdrop and quick access to hiking trails.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3 hover:border-emerald-500/30 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                  Bovec Town Center
                </span>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Bovec+5230+Slovenia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-slate-300 hover:text-emerald-400 flex items-center gap-1 transition-colors"
                >
                  <span>Directions</span>
                  <ExternalLink size={12} />
                </a>
              </div>
              <h3 className="font-heading text-xl font-bold text-white">Apartment Kuhala</h3>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                Spacious family apartment right in Bovec, steps from coffee shops, supermarkets, and adventure offices.
              </p>
            </div>

            {/* Quick Contact Info with Clickable Tel */}
            <div className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-950/20 space-y-3">
              <h4 className="font-bold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                <Navigation size={16} className="text-emerald-400" /> Direct Host Contacts
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <a
                  href="tel:+38670316806"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-emerald-300 font-bold transition-all"
                >
                  <Phone size={14} className="text-emerald-400" />
                  <span>+386 70 316 806</span>
                </a>
                <a
                  href="mailto:bizyakyan@gmail.com"
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-white/10 text-slate-200 font-bold transition-all truncate"
                >
                  <Mail size={14} className="text-emerald-400" />
                  <span className="truncate">bizyakyan@gmail.com</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Google Maps Iframe Embed */}
          <div className="lg:col-span-7 h-[450px] lg:h-auto rounded-3xl overflow-hidden shadow-2xl border border-emerald-500/20 glass-panel relative group">
            <iframe
              title="Soča Valley Basecamp Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44116.71261314981!2d13.513418579101562!3d46.33596850000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477a412c2a0d1e5d%3A0x400f05c1723f5b0!2s5230%20Bovec%2C%20Slovenia!5e0!3m2!1sen!2ssi!4v1700000000000!5m2!1sen!2ssi"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.05) saturate(1.1)' }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full rounded-3xl"
            />
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs font-bold text-white pointer-events-none">
              📍 Bovec • Čezsoča • Soča River
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
