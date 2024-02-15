import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { dummySong, dummySongs } from '../../fixtures/data/song.ts';
import { MockSongService } from '../../fixtures/mocks/songService.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { MockSongView } from '../../fixtures/mocks/songView.ts';
import { assertEquals } from 'assert/assert_equals.ts';
import { assertSpyCall, assertSpyCalls, spy } from 'test/mock.ts';
import { testing } from 'oak';

const songService = new MockSongService(new MockSongRepository());
const songView = new MockSongView();
const songController = new PitchProcessedSongController(songService, songView);
Deno.test('asyncSetting', async (t) => {
  await t.step('serviceのasyncSettingが呼ばれる - 正常実行', async () => {
    const asyncSettingSpy = spy(songService, 'asyncSetting');

    await songController.asyncSetting();

    assertSpyCalls(asyncSettingSpy, 1);
  });
});

Deno.test('getSong', async (t) => {
  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const expectResult = dummySong;
    const dummyId = 'ID 1';
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const getSongSpy = spy(songService, 'getSong');
    const setSongResponseSpy = spy(songView, 'setSongResponse');

    await songController.getSong(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCall(getSongSpy, 0, { args: [dummyId] });
    assertSpyCall(setSongResponseSpy, 0, { args: [dummyContext, dummySong] });
  });
});

Deno.test('getSongs', async (t) => {
  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const expectResult = dummySongs;
    const dummyContext = testing.createMockContext();
    const getSongsSpy = spy(songService, 'getSongs');
    const setSongsResponseSpy = spy(songView, 'setSongsResponse');

    await songController.getSongs(dummyContext);

    assertEquals(dummyContext.response.body, expectResult);

    assertSpyCalls(getSongsSpy, 1);
    assertSpyCall(setSongsResponseSpy, 0, { args: [dummyContext, structuredClone(dummySongs)] });
  });
});

Deno.test('deleteSong', async (t) => {
  await t.step('Service / Viewが呼ばれる - 正常実行', async () => {
    const dummyId = 'ID 1';
    const dummyContext = testing.createMockContext({
      params: { id: dummyId },
    });
    const deleteSongSpy = spy(songService, 'deleteSong');
    const setNoContentResponseSpy = spy(songView, 'setNoContentResponse');

    await songController.deleteSong(dummyContext);

    assertSpyCall(deleteSongSpy, 0, { args: [dummyId] });
    assertSpyCall(setNoContentResponseSpy, 0, { args: [dummyContext] });
  });
});
