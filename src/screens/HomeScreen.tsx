import React, { useState } from 'react';
import {
  ArrowRight,
  PlayCircle,
  Plus,
  MapPin,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShieldCheck,
  CircleDollarSign,
  Headphones,
  FileCheck2,
  Star,
  Home,
  CheckCircle2,
} from 'lucide-react';
import {
  HERO_CLIENT_AVATARS,
  HERO_IMAGE,
  NEWSLETTER_IMAGE,
  PROPERTY_TYPES,
  TESTIMONIALS,
} from '../data/properties';
import { Property, PropertyCategory, SearchFilters, ScreenId } from '../types/property';
import { PropertyTypeIllustration } from '../components/Icons';
import { PropertyCard } from '../components/PropertyCard';
import { SafeImage } from '../components/SafeImage';

interface HomeScreenProps {
  properties: Property[];
  savedIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
  onSearchSubmit: (filters: Partial<SearchFilters>) => void;
  onNavigate: (
    screen: ScreenId,
    options?: { category?: PropertyCategory | 'Any Type' }
  ) => void;
  onOpenHowItWorks: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  properties,
  savedIds,
  onToggleSave,
  onSelectProperty,
  onSearchSubmit,
  onNavigate,
  onOpenHowItWorks,
}) => {
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<PropertyCategory | 'Any Type'>('Any Type');
  const [priceRange, setPriceRange] = useState('$0 - $5,000,000+');
  const [beds, setBeds] = useState('Any');
  const [baths, setBaths] = useState('Any');

  const [featuredOffset, setFeaturedOffset] = useState(0);
  const [testimonialPage, setTestimonialPage] = useState(0);

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'error' | 'success'>('idle');

  const featuredList = properties.filter((p) => p.featured);
  const heroProperty =
    properties.find((p) => p.heroFeatured) || properties[0];

  const visibleCount = 5;
  const maxOffset = Math.max(0, featuredList.length - visibleCount);
  const visibleFeatured = featuredList.slice(featuredOffset, featuredOffset + visibleCount);

  const totalTestimonialPages = Math.ceil(TESTIMONIALS.length / 3);
  const visibleTestimonials = TESTIMONIALS.slice(
    testimonialPage * 3,
    testimonialPage * 3 + 3
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit({
      location,
      category,
      priceRange,
      beds,
      baths,
      status: 'All',
    });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      setNewsletterStatus('error');
      return;
    }
    setNewsletterStatus('success');
    setNewsletterEmail('');
  };

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-[#F5F8F6]">
        {/* Architectural Background Image */}
        <div className="relative max-w-[1440px] mx-auto min-h-[500px] lg:min-h-[545px] flex items-center">
          <div className="absolute inset-0">
            <SafeImage
              src={HERO_IMAGE}
              alt="Modern luxury glass house at twilight"
              fallbackLabel="Modern Architectural Residence"
              className="w-full h-full object-cover object-center lg:object-[75%_center]"
            />
            {/* Smooth left atmospheric mist fade matching reference */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.98) 0%, rgba(255,255,255,0.94) 32%, rgba(255,255,255,0.68) 50%, rgba(255,255,255,0.06) 72%, rgba(0,0,0,0.05) 100%)',
              }}
            />
            <div
              className="absolute inset-x-0 bottom-0 h-24"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.35) 100%)',
              }}
            />
          </div>

          <div className="relative z-10 w-full max-w-[1260px] mx-auto px-4 sm:px-6 pt-12 pb-24 lg:pt-14 lg:pb-28 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            {/* Left Copy */}
            <div className="max-w-[540px]">
              <h1 className="font-display text-[36px] sm:text-[46px] lg:text-[52px] font-extrabold leading-[1.12] tracking-tight text-[#14211A] [text-wrap:balance]">
                Find Your Dream Home{' '}
                <span className="block text-[#1B7A4B]">Live Your Best Life</span>
              </h1>
              <p className="mt-4 text-[16px] leading-relaxed text-[#43534A] max-w-[420px]">
                Explore thousands of verified properties and find a place you'll love to call home.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={() => onSearchSubmit({ status: 'All', category: 'Any Type' })}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-[14px] font-semibold shadow-sm transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={onOpenHowItWorks}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-white hover:bg-[#F5F9F7] border border-[#D4DFD9] text-[#14211A] text-[14px] font-semibold shadow-xs transition-colors cursor-pointer whitespace-nowrap"
                >
                  <span>How It Works</span>
                  <PlayCircle className="w-4 h-4 text-[#14211A]" />
                </button>
              </div>

              {/* Client Avatar Proof */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex items-center -space-x-2">
                  {HERO_CLIENT_AVATARS.map((avatar, idx) => (
                    <SafeImage
                      key={idx}
                      src={avatar}
                      alt={`Happy client ${idx + 1}`}
                      variant="avatar"
                      fallbackLabel={`C${idx + 1}`}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-white"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => onNavigate('agents')}
                    aria-label="Meet our client advisors"
                    className="w-9 h-9 rounded-full bg-[#1B7A4B] hover:bg-[#145E39] text-white ring-2 ring-white flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-[13px] font-medium text-[#2A3931]">
                  Trusted by 10,000+ happy clients
                </span>
              </div>
            </div>

            {/* Right Floating Hero Property Card */}
            {heroProperty && (
              <button
                type="button"
                onClick={() => onSelectProperty(heroProperty)}
                className="self-start lg:self-end text-left bg-white/95 backdrop-blur-xs hover:bg-white rounded-2xl p-3.5 pr-5 shadow-[0_18px_40px_-12px_rgba(14,41,30,0.28)] border border-white/80 flex items-center gap-3.5 transition-transform hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="w-11 h-11 rounded-full bg-[#1B7A4B] text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Home className="w-5 h-5" />
                </div>
                <div className="min-w-[140px]">
                  <p className="font-display text-[14px] font-bold text-[#14211A] leading-tight">
                    {heroProperty.title}
                  </p>
                  <p className="text-[11.5px] text-[#617269] mt-0.5">{heroProperty.location}</p>
                  <p className="font-display text-[15px] font-bold text-[#1B7A4B] mt-1 tabular-nums">
                    {heroProperty.priceFormatted}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-[#617269] ml-1 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* FLOATING SEARCH BAR */}
      <section className="relative z-20 max-w-[1260px] mx-auto px-4 sm:px-6 -mt-10">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-[0_14px_38px_-10px_rgba(14,41,30,0.14)] border border-[#E6ECE9] p-3 sm:p-4"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Location */}
            <div className="lg:col-span-3 px-3 py-2 rounded-xl bg-[#FAFCFB] border border-[#E9EFEC] focus-within:border-[#1B7A4B] transition-colors">
              <label className="block text-[11px] font-medium text-[#6B7C73] mb-0.5">
                Location
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter location"
                  className="w-full bg-transparent text-[13.5px] font-medium text-[#14211A] placeholder:text-[#8E9E95] focus:outline-none"
                />
                <MapPin className="w-4 h-4 text-[#6B7C73] shrink-0" />
              </div>
            </div>

            {/* Property Type */}
            <div className="lg:col-span-2 px-3 py-2 rounded-xl bg-[#FAFCFB] border border-[#E9EFEC] focus-within:border-[#1B7A4B] transition-colors">
              <label className="block text-[11px] font-medium text-[#6B7C73] mb-0.5">
                Property Type
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PropertyCategory | 'Any Type')}
                className="w-full bg-transparent text-[13.5px] font-medium text-[#14211A] focus:outline-none cursor-pointer"
              >
                <option value="Any Type">Any Type</option>
                <option value="Apartments">Apartments</option>
                <option value="Houses">Houses</option>
                <option value="Villas">Villas</option>
                <option value="Condos">Condos</option>
                <option value="Townhouses">Townhouses</option>
                <option value="Land">Land</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="lg:col-span-3 px-3 py-2 rounded-xl bg-[#FAFCFB] border border-[#E9EFEC] focus-within:border-[#1B7A4B] transition-colors">
              <label className="block text-[11px] font-medium text-[#6B7C73] mb-0.5">
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-medium text-[#14211A] focus:outline-none cursor-pointer tabular-nums"
              >
                <option value="$0 - $5,000,000+">$0 - $5,000,000+</option>
                <option value="Under $750,000">Under $750,000</option>
                <option value="$750,000 - $1,500,000">$750,000 - $1,500,000</option>
                <option value="$1,500,000 - $3,000,000">$1,500,000 - $3,000,000</option>
                <option value="$3,000,000+">$3,000,000+</option>
              </select>
            </div>

            {/* Beds */}
            <div className="lg:col-span-1 px-3 py-2 rounded-xl bg-[#FAFCFB] border border-[#E9EFEC] focus-within:border-[#1B7A4B] transition-colors">
              <label className="block text-[11px] font-medium text-[#6B7C73] mb-0.5">
                Beds
              </label>
              <select
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-medium text-[#14211A] focus:outline-none cursor-pointer"
              >
                <option value="Any">Any</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Baths */}
            <div className="lg:col-span-1 px-3 py-2 rounded-xl bg-[#FAFCFB] border border-[#E9EFEC] focus-within:border-[#1B7A4B] transition-colors">
              <label className="block text-[11px] font-medium text-[#6B7C73] mb-0.5">
                Baths
              </label>
              <select
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                className="w-full bg-transparent text-[13.5px] font-medium text-[#14211A] focus:outline-none cursor-pointer"
              >
                <option value="Any">Any</option>
                <option value="1+">1+</option>
                <option value="2+">2+</option>
                <option value="3+">3+</option>
                <option value="4+">4+</option>
              </select>
            </div>

            {/* Search Button */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full h-[54px] px-4 rounded-xl bg-[#1B7A4B] hover:bg-[#145E39] text-white text-[13.5px] font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap shadow-xs"
              >
                <span>Search Properties</span>
                <Search className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        </form>
      </section>

      {/* EXPLORE PROPERTY TYPES */}
      <section className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-display text-[22px] sm:text-[24px] font-bold text-[#14211A]">
            Explore Property Types
          </h2>
          <button
            type="button"
            onClick={() => onSearchSubmit({ status: 'All', category: 'Any Type' })}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1B7A4B] hover:text-[#145E39] cursor-pointer whitespace-nowrap"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
          {PROPERTY_TYPES.map((item) => (
            <button
              key={item.type}
              type="button"
              onClick={() => onSearchSubmit({ category: item.type, status: 'All' })}
              className="group bg-white hover:bg-[#F7FBF9] rounded-xl border border-[#E4EAE7] hover:border-[#1B7A4B]/50 p-3.5 flex items-center gap-3 text-left transition-all duration-150 hover:shadow-sm cursor-pointer"
            >
              <PropertyTypeIllustration
                type={item.type}
                className="w-10 h-10 shrink-0 transition-transform duration-200 group-hover:scale-105"
              />
              <div className="min-w-0">
                <p className="font-display text-[13.5px] font-bold text-[#14211A] truncate">
                  {item.type}
                </p>
                <p className="text-[11.5px] text-[#617269] mt-0.5 tabular-nums truncate">
                  {item.countLabel}
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-display text-[22px] sm:text-[24px] font-bold text-[#14211A]">
            Featured Properties
          </h2>
          <button
            type="button"
            onClick={() => onSearchSubmit({ status: 'All', category: 'Any Type' })}
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-[#1B7A4B] hover:text-[#145E39] cursor-pointer whitespace-nowrap"
          >
            <span>View All Properties</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {visibleFeatured.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectProperty}
              />
            ))}
          </div>

          {featuredOffset > 0 && (
            <button
              type="button"
              onClick={() => setFeaturedOffset((o) => Math.max(0, o - 1))}
              aria-label="Previous featured properties"
              className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#DCE4DF] shadow-md items-center justify-center text-[#14211A] hover:text-[#1B7A4B] hover:border-[#1B7A4B] transition-colors cursor-pointer z-10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {featuredOffset < maxOffset && (
            <button
              type="button"
              onClick={() => setFeaturedOffset((o) => Math.min(maxOffset, o + 1))}
              aria-label="Next featured properties"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-[#DCE4DF] shadow-md items-center justify-center text-[#14211A] hover:text-[#1B7A4B] hover:border-[#1B7A4B] transition-colors cursor-pointer z-10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </section>

      {/* WHY CHOOSE HOMEVISTA? */}
      <section className="max-w-[1260px] mx-auto px-4 sm:px-6 py-6">
        <div className="bg-[#F5F7F6] rounded-2xl border border-[#E7ECEA] px-6 sm:px-9 py-8">
          <h2 className="font-display text-[20px] sm:text-[22px] font-bold text-[#14211A] mb-6">
            Why Choose HomeVista?
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE6E1] text-[#1B7A4B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#14211A]">
                  Verified Listings
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5B6B62]">
                  All properties are verified and trusted.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE6E1] text-[#1B7A4B] flex items-center justify-center shrink-0">
                <CircleDollarSign className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#14211A]">
                  Best Price
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5B6B62]">
                  We help you find the best price possible.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE6E1] text-[#1B7A4B] flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#14211A]">
                  Expert Agents
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5B6B62]">
                  Our agents are here to guide you 24/7.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-white border border-[#DCE6E1] text-[#1B7A4B] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6" strokeWidth={1.75} />
              </div>
              <div>
                <h3 className="font-display text-[15px] font-bold text-[#14211A]">
                  Easy Process
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-[#5B6B62]">
                  Simple and transparent from start to finish.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT OUR CLIENTS SAY */}
      <section className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-5">
          <h2 className="font-display text-[22px] sm:text-[24px] font-bold text-[#14211A]">
            What Our Clients Say
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous testimonials"
              onClick={() =>
                setTestimonialPage((p) => (p === 0 ? totalTestimonialPages - 1 : p - 1))
              }
              className="w-8 h-8 rounded-full border border-[#DCE4DF] bg-white hover:border-[#1B7A4B] text-[#3B4C43] hover:text-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonials"
              onClick={() =>
                setTestimonialPage((p) => (p + 1) % totalTestimonialPages)
              }
              className="w-8 h-8 rounded-full border border-[#DCE4DF] bg-white hover:border-[#1B7A4B] text-[#3B4C43] hover:text-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {visibleTestimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl border border-[#E5ECE9] p-5 flex flex-col justify-between shadow-2xs"
            >
              <div className="flex items-start gap-2.5">
                <span
                  aria-hidden="true"
                  className="font-display text-[36px] leading-none font-bold text-[#1B7A4B] select-none -mt-1"
                >
                  “
                </span>
                <p className="text-[13.5px] leading-relaxed text-[#384940]">
                  {item.quote}
                </p>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#F1F5F3] flex items-center justify-between gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <SafeImage
                    src={item.avatar}
                    alt={item.name}
                    variant="avatar"
                    fallbackLabel={item.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="font-display text-[13.5px] font-bold text-[#14211A] truncate">
                      {item.name}
                    </p>
                    <p className="text-[11.5px] text-[#617269] truncate">{item.location}</p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 shrink-0" aria-label={`${item.rating} out of 5 stars`}>
                  {Array.from({ length: item.rating }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER BANNER */}
      <section className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-4 pb-12">
        <div className="relative rounded-2xl overflow-hidden bg-[#0B261A] text-white grid grid-cols-1 lg:grid-cols-12 items-center">
          {/* Left Living Room Image fading into dark green */}
          <div className="relative h-44 lg:h-full lg:col-span-3 overflow-hidden">
            <SafeImage
              src={NEWSLETTER_IMAGE}
              alt="Bright modern living room interior"
              fallbackLabel="Interior Showcase"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(11,38,26,0.08) 0%, rgba(11,38,26,0.72) 72%, rgba(11,38,26,1) 100%)',
              }}
            />
          </div>

          {/* Middle Copy + Right Form */}
          <div className="lg:col-span-9 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-md">
              <h2 className="font-display text-[22px] sm:text-[25px] font-bold leading-snug text-white">
                Get Exclusive Property Updates
              </h2>
              <p className="mt-1.5 text-[13.5px] text-[#B8CCC2]">
                Subscribe to our newsletter and be the first to know about new listings and special offers.
              </p>
            </div>

            <div className="w-full lg:max-w-[460px]">
              {newsletterStatus === 'success' ? (
                <div className="px-4 py-3.5 rounded-xl bg-white/10 border border-emerald-400/40 flex items-center gap-2.5 text-sm text-emerald-100">
                  <CheckCircle2 className="w-5 h-5 text-[#25A063] shrink-0" />
                  <span>You’re subscribed! Watch your inbox for curated HomeVista drops.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className="flex-1 h-12 px-4 rounded-lg bg-white text-[#14211A] placeholder:text-[#7A8B82] text-[13.5px] focus:outline-none focus:ring-2 focus:ring-[#25A063]"
                  />
                  <button
                    type="submit"
                    className="h-12 px-7 rounded-lg bg-[#1B7A4B] hover:bg-[#16643D] text-white text-[14px] font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    Subscribe
                  </button>
                </form>
              )}
              {newsletterStatus === 'error' && (
                <p className="mt-1.5 text-xs text-rose-300">
                  Please enter a valid email address.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
