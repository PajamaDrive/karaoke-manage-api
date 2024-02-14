import { DeleteFunc, FetchAllFunc, FetchFunc, InsertFunc, UpdateFunc } from '~/types/song.ts';

export interface ISongRepository {
  asyncSetting: () => Promise<void>;
  fetch: FetchFunc;
  fetchAll: FetchAllFunc;
  insert: InsertFunc;
  update: UpdateFunc;
  delete: DeleteFunc;
}
