import { Application } from 'oak';
import { SongRouter } from '~/routers/song.ts';
import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';
import { DenoKvSongRepository } from '~/repositories/implementations/denoKv/song.ts';

const app = new Application();
const songRouter = new SongRouter(
  new PitchProcessedSongController(
    new VanillaSongService(new DenoKvSongRepository()),
    new PitchProcessedSongView(),
  ),
);

// 非同期の初期設定
await songRouter.asyncSetting();

app.use(songRouter.getRouter().routes());

await app.listen({ port: 8000 });
