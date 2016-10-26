
import { PreloadState } from 'states/PreloadState';
import { LoadState } from 'states/LoadState';
import { MainState } from 'states/MainState';


export class Game extends Phaser.Game {
  constructor() {
    super('100%', '100%', Phaser.AUTO, 'game', null, false, false);
    this.state.add('preload', new PreloadState());
    this.state.add('load', new LoadState());
    this.state.add('main', new MainState());
    this.state.start('preload');
  }
}
