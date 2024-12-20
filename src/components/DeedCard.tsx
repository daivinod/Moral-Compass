import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ThumbsDown, HelpCircle } from 'lucide-react';
import { Deed } from '../types';

interface DeedCardProps {
  deed: Deed;
  onDelete: (id: string) => void;
}

const typeIcons = {
  good: Heart,
  bad: ThumbsDown,
  grey: HelpCircle
};

const typeStyles = {
  good: 'bg-emerald-50 text-emerald-600',
  bad: 'bg-rose-50 text-rose-600',
  grey: 'bg-slate-50 text-slate-600'
};

export const DeedCard: React.FC<DeedCardProps> = ({ deed, onDelete }) => {
  const Icon = typeIcons[deed.type];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${typeStyles[deed.type]} rounded-xl p-4`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-white bg-opacity-50 rounded-lg">
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <p className="text-gray-800 font-medium">{deed.description}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm opacity-75">
              {new Date(deed.timestamp).toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <span className="text-sm font-medium">
              {deed.type === 'good' ? '+' : deed.type === 'bad' ? '-' : '±'}
              {Math.abs(deed.karmaPoints)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};