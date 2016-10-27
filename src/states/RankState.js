export class RankState extends Phaser.State {
  init() {
  }
  create() {
    const rankBackground = this.game.add.image(0, 0, 'rank');
    rankBackground.scale.setTo(this.game.width / rankBackground.texture.width, this.game.height / rankBackground.texture.height);
  }
}
