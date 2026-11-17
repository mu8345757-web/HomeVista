import React, { useState } from 'react';
import {
  X,
  Search,
  CalendarCheck,
  KeyRound,
  Heart,
  Trash2,
  ArrowRight,
  MapPin,
  CheckCircle2,
} from 'lucide-react';
import { Property } from '../types/property';
import { SafeImage } from './SafeImage';

export const HowItWorksModal: React.FC<{
  open: boolean;
  onClose: () => void;
  onExplore: () => void;
}> = ({ open, onClose, onExplore }) => {
  if (!open) return null;

  const steps = [
    {
      num: '01',
      title: 'Search Verified Homes',
      desc: 'Filter by neighborhood, budget, architectural style, and beds across thousands of pre-verified listings.',
      icon: Search,
    },
    {
      num: '02',
      title: 'Schedule Private or Live Video Tours',
      desc: 'Book same-week tours directly with a dedicated local HomeVista advisor — no cold-call broker runaround.',
      icon: CalendarCheck,
    },
    {
      num: '03',
      title: 'Transparent Offer & Closing',
      desc: 'Compare neighborhood comps, calculate exact monthly payments, and close cleanly with digital inspection packets.',
      icon: KeyRound,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#081C14]/55 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E2E9E5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
              How HomeVista Works
            </span>
            <h2 className="mt-1 font-display text-2xl font-bold text-[#14211A]">
              From search to keys in three clear steps
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-[#F3F6F4] hover:bg-[#E5ECE8] flex items-center justify-center text-[#3B4C43] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E6EEEA] flex flex-col"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-[#E7F2EC] text-[#1B7A4B] flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-display text-sm font-bold text-[#95A89E] tabular-nums">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-display text-[15px] font-bold text-[#14211A]">{step.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-[#586A60]">{step.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-5 border-t border-[#EEF2F0] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#617269]">
            Every listing includes verified square footage and neighborhood comps.
          </p>
          <button
            type="button"
            onClick={() => {
              onClose();
              onExplore();
            }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer whitespace-nowrap"
          >
            <span>Explore Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const SavedPropertiesDrawer: React.FC<{
  open: boolean;
  savedProperties: Property[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onSelectProperty: (property: Property) => void;
  onExplore: () => void;
}> = ({ open, savedProperties, onClose, onRemove, onSelectProperty, onExplore }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#081C14]/50 backdrop-blur-xs flex justify-end" onClick={onClose}>
      <aside
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-5 border-b border-[#E5EBE8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Heart className="w-5 h-5 text-[#1B7A4B] fill-[#1B7A4B]/15" />
            <h2 className="font-display text-lg font-bold text-[#14211A]">
              Saved Properties ({savedProperties.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close saved drawer"
            className="w-9 h-9 rounded-full bg-[#F3F6F4] hover:bg-[#E5ECE8] flex items-center justify-center text-[#3B4C43] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {savedProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-14 h-14 rounded-full bg-[#F0F6F3] text-[#1B7A4B] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-display text-base font-bold text-[#14211A]">
                No saved homes yet
              </h3>
              <p className="mt-1.5 text-sm text-[#617269] max-w-xs">
                Tap the heart icon on any listing to save and compare homes side by side.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExplore();
                }}
                className="mt-5 px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
              >
                Browse Properties
              </button>
            </div>
          ) : (
            savedProperties.map((prop) => (
              <div
                key={prop.id}
                className="flex gap-3.5 p-3 rounded-xl border border-[#E5EBE8] hover:border-[#1B7A4B]/40 transition-colors bg-white"
              >
                <div
                  onClick={() => {
                    onClose();
                    onSelectProperty(prop);
                  }}
                  className="w-24 h-20 rounded-lg overflow-hidden shrink-0 cursor-pointer bg-[#EEF3F0]"
                >
                  <SafeImage
                    src={prop.image}
                    alt={prop.title}
                    fallbackLabel={prop.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="font-display text-sm font-bold text-[#14211A] hover:text-[#1B7A4B] truncate text-left cursor-pointer"
                    >
                      {prop.title}
                    </button>
                    <button
                      type="button"
                      onClick={() => onRemove(prop.id)}
                      aria-label={`Remove ${prop.title}`}
                      className="text-[#8B9B92] hover:text-[#E11D48] transition-colors cursor-pointer p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="flex items-center gap-1 text-xs text-[#617269] mt-0.5 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    {prop.location}
                  </p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-display text-sm font-bold text-[#1B7A4B] tabular-nums">
                      {prop.priceFormatted}
                    </span>
                    <span className="text-[11px] text-[#5B6B62] tabular-nums">
                      {prop.beds > 0 ? `${prop.beds} bd · ${prop.baths} ba` : prop.lotSize}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

export const AccountModal: React.FC<{
  open: boolean;
  userEmail: string | null;
  savedCount: number;
  scheduledToursCount: number;
  onClose: () => void;
  onSignIn: (email: string) => void;
  onSignOut: () => void;
}> = ({
  open,
  userEmail,
  savedCount,
  scheduledToursCount,
  onClose,
  onSignIn,
  onSignOut,
}) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    onSignIn(email.trim());
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#081C14]/55 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-[#E2E9E5]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-xl font-bold text-[#14211A]">
            {userEmail ? 'Your HomeVista Account' : 'Sign in to HomeVista'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account modal"
            className="w-8 h-8 rounded-full bg-[#F3F6F4] hover:bg-[#E5ECE8] flex items-center justify-center text-[#3B4C43] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {userEmail ? (
          <div>
            <div className="p-4 rounded-xl bg-[#F4F9F6] border border-[#DCE8E1] flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#1B7A4B] shrink-0" />
              <div className="min-w-0">
                <p className="text-xs text-[#586A60]">Signed in as</p>
                <p className="text-sm font-semibold text-[#14211A] truncate">{userEmail}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl border border-[#E5EBE8]">
                <p className="text-xs text-[#617269]">Saved Homes</p>
                <p className="mt-1 font-display text-xl font-bold text-[#14211A] tabular-nums">
                  {savedCount}
                </p>
              </div>
              <div className="p-3.5 rounded-xl border border-[#E5EBE8]">
                <p className="text-xs text-[#617269]">Tour Requests</p>
                <p className="mt-1 font-display text-xl font-bold text-[#14211A] tabular-nums">
                  {scheduledToursCount}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onSignOut();
                onClose();
              }}
              className="mt-5 w-full py-2.5 px-4 rounded-lg border border-[#D4DFD9] hover:bg-[#F7FAF8] text-sm font-semibold text-[#14211A] cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-sm text-[#586A60]">
              Save favorite homes, track scheduled tours, and receive instant price-drop alerts.
            </p>
            <div>
              <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
              />
              {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
            </div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
