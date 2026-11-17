import React from 'react';
import { BedDouble, Bath, Maximize2, Heart, MapPin, Ruler } from 'lucide-react';
import { Property } from '../types/property';
import { SafeImage } from './SafeImage';

interface PropertyCardProps {
  property: Property;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelect: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSaved,
  onToggleSave,
  onSelect,
}) => {
  return (
    <article
      onClick={() => onSelect(property)}
      className="group bg-white rounded-xl border border-[#E4EAE7] overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(14,41,30,0.14)] flex flex-col"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EEF3F0]">
        <SafeImage
          src={property.image}
          alt={property.title}
          fallbackLabel={property.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-white/95 text-[#14211A] text-[11px] font-semibold tracking-tight shadow-xs">
          {property.status}
        </span>

        <button
          type="button"
          onClick={(e) => onToggleSave(property.id, e)}
          aria-label={isSaved ? `Remove ${property.title} from saved` : `Save ${property.title}`}
          className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 hover:bg-white flex items-center justify-center shadow-xs transition-transform active:scale-95 cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isSaved ? 'fill-[#E11D48] text-[#E11D48]' : 'text-[#4B5B53]'
            }`}
          />
        </button>
      </div>

      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-display text-[15px] font-bold text-[#14211A] leading-snug truncate group-hover:text-[#1B7A4B] transition-colors">
            {property.title}
          </h3>
          <div className="mt-1 flex items-center gap-1 text-[12px] text-[#617269]">
            <MapPin className="w-3.5 h-3.5 shrink-0 text-[#73847B]" />
            <span className="truncate">{property.location}</span>
          </div>
          <div className="mt-2.5 font-display text-[17px] font-bold text-[#1B7A4B] tabular-nums">
            {property.priceFormatted}
          </div>
        </div>

        <div className="mt-3.5 pt-3 border-t border-[#EEF2F0] flex items-center justify-between gap-2 text-[11.5px] text-[#5B6B62] tabular-nums">
          {property.category === 'Land' ? (
            <>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Ruler className="w-3.5 h-3.5 text-[#7A8B82]" />
                {property.lotSize || '2.5 Acres'}
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Maximize2 className="w-3.5 h-3.5 text-[#7A8B82]" />
                {property.sqft.toLocaleString()} sq ft
              </span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <BedDouble className="w-3.5 h-3.5 text-[#7A8B82]" />
                {property.beds} Beds
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Bath className="w-3.5 h-3.5 text-[#7A8B82]" />
                {property.baths} Baths
              </span>
              <span className="flex items-center gap-1 whitespace-nowrap">
                <Maximize2 className="w-3.5 h-3.5 text-[#7A8B82]" />
                {property.sqft.toLocaleString()} sq ft
              </span>
            </>
          )}
        </div>
      </div>
    </article>
  );
};
