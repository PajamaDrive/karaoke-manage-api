import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { dummySong, dummySongs } from '../../fixtures/data/song.ts';
import { MockSongService } from '../../fixtures/mocks/songService.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { MockSongView } from '../../fixtures/mocks/songView.ts';
import { assertEquals } from 'assert/assert_equals.ts';
import { assertSpyCall, assertSpyCalls, restore, spy, stub } from 'test/mock.ts';
import { testing } from 'oak';

const songService = new MockSongService(new MockSongRepository());
const songView = new MockSongView();
const songController = await PitchProcessedSongController.build(songService, songView);

Deno.test('getSong', async (t) => {
  const dummyId = 'ID 1';
  const spyFuncName = 'getSong';

  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const expectResult = dummySong;
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const getSongSpy = spy(songService, spyFuncName);
    const setSongResponseSpy = spy(songView, 'setSongResponse');

    await songController.getSong(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCall(getSongSpy, 0, { args: [dummyId] });
    assertSpyCall(setSongResponseSpy, 0, { args: [dummyContext, dummySong] });
  });

  await t.step('エラー用のViewが呼ばれる - エラーが発生', async () => {
    // spyを解除
    restore();
    const errorMessage = 'error';
    const dummyError = new Error(errorMessage);
    const getSongStub = stub(songService, spyFuncName, async () => {
      throw dummyError;
    });
    const expectResult = errorMessage;
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const setErrorResponseSpy = spy(songView, 'setErrorResponse');

    await songController.getSong(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCall(getSongStub, 0, { args: [dummyId] });
    assertSpyCall(setErrorResponseSpy, 0, { args: [dummyContext, dummyError] });
  });
});

Deno.test('getSongs', async (t) => {
  const spyFuncName = 'getSongs';

  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const expectResult = dummySongs;
    const dummyContext = testing.createMockContext();
    const getSongsSpy = spy(songService, spyFuncName);
    const setSongsResponseSpy = spy(songView, 'setSongsResponse');

    await songController.getSongs(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCalls(getSongsSpy, 1);
    assertSpyCall(setSongsResponseSpy, 0, { args: [dummyContext, structuredClone(dummySongs)] });
  });

  await t.step('エラー用のViewが呼ばれる - エラーが発生', async () => {
    // spyを解除
    restore();
    const errorMessage = 'error';
    const dummyError = new Error(errorMessage);
    const getSongsStub = stub(songService, spyFuncName, async () => {
      throw dummyError;
    });
    const expectResult = errorMessage;
    const dummyContext = testing.createMockContext();
    const setErrorResponseSpy = spy(songView, 'setErrorResponse');

    await songController.getSongs(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCalls(getSongsStub, 1);
    assertSpyCall(setErrorResponseSpy, 0, { args: [dummyContext, dummyError] });
  });
});

Deno.test('deleteSong', async (t) => {
  const dummyId = 'ID 1';
  const spyFuncName = 'deleteSong';

  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const deleteSongSpy = spy(songService, spyFuncName);
    const setNoContentResponseSpy = spy(songView, 'setNoContentResponse');

    await songController.deleteSong(dummyContext);

    assertSpyCall(deleteSongSpy, 0, { args: [dummyId] });
    assertSpyCall(setNoContentResponseSpy, 0, { args: [dummyContext] });
  });

  await t.step('エラー用のViewが呼ばれる - エラーが発生', async () => {
    // spyを解除
    restore();
    const errorMessage = 'error';
    const dummyError = new Error(errorMessage);
    const deleteSongStub = stub(songService, spyFuncName, async () => {
      throw dummyError;
    });
    const expectResult = errorMessage;
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const setErrorResponseSpy = spy(songView, 'setErrorResponse');

    await songController.deleteSong(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCall(deleteSongStub, 0, { args: [dummyId] });
    assertSpyCall(setErrorResponseSpy, 0, { args: [dummyContext, dummyError] });
  });
});
