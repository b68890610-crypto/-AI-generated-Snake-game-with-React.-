export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  cover: string;
  audioUrl: string;
}

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export interface Point {
  x: number;
  y: number;
}

export interface GameState {
  snake: Point[];
  food: Point;
  direction: Direction;
  isGameOver: boolean;
  score: number;
  highScore: number;
}
