import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { FindFunc } from '~/types/song.ts';

export interface ISongService {
  readonly repository: ISongRepository;
  getSong: FindFunc;
}
