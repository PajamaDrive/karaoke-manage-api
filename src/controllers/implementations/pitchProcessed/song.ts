import { SongRouterContext, SongWithoutId } from '~/types/song.ts';
import { ISongController, ISongControllerBuilder } from '~/controllers/interfaces/song.ts';
import { ISongService } from '~/services/interfaces/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

class _PitchProcessedSongController implements ISongController {
  readonly service;
  readonly view;

  private constructor(service: ISongService, view: ISongView) {
    this.service = service;
    this.view = view;
  }

  /**
   * インスタンスを生成する
   * @param {ISongService} service serviceのインスタンス
   * @param {ISongView} view viewのインスタンス
   * @return {Promise<_PitchProcessedSongController>} controllerのインスタンス
   */
  static build = async (service: ISongService, view: ISongView) =>
    await Promise.resolve(new _PitchProcessedSongController(service, view));

  /**
   * 楽曲情報を1件取得する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  getSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    await this.service.getSong(songId)
      .then((song) => {
        this.view.setSongResponse(ctx, song);
      })
      .catch((error) => {
        this.view.setErrorResponse(ctx, error);
      });
  };

  /**
   * 楽曲情報を全件取得する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  getSongs = async (ctx: SongRouterContext) => {
    await this.service.getSongs()
      .then((songs) => {
        this.view.setSongsResponse(ctx, songs);
      })
      .catch((error) => {
        this.view.setErrorResponse(ctx, error);
      });
  };

  /**
   * 楽曲情報を追加する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  postSong = async (ctx: SongRouterContext) => {
    const bodyResult = ctx.request.body({ type: 'json' });
    const songWithoutId = await bodyResult.value as SongWithoutId;
    await this.service.postSong(songWithoutId)
      .then((song) => {
        this.view.setCreateResponse(ctx, song);
      })
      .catch((error) => {
        this.view.setErrorResponse(ctx, error);
      });
  };

  /**
   * 楽曲情報を更新する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  putSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    const bodyResult = ctx.request.body({ type: 'json' });
    const songWithoutId = await bodyResult.value as SongWithoutId;
    await this.service.updateSong(songId, songWithoutId)
      .then((song) => {
        this.view.setCreateResponse(ctx, song);
      })
      .catch((error) => {
        this.view.setErrorResponse(ctx, error);
      });
  };

  /**
   * 楽曲情報を削除する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  deleteSong = async (ctx: SongRouterContext) => {
    const songId = ctx.params?.id;
    await this.service.deleteSong(songId)
      .then(() => {
        this.view.setNoContentResponse(ctx);
      })
      .catch((error) => {
        this.view.setErrorResponse(ctx, error);
      });
  };
}

export const PitchProcessedSongController: ISongControllerBuilder = _PitchProcessedSongController;
