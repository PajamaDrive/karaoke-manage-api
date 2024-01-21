import { StaticSongRepository } from '~/repositories/implementations/static/songs.ts';
import { assertEquals } from 'https://deno.land/std@0.210.0/assert/assert_equals.ts';
import { dummySong } from '../../fixtures/data/song.ts';

Deno.test('楽曲情報が返る - 正常終了', async () => {
  const expectResult = dummySong;
  const dummyId = 0;
  const songRepository = new StaticSongRepository();

  const actualResult = await songRepository.find(dummyId);

  assertEquals(actualResult, expectResult);
});
