import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Cookie, X, Check, Settings, Info } from 'lucide-react';

export const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Cookie preference options
  const [preferences, setPreferences] = useState({
    necessary: true, // Always true & disabled
    analytics: true,
    marketing: false,
  });

  useEffect(() => {
    // Check if consent decision was already saved
    const savedConsent = localStorage.getItem('bzc_cookie_consent');
    if (!savedConsent) {
      // Show banner after 1 second for smooth entrance
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const consentObj = { necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('bzc_cookie_consent', JSON.stringify(consentObj));
    setShowBanner(false);
  };

  const handleAcceptNecessary = () => {
    const consentObj = { necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem('bzc_cookie_consent', JSON.stringify(consentObj));
    setShowBanner(false);
  };

  const handleSaveCustom = () => {
    const consentObj = { ...preferences, timestamp: new Date().toISOString() };
    localStorage.setItem('bzc_cookie_consent', JSON.stringify(consentObj));
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-[120] pointer-events-auto"
        >
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-slate-950/90 shadow-[0_10px_40px_rgba(0,0,0,0.8)] backdrop-blur-xl space-y-4">
            
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Cookie size={20} />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold uppercase tracking-tight text-white">
                    Nastavitve piškotkov (GDPR)
                  </h4>
                  <p className="text-[11px] text-emerald-400 font-semibold">
                    Spoštujemo vašo zasebnost
                  </p>
                </div>
              </div>
              <button
                onClick={handleAcceptNecessary}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title="Zapri in sprejmi le nujne"
              >
                <X size={16} />
              </button>
            </div>

            {/* Main Text */}
            <p className="text-xs text-slate-300 leading-relaxed font-light">
              Uporabljamo piškotke za zagotavljanje delovanja spletne strani (košarica, rezervacije) ter anonimno analitiko obiska (Google Analytics), da izboljšamo vašo izkušnjo.
            </p>

            {/* Detailed Settings Modal view */}
            {showSettings && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-3 pt-2 border-t border-white/10 text-xs"
              >
                {/* Necessary */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <span className="font-bold text-white block">Nujni piškotki</span>
                    <span className="text-[10px] text-slate-400">Potrebni za delovanje košarice in rezervacij</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                    Vedno aktivno
                  </span>
                </div>

                {/* Analytics */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div>
                    <span className="font-bold text-white block">Analitični piškotki</span>
                    <span className="text-[10px] text-slate-400">Anonimna statistika obiska (Google Analytics)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                    className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                  />
                </div>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition-all shadow-md hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center justify-center gap-1.5"
                >
                  <Check size={14} />
                  <span>Sprejmi vse</span>
                </button>

                <button
                  onClick={handleAcceptNecessary}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider border border-white/10 transition-all"
                >
                  Samo nujne
                </button>
              </div>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="w-full py-1.5 text-center text-[11px] text-slate-400 hover:text-emerald-400 font-medium flex items-center justify-center gap-1 transition-colors"
              >
                <Settings size={12} />
                <span>{showSettings ? 'Skrij podrobnosti' : 'Prilagodi nastavitve piškotkov'}</span>
              </button>
            </div>

            {/* Note about privacy & email protection */}
            <div className="text-[10px] text-slate-400 flex items-center gap-1 pt-1 border-t border-white/5">
              <ShieldCheck size={12} className="text-emerald-400 shrink-0" />
              <span>Piškotki nikoli ne dostopajo do vaših osebnih podatkov ali e-pošte brez vaše privolitve.</span>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
