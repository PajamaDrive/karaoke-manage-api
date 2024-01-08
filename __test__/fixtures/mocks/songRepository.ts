import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { dummySong } from '../data/song.ts';

export class MockSongRepository implements ISongRepository {
  find = (id: number) => dummySong;
}
