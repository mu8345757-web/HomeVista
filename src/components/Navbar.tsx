import React, { useState, useRef, useEffect } from 'react';
import {
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
} from 'lucide-react';
import { HomeVistaLogo } from './Icons';
import { ListingStatus, PropertyCategory, ScreenId } from '../types/property';

interface NavbarProps {
  currentScreen: ScreenId;
  activeStatusFilter?: ListingStatus | 'All';
  savedCount: number;
  userEmail: string | null;
  onNavigate: (
    screen: ScreenId,
    options?: { status?: ListingStatus | 'All'; category?: PropertyCategory | 'Any Type' }
  ) => void;
  onOpenSaved: () => void;
  onOpenHowItWorks: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  activeStatusFilter,
  savedCount,
  userEmail,
  onNavigate,
  onOpenSaved,
  onOpenHowItWorks,
}) => {
  const [openDropdown, setOpenDropdown] = useState<'buy' | 'rent' | 'pages' | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (
    screen: ScreenId,
    options?: { status?: ListingStatus | 'All'; category?: PropertyCategory | 'Any Type' }
  ) => {
    setOpenDropdown(null);
    setMobileMenuOpen(false);
    onNavigate(screen, options);
  };

  return (
    <header ref={navRef} className="sticky top-0 z-40 bg-white border-b border-[#E5EBE8]">
      {/* Main Navigation Row */}
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => handleLinkClick('home')}
          className="cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1B7A4B] rounded-lg"
          aria-label="HomeVista Home"
        >
          <HomeVistaLogo />
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-[14px] font-medium text-[#2A3931]">
          <button
            type="button"
            onClick={() => handleLinkClick('home')}
            className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentScreen === 'home'
                ? 'text-[#1B7A4B] font-semibold'
                : 'hover:text-[#1B7A4B]'
            }`}
          >
            Home
            {currentScreen === 'home' && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1B7A4B] rounded-full" />
            )}
          </button>

          {/* Buy Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'buy' ? null : 'buy')}
              className={`flex items-center gap-1 py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                currentScreen === 'properties' && activeStatusFilter === 'For Sale'
                  ? 'text-[#1B7A4B] font-semibold'
                  : 'hover:text-[#1B7A4B]'
              }`}
            >
              <span>Buy</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {openDropdown === 'buy' && (
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl border border-[#E2E9E5] shadow-lg py-2 z-50">
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Sale', category: 'Any Type' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  All Homes for Sale
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Sale', category: 'Houses' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Single-Family Houses
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Sale', category: 'Villas' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Luxury Villas
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Sale', category: 'Condos' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Downtown Condos
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Sale', category: 'Land' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Land & Parcels
                </button>
              </div>
            )}
          </div>

          {/* Rent Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'rent' ? null : 'rent')}
              className={`flex items-center gap-1 py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                currentScreen === 'properties' && activeStatusFilter === 'For Rent'
                  ? 'text-[#1B7A4B] font-semibold'
                  : 'hover:text-[#1B7A4B]'
              }`}
            >
              <span>Rent</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {openDropdown === 'rent' && (
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl border border-[#E2E9E5] shadow-lg py-2 z-50">
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Rent', category: 'Any Type' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  All Rentals
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Rent', category: 'Apartments' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Modern Apartments
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'For Rent', category: 'Townhouses' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Townhouses for Rent
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('sell')}
            className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentScreen === 'sell'
                ? 'text-[#1B7A4B] font-semibold'
                : 'hover:text-[#1B7A4B]'
            }`}
          >
            Sell
            {currentScreen === 'sell' && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1B7A4B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('agents')}
            className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentScreen === 'agents'
                ? 'text-[#1B7A4B] font-semibold'
                : 'hover:text-[#1B7A4B]'
            }`}
          >
            Agents
            {currentScreen === 'agents' && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1B7A4B] rounded-full" />
            )}
          </button>

          {/* Pages Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpenDropdown(openDropdown === 'pages' ? null : 'pages')}
              className="flex items-center gap-1 py-1 whitespace-nowrap shrink-0 cursor-pointer hover:text-[#1B7A4B] transition-colors"
            >
              <span>Pages</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-70" />
            </button>
            {openDropdown === 'pages' && (
              <div className="absolute left-0 top-full mt-2 w-52 bg-white rounded-xl border border-[#E2E9E5] shadow-lg py-2 z-50">
                <button
                  type="button"
                  onClick={() =>
                    handleLinkClick('properties', { status: 'All', category: 'Any Type' })
                  }
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Browse All Properties
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOpenDropdown(null);
                    onOpenHowItWorks();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  How HomeVista Works
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick('blog')}
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Market Journal
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick('contact')}
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  Offices & Support
                </button>
                <button
                  type="button"
                  onClick={() => handleLinkClick('signin')}
                  className="w-full text-left px-4 py-2 text-sm text-[#14211A] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] cursor-pointer"
                >
                  {userEmail ? 'Member Account' : 'Sign In / Register'}
                </button>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => handleLinkClick('blog')}
            className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentScreen === 'blog'
                ? 'text-[#1B7A4B] font-semibold'
                : 'hover:text-[#1B7A4B]'
            }`}
          >
            Blog
            {currentScreen === 'blog' && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1B7A4B] rounded-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('contact')}
            className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              currentScreen === 'contact'
                ? 'text-[#1B7A4B] font-semibold'
                : 'hover:text-[#1B7A4B]'
            }`}
          >
            Contact
            {currentScreen === 'contact' && (
              <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#1B7A4B] rounded-full" />
            )}
          </button>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenSaved}
            aria-label={`Saved properties (${savedCount})`}
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#2A3931] hover:bg-[#F3F8F5] hover:text-[#1B7A4B] transition-colors cursor-pointer"
          >
            <Heart className="w-[19px] h-[19px]" />
            {savedCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[17px] h-[17px] px-1 rounded-full bg-[#1B7A4B] text-white text-[10px] font-bold flex items-center justify-center tabular-nums">
                {savedCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('signin')}
            aria-label={userEmail ? `Account: ${userEmail}` : 'Sign in'}
            className={`h-10 px-2.5 rounded-full flex items-center gap-1.5 text-[13px] font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              currentScreen === 'signin' || userEmail
                ? 'bg-[#E7F2EC] text-[#1B7A4B]'
                : 'text-[#2A3931] hover:bg-[#F3F8F5] hover:text-[#1B7A4B]'
            }`}
          >
            <User className="w-[18px] h-[18px]" />
            <span className="hidden xl:inline">{userEmail ? 'Account' : 'Sign In'}</span>
          </button>

          <button
            type="button"
            onClick={() => handleLinkClick('sell')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-[13.5px] font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-xs"
          >
            List Your Property
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="lg:hidden w-10 h-10 rounded-lg flex items-center justify-center text-[#2A3931] hover:bg-[#F3F8F5] cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E8EEEC] bg-white px-4 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleLinkClick('home')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() =>
                handleLinkClick('properties', { status: 'For Sale', category: 'Any Type' })
              }
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Buy Homes
            </button>
            <button
              type="button"
              onClick={() =>
                handleLinkClick('properties', { status: 'For Rent', category: 'Any Type' })
              }
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Rent Homes
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('agents')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Agents
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('blog')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Blog
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('contact')}
              className="text-left px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-[#F3F8F5] text-[#14211A]"
            >
              Contact
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleLinkClick('signin')}
              className="py-2.5 px-4 rounded-lg border border-[#D4DFD9] text-[#14211A] text-sm font-semibold"
            >
              {userEmail ? 'Account' : 'Sign In'}
            </button>
            <button
              type="button"
              onClick={() => handleLinkClick('sell')}
              className="py-2.5 px-4 rounded-lg bg-[#1B7A4B] text-white text-sm font-semibold"
            >
              List Property
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
