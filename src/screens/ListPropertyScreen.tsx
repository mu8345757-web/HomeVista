import React, { useState } from 'react';
import { CheckCircle2, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { ListingStatus, Property, PropertyCategory } from '../types/property';
import { PropertyCard } from '../components/PropertyCard';

interface ListPropertyScreenProps {
  onAddProperty: (property: Property) => void;
  onViewProperty: (property: Property) => void;
}

const SAMPLE_PHOTOS: Record<PropertyCategory, string> = {
  Houses:
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=80',
  Villas:
    'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1100&q=80',
  Apartments:
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1100&q=80',
  Condos:
    'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=80',
  Townhouses:
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1100&q=80',
  Land:
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1100&q=80',
};

export const ListPropertyScreen: React.FC<ListPropertyScreenProps> = ({
  onAddProperty,
  onViewProperty,
}) => {
  const [title, setTitle] = useState('Sunlit Architectural Residence');
  const [status, setStatus] = useState<ListingStatus>('For Sale');
  const [category, setCategory] = useState<PropertyCategory>('Houses');
  const [city, setCity] = useState('Austin');
  const [stateCode, setStateCode] = useState('TX');
  const [address, setAddress] = useState('410 Barton Hills Dr, Austin, TX 78704');
  const [price, setPrice] = useState('1250000');
  const [beds, setBeds] = useState('4');
  const [baths, setBaths] = useState('3');
  const [sqft, setSqft] = useState('2450');
  const [description, setDescription] = useState(
    'Thoughtfully renovated residence with white-oak millwork, sunlit corner windows, and manicured outdoor dining terrace.'
  );
  const [error, setError] = useState('');
  const [submittedProp, setSubmittedProp] = useState<Property | null>(null);

  const numericPrice = Math.max(0, Number(price) || 0);
  const formattedPrice =
    status === 'For Rent'
      ? `$${numericPrice.toLocaleString()} /mo`
      : `$${numericPrice.toLocaleString()}`;

  const previewProperty: Property = {
    id: `custom-${Date.now()}`,
    title: title.trim() || 'Untitled Property',
    location: `${city.trim() || 'New York'}, ${stateCode.trim() || 'NY'}`,
    city: city.trim() || 'New York',
    state: stateCode.trim() || 'NY',
    address: address.trim() || '123 Dream Street',
    price: numericPrice,
    priceFormatted: formattedPrice,
    status,
    category,
    beds: Number(beds) || 0,
    baths: Number(baths) || 0,
    sqft: Number(sqft) || 1200,
    yearBuilt: 2025,
    parking: 'Private Garage',
    image: SAMPLE_PHOTOS[category],
    gallery: [SAMPLE_PHOTOS[category]],
    featured: true,
    description,
    amenities: [
      'Verified HomeVista Listing',
      'Smart Thermostat & Locks',
      'Chef Kitchen',
      'Private Outdoor Terrace',
    ],
    agentId: 'agent-1',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !city.trim() || numericPrice <= 0) {
      setError('Please complete the property title, city, and a valid price.');
      return;
    }
    setError('');
    const created = { ...previewProperty, id: `prop-${Date.now()}` };
    onAddProperty(created);
    setSubmittedProp(created);
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen pb-14">
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-9">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
                Sell or Lease with HomeVista
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-[#14211A]">
                List Your Property
              </h1>
              <p className="mt-1.5 text-sm text-[#5B6B62] max-w-xl">
                Publish a verified listing directly to our buyer and renter marketplace with instant live preview.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1B7A4B] bg-[#EAF4EE] px-4 py-2.5 rounded-xl self-start">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Zero hidden listing fees · Verified within 24h</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-8 shadow-2xs">
            {submittedProp ? (
              <div className="py-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#EAF4EE] text-[#1B7A4B] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#14211A]">
                  Your Listing Is Live on HomeVista
                </h2>
                <p className="mt-2 text-sm text-[#5B6B62] max-w-md mx-auto">
                  <strong>{submittedProp.title}</strong> ({submittedProp.priceFormatted}) has been added to our verified marketplace catalog.
                </p>
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => onViewProperty(submittedProp)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
                  >
                    <span>View Live Listing</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSubmittedProp(null)}
                    className="px-5 py-2.5 rounded-lg border border-[#D4DFD9] hover:bg-[#F5F8F6] text-sm font-semibold text-[#14211A] cursor-pointer"
                  >
                    List Another Property
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Listing Type
                    </label>
                    <div className="grid grid-cols-2 gap-2 p-1 rounded-lg bg-[#F2F6F4]">
                      {(['For Sale', 'For Rent'] as ListingStatus[]).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => {
                            setStatus(st);
                            setPrice(st === 'For Rent' ? '4200' : '1250000');
                          }}
                          className={`py-2 rounded-md text-xs font-semibold cursor-pointer transition-colors ${
                            status === st ? 'bg-white text-[#14211A] shadow-2xs' : 'text-[#5B6B62]'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Property Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as PropertyCategory)}
                      className="w-full h-10 px-3 rounded-lg border border-[#D4DFD9] text-sm bg-white focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
                    >
                      <option value="Houses">Houses</option>
                      <option value="Apartments">Apartments</option>
                      <option value="Villas">Villas</option>
                      <option value="Condos">Condos</option>
                      <option value="Townhouses">Townhouses</option>
                      <option value="Land">Land</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Property Headline *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Modern Courtyard Villa in Miami"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      City *
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      State
                    </label>
                    <input
                      type="text"
                      value={stateCode}
                      onChange={(e) => setStateCode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      {status === 'For Rent' ? 'Monthly Rent ($) *' : 'Asking Price ($) *'}
                    </label>
                    <input
                      type="number"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm tabular-nums focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Beds
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={beds}
                      onChange={(e) => setBeds(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm tabular-nums focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Baths
                    </label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      value={baths}
                      onChange={(e) => setBaths(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm tabular-nums focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Square Feet
                    </label>
                    <input
                      type="number"
                      min="100"
                      value={sqft}
                      onChange={(e) => setSqft(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm tabular-nums focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Property Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                  />
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer transition-colors"
                >
                  Publish Property Listing
                </button>
              </form>
            )}
          </div>

          {/* Live Card Preview */}
          <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#43534A]">
              <Sparkles className="w-4 h-4 text-[#1B7A4B]" />
              <span>Live Marketplace Card Preview</span>
            </div>
            <div className="max-w-sm">
              <PropertyCard
                property={previewProperty}
                isSaved={false}
                onToggleSave={(_, e) => e.stopPropagation()}
                onSelect={() => {}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
