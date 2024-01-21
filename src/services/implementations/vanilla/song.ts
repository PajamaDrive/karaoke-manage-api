import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';

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
   * 楽曲情報を取得する
   * @param {number} id 楽曲ID
   * @return {Song} 楽曲情報
   */
  getSong = async (id: number) => await this.repository.find(id);
}
