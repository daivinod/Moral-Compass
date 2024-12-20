import React from 'react';
import { Scale, Trophy, Flame, ThumbsDown, HelpCircle } from 'lucide-react';
import { Deed } from '../types';

interface StatsScreenProps {
  deeds: Deed[];
  streak: number;
  karmaScore: number;
}

export const StatsScreen: React.FC<StatsScreenProps> = ({ deeds, streak, karmaScore }) => {
  const goodDeeds = deeds.filter(d => d.type === 'good').length;
  const badDeeds = deeds.filter(d => d.type === 'bad').length;
  const greyDeeds = deeds.filter(d => d.type === 'grey').length;

  return (
    <div className="space-y-6 p-4">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Scale className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Total Karma</h2>
        </div>
        <p className="text-4xl font-bold">{karmaScore}</p>
      </div>

      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Flame className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Current Streak</h2>
        </div>
        <p className="text-4xl font-bold">{streak} days</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-emerald-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-emerald-600 mb-2">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Good</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{goodDeeds}</p>
        </div>

        <div className="bg-rose-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-rose-600 mb-2">
            <ThumbsDown className="w-5 h-5" />
            <span className="font-medium">Bad</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{badDeeds}</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4">
          <div className="flex items-center gap-2 text-slate-600 mb-2">
            <HelpCircle className="w-5 h-5" />
            <span className="font-medium">Grey</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{greyDeeds}</p>
        </div>
      </div>
    </div>
  );
};