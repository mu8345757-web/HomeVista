import React, { useState } from 'react';
import {
  Star,
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  X,
  CheckCircle2,
  Building2,
} from 'lucide-react';
import { AGENTS } from '../data/properties';
import { Agent } from '../types/property';
import { SafeImage } from '../components/SafeImage';

interface AgentsScreenProps {
  onBrowseProperties: () => void;
}

const SPECIALTIES: ('All' | Agent['specialty'])[] = [
  'All',
  'Luxury Estates',
  'Urban Condos',
  'Family Homes',
  'Investment & Land',
];

export const AgentsScreen: React.FC<AgentsScreenProps> = ({ onBrowseProperties }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<'All' | Agent['specialty']>('All');
  const [contactAgent, setContactAgent] = useState<Agent | null>(null);
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState('');

  const filteredAgents =
    selectedSpecialty === 'All'
      ? AGENTS
      : AGENTS.filter((a) => a.specialty === selectedSpecialty);

  const openMessageModal = (agent: Agent) => {
    setContactAgent(agent);
    setSent(false);
    setFormError('');
    setMessageText(`Hi ${agent.name.split(' ')[0]}, I'd love guidance on properties in ${agent.city}.`);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !senderEmail.includes('@')) {
      setFormError('Please provide your name and a valid email address.');
      return;
    }
    setFormError('');
    setSent(true);
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen pb-14">
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
              Dedicated Local Advisors
            </p>
            <h1 className="mt-1 font-display text-3xl font-bold text-[#14211A]">
              Meet Our Verified Agents
            </h1>
            <p className="mt-2 text-sm text-[#5B6B62] max-w-xl">
              Every HomeVista advisor combines deep neighborhood pricing analytics with 24/7 private tour support.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {SPECIALTIES.map((spec) => (
              <button
                key={spec}
                type="button"
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  selectedSpecialty === spec
                    ? 'bg-[#1B7A4B] text-white'
                    : 'bg-[#F3F6F4] text-[#43534A] hover:bg-[#E7EEEA]'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => (
            <article
              key={agent.id}
              className="bg-white rounded-2xl border border-[#E4EAE7] p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-start gap-4">
                  <SafeImage
                    src={agent.avatar}
                    alt={agent.name}
                    variant="avatar"
                    fallbackLabel={agent.name}
                    className="w-16 h-16 rounded-full object-cover shrink-0 border-2 border-[#E7F2EC]"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h2 className="font-display text-lg font-bold text-[#14211A] truncate">
                        {agent.name}
                      </h2>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-[#14211A] tabular-nums shrink-0">
                        <Star className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
                        {agent.rating.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#1B7A4B] mt-0.5">{agent.role}</p>
                    <p className="flex items-center gap-1 text-xs text-[#617269] mt-1">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{agent.city}</span>
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[#43534A]">{agent.bio}</p>

                <div className="mt-5 grid grid-cols-3 gap-2 py-3 px-3 rounded-xl bg-[#F7FAF8] border border-[#E9EFEC] text-center tabular-nums">
                  <div>
                    <p className="font-display text-base font-bold text-[#14211A]">
                      {agent.experienceYears} yrs
                    </p>
                    <p className="text-[11px] text-[#617269]">Experience</p>
                  </div>
                  <div className="border-x border-[#E2EAE6]">
                    <p className="font-display text-base font-bold text-[#14211A]">
                      {agent.closedDeals}
                    </p>
                    <p className="text-[11px] text-[#617269]">Closed Deals</p>
                  </div>
                  <div>
                    <p className="font-display text-base font-bold text-[#1B7A4B]">
                      {agent.activeListings}
                    </p>
                    <p className="text-[11px] text-[#617269]">Active</p>
                  </div>
                </div>

                <div className="mt-4 space-y-1.5 text-xs text-[#4B5B53] tabular-nums">
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#1B7A4B]" />
                    <span>{agent.phone}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#1B7A4B]" />
                    <span>{agent.email}</span>
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-[#EEF2F0] flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => openMessageModal(agent)}
                  className="flex-1 py-2.5 px-3 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Contact Advisor</span>
                </button>
                <button
                  type="button"
                  onClick={onBrowseProperties}
                  className="py-2.5 px-3.5 rounded-lg border border-[#D4DFD9] hover:bg-[#F5F9F7] text-xs font-semibold text-[#14211A] inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Listings</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Contact Agent Modal */}
      {contactAgent && (
        <div
          className="fixed inset-0 z-50 bg-[#081C14]/55 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setContactAgent(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E9E5]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <SafeImage
                  src={contactAgent.avatar}
                  alt={contactAgent.name}
                  variant="avatar"
                  fallbackLabel={contactAgent.name}
                  className="w-11 h-11 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-display text-base font-bold text-[#14211A]">
                    Message {contactAgent.name}
                  </h3>
                  <p className="text-xs text-[#617269]">{contactAgent.city}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setContactAgent(null)}
                className="w-8 h-8 rounded-full bg-[#F3F6F4] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {sent ? (
              <div className="p-4 rounded-xl bg-[#F0F8F3] border border-[#CBE4D5] text-sm text-[#14211A]">
                <div className="flex items-center gap-2 font-bold text-[#1B7A4B]">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Message Delivered</span>
                </div>
                <p className="mt-1.5 text-xs text-[#43534A]">
                  {contactAgent.name} typically responds within 30 minutes to {senderEmail}.
                </p>
                <button
                  type="button"
                  onClick={() => setContactAgent(null)}
                  className="mt-4 w-full py-2 rounded-lg bg-[#1B7A4B] text-white text-xs font-semibold cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend} className="space-y-3.5">
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Your full name *"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                />
                <input
                  type="email"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  placeholder="Your email address *"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                />
                <textarea
                  rows={4}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                />
                {formError && <p className="text-xs text-red-600">{formError}</p>}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
