import { Song } from '../types/song.ts';

const songs = Object.freeze<Song[]>([
  {
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
  },
]);

/**
 * 楽曲情報を検索する
 * @param {number} id 楽曲ID
 * @return {Song} 楽曲情報
 */
const find = (id: number) => songs[id];

export default { find };
