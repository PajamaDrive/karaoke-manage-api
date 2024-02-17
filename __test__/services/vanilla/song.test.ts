import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { dummySong, dummySongs } from '../../fixtures/data/song.ts';
import { assertEquals } from 'assert/assert_equals.ts';
import { assertSpyCall, assertSpyCalls, restore, spy, stub } from 'test/mock.ts';
import { assertRejects } from 'assert/assert_rejects.ts';

const songRepository = new MockSongRepository();
const songService = new VanillaSongService(songRepository);

Deno.test('asyncSetting', async (t) => {
  await t.step('repositoryのasyncSettingが呼ばれる - 正常実行', async () => {
    const asyncSettingSpy = spy(songRepository, 'asyncSetting');

    await songService.asyncSetting();

    assertSpyCalls(asyncSettingSpy, 1);
  });
});

Deno.test('getSong', async (t) => {
  const dummyId = 'ID 1';
  const spyFuncName = 'fetch';

  await t.step('楽曲情報が返る - 正常実行', async () => {
    const expectResult = dummySong;
    const fetchSpy = spy(songRepository, spyFuncName);

    const actualResult = await songService.getSong(dummyId);

    assertEquals(actualResult, expectResult);
    assertSpyCall(fetchSpy, 0, { args: [dummyId] });
  });

  await t.step('例外がスローされる - エラーが発生', async () => {
    // spyを解除
    restore();
    stub(songRepository, spyFuncName, async () => {
      throw new Error('error');
    });

    await assertRejects(() => songService.getSong(dummyId), Error);
  });
});

Deno.test('getSongs', async (t) => {
  const spyFuncName = 'fetchAll';

  await t.step('楽曲情報が返る - 正常実行', async () => {
    const expectResult = dummySongs;
    const fetchAllSpy = spy(songRepository, spyFuncName);

    const actualResult = await songService.getSongs();

    assertEquals(actualResult, expectResult);
    assertSpyCalls(fetchAllSpy, 1);
  });

  await t.step('例外がスローされる - エラーが発生', async () => {
    // spyを解除
    restore();
    stub(songRepository, spyFuncName, async () => {
      throw new Error('error');
    });

    await assertRejects(() => songService.getSongs(), Error);
  });
});

Deno.test('postSong', async (t) => {
  const spyFuncName = 'insert';

  await t.step('楽曲情報が返る - 正常実行', async () => {
    const expectResult = dummySong;
    const insertSpy = spy(songRepository, spyFuncName);

    const actualResult = await songService.postSong(dummySong);

    assertEquals(actualResult, expectResult);
    assertSpyCall(insertSpy, 0, { args: [dummySong] });
  });

  await t.step('例外がスローされる - エラーが発生', async () => {
    // spyを解除
    restore();
    stub(songRepository, spyFuncName, async () => {
      throw new Error('error');
    });

    await assertRejects(() => songService.postSong(dummySong), Error);
  });
});

Deno.test('updateSong', async (t) => {
  const spyFuncName = 'update';
  const { id, ...dummySongWithoutId } = dummySong;

  await t.step('楽曲情報が返る - 正常実行', async () => {
    const expectResult = dummySong;
    const updateSpy = spy(songRepository, 'update');

    const actualResult = await songService.updateSong(id, dummySongWithoutId);

    assertEquals(actualResult, expectResult);
    assertSpyCall(updateSpy, 0, { args: [id, dummySongWithoutId] });
  });

  await t.step('例外がスローされる - エラーが発生', async () => {
    // spyを解除
    restore();
    stub(songRepository, spyFuncName, async () => {
      throw new Error('error');
    });

    await assertRejects(() => songService.updateSong(id, dummySong), Error);
  });
});

Deno.test('deleteSong', async (t) => {
  const dummyId = 'ID 1';
  const spyFuncName = 'delete';

  await t.step('repositoryのdeleteが実行される - 正常実行', async () => {
    const deleteSpy = spy(songRepository, spyFuncName);

    await songService.deleteSong(dummyId);

    assertSpyCall(deleteSpy, 0, { args: [dummyId] });
  });

  await t.step('例外がスローされる - エラーが発生', async () => {
    // spyを解除
    restore();
    stub(songRepository, spyFuncName, async () => {
      throw new Error('error');
    });

    await assertRejects(() => songService.deleteSong(dummyId), Error);
  });
});
