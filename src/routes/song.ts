import { Router } from 'https://deno.land/x/oak@v12.6.1/mod.ts';
import songController from '../controllers/song.ts';

const router = new Router();

router.get('/songs/:id', songController.getSong);

export default router;
