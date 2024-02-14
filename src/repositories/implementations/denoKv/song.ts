import { Song, SongWithoutId } from '~/types/song.ts';
import { ISongRepository } from '~/repositories/interfaces/song.ts';
import { ulid } from 'ulid';

export class DenoKvSongRepository implements ISongRepository {
  private kv: Deno.Kv | null = null;
  private readonly DenoKvPrefix = 'songs';

  /**
   * 非同期で行う設定
   */
  async asyncSetting() {
    this.kv = await Deno.openKv();
  }

  /**
   * 楽曲情報を1件取得する
   * @param {string} id 楽曲ID
   * @return {Promise<Song>} 楽曲情報
   */
  fetch = async (id: string) => {
    if (!this.kv) {
      throw new Error('Deno KV is not initialized.');
    }

    const song = (await this.kv.get<Song>([this.DenoKvPrefix, id])).value;

    // nullの場合はエラー
    if (!song) {
      throw new Error(`Song ID '${id}' is not found.`);
    }

    return song;
  };

  /**
   * 楽曲情報を全件取得する
   * @param {string} id 楽曲ID
   * @return {Promise<Array<Song>>} 楽曲情報
   */
  fetchAll = async () => {
    if (!this.kv) {
      throw new Error('Deno KV is not initialized.');
    }

    const iter = this.kv.list<Song>({ prefix: [this.DenoKvPrefix] });
    const songs: Array<Song> = [];
    for await (const song of iter) songs.push(song.value);

    return songs;
  };

  /**
   * 楽曲情報を追加する
   * @param {SongWithoutId} song 楽曲情報
   * @param {Song} 楽曲情報(IDあり)
   */
  insert = async (song: SongWithoutId) => {
    if (!this.kv) {
      throw new Error('Deno KV is not initialized.');
    }

    const id = ulid();
    const songWithId = { id, ...song };

    await this.kv.set([this.DenoKvPrefix, id], songWithId);

    return songWithId;
  };

  /**
   * 楽曲情報を更新する
   * @param {string} id 楽曲ID
   * @param {SongWithoutId} song 楽曲情報
   * @param {Song} 楽曲情報(更新後)
   */
  update = async (id: string, song: SongWithoutId) => {
    if (!this.kv) {
      throw new Error('Deno KV is not initialized.');
    }

    const songWithId = { id, ...song };

    await this.kv.set([this.DenoKvPrefix, id], songWithId);

    return songWithId;
  };

  /**
   * 楽曲情報を削除する
   * @param {string} id 楽曲ID
   */
  delete = async (id: string) => {
    if (!this.kv) {
      throw new Error('Deno KV is not initialized.');
    }

    await this.kv.delete([this.DenoKvPrefix, id]);
  };
}
