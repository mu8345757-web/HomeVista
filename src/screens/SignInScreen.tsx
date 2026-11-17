import React, { useState } from 'react';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Heart,
  CalendarCheck,
  CheckCircle2,
  LogOut,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { HERO_IMAGE } from '../data/properties';
import { SafeImage } from '../components/SafeImage';
import { HomeVistaLogo } from '../components/Icons';
import { ScreenId } from '../types/property';
import { supabase } from '../lib/supabase/client';

interface SignInScreenProps {
  userEmail: string | null;
  userName: string | null;
  savedCount: number;
  scheduledToursCount: number;
  onSignIn: (email: string, name?: string) => void;
  onSignOut: () => void;
  onNavigate: (screen: ScreenId) => void;
  onOpenSaved: () => void;
}

type AuthMode = 'signin' | 'signup' | 'forgot';

export const SignInScreen: React.FC<SignInScreenProps> = ({
  userEmail,
  userName,
  savedCount,
  scheduledToursCount,
  onSignIn,
  onSignOut,
  onNavigate,
  onOpenSaved,
}) => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setNotice('');

    if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      setLoading(true);
      try {
        if (supabase) {
          const { error: resetError } = await supabase.auth.resetPasswordForEmail(
            email.trim(),
            { redirectTo: window.location.origin }
          );
          if (resetError) {
            setError(resetError.message);
            return;
          }
        }
        setResetSent(true);
      } finally {
        setLoading(false);
      }
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mode === 'signup' && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const derivedName =
      fullName.trim() ||
      email
        .split('@')[0]
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    setLoading(true);
    try {
      if (supabase) {
        if (mode === 'signup') {
          const { data, error: signUpError } = await supabase.auth.signUp({
            email: email.trim(),
            password,
            options: {
              data: { full_name: derivedName },
            },
          });
          if (signUpError) {
            setError(signUpError.message);
            return;
          }
          if (!data.session) {
            setNotice(
              'Account created! Please check your email inbox to confirm your address, then sign in.'
            );
            setMode('signin');
            setPassword('');
            setConfirmPassword('');
            return;
          }
          onSignIn(data.user?.email || email.trim(), derivedName);
          return;
        } else {
          const { data, error: signInError } = await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          });
          if (signInError) {
            setError(signInError.message);
            return;
          }
          const metaName =
            (data.user?.user_metadata?.full_name as string | undefined) || derivedName;
          onSignIn(data.user?.email || email.trim(), metaName);
          return;
        }
      }

      onSignIn(email.trim(), derivedName);
    } finally {
      setLoading(false);
    }
  };

  if (userEmail) {
    return (
      <div className="bg-[#FAFBFB] min-h-[78vh] py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl border border-[#E4EAE7] p-6 sm:p-9 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#EEF2F0]">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#EAF4EE] text-[#1B7A4B] font-display text-xl font-bold flex items-center justify-center shrink-0">
                  {(userName || userEmail).slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B7A4B]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Signed In</span>
                  </div>
                  <h1 className="font-display text-2xl font-bold text-[#14211A]">
                    {userName || 'HomeVista Member'}
                  </h1>
                  <p className="text-sm text-[#5B6B62]">{userEmail}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={onSignOut}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#D4DFD9] hover:bg-[#F5F8F6] text-xs font-semibold text-[#14211A] cursor-pointer self-start sm:self-center"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 tabular-nums">
              <button
                type="button"
                onClick={onOpenSaved}
                className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E6EEEA] hover:border-[#1B7A4B]/50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#1B7A4B]">
                  <Heart className="w-5 h-5" />
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-[#14211A]">
                  {savedCount}
                </p>
                <p className="text-xs text-[#5B6B62]">Saved Properties</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E6EEEA] hover:border-[#1B7A4B]/50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#1B7A4B]">
                  <CalendarCheck className="w-5 h-5" />
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold text-[#14211A]">
                  {scheduledToursCount}
                </p>
                <p className="text-xs text-[#5B6B62]">Scheduled Tour Requests</p>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('sell')}
                className="p-4 rounded-xl bg-[#F7FAF8] border border-[#E6EEEA] hover:border-[#1B7A4B]/50 text-left transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between text-[#1B7A4B]">
                  <ShieldCheck className="w-5 h-5" />
                  <ArrowRight className="w-4 h-4" />
                </div>
                <p className="mt-3 font-display text-base font-bold text-[#14211A]">
                  List a Property
                </p>
                <p className="mt-1 text-xs text-[#5B6B62]">Publish verified listings</p>
              </button>
            </div>

            <div className="mt-7 pt-6 border-t border-[#EEF2F0] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#5B6B62] hover:text-[#14211A] cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <button
                type="button"
                onClick={() => onNavigate('properties')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] text-white text-sm font-semibold cursor-pointer"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F7F6] min-h-[82vh] py-10 sm:py-14 px-4 sm:px-6 flex items-center">
      <div className="max-w-[1060px] w-full mx-auto bg-white rounded-2xl border border-[#E2EAE6] shadow-[0_18px_48px_-14px_rgba(14,41,30,0.12)] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Architectural Panel */}
        <div className="relative lg:col-span-5 bg-[#0B261A] text-white p-8 sm:p-10 flex flex-col justify-between min-h-[300px] lg:min-h-[580px]">
          <div className="absolute inset-0">
            <SafeImage
              src={HERO_IMAGE}
              alt="Modern luxury residence"
              fallbackLabel="HomeVista Architecture"
              className="w-full h-full object-cover opacity-35"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(180deg, rgba(8,28,20,0.88) 0%, rgba(11,38,26,0.78) 50%, rgba(8,28,20,0.95) 100%)',
              }}
            />
          </div>

          <div className="relative z-10">
            <HomeVistaLogo dark />
            <h2 className="mt-8 font-display text-2xl sm:text-3xl font-bold leading-snug text-white [text-wrap:balance]">
              {mode === 'signup'
                ? 'Create your HomeVista account'
                : mode === 'forgot'
                ? 'Reset your password'
                : 'Welcome back to your home search'}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#BFD1C8]">
              Save favorite residences, book instant private tours, and track market price updates across every neighborhood.
            </p>
          </div>

          <div className="relative z-10 mt-8 space-y-3 text-xs text-[#D5E3DC]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#25A063] shrink-0" />
              <span>100% verified listings and transparent comps</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#25A063] shrink-0" />
              <span>Sync saved homes across all your devices</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CalendarCheck className="w-4 h-4 text-[#25A063] shrink-0" />
              <span>Direct tour scheduling with local advisors</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-7 sm:p-10 flex flex-col justify-center">
          {mode !== 'forgot' && (
            <div className="inline-flex p-1 rounded-xl bg-[#F2F6F4] border border-[#E4ECE8] self-start mb-6">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setError('');
                }}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'signin'
                    ? 'bg-white text-[#14211A] shadow-xs'
                    : 'text-[#5B6B62] hover:text-[#14211A]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError('');
                }}
                className={`px-5 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  mode === 'signup'
                    ? 'bg-white text-[#14211A] shadow-xs'
                    : 'text-[#5B6B62] hover:text-[#14211A]'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          <h1 className="font-display text-2xl font-bold text-[#14211A]">
            {mode === 'signin'
              ? 'Sign in to HomeVista'
              : mode === 'signup'
              ? 'Get started with HomeVista'
              : 'Forgot your password?'}
          </h1>
          <p className="mt-1.5 text-sm text-[#5B6B62]">
            {mode === 'signin'
              ? 'Enter your credentials to access your saved homes and tours.'
              : mode === 'signup'
              ? 'Create a free member profile in less than a minute.'
              : 'Enter your email address and we will send a recovery link.'}
          </p>

          {mode === 'forgot' && resetSent ? (
            <div className="mt-6 p-5 rounded-xl bg-[#F0F8F3] border border-[#CBE4D5]">
              <div className="flex items-center gap-2 font-display font-bold text-sm text-[#1B7A4B]">
                <CheckCircle2 className="w-5 h-5" />
                <span>Recovery Link Sent</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#384940]">
                If an account exists for <strong>{email}</strong>, password reset instructions have been sent.
              </p>
              <button
                type="button"
                onClick={() => {
                  setResetSent(false);
                  setMode('signin');
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B7A4B] hover:underline cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleAuthSubmit} className="mt-6 space-y-4">
              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#73847B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Alex Morgan"
                      className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4DFD9] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#73847B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4DFD9] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
                  />
                </div>
              </div>

              {mode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-[#2A3931]">
                      Password
                    </label>
                    {mode === 'signin' && (
                      <button
                        type="button"
                        onClick={() => {
                          setMode('forgot');
                          setError('');
                        }}
                        className="text-xs font-semibold text-[#1B7A4B] hover:underline cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#73847B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full h-11 pl-10 pr-10 rounded-lg border border-[#D4DFD9] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#73847B] hover:text-[#14211A] cursor-pointer"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              )}

              {mode === 'signup' && (
                <div>
                  <label className="block text-xs font-semibold text-[#2A3931] mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-[#73847B] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter password"
                      className="w-full h-11 pl-10 pr-3.5 rounded-lg border border-[#D4DFD9] text-sm text-[#14211A] focus:outline-none focus:border-[#1B7A4B]"
                    />
                  </div>
                </div>
              )}

              {mode === 'signin' && (
                <label className="flex items-center gap-2 text-xs text-[#4B5B53] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-[#C6D4CD] text-[#1B7A4B] accent-[#1B7A4B]"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              )}

              {notice && (
                <p className="text-xs font-medium text-[#1B7A4B] bg-[#F0F8F3] border border-[#CBE4D5] px-3 py-2.5 rounded-lg">
                  {notice}
                </p>
              )}

              {error && (
                <p className="text-xs font-medium text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#1B7A4B] hover:bg-[#145E39] disabled:opacity-65 text-white text-sm font-semibold inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Please wait...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {mode === 'signin'
                        ? 'Sign In'
                        : mode === 'signup'
                        ? 'Create Account'
                        : 'Send Reset Link'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {mode === 'forgot' && (
                <button
                  type="button"
                  onClick={() => {
                    setMode('signin');
                    setError('');
                  }}
                  className="w-full py-2 text-xs font-semibold text-[#5B6B62] hover:text-[#14211A] cursor-pointer"
                >
                  Back to Sign In
                </button>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
