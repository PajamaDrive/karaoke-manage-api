import { FindFunc } from '~/types/song.ts';

export interface ISongRepository {
  asyncSetting: () => Promise<void>;
  find: FindFunc;
}
