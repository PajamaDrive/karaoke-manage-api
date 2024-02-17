import { Song, SongRouterContext, ViewErrorFunc } from '~/types/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

export class MockSongView implements ISongView {
  setSongResponse = (ctx: SongRouterContext, song: Song) => {
    ctx.response.body = song;
  };
  setSongsResponse = (ctx: SongRouterContext, songs: Song[]) => {
    ctx.response.body = songs;
  };
  setCreateResponse = (ctx: SongRouterContext, song: Song) => {
    ctx.response.body = song;
  };
  setNoContentResponse = (ctx: SongRouterContext) => {};
  setErrorResponse = (ctx: SongRouterContext, error: Error) => {
    ctx.response.body = error.message;
  };
}
