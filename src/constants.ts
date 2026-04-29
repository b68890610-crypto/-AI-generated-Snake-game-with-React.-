import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'Neon Pulse (Algorithmic Mix)',
    artist: 'AI Synth-01',
    album: 'Neural Beats Vol. 1',
    duration: 184,
    cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=300&h=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  },
  {
    id: '2',
    title: 'Midnight Grid (Deep Learning)',
    artist: 'GPT-Audio',
    album: 'Digital Horizon',
    duration: 215,
    cover: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=300&h=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
  },
  {
    id: '3',
    title: 'Plasma Drift (Generative)',
    artist: 'Machine Learning X',
    album: 'Core Override [ROOT]',
    duration: 168,
    cover: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&h=300&auto=format&fit=crop',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SPEED = 150;
export const SPEED_INCREMENT = 2;
export const MIN_SPEED = 60;
