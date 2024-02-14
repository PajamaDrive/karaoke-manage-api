import { AsyncFunc, ControllerFunc } from '~/types/song.ts';
import { ISongService } from '~/services/interfaces/song.ts';
import { ISongView } from '~/views/interfaces/song.ts';

export interface ISongController {
  readonly service: ISongService;
  readonly view: ISongView;
  asyncSetting: AsyncFunc;
  getSong: ControllerFunc;
  getSongs: ControllerFunc;
  postSong: ControllerFunc;
  putSong: ControllerFunc;
  deleteSong: ControllerFunc;
}
