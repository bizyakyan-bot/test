import React from 'react';
import { Phone, Calendar, Bike, ShoppingBag, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const MobileStickyBar = ({ onOpenExperienceModal }: { onOpenExperienceModal: () => void }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[110] md:hidden bg-[#061011]/95 backdrop-blur-xl border-t border-emerald-500/20 px-3 py-2.5 shadow-[0_-5px_25px_rgba(0,0,0,0.8)]">
      <div className="flex items-center justify-between gap-2 max-w-md mx-auto">
        {/* Clickable phone call button */}
        <a
          href="tel:+38670316806"
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-emerald-500/15 border border-emerald-500/30 rounded-xl text-emerald-400 active:scale-95 transition-all text-center"
        >
          <Phone size={18} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">+386 70 316 806</span>
        </a>

        {/* Quick Rent Bike link */}
        <Link
          to="/rent-a-bike"
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-white/5 border border-white/10 rounded-xl text-slate-200 active:scale-95 transition-all text-center"
        >
          <Bike size={18} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Rent Bike</span>
        </Link>

        {/* Quick Shop Link */}
        <Link
          to="/shop"
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-white/5 border border-white/10 rounded-xl text-slate-200 active:scale-95 transition-all text-center"
        >
          <ShoppingBag size={18} className="text-emerald-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider mt-0.5">Shop</span>
        </Link>

        {/* Book Experience Modal Button */}
        <button
          onClick={onOpenExperienceModal}
          className="flex-1 flex flex-col items-center justify-center py-2 px-2 bg-emerald-500 text-slate-950 rounded-xl font-extrabold active:scale-95 transition-all text-center shadow-lg shadow-emerald-500/30"
        >
          <Calendar size={18} />
          <span className="text-[10px] font-extrabold uppercase tracking-wider mt-0.5">Book Now</span>
        </button>
      </div>
    </div>
  );
};
