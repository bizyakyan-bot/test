import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Users, Phone, Mail, User, Check, Sparkles, Compass, AlertCircle } from 'lucide-react';

export interface ExperienceInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialActivity?: string;
}

export const ACTIVITIES_LIST = [
  'Rafting on the Soča River',
  'Canyoning in Hidden Gorges',
  'Tandem Skydiving above Julian Alps',
  'Guided Alpine Hiking & Triglav Treks',
  'E-Bike & Mountain Bike Guided Tours',
  'Kayaking & River Boarding',
  'Paragliding Tandem Flight',
  'Custom Outdoor Adventure Package'
];

export const ExperienceInquiryModal = ({
  isOpen,
  onClose,
  initialActivity = 'Rafting on the Soča River'
}: ExperienceInquiryModalProps) => {
  const [activity, setActivity] = useState(initialActivity);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isWhatsapp, setIsWhatsapp] = useState(true);
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2');
  const [specialRequests, setSpecialRequests] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialActivity) {
      setActivity(initialActivity);
    }
  }, [initialActivity]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="experience-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
        >
          <div className="fixed inset-0" onClick={onClose} />

          <motion.div
            key="experience-modal-content"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#061113] border border-emerald-500/25 rounded-3xl overflow-hidden max-w-xl w-full p-6 sm:p-8 shadow-[0_0_50px_rgba(16,185,129,0.2)] text-white z-10 my-8"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2.5 rounded-full transition-all border border-white/10 z-20"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8 space-y-5"
              >
                <div className="w-20 h-20 bg-emerald-500/15 border-2 border-emerald-400/50 rounded-full flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-500/20">
                  <Check size={40} />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
                  Inquiry Received!
                </h3>
                <p className="text-slate-300 font-light text-sm sm:text-base leading-relaxed max-w-md mx-auto">
                  Thank you for booking your adventure <span className="text-emerald-400 font-semibold">{activity}</span>. Our Soča Valley Basecamp team will confirm details with you shortly via phone or WhatsApp.
                </p>

                <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 text-xs text-slate-300 space-y-1">
                  <p className="font-bold text-emerald-400 uppercase tracking-widest text-[10px]">Partner Notice</p>
                  <p className="italic">Guided by our trusted local partners (Aqua Tours, Soča Adventure, Everything Bovec).</p>
                </div>

                <button
                  onClick={handleReset}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6 pr-8">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-2">
                    <Compass size={12} /> Direct Basecamp Booking
                  </span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
                    Book / Inquire via Us
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                    Reserve your guided outdoor activity directly through our Soča Valley Hub.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Select Activity */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Select Activity
                    </label>
                    <select
                      value={activity}
                      onChange={(e) => setActivity(e.target.value)}
                      className="w-full p-3 bg-black/60 border border-emerald-500/30 rounded-xl text-white font-semibold text-sm focus:outline-none focus:border-emerald-400 transition-colors"
                    >
                      {ACTIVITIES_LIST.map((act) => (
                        <option key={act} value={act} className="bg-[#081315] text-white">
                          {act}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Personal info grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                        <User size={12} className="text-emerald-400" /> Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                        <Mail size={12} className="text-emerald-400" /> Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                      />
                    </div>
                  </div>

                  {/* Phone & WhatsApp preference */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                        <Phone size={12} className="text-emerald-400" /> Phone Number
                      </label>
                      <label className="flex items-center gap-1.5 text-[11px] text-emerald-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isWhatsapp}
                          onChange={(e) => setIsWhatsapp(e.target.checked)}
                          className="rounded accent-emerald-500"
                        />
                        <span>Has WhatsApp</span>
                      </label>
                    </div>
                    <input
                      type="tel"
                      required
                      placeholder="+386 70 316 806"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                    />
                  </div>

                  {/* Date & Guests grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                        <Calendar size={12} className="text-emerald-400" /> Preferred Date
                      </label>
                      <input
                        type="date"
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center gap-1">
                        <Users size={12} className="text-emerald-400" /> Number of Guests
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, '12+ (Group)'].map((num) => (
                          <option key={num} value={num} className="bg-[#081315]">
                            {num} {num === 1 ? 'person' : 'guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                      Special Requests / Notes (Optional)
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g., Morning slot preferred, beginner level, shoe sizes..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      className="w-full p-3 bg-black/50 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-emerald-400 font-light"
                    />
                  </div>

                  {/* Trusted Local Partners Disclaimer Footer */}
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-slate-300 flex items-start gap-2">
                    <AlertCircle size={14} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Trusted Partnerships:</strong> Guided by our trusted local partners (<em className="text-emerald-300">Aqua Tours, Soča Adventure, Everything Bovec</em>). We handle your reservation directly!
                    </span>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold py-3.5 rounded-xl uppercase tracking-widest text-xs transition-all shadow-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] cursor-pointer mt-2 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending Request...' : 'Submit Inquiry / Reserve'}
                  </button>
                </form>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
