import { Application } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import songRouter from './routes/song.ts';

const app = new Application();

app.use(songRouter.routes());

await app.listen({ port: 8000 });
