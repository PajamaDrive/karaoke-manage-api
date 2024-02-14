import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { SongWithoutId } from '~/types/song.ts';

export class VanillaSongService implements ISongService {
  readonly repository;

  constructor(repository: ISongRepository) {
    this.repository = repository;
  }

  /**
   * 非同期で行う設定
   */
  asyncSetting = async () => {
    await this.repository.asyncSetting();
  };

  /**
   * 楽曲情報1件を取得する
   * @param {string} id 楽曲ID
   * @return {Promise<Song>} 楽曲情報
   */
  getSong = async (id: string) =>
    await this.repository.fetch(id).catch((err) => {
      throw err;
    });

  /**
   * 楽曲情報を全件取得する
   * @return {Promise<Array<Song>>}
   */
  getSongs = async () =>
    await this.repository.fetchAll().catch((err) => {
      throw err;
    });

  /**
   * 楽曲情報を追加する
   * @param {SongWithoutId} song 楽曲情報
   * @param {Song} 楽曲情報(IDあり)
   */
  postSong = async (song: SongWithoutId) =>
    await this.repository.insert(song).catch((err) => {
      throw err;
    });

  /**
   * 楽曲情報を更新する
   * @param {string} id 楽曲ID
   * @param {SongWithoutId} song 楽曲情報
   * @param {Song} 楽曲情報(更新後)
   */
  updateSong = async (id: string, song: SongWithoutId) =>
    await this.repository.update(id, song).catch((err) => {
      throw err;
    });

  /**
   * 楽曲情報を削除する
   * @param {string} id 楽曲ID
   */
  deleteSong = async (id: string) =>
    await this.repository.delete(id).catch((err) => {
      throw err;
    });
}
