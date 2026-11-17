import React from 'react';
import {
  Search,
  SlidersHorizontal,
  X,
  ArrowUpDown,
  Home,
} from 'lucide-react';
import {
  ListingStatus,
  Property,
  PropertyCategory,
  SearchFilters,
} from '../types/property';
import { PropertyCard } from '../components/PropertyCard';

interface PropertiesScreenProps {
  properties: Property[];
  filters: SearchFilters;
  savedIds: string[];
  onFilterChange: (updates: Partial<SearchFilters>) => void;
  onResetFilters: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectProperty: (property: Property) => void;
}

const CATEGORIES: (PropertyCategory | 'Any Type')[] = [
  'Any Type',
  'Apartments',
  'Houses',
  'Villas',
  'Condos',
  'Townhouses',
  'Land',
];

export const PropertiesScreen: React.FC<PropertiesScreenProps> = ({
  properties,
  filters,
  savedIds,
  onFilterChange,
  onResetFilters,
  onToggleSave,
  onSelectProperty,
}) => {
  const parseMinCount = (val: string) => {
    if (!val || val === 'Any') return 0;
    return parseInt(val.replace('+', ''), 10) || 0;
  };

  const filteredProperties = properties
    .filter((prop) => {
      if (filters.status !== 'All' && prop.status !== filters.status) return false;
      if (filters.category !== 'Any Type' && prop.category !== filters.category) return false;

      if (filters.location.trim()) {
        const q = filters.location.toLowerCase();
        const hay = `${prop.title} ${prop.location} ${prop.city} ${prop.state} ${prop.address}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }

      const minBeds = parseMinCount(filters.beds);
      if (minBeds > 0 && prop.beds < minBeds) return false;

      const minBaths = parseMinCount(filters.baths);
      if (minBaths > 0 && prop.baths < minBaths) return false;

      if (filters.priceRange === 'Under $750,000') {
        if (prop.status === 'For Sale' && prop.price >= 750000) return false;
      } else if (filters.priceRange === '$750,000 - $1,500,000') {
        if (prop.status === 'For Rent' || prop.price < 750000 || prop.price > 1500000)
          return false;
      } else if (filters.priceRange === '$1,500,000 - $3,000,000') {
        if (prop.status === 'For Rent' || prop.price < 1500000 || prop.price > 3000000)
          return false;
      } else if (filters.priceRange === '$3,000,000+') {
        if (prop.status === 'For Rent' || prop.price < 3000000) return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'sqft-desc') return b.sqft - a.sqft;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });

  const hasActiveFilters =
    filters.location !== '' ||
    filters.category !== 'Any Type' ||
    filters.status !== 'All' ||
    filters.priceRange !== '$0 - $5,000,000+' ||
    filters.beds !== 'Any' ||
    filters.baths !== 'Any';

  return (
    <div className="bg-[#FAFBFB] min-h-[75vh]">
      {/* Header Banner */}
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
                Verified Listings Directory
              </p>
              <h1 className="mt-1 font-display text-3xl font-bold text-[#14211A]">
                {filters.status === 'For Sale'
                  ? 'Homes & Estates for Sale'
                  : filters.status === 'For Rent'
                  ? 'Apartments & Homes for Rent'
                  : 'Explore All Properties'}
              </h1>
            </div>

            {/* Buy / Rent / All Segmented Filter */}
            <div className="inline-flex items-center p-1 rounded-xl bg-[#F2F6F4] border border-[#E2EAE6] self-start">
              {(['All', 'For Sale', 'For Rent'] as (ListingStatus | 'All')[]).map((statusOption) => (
                <button
                  key={statusOption}
                  type="button"
                  onClick={() => onFilterChange({ status: statusOption })}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                    filters.status === statusOption
                      ? 'bg-white text-[#14211A] shadow-xs'
                      : 'text-[#5B6B62] hover:text-[#14211A]'
                  }`}
                >
                  {statusOption === 'All' ? 'All Listings' : statusOption}
                </button>
              ))}
            </div>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-3 relative">
              <Search className="w-4 h-4 text-[#6B7C73] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={filters.location}
                onChange={(e) => onFilterChange({ location: e.target.value })}
                placeholder="City, neighborhood, or title..."
                className="w-full h-11 pl-10 pr-3 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
              />
            </div>

            <div className="lg:col-span-2">
              <select
                value={filters.category}
                onChange={(e) =>
                  onFilterChange({ category: e.target.value as PropertyCategory | 'Any Type' })
                }
                aria-label="Property type"
                className="w-full h-11 px-3 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm font-medium text-[#14211A] focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="lg:col-span-3">
              <select
                value={filters.priceRange}
                onChange={(e) => onFilterChange({ priceRange: e.target.value })}
                aria-label="Price range"
                className="w-full h-11 px-3 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm font-medium text-[#14211A] focus:outline-none focus:border-[#1B7A4B] cursor-pointer tabular-nums"
              >
                <option value="$0 - $5,000,000+">All Prices ($0 - $5M+)</option>
                <option value="Under $750,000">Under $750,000</option>
                <option value="$750,000 - $1,500,000">$750,000 - $1,500,000</option>
                <option value="$1,500,000 - $3,000,000">$1,500,000 - $3,000,000</option>
                <option value="$3,000,000+">$3,000,000+</option>
              </select>
            </div>

            <div className="lg:col-span-2 grid grid-cols-2 gap-2">
              <select
                value={filters.beds}
                onChange={(e) => onFilterChange({ beds: e.target.value })}
                aria-label="Minimum beds"
                className="w-full h-11 px-2.5 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm font-medium text-[#14211A] focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
              >
                <option value="Any">Beds: Any</option>
                <option value="1+">1+ Beds</option>
                <option value="2+">2+ Beds</option>
                <option value="3+">3+ Beds</option>
                <option value="4+">4+ Beds</option>
              </select>

              <select
                value={filters.baths}
                onChange={(e) => onFilterChange({ baths: e.target.value })}
                aria-label="Minimum baths"
                className="w-full h-11 px-2.5 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm font-medium text-[#14211A] focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
              >
                <option value="Any">Baths: Any</option>
                <option value="1+">1+ Baths</option>
                <option value="2+">2+ Baths</option>
                <option value="3+">3+ Baths</option>
                <option value="4+">4+ Baths</option>
              </select>
            </div>

            <div className="lg:col-span-2 relative">
              <ArrowUpDown className="w-4 h-4 text-[#6B7C73] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  onFilterChange({ sortBy: e.target.value as SearchFilters['sortBy'] })
                }
                aria-label="Sort listings"
                className="w-full h-11 pl-9 pr-3 rounded-lg bg-[#F7FAF8] border border-[#DDE5E0] text-sm font-medium text-[#14211A] focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
              >
                <option value="featured">Sort: Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="sqft-desc">Largest Sq Ft</option>
              </select>
            </div>
          </div>

          {/* Category Quick Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => onFilterChange({ category: cat })}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  filters.category === cat
                    ? 'bg-[#1B7A4B] text-white'
                    : 'bg-[#F3F6F4] text-[#43534A] hover:bg-[#E7EEEA]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2 text-sm text-[#43534A]">
            <SlidersHorizontal className="w-4 h-4 text-[#1B7A4B]" />
            <span>
              Showing{' '}
              <strong className="text-[#14211A] tabular-nums">
                {filteredProperties.length}
              </strong>{' '}
              verified {filteredProperties.length === 1 ? 'property' : 'properties'}
            </span>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1B7A4B] bg-[#EAF4EE] hover:bg-[#DCEEE3] transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {filteredProperties.length === 0 ? (
          <div className="bg-white rounded-2xl border border-[#E5ECE9] p-12 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-[#F0F6F3] text-[#1B7A4B] flex items-center justify-center mb-4">
              <Home className="w-6 h-6" />
            </div>
            <h2 className="font-display text-xl font-bold text-[#14211A]">
              No matching properties found
            </h2>
            <p className="mt-2 text-sm text-[#5B6B62] max-w-md mx-auto">
              Try broadening your location keyword, price range, or bedroom count to view more verified HomeVista homes.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
            >
              Show All Properties
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                isSaved={savedIds.includes(property.id)}
                onToggleSave={onToggleSave}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
