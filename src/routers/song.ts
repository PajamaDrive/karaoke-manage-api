import { Router } from 'oak';
import { ISongController } from '~/controllers/interfaces/song.ts';

export class SongRouter {
  private readonly controller;
  private readonly router;

  constructor(controller: ISongController) {
    this.controller = controller;
    this.router = new Router();
    this.router.get('/v1/song', this.controller.getSongs);
    this.router.get('/v1/song/:id', this.controller.getSong);
    this.router.post('/v1/song', this.controller.postSong);
    this.router.put('/v1/song/:id', this.controller.putSong);
    this.router.delete('/v1/song/:id', this.controller.deleteSong);
  }

  /**
   * 非同期で行う設定
   */
  asyncSetting = async () => {
    await this.controller.asyncSetting();
  };

  getRouter = () => this.router;
}
