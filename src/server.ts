import { Application } from 'oak';
import { SongRouter } from '~/routers/song.ts';
import { PitchProcessedSongController } from '~/controllers/implementations/pitchProcessed/song.ts';
import { VanillaSongService } from '~/services/implementations/vanilla/song.ts';
import { StaticSongRepository } from '~/repositories/implementations/static/songs.ts';
import { PitchProcessedSongView } from '~/views/implementations/pitchProcessed/song.ts';

const app = new Application();
const songRouter = new SongRouter(
  new PitchProcessedSongController(
    new VanillaSongService(new StaticSongRepository()),
    new PitchProcessedSongView(),
  ),
);

app.use(songRouter.getRouter().routes());

await app.listen({ port: 8000 });
