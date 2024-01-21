import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { AsyncFunc, FindFunc } from '~/types/song.ts';

export interface ISongService {
  readonly repository: ISongRepository;
  asyncSetting: AsyncFunc;
  getSong: FindFunc;
}
