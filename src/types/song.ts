import { RouteParams, RouterContext } from 'https://deno.land/x/oak@v12.6.1/mod.ts';

const pitches = [
  'A',
  'A#',
  'B',
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
] as const;
export type Pitch = typeof pitches[number];

const octaveNames = [
  'lowlow',
  'low',
  'mid1',
  'mid2',
  'hi',
  'hihi',
] as const;
export type Ocatave = typeof octaveNames[number];

export interface SpecificPitch {
  pitch: Pitch;
  octave: Ocatave;
}

export interface Song {
  title: string;
  artist: string;
  lowestPitch: SpecificPitch;
  highestPitch: SpecificPitch;
}

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

export interface SongView extends Weaken<Song, 'lowestPitch' | 'highestPitch'> {
  lowestPitch: string;
  highestPitch: string;
}

export type SongRouterContext = RouterContext<string, RouteParams<string>, Record<string, any>>;
