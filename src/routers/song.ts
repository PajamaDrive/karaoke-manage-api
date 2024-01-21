import { Router } from 'oak';
import { ISongController } from '~/controllers/interfaces/song.ts';

export class SongRouter {
  private readonly controller;
  private readonly router;

  constructor(controller: ISongController) {
    this.controller = controller;
    this.router = new Router();
    this.router.get('/v1/songs/:id', this.controller.getSong);
  }

  /**
   * 非同期で行う設定
   */
  asyncSetting = async () => {
    await this.controller.asyncSetting();
  };

  getRouter = () => this.router;
}
