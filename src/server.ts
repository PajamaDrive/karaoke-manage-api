import { Application } from 'oak';
import songRouter from '~/routes/song.ts';

const app = new Application();

app.use(songRouter.routes());

await app.listen({ port: 8000 });
