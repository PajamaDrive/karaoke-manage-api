import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { DeleteFunc, FetchAllFunc, FetchFunc, InsertFunc, UpdateFunc } from '~/types/song.ts';

export interface ISongService {
  readonly repository: ISongRepository;
  getSong: FetchFunc;
  getSongs: FetchAllFunc;
  postSong: InsertFunc;
  updateSong: UpdateFunc;
  deleteSong: DeleteFunc;
}

export interface ISongServiceBuilder {
  build: (repository: ISongRepository) => Promise<ISongService>;
}
