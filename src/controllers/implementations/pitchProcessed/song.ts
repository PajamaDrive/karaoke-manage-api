import { SongRouterContext } from '~/types/song.ts';
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
   * 楽曲情報を取得する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  getSong = async (ctx: SongRouterContext) => {
    const songId = parseInt(ctx.params?.id);
    const song = await this.service.getSong(songId);
    this.view.setSongResponse(ctx, song);
  };
}
