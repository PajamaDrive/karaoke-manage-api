import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';

export class MockSongService implements ISongService {
  readonly repository;

  constructor(repository: ISongRepository) {
    this.repository = repository;
  }

  asyncSetting = async () => {};

  getSong = async (id: number) => await this.repository.find(id);
}
