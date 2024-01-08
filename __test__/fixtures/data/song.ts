import type { Song } from '~/types/song.ts';

export const dummySong: Song = {
  title: '曲名',
  artist: 'アーティスト',
  lowestPitch: {
    pitch: 'A',
    octave: 'mid1',
  },
  highestPitch: {
    pitch: 'B',
    octave: 'hi',
  },
};
