import React, { useState } from 'react';
import {
  ArrowLeft,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Calendar,
  Car,
  Heart,
  Share2,
  Check,
  CheckCircle2,
  Phone,
  Mail,
  Calculator,
  Ruler,
  ShieldCheck,
} from 'lucide-react';
import { Agent, Property } from '../types/property';
import { SafeImage } from '../components/SafeImage';

interface PropertyDetailScreenProps {
  property: Property;
  agent: Agent;
  isSaved: boolean;
  onBack: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onTourBooked: () => void;
}

export const PropertyDetailScreen: React.FC<PropertyDetailScreenProps> = ({
  property,
  agent,
  isSaved,
  onBack,
  onToggleSave,
  onTourBooked,
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [copiedShare, setCopiedShare] = useState(false);

  // Interactive Mortgage Calculator state
  const [downPaymentPct, setDownPaymentPct] = useState(20);
  const [interestRate, setInterestRate] = useState(6.25);
  const [loanYears, setLoanYears] = useState(30);

  // Tour Request form state
  const [tourType, setTourType] = useState<'In-Person' | 'Video Call'>('In-Person');
  const [tourDate, setTourDate] = useState('2026-11-18');
  const [tourName, setTourName] = useState('');
  const [tourEmail, setTourEmail] = useState('');
  const [tourPhone, setTourPhone] = useState('');
  const [tourNotes, setTourNotes] = useState(
    `I would like to schedule a private viewing for ${property.title}.`
  );
  const [tourSubmitted, setTourSubmitted] = useState(false);
  const [tourError, setTourError] = useState('');

  const photos = property.gallery.length > 0 ? property.gallery : [property.image];

  // Monthly mortgage math
  const principal = property.price * (1 - downPaymentPct / 100);
  const monthlyRate = interestRate / 100 / 12;
  const totalPayments = loanYears * 12;
  const estimatedMonthlyMortgage =
    monthlyRate > 0
      ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
        (Math.pow(1 + monthlyRate, totalPayments) - 1)
      : principal / totalPayments;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2200);
  };

  const handleTourSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tourName.trim() || !tourEmail.includes('@')) {
      setTourError('Please enter your name and a valid email address.');
      return;
    }
    setTourError('');
    setTourSubmitted(true);
    onTourBooked();
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen pb-14">
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#2A3931] hover:text-[#1B7A4B] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#DCE5E0] bg-white hover:bg-[#F5F8F6] text-xs font-semibold text-[#14211A] cursor-pointer"
            >
              {copiedShare ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#1B7A4B]" />
                  <span>Link Copied</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={(e) => onToggleSave(property.id, e)}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
                isSaved
                  ? 'border-[#E11D48]/30 bg-rose-50 text-[#E11D48]'
                  : 'border-[#DCE5E0] bg-white hover:bg-[#F5F8F6] text-[#14211A]'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#E11D48]' : ''}`} />
              <span>{isSaved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-7">
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1B7A4B]">
              <span>{property.status}</span>
              <span aria-hidden="true">·</span>
              <span>{property.category}</span>
              <span aria-hidden="true">·</span>
              <span className="inline-flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Listing
              </span>
            </div>
            <h1 className="mt-1.5 font-display text-2xl sm:text-3xl font-bold text-[#14211A]">
              {property.title}
            </h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-[#5B6B62]">
              <MapPin className="w-4 h-4 text-[#1B7A4B] shrink-0" />
              <span>{property.address}</span>
            </p>
          </div>

          <div className="md:text-right">
            <p className="text-xs text-[#617269] font-medium">
              {property.status === 'For Rent' ? 'Monthly Lease' : 'Asking Price'}
            </p>
            <p className="font-display text-3xl font-extrabold text-[#1B7A4B] tabular-nums">
              {property.priceFormatted}
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 mb-8">
          <div className="lg:col-span-9 rounded-2xl overflow-hidden bg-[#EAF0ED] aspect-[16/9] border border-[#E2EAE6]">
            <SafeImage
              src={photos[activePhotoIndex]}
              alt={`${property.title} view ${activePhotoIndex + 1}`}
              fallbackLabel={property.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="lg:col-span-3 grid grid-cols-4 lg:grid-cols-1 gap-3">
            {photos.slice(0, 4).map((photo, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActivePhotoIndex(idx)}
                className={`relative rounded-xl overflow-hidden aspect-[4/3] lg:aspect-auto lg:h-[112px] border-2 transition-all cursor-pointer ${
                  activePhotoIndex === idx
                    ? 'border-[#1B7A4B] ring-2 ring-[#1B7A4B]/20'
                    : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <SafeImage
                  src={photo}
                  alt={`${property.title} thumbnail ${idx + 1}`}
                  fallbackLabel={`View ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Main 2-Column Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Specs, Description, Amenities, Calculator */}
          <div className="lg:col-span-8 space-y-7">
            {/* Key Specifications Strip */}
            <div className="bg-white rounded-2xl border border-[#E4EAE7] p-5 grid grid-cols-2 sm:grid-cols-4 gap-4 tabular-nums">
              {property.category === 'Land' ? (
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                    <Ruler className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-[#617269]">Lot Size</p>
                    <p className="font-display text-sm font-bold text-[#14211A]">
                      {property.lotSize || '2.5 Acres'}
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                      <BedDouble className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#617269]">Bedrooms</p>
                      <p className="font-display text-sm font-bold text-[#14211A]">
                        {property.beds} Beds
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                      <Bath className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-[#617269]">Bathrooms</p>
                      <p className="font-display text-sm font-bold text-[#14211A]">
                        {property.baths} Baths
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                  <Maximize2 className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#617269]">Interior Area</p>
                  <p className="font-display text-sm font-bold text-[#14211A]">
                    {property.sqft.toLocaleString()} sq ft
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-[#617269]">Year Built</p>
                  <p className="font-display text-sm font-bold text-[#14211A]">
                    {property.yearBuilt}
                  </p>
                </div>
              </div>
            </div>

            {/* About Property */}
            <div className="bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-7">
              <h2 className="font-display text-lg font-bold text-[#14211A]">
                About This Property
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-[#43534A]">
                {property.description}
              </p>

              <div className="mt-5 pt-5 border-t border-[#EEF2F0] flex flex-wrap gap-6 text-sm text-[#43534A]">
                <div className="flex items-center gap-2">
                  <Car className="w-4 h-4 text-[#1B7A4B]" />
                  <span>
                    <strong className="text-[#14211A]">Parking:</strong> {property.parking}
                  </span>
                </div>
                {property.lotSize && (
                  <div className="flex items-center gap-2">
                    <Ruler className="w-4 h-4 text-[#1B7A4B]" />
                    <span>
                      <strong className="text-[#14211A]">Lot:</strong> {property.lotSize}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-7">
              <h2 className="font-display text-lg font-bold text-[#14211A] mb-4">
                Key Features & Amenities
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2.5 text-sm text-[#2A3931]"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1B7A4B] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mortgage Payment Estimator (For Sale properties) */}
            {property.status === 'For Sale' && (
              <div className="bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-7">
                <div className="flex items-center gap-2.5 mb-5">
                  <Calculator className="w-5 h-5 text-[#1B7A4B]" />
                  <h2 className="font-display text-lg font-bold text-[#14211A]">
                    Estimated Monthly Payment
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-7 space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-[#2A3931] mb-1.5 tabular-nums">
                        <span>Down Payment ({downPaymentPct}%)</span>
                        <span>
                          ${Math.round((property.price * downPaymentPct) / 100).toLocaleString()}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={5}
                        max={50}
                        step={5}
                        value={downPaymentPct}
                        onChange={(e) => setDownPaymentPct(Number(e.target.value))}
                        className="w-full accent-[#1B7A4B] cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#2A3931] mb-1">
                          Interest Rate (%)
                        </label>
                        <input
                          type="number"
                          step="0.125"
                          min="2"
                          max="12"
                          value={interestRate}
                          onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4DFD9] text-sm tabular-nums focus:outline-none focus:border-[#1B7A4B]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#2A3931] mb-1">
                          Loan Term
                        </label>
                        <select
                          value={loanYears}
                          onChange={(e) => setLoanYears(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-lg border border-[#D4DFD9] text-sm bg-white focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
                        >
                          <option value={30}>30-Year Fixed</option>
                          <option value={15}>15-Year Fixed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-5 p-5 rounded-xl bg-[#F4F8F6] border border-[#DCE7E1]">
                    <p className="text-xs font-medium text-[#5B6B62]">
                      Principal & Interest
                    </p>
                    <p className="mt-1 font-display text-3xl font-extrabold text-[#1B7A4B] tabular-nums">
                      ${Math.round(estimatedMonthlyMortgage).toLocaleString()}
                      <span className="text-sm font-medium text-[#5B6B62]"> /mo</span>
                    </p>
                    <p className="mt-2 text-xs text-[#617269] tabular-nums">
                      Loan amount: ${Math.round(principal).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Agent & Schedule Tour Form */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-5">
            <div className="bg-white rounded-2xl border border-[#E4EAE7] p-6 shadow-xs">
              {/* Listing Agent Card */}
              <div className="flex items-center gap-3.5 pb-5 border-b border-[#EEF2F0]">
                <SafeImage
                  src={agent.avatar}
                  alt={agent.name}
                  variant="avatar"
                  fallbackLabel={agent.name}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold text-[#1B7A4B]">Listing Advisor</p>
                  <h3 className="font-display text-base font-bold text-[#14211A] truncate">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#617269] truncate">{agent.role}</p>
                </div>
              </div>

              <div className="py-3.5 border-b border-[#EEF2F0] space-y-1.5 text-xs text-[#43534A] tabular-nums">
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#1B7A4B]" />
                  <span>{agent.phone}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#1B7A4B]" />
                  <span>{agent.email}</span>
                </p>
              </div>

              {tourSubmitted ? (
                <div className="mt-5 p-4 rounded-xl bg-[#F0F8F3] border border-[#CBE4D5]">
                  <div className="flex items-center gap-2 text-[#1B7A4B] font-display font-bold text-sm">
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>Tour Request Confirmed</span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#384940]">
                    {agent.name} has received your {tourType.toLowerCase()} request for{' '}
                    <strong>{tourDate}</strong> and will send calendar confirmation to{' '}
                    <strong>{tourEmail}</strong>.
                  </p>
                  <button
                    type="button"
                    onClick={() => setTourSubmitted(false)}
                    className="mt-3 text-xs font-semibold text-[#1B7A4B] hover:underline cursor-pointer"
                  >
                    Schedule another time
                  </button>
                </div>
              ) : (
                <form onSubmit={handleTourSubmit} className="mt-5 space-y-3.5">
                  <h3 className="font-display text-base font-bold text-[#14211A]">
                    Schedule a Private Tour
                  </h3>

                  <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#F3F6F4]">
                    {(['In-Person', 'Video Call'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setTourType(type)}
                        className={`py-2 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                          tourType === type
                            ? 'bg-white text-[#14211A] shadow-2xs'
                            : 'text-[#5B6B62]'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={tourDate}
                      onChange={(e) => setTourDate(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D4DFD9] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      value={tourName}
                      onChange={(e) => setTourName(e.target.value)}
                      placeholder="Your full name *"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      value={tourEmail}
                      onChange={(e) => setTourEmail(e.target.value)}
                      placeholder="Email address *"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={tourPhone}
                      onChange={(e) => setTourPhone(e.target.value)}
                      placeholder="Phone number (optional)"
                      className="w-full px-3 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>

                  <div>
                    <textarea
                      rows={3}
                      value={tourNotes}
                      onChange={(e) => setTourNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-[#D4DFD9] text-xs text-[#2A3931] focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>

                  {tourError && <p className="text-xs text-red-600">{tourError}</p>}

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold transition-colors cursor-pointer"
                  >
                    Request Tour
                  </button>
                </form>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
