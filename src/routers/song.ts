import { Router } from 'oak';
import { ISongController } from '~/controllers/interfaces/song.ts';

export class SongRouter {
  readonly controller;
  readonly router;

  constructor(controller: ISongController) {
    this.controller = controller;
    this.router = new Router();
    this.router.get('/songs/:id', this.controller.getSong);
  }

  getRouter = () => this.router;
}
