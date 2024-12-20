import React from 'react';
import { ListTodo, PlusCircle, BarChart3 } from 'lucide-react';
import { Screen } from '../types';

interface NavigationProps {
  currentScreen: Screen;
  onScreenChange: (screen: Screen) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { screen: 'feed' as Screen, Icon: ListTodo, label: 'Feed' },
    { screen: 'add' as Screen, Icon: PlusCircle, label: 'Add' },
    { screen: 'stats' as Screen, Icon: BarChart3, label: 'Stats' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2">
      <div className="max-w-md mx-auto flex justify-around items-center">
        {navItems.map(({ screen, Icon, label }) => (
          <button
            key={screen}
            onClick={() => onScreenChange(screen)}
            className={`flex flex-col items-center p-2 ${
              currentScreen === screen
                ? 'text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-xs mt-1">{label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};