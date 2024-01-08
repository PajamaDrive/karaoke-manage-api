import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { dummySong } from '../../fixtures/data/song.ts';
import { MockSongService } from '../../fixtures/mocks/songService.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { MockSongView } from '../../fixtures/mocks/songView.ts';
import { assertEquals } from 'https://deno.land/std@0.210.0/assert/assert_equals.ts';
import { assertSpyCall, spy } from 'test/mock.ts';
import { testing } from 'oak';

Deno.test('Service / Viewを呼んでいる - 正常終了', () => {
  const expectResult = dummySong;
  const dummyId = 1;
  const dummyContext = testing.createMockContext({
    params: {
      id: dummyId.toString(),
    },
  });
  const songService = new MockSongService(new MockSongRepository());
  const songView = new MockSongView();
  const getSongSpy = spy(songService, 'getSong');
  const setSongResponseSpy = spy(songView, 'setSongResponse');
  const songController = new PitchProcessedSongController(songService, songView);

  songController.getSong(dummyContext);

  assertEquals(dummyContext.response.body, expectResult);

  assertSpyCall(getSongSpy, 0, { args: [dummyId] });
  assertSpyCall(setSongResponseSpy, 0, { args: [dummyContext, dummySong] });
});
