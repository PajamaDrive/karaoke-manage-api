import { Song, SongRouterContext, SongView, SpecificPitch } from '~/types/song.ts';

/**
 * 楽曲情報のレスポンスを設定する
 * @param {SongRouterContext} ctx oakのコンテキスト
 * @param {Song} song 楽曲情報
 */
const setSongResponse = (ctx: SongRouterContext, song: Song) => {
  setSongHeader(ctx);
  ctx.response.type = 'application/json';
  ctx.response.body = getSongBody(song);
};

/**
 * 楽曲情報のヘッダ情報を設定する
 * @param {SongRouterContext} ctx oakのコンテキスト
 */
const setSongHeader = (ctx: SongRouterContext) => {
  ctx.response.headers.set('X-Content-Type-Options', 'nosniff');
  ctx.response.headers.set('Strict-Transport-Security', 'max-age=31536000');
  ctx.response.headers.set('X-Frame-Options', 'SAMEORIGIN');
};

/**
 * 楽曲情報のレスポンスボディを返す
 * @param {Song} song 楽曲情報
 * @return {SongView} 整形後の楽曲情報
 */
const getSongBody = (song: Song): SongView => ({
  ...song,
  lowestPitch: getPitchString(song.lowestPitch),
  highestPitch: getPitchString(song.highestPitch),
});

/**
 * ピッチ情報を返す
 * @param {SpecificPitch} pitch ピッチ
 * @return {string} ピッチ情報
 */
const getPitchString = (pitch: SpecificPitch) => `${pitch.octave}${pitch.pitch}`;

export default { setSongResponse };
