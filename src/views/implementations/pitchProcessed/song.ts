import { Status } from 'oak';
import { Song, SongRouterContext, SongView, SpecificPitch } from '~/types/song.ts';
import { ISongView, ISongViewBuilder } from '~/views/interfaces/song.ts';
import { CustomError } from '~/libs/CustomError.ts';

class _PitchProcessedSongView implements ISongView {
  private constructor() {}

  /**
   * インスタンスを生成する
   * @return {Promise<_PitchProcessedSongView>} viewのインスタンス
   */
  static build = async () => await Promise.resolve(new _PitchProcessedSongView());

  /**
   * 楽曲情報のレスポンスを設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   * @param {Song} song 楽曲情報
   */
  setSongResponse = (ctx: SongRouterContext, song: Song) => {
    this.setSongHeader(ctx);
    ctx.response.type = 'application/json';
    ctx.response.body = this.getSongBody(song);
  };

  /**
   * 楽曲情報のレスポンス（配列）を設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   * @param {Array<Song>} songs 楽曲情報
   */
  setSongsResponse = (ctx: SongRouterContext, songs: Array<Song>) => {
    this.setSongHeader(ctx);
    ctx.response.type = 'application/json';
    ctx.response.body = songs.map((song) => this.getSongBody(song));
  };

  /**
   * 楽曲情報のレスポンス（リソース作成）を設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   * @param {Song} song 楽曲情報
   */
  setCreateResponse = (ctx: SongRouterContext, song: Song) => {
    this.setSongResponse(ctx, song);
    ctx.response.status = Status.Created;
  };

  /**
   * 楽曲情報のレスポンス（コンテンツなし）を設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  setNoContentResponse = (ctx: SongRouterContext) => {
    this.setSongHeader(ctx);
    ctx.response.status = Status.NoContent;
  };

  /**
   * 楽曲情報のレスポンス（エラー発生時）を設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   * @param {Error} error エラーオブジェクト
   */
  setErrorResponse = (ctx: SongRouterContext, error: Error) => {
    this.setSongHeader(ctx);
    if (error instanceof CustomError) {
      ctx.response.status = error.statusCode;
      ctx.response.type = 'application/json';
      ctx.response.body = {
        message: error.message,
      };
    } else {
      ctx.response.status = Status.InternalServerError;
      ctx.response.type = 'application/json';
      ctx.response.body = {
        message: error.message,
        stack: error.stack,
      };
    }
  };

  /**
   * 楽曲情報のヘッダ情報を設定する
   * @param {SongRouterContext} ctx oakのコンテキスト
   */
  private setSongHeader = (ctx: SongRouterContext) => {
    ctx.response.headers.set('X-Content-Type-Options', 'nosniff');
    ctx.response.headers.set('Strict-Transport-Security', 'max-age=31536000');
    ctx.response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  };

  /**
   * 楽曲情報のレスポンスボディを返す
   * @param {Song} song 楽曲情報
   * @return {SongView} 整形後の楽曲情報
   */
  private getSongBody = (song: Song): SongView => ({
    ...song,
    lowestPitch: this.getPitchString(song.lowestPitch),
    highestPitch: this.getPitchString(song.highestPitch),
  });

  /**
   * ピッチ情報を返す
   * @param {SpecificPitch} pitch ピッチ
   * @return {string} ピッチ情報
   */
  private getPitchString = (pitch: SpecificPitch) => `${pitch.octave}${pitch.pitch}`;
}

export const PitchProcessedSongView: ISongViewBuilder = _PitchProcessedSongView;
