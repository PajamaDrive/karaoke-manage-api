import { Application } from 'oak';
import { SongRouter } from '~/routers/song.ts';
import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';
import { DenoKvSongRepository } from '~/repositories/implementations/denoKv/song.ts';

const app = new Application();
const songRouter = SongRouter.build(
  await PitchProcessedSongController.build(
    await VanillaSongService.build(await DenoKvSongRepository.build()),
    await PitchProcessedSongView.build(),
  ),
);

app.use(songRouter.getRouter().routes());

await app.listen({ port: 8000 });
