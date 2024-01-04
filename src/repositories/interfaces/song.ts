import { FindFunc } from '~/types/song.ts';

export interface ISongRepository {
  find: FindFunc;
}
