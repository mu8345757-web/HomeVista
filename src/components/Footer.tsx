import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter, Heart, User } from 'lucide-react';
import { HomeVistaLogo } from './Icons';
import { ListingStatus, PropertyCategory, ScreenId } from '../types/property';

interface FooterProps {
  onNavigate: (
    screen: ScreenId,
    options?: { status?: ListingStatus | 'All'; category?: PropertyCategory | 'Any Type' }
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#081C14] text-white">
      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <button
              type="button"
              onClick={() => onNavigate('home')}
              className="cursor-pointer text-left"
            >
              <HomeVistaLogo dark />
            </button>
            <p className="mt-4 text-[13.5px] leading-relaxed text-[#A8BCB2]">
              Your trusted partner in finding the perfect property.
            </p>
            <div className="mt-5 flex items-center gap-3 text-[#C2D4CB]">
              <button
                type="button"
                aria-label="Facebook"
                onClick={() => onNavigate('contact')}
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Facebook className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Instagram"
                onClick={() => onNavigate('contact')}
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Instagram className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="LinkedIn"
                onClick={() => onNavigate('contact')}
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Linkedin className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                aria-label="Twitter"
                onClick={() => onNavigate('contact')}
                className="w-8 h-8 rounded-full bg-white/8 hover:bg-[#1B7A4B] flex items-center justify-center transition-colors cursor-pointer"
              >
                <Twitter className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-[14px] font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-[13px] text-[#A8BCB2]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('properties', { status: 'For Sale', category: 'Any Type' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Buy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('properties', { status: 'For Rent', category: 'Any Type' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Rent
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('sell')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sell
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('agents')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Agents
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Property Types */}
          <div>
            <h4 className="font-display text-[14px] font-semibold text-white mb-4">Property Types</h4>
            <ul className="space-y-2.5 text-[13px] text-[#A8BCB2]">
              {(['Apartments', 'Houses', 'Villas', 'Condos', 'Townhouses', 'Land'] as PropertyCategory[]).map(
                (category) => (
                  <li key={category}>
                    <button
                      type="button"
                      onClick={() => onNavigate('properties', { status: 'All', category })}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {category}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display text-[14px] font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5 text-[13px] text-[#A8BCB2]">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('agents')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('blog')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ & Guides
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('signin')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sign In
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="font-display text-[14px] font-semibold text-white mb-4">Contact Us</h4>
            <ul className="space-y-3 text-[13px] text-[#A8BCB2]">
              <li className="flex items-center gap-2.5">
                <User className="w-4 h-4 text-[#25A063] shrink-0" />
                <span className="font-medium text-white">Rizwan Ahmad</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#25A063] shrink-0 mt-0.5" />
                <span>
                  Gulberg III
                  <br />
                  Lahore, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2.5 tabular-nums">
                <Phone className="w-4 h-4 text-[#25A063] shrink-0" />
                <span>0308591457</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#25A063] shrink-0" />
                <span>info@homevista.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#8EA69B]">
          <p>© 2026 HomeVista. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Designed with</span>
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
            <span>for your dream home</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
