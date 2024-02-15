import type { Song } from '~/types/song.ts';

export const dummySong = Object.freeze<Song>({
  id: 'ID 1',
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
});

export const dummySongs = Object.freeze<Song[]>([
  { ...dummySong },
  { ...dummySong, id: 'ID 2' },
]);
