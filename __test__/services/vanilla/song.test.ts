import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { dummySong } from '../../fixtures/data/song.ts';
import { assertEquals } from 'https://deno.land/std@0.210.0/assert/assert_equals.ts';
import { assertSpyCall, spy } from 'test/mock.ts';

Deno.test('楽曲情報が返る - 正常終了', () => {
  const expectResult = dummySong;
  const dummyId = 1;
  const songRepository = new MockSongRepository();
  const findSpy = spy(songRepository, 'find');
  const songService = new VanillaSongService(songRepository);

  const actualResult = songService.getSong(dummyId);

  assertEquals(actualResult, expectResult);
  assertSpyCall(findSpy, 0, { args: [dummyId] });
});
