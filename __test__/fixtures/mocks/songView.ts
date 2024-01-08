import { Song, SongRouterContext } from '~/types/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

export class MockSongView implements ISongView {
  setSongResponse = (ctx: SongRouterContext, song: Song) => {
    ctx.response.body = song;
  };
}
