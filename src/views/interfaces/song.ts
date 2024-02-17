import {
  ViewCreateFunc,
  ViewErrorFunc,
  ViewNoContentFunc,
  ViewSongFunc,
  ViewSongsFunc,
} from '~/types/song.ts';

export interface ISongView {
  setSongResponse: ViewSongFunc;
  setSongsResponse: ViewSongsFunc;
  setCreateResponse: ViewCreateFunc;
  setNoContentResponse: ViewNoContentFunc;
  setErrorResponse: ViewErrorFunc;
}
