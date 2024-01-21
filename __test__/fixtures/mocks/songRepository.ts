import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { dummySong } from '../data/song.ts';

export class MockSongRepository implements ISongRepository {
  asyncSetting = async () => {};
  find = async (id: number) => await dummySong;
}
