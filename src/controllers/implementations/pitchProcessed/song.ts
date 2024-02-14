import { SongRouterContext, SongWithoutId } from '~/types/song.ts';
import { ISongController } from '~/controllers/interfaces/song.ts';
import { ISongService } from '~/services/interfaces/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

export class PitchProcessedSongController implements ISongController {
  readonly service;
  readonly view;

  constructor(service: ISongService, view: ISongView) {
    this.service = service;
    this.view = view;
  }

  /**
   * 非同期で行う設定
   */
  asyncSetting = async () => {
    await this.service.asyncSetting();
  };

  /**
   * 楽曲情報を1件取得する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  getSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    const song = await this.service.getSong(songId);
    this.view.setSongResponse(ctx, song);
  };

  /**
   * 楽曲情報を全件取得する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  getSongs = async (ctx: SongRouterContext) => {
    const songs = await this.service.getSongs();
    this.view.setSongsResponse(ctx, songs);
  };

  /**
   * 楽曲情報を追加する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  postSong = async (ctx: SongRouterContext) => {
    const bodyResult = ctx.request.body({ type: 'json' });
    const songWithoutId = await bodyResult.value as SongWithoutId;
    const createdSong = await this.service.postSong(songWithoutId);
    this.view.setCreateResponse(ctx, createdSong);
  };

  /**
   * 楽曲情報を更新する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  putSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    const bodyResult = ctx.request.body({ type: 'json' });
    const songWithoutId = await bodyResult.value as SongWithoutId;
    const updatedSong = await this.service.updateSong(songId, songWithoutId);
    this.view.setCreateResponse(ctx, updatedSong);
  };

  /**
   * 楽曲情報を削除する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  deleteSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    await this.service.deleteSong(songId);
    this.view.setNoContentResponse(ctx);
  };
}
