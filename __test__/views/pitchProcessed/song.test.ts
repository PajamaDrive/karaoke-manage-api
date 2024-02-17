import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';
import { dummySong, dummySongs } from '../../fixtures/data/song.ts';
import { assertEquals } from 'assert/assert_equals.ts';
import { Status, testing } from 'oak';
import type { SongView } from '~/types/song.ts';
import { CustomError } from '~/libs/CustomError.ts';

const songView = new PitchProcessedSongView();
Deno.test('setSongResponse', async (t) => {
  await t.step('200が返る - 正常終了', () => {
    const expectBody = Object.freeze<SongView>({
      ...dummySong,
      lowestPitch: 'mid1A',
      highestPitch: 'hiB',
    });
    const dummyContext = testing.createMockContext();

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

    songView.setNoContentResponse(dummyContext);

    assertEquals(dummyContext.response.status, Status.NoContent);
  });
});

Deno.test('setErrorResponse', async (t) => {
  await t.step('500が返る - Errorオブジェクトが渡される', () => {
    const dummyError = new Error('error');
    const expectBody = Object.freeze({
      message: dummyError.message,
      stack: dummyError.stack,
    });
    const dummyContext = testing.createMockContext();

    songView.setErrorResponse(dummyContext, dummyError);

    assertEquals(dummyContext.response.body, expectBody);
    assertEquals(dummyContext.response.status, Status.InternalServerError);
  });

  await t.step('指定したステータスコードが返る - CustomErrorオブジェクトが渡される', () => {
    const statusCode = Status.BadRequest;
    const dummyError = new CustomError(statusCode, 'error');
    const expectBody = Object.freeze({
      message: dummyError.message,
    });
    const dummyContext = testing.createMockContext();

    songView.setErrorResponse(dummyContext, dummyError);

    assertEquals(dummyContext.response.body, expectBody);
    assertEquals(dummyContext.response.status, statusCode);
  });
});
