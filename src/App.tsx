import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navigation } from './components/Navigation';
import { DeedInput } from './components/DeedInput';
import { DeedCard } from './components/DeedCard';
import { StatsScreen } from './components/StatsScreen';
import { Deed, DeedType, Screen } from './types';

function App() {
  const [deeds, setDeeds] = useState<Deed[]>(() => {
    const saved = localStorage.getItem('deeds');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [streak, setStreak] = useState(0);
  const [karmaScore, setKarmaScore] = useState(0);

  useEffect(() => {
    localStorage.setItem('deeds', JSON.stringify(deeds));
    
    const newKarmaScore = deeds.reduce((acc, deed) => acc + deed.karmaPoints, 0);
    setKarmaScore(newKarmaScore);
    
    const today = new Date().toDateString();
    const hasGoodDeedToday = deeds.some(
      deed => new Date(deed.timestamp).toDateString() === today && deed.type === 'good'
    );
    setStreak(hasGoodDeedToday ? streak + 1 : 0);
  }, [deeds]);

  const handleAddDeed = (type: DeedType, description: string) => {
    const karmaPoints = type === 'good' ? 10 : type === 'bad' ? -10 : 0;
    const newDeed: Deed = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: Date.now(),
      karmaPoints
    };
    setDeeds(prev => [newDeed, ...prev]);
    setCurrentScreen('feed');
  };

  const handleDeleteDeed = (id: string) => {
    setDeeds(prev => prev.filter(deed => deed.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto pb-20">
        <header className="bg-white border-b border-gray-200 p-4 text-center sticky top-0 z-10">
          <h1 className="text-xl font-bold text-gray-900">Moral Compass</h1>
        </header>

        <main className="h-[calc(100vh-8rem)]">
          {currentScreen === 'feed' && (
            <div className="space-y-3 p-4">
              <AnimatePresence>
                {deeds.map(deed => (
                  <DeedCard
                    key={deed.id}
                    deed={deed}
                    onDelete={handleDeleteDeed}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          {currentScreen === 'add' && (
            <DeedInput onAddDeed={handleAddDeed} />
          )}

          {currentScreen === 'stats' && (
            <StatsScreen
              deeds={deeds}
              streak={streak}
              karmaScore={karmaScore}
            />
          )}
        </main>

        <Navigation
          currentScreen={currentScreen}
          onScreenChange={setCurrentScreen}
        />
      </div>
    </div>
  );
}

export default App;