import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';

export class VanillaSongService implements ISongService {
  readonly repository;

  constructor(repository: ISongRepository) {
    this.repository = repository;
  }

  /**
   * 楽曲情報を取得する
   * @param {number} id 楽曲ID
   * @return {Song} 楽曲情報
   */
  getSong = (id: number) => this.repository.find(id);
}
