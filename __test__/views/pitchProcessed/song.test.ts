import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';
import { dummySong, dummySongs } from '../../fixtures/data/song.ts';
import { assertEquals } from 'assert/assert_equals.ts';
import { Status, testing } from 'oak';
import type { SongView } from '~/types/song.ts';

Deno.test('setSongResponse', async (t) => {
  await t.step('200が返る - 正常終了', () => {
    const expectBody = Object.freeze<SongView>({
      ...dummySong,
      lowestPitch: 'mid1A',
      highestPitch: 'hiB',
    });
    const dummyContext = testing.createMockContext();
    const songView = new PitchProcessedSongView();

    songView.setSongResponse(dummyContext, dummySong);

    assertEquals(dummyContext.response.body, expectBody);
    assertEquals(dummyContext.response.status, Status.OK);
  });
});

Deno.test('setSongsResponse', async (t) => {
  await t.step('200が返る - 正常終了', () => {
    const expectBody = Object.freeze<SongView[]>([
      {
        ...dummySong,
        lowestPitch: 'mid1A',
        highestPitch: 'hiB',
      },
      {
        ...dummySong,
        id: 'ID 2',
        lowestPitch: 'mid1A',
        highestPitch: 'hiB',
      },
    ]);
    const dummyContext = testing.createMockContext();
    const songView = new PitchProcessedSongView();

    songView.setSongsResponse(dummyContext, structuredClone(dummySongs));

    assertEquals(dummyContext.response.body, expectBody);
    assertEquals(dummyContext.response.status, Status.OK);
  });
});

Deno.test('setCreateResponse', async (t) => {
  await t.step('201が返る - 正常終了', () => {
    const expectBody = Object.freeze<SongView>({
      ...dummySong,
      lowestPitch: 'mid1A',
      highestPitch: 'hiB',
    });
    const dummyContext = testing.createMockContext();
    const songView = new PitchProcessedSongView();

    songView.setCreateResponse(dummyContext, dummySong);

    assertEquals(dummyContext.response.body, expectBody);
    assertEquals(dummyContext.response.status, Status.Created);
  });
});

Deno.test('setNoContentResponse', async (t) => {
  await t.step('204が返る - 正常終了', () => {
    const expectBody = Object.freeze<SongView>({
      ...dummySong,
      lowestPitch: 'mid1A',
      highestPitch: 'hiB',
    });
    const dummyContext = testing.createMockContext();
    const songView = new PitchProcessedSongView();

    songView.setNoContentResponse(dummyContext);

    assertEquals(dummyContext.response.status, Status.NoContent);
  });
});
