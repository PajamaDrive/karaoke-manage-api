import { Song } from '~/types/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';

export class StaticSongRepository implements ISongRepository {
  private readonly songs = Object.freeze<{ [key: string]: Song }>({
    'hoge': {
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
  });

  /**
   * 非同期で行う設定
   */
  asyncSetting = async () => {};

  /**
   * 楽曲情報を検索する
   * @param {string} id 楽曲ID
   * @return {Promise<Song>} 楽曲情報
   */
  fetch = async (id: string) => await this.songs[id];
}
