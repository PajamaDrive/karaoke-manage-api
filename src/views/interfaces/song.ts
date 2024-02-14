import { ViewAllFunc, ViewCreateFunc, ViewFunc, ViewNoContentFunc } from '~/types/song.ts';

export interface ISongView {
  setSongResponse: ViewFunc;
  setSongsResponse: ViewAllFunc;
  setCreateResponse: ViewCreateFunc;
  setNoContentResponse: ViewNoContentFunc;
}
