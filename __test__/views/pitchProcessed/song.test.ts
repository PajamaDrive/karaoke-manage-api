import { PitchProcessedSongController } from '../../../src/controllers/implementations/pitchProcessed/song.ts';
import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';
import { dummySong } from '../../fixtures/data/song.ts';
import { MockSongService } from '../../fixtures/mocks/songService.ts';
import { MockSongRepository } from '../../fixtures/mocks/songRepository.ts';
import { MockSongView } from '../../fixtures/mocks/songView.ts';
import { assertEquals } from 'https://deno.land/std@0.210.0/assert/assert_equals.ts';
import { assertSpyCall, spy } from 'test/mock.ts';
import { testing } from 'oak';
import type { SongRouterContext, SongView } from '~/types/song.ts';

Deno.test('加工された楽曲情報が返る - 正常終了', () => {
  const expectBody: SongView = {
    ...dummySong,
    lowestPitch: 'mid1A',
    highestPitch: 'hiB',
  };
  const dummyContext = testing.createMockContext();
  const songView = new PitchProcessedSongView();

  songView.setSongResponse(dummyContext, dummySong);

  assertEquals(dummyContext.response.body, expectBody);
});
