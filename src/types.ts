export type DeedType = 'good' | 'bad' | 'grey';
export type Screen = 'feed' | 'add' | 'stats';

export interface Deed {
  id: string;
  type: DeedType;
  description: string;
  timestamp: number;
  karmaPoints: number;
}