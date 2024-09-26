import { DeleteFunc, FetchAllFunc, FetchFunc, InsertFunc, UpdateFunc } from '~/types/song.ts';

export interface ISongRepository {
  fetch: FetchFunc;
  fetchAll: FetchAllFunc;
  insert: InsertFunc;
  update: UpdateFunc;
  delete: DeleteFunc;
}

export interface ISongRepositoryBuilder {
  build: () => Promise<ISongRepository>;
}
