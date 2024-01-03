import songService from '../services/song.ts';
import { SongRouterContext } from '../types/song.ts';
import songView from '../views/song.ts';

/**
 * 楽曲情報を取得する
 * @param {SongRouterContext} ctx oakのコンテキスト
 */
const getSong = (ctx: SongRouterContext) => {
  const songId = parseInt(ctx.params?.id);
  const song = songService.getSong(songId);
  songView.setSongResponse(ctx, song);
};

export default { getSong };
