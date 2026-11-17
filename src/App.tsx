import React, { useState, useEffect } from 'react';
import {
  AGENTS,
  INITIAL_PROPERTIES,
} from './data/properties';
import {
  ListingStatus,
  Property,
  PropertyCategory,
  ScreenId,
  SearchFilters,
} from './types/property';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import {
  HowItWorksModal,
  SavedPropertiesDrawer,
} from './components/Modals';
import { HomeScreen } from './screens/HomeScreen';
import { PropertiesScreen } from './screens/PropertiesScreen';
import { PropertyDetailScreen } from './screens/PropertyDetailScreen';
import { AgentsScreen } from './screens/AgentsScreen';
import { ListPropertyScreen } from './screens/ListPropertyScreen';
import { BlogScreen } from './screens/BlogScreen';
import { ContactScreen } from './screens/ContactScreen';
import { SignInScreen } from './screens/SignInScreen';
import { supabase } from './lib/supabase/client';

const DEFAULT_FILTERS: SearchFilters = {
  location: '',
  category: 'Any Type',
  status: 'All',
  priceRange: '$0 - $5,000,000+',
  beds: 'Any',
  baths: 'Any',
  sortBy: 'featured',
};

export default function App() {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  const [savedIds, setSavedIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('homevista_saved_ids');
      return stored ? JSON.parse(stored) : ['prop-miami-villa'];
    } catch {
      return ['prop-miami-villa'];
    }
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('homevista_user_email');
    } catch {
      return null;
    }
  });

  const [userName, setUserName] = useState<string | null>(() => {
    try {
      return localStorage.getItem('homevista_user_name');
    } catch {
      return null;
    }
  });

  const [scheduledToursCount, setScheduledToursCount] = useState(0);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('homevista_saved_ids', JSON.stringify(savedIds));
    } catch {
      // ignore storage errors
    }
  }, [savedIds]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen, selectedProperty?.id]);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user?.email) {
        const metaName =
          (session.user.user_metadata?.full_name as string | undefined) || null;
        setUserEmail(session.user.email);
        setUserName(metaName);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        const metaName =
          (session.user.user_metadata?.full_name as string | undefined) || null;
        setUserEmail(session.user.email);
        setUserName(metaName);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleNavigate = (
    screen: ScreenId,
    options?: { status?: ListingStatus | 'All'; category?: PropertyCategory | 'Any Type' }
  ) => {
    if (options) {
      setFilters((prev) => ({
        ...prev,
        status: options.status ?? prev.status,
        category: options.category ?? prev.category,
      }));
    }
    setCurrentScreen(screen);
  };

  const handleSearchSubmit = (updates: Partial<SearchFilters>) => {
    setFilters((prev) => ({
      ...DEFAULT_FILTERS,
      ...prev,
      ...updates,
    }));
    setCurrentScreen('properties');
  };

  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setCurrentScreen('property-detail');
  };

  const handleAddProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
  };

  const handleSignIn = (email: string, name?: string) => {
    setUserEmail(email);
    setUserName(name || null);
    try {
      localStorage.setItem('homevista_user_email', email);
      if (name) {
        localStorage.setItem('homevista_user_name', name);
      }
    } catch {
      // ignore
    }
  };

  const handleSignOut = async () => {
    if (supabase) {
      await supabase.auth.signOut().catch(() => {});
    }
    setUserEmail(null);
    setUserName(null);
    try {
      localStorage.removeItem('homevista_user_email');
      localStorage.removeItem('homevista_user_name');
    } catch {
      // ignore
    }
  };

  const savedProperties = properties.filter((p) => savedIds.includes(p.id));
  const detailAgent =
    AGENTS.find((a) => a.id === selectedProperty?.agentId) || AGENTS[0];

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#14211A]">
      <Navbar
        currentScreen={currentScreen}
        activeStatusFilter={filters.status}
        savedCount={savedIds.length}
        userEmail={userEmail}
        onNavigate={handleNavigate}
        onOpenSaved={() => setSavedDrawerOpen(true)}
        onOpenHowItWorks={() => setHowItWorksOpen(true)}
      />

      <main className="flex-1">
        {currentScreen === 'home' && (
          <HomeScreen
            properties={properties}
            savedIds={savedIds}
            onToggleSave={handleToggleSave}
            onSelectProperty={handleSelectProperty}
            onSearchSubmit={handleSearchSubmit}
            onNavigate={handleNavigate}
            onOpenHowItWorks={() => setHowItWorksOpen(true)}
          />
        )}

        {currentScreen === 'properties' && (
          <PropertiesScreen
            properties={properties}
            filters={filters}
            savedIds={savedIds}
            onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
            onResetFilters={() => setFilters(DEFAULT_FILTERS)}
            onToggleSave={handleToggleSave}
            onSelectProperty={handleSelectProperty}
          />
        )}

        {currentScreen === 'property-detail' && selectedProperty && (
          <PropertyDetailScreen
            property={selectedProperty}
            agent={detailAgent}
            isSaved={savedIds.includes(selectedProperty.id)}
            onBack={() => setCurrentScreen('properties')}
            onToggleSave={handleToggleSave}
            onTourBooked={() => setScheduledToursCount((c) => c + 1)}
          />
        )}

        {currentScreen === 'agents' && (
          <AgentsScreen
            onBrowseProperties={() => handleNavigate('properties', { status: 'All', category: 'Any Type' })}
          />
        )}

        {currentScreen === 'sell' && (
          <ListPropertyScreen
            onAddProperty={handleAddProperty}
            onViewProperty={handleSelectProperty}
          />
        )}

        {currentScreen === 'blog' && <BlogScreen />}

        {currentScreen === 'contact' && <ContactScreen />}

        {currentScreen === 'signin' && (
          <SignInScreen
            userEmail={userEmail}
            userName={userName}
            savedCount={savedIds.length}
            scheduledToursCount={scheduledToursCount}
            onSignIn={handleSignIn}
            onSignOut={handleSignOut}
            onNavigate={handleNavigate}
            onOpenSaved={() => setSavedDrawerOpen(true)}
          />
        )}
      </main>

      <Footer onNavigate={handleNavigate} />

      <HowItWorksModal
        open={howItWorksOpen}
        onClose={() => setHowItWorksOpen(false)}
        onExplore={() => handleNavigate('properties', { status: 'All', category: 'Any Type' })}
      />

      <SavedPropertiesDrawer
        open={savedDrawerOpen}
        savedProperties={savedProperties}
        onClose={() => setSavedDrawerOpen(false)}
        onRemove={(id) => setSavedIds((prev) => prev.filter((item) => item !== id))}
        onSelectProperty={handleSelectProperty}
        onExplore={() => handleNavigate('properties', { status: 'All', category: 'Any Type' })}
      />
    </div>
  );
}
