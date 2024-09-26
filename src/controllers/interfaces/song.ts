import { ControllerFunc } from '~/types/song.ts';
import { ISongService } from '~/services/interfaces/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

export interface ISongController {
  readonly service: ISongService;
  readonly view: ISongView;
  getSong: ControllerFunc;
  getSongs: ControllerFunc;
  postSong: ControllerFunc;
  putSong: ControllerFunc;
  deleteSong: ControllerFunc;
}

export interface ISongControllerBuilder {
  build: (servoce: ISongService, view: ISongView) => Promise<ISongController>;
}
