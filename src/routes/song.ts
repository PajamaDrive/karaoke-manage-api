import { Router } from 'oak/mod.ts';
import songController from '~/controllers/song.ts';

const router = new Router();

router.get('/songs/:id', songController.getSong);

export default router;
