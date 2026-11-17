import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle2, User } from 'lucide-react';

const OFFICES = [
  {
    city: 'Lahore Headquarters',
    contactName: 'Rizwan Ahmad',
    address: 'Main Boulevard Gulberg III, Lahore, Pakistan',
    phone: '0308591457',
    hours: 'Mon – Sat · 9:00 AM – 7:00 PM',
  },
];

export const ContactScreen: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('Buying a Home');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.includes('@') || !message.trim()) {
      setError('Please enter your name, a valid email, and your message.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAFBFB] min-h-screen pb-14">
      <div className="bg-white border-b border-[#E5ECE9]">
        <div className="max-w-[1260px] mx-auto px-4 sm:px-6 py-10">
          <p className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
            24/7 Client Support
          </p>
          <h1 className="mt-1 font-display text-3xl font-bold text-[#14211A]">
            Contact HomeVista
          </h1>
          <p className="mt-2 text-sm text-[#5B6B62] max-w-xl">
            Reach our regional advisory desks for private property tours, seller valuations, or relocation support.
          </p>
        </div>
      </div>

      <div className="max-w-[1260px] mx-auto px-4 sm:px-6 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Offices */}
          <div className="lg:col-span-5 flex flex-col">
            {OFFICES.map((office) => (
              <div
                key={office.city}
                className="flex-1 bg-white rounded-2xl border border-[#E4EAE7] p-7 sm:p-8 shadow-2xs flex flex-col justify-between gap-6"
              >
                <div>
                  <span className="text-xs font-semibold text-[#1B7A4B] tracking-wide">
                    Direct Advisory Desk
                  </span>
                  <h2 className="mt-1 font-display text-2xl font-bold text-[#14211A]">
                    {office.city}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-[#5B6B62]">
                    Connect directly with our Lahore headquarters for verified property viewings, private buyer consultations, and seller valuations.
                  </p>

                  <div className="mt-7 space-y-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#617269]">Primary Contact</p>
                        <p className="font-display text-[15px] font-bold text-[#14211A]">
                          {office.contactName}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#617269]">Phone Number</p>
                        <p className="font-display text-[15px] font-bold text-[#14211A] tabular-nums">
                          {office.phone}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#617269]">Office Address</p>
                        <p className="text-sm font-medium text-[#2A3931]">
                          {office.address}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#F0F7F3] text-[#1B7A4B] flex items-center justify-center shrink-0">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs text-[#617269]">Working Hours</p>
                        <p className="text-sm font-medium text-[#2A3931]">
                          {office.hours}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 border-t border-[#EEF2F0] flex flex-wrap gap-3">
                  <a
                    href={`tel:${office.phone}`}
                    className="flex-1 min-w-[140px] py-2.5 px-4 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call {office.phone}</span>
                  </a>
                  <a
                    href="mailto:info@homevista.com"
                    className="py-2.5 px-4 rounded-lg border border-[#D4DFD9] hover:bg-[#F5F8F6] text-sm font-semibold text-[#14211A] inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-[#1B7A4B]" />
                    <span>Email Desk</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-8 shadow-2xs">
            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#EAF4EE] text-[#1B7A4B] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h2 className="font-display text-2xl font-bold text-[#14211A]">
                  Inquiry Received
                </h2>
                <p className="mt-2 text-sm text-[#5B6B62] max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. A HomeVista advisor specializing in{' '}
                  <strong>{topic}</strong> will reply to <strong>{email}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-6 px-5 py-2.5 rounded-lg bg-[#1B7A4B] text-white text-sm font-semibold cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h2 className="font-display text-xl font-bold text-[#14211A]">
                  Send Us a Message
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Jordan Taylor"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jordan@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    How can we help?
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full h-11 px-3.5 rounded-lg border border-[#D4DFD9] text-sm bg-white focus:outline-none focus:border-[#1B7A4B] cursor-pointer"
                  >
                    <option value="Buying a Home">Buying a Home</option>
                    <option value="Renting an Apartment">Renting an Apartment</option>
                    <option value="Selling My Property">Selling My Property</option>
                    <option value="Relocation Advisory">Relocation Advisory</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your preferred neighborhoods, timeline, or listing questions..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#D4DFD9] text-sm focus:outline-none focus:border-[#1B7A4B]"
                  />
                </div>

                {error && <p className="text-xs text-red-600">{error}</p>}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                  <span className="flex items-center gap-1.5 text-xs text-[#617269]">
                    <Mail className="w-3.5 h-3.5 text-[#1B7A4B]" />
                    info@homevista.com
                  </span>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
                  >
                    Submit Message
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
