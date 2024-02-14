import { ISongRepository } from '~/repositories/interfaces/song.ts';
import {
  AsyncFunc,
  DeleteFunc,
  FetchAllFunc,
  FetchFunc,
  InsertFunc,
  UpdateFunc,
} from '~/types/song.ts';

export interface ISongService {
  readonly repository: ISongRepository;
  asyncSetting: AsyncFunc;
  getSong: FetchFunc;
  getSongs: FetchAllFunc;
  postSong: InsertFunc;
  updateSong: UpdateFunc;
  deleteSong: DeleteFunc;
}
