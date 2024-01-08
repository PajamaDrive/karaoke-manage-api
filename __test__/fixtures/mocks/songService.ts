import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';

export class MockSongService implements ISongService {
  readonly repository;

  constructor(repository: ISongRepository) {
    this.repository = repository;
  }

  getSong = (id: number) => this.repository.find(id);
}
