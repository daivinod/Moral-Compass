import React, { useState } from 'react';
import { Heart, ThumbsDown, HelpCircle } from 'lucide-react';
import { DeedType } from '../types';

interface DeedInputProps {
  onAddDeed: (type: DeedType, description: string) => void;
}

export const DeedInput: React.FC<DeedInputProps> = ({ onAddDeed }) => {
  const [description, setDescription] = useState('');
  const [selectedType, setSelectedType] = useState<DeedType>('good');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (description.trim()) {
      onAddDeed(selectedType, description.trim());
      setDescription('');
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { type: 'good' as DeedType, Icon: Heart, label: 'Good', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
            { type: 'bad' as DeedType, Icon: ThumbsDown, label: 'Bad', color: 'bg-rose-50 border-rose-200 text-rose-600' },
            { type: 'grey' as DeedType, Icon: HelpCircle, label: 'Grey', color: 'bg-slate-50 border-slate-200 text-slate-600' }
          ].map(({ type, Icon, label, color }) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`flex flex-col items-center p-4 rounded-xl border transition-all ${
                selectedType === type 
                  ? `${color} scale-105` 
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              <Icon className="w-8 h-8 mb-2" />
              <span className="font-medium text-sm">{label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your deed..."
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
          />
          <button
            type="submit"
            disabled={!description.trim()}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Add Deed
          </button>
        </div>
      </form>
    </div>
  );
};