import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { dummySong } from '../../fixtures/data/song.ts';
import { assertEquals } from 'https://deno.land/std@0.210.0/assert/assert_equals.ts';
import { assertSpyCall, assertSpyCallAsync, spy } from 'test/mock.ts';

Deno.test('repositoryのasyncSettingが呼ばれる - asyncSetting実行', async () => {
  const songRepository = new MockSongRepository();
  const asyncSettingSpy = spy(songRepository, 'asyncSetting');
  const songService = new VanillaSongService(songRepository);

  await songService.asyncSetting();

  assertSpyCallAsync(asyncSettingSpy, 0);
});

Deno.test('楽曲情報が返る - 正常終了', async () => {
  const expectResult = dummySong;
  const dummyId = 1;
  const songRepository = new MockSongRepository();
  const findSpy = spy(songRepository, 'find');
  const songService = new VanillaSongService(songRepository);

  const actualResult = await songService.getSong(dummyId);

  assertEquals(actualResult, expectResult);
  assertSpyCall(findSpy, 0, { args: [dummyId] });
});
