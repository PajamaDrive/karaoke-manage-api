import { Router } from 'oak';
import { ISongController } from '~/controllers/interfaces/song.ts';

export class SongRouter {
  private readonly controller;
  private readonly router;

  private constructor(controller: ISongController) {
    this.controller = controller;
    this.router = new Router();
    this.router.get('/v1/song', this.controller.getSongs);
    this.router.get('/v1/song/:id', this.controller.getSong);
    this.router.post('/v1/song', this.controller.postSong);
    this.router.put('/v1/song/:id', this.controller.putSong);
    this.router.delete('/v1/song/:id', this.controller.deleteSong);
  }

  /**
   * インスタンスを生成する
   * @param {ISongController} controller controllerのインスタンス
   * @return {SongRouter} routerのインスタンス
   */
  static build = (controller: ISongController) => new SongRouter(controller);

  /**
   * oakのrouterを返す
   * @return {Router} router
   */
  getRouter = () => this.router;
}
