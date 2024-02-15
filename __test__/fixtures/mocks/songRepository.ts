import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { dummySong, dummySongs } from '../data/song.ts';

export class MockSongRepository implements ISongRepository {
  asyncSetting = async () => {};
  fetch = async () => await structuredClone(dummySong);
  fetchAll = async () => await structuredClone(dummySongs);
  insert = async () => await structuredClone(dummySong);
  update = async () => await structuredClone(dummySong);
  delete = async () => {
    return;
  };
}
