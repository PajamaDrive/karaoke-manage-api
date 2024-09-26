import { RouteParams, RouterContext } from 'oak';

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
  id: string;
  title: string;
  artist: string;
  lowestPitch: SpecificPitch;
  highestPitch: SpecificPitch;
}

export type SongWithoutId = Omit<Song, 'id'>;

type Weaken<T, K extends keyof T> = {
  [P in keyof T]: P extends K ? any : T[P];
};

export interface SongView extends Weaken<Song, 'lowestPitch' | 'highestPitch'> {
  lowestPitch: string;
  highestPitch: string;
}

export type SongRouterContext = RouterContext<string, RouteParams<string>, Record<string, any>>;

export type FetchFunc = (id: string) => Promise<Song>;
export type FetchAllFunc = () => Promise<Array<Song>>;
export type InsertFunc = (song: SongWithoutId) => Promise<Song>;
export type UpdateFunc = (id: string, song: SongWithoutId) => Promise<Song>;
export type DeleteFunc = (id: string) => Promise<void>;
export type ControllerFunc = (ctx: SongRouterContext) => Promise<void>;
export type ViewSongFunc = (ctx: SongRouterContext, song: Song) => void;
export type ViewSongsFunc = (ctx: SongRouterContext, songs: Array<Song>) => void;
export type ViewCreateFunc = ViewSongFunc;
export type ViewNoContentFunc = (ctx: SongRouterContext) => void;
export type ViewErrorFunc = (ctx: SongRouterContext, error: Error) => void;
