import { ISongService } from '~/services/interfaces/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { DeleteFunc, SongWithoutId } from '~/types/song.ts';

export class MockSongService implements ISongService {
  readonly repository;

  constructor(repository: ISongRepository) {
    this.repository = repository;
  }

  getSong = async (id: string) => await this.repository.fetch(id);
  getSongs = async () => await this.repository.fetchAll();
  postSong = async (song: SongWithoutId) => await this.repository.insert(song);
  updateSong = async (id: string, song: SongWithoutId) => await this.repository.update(id, song);
  deleteSong = async (id: string) => await this.repository.delete(id);
}
