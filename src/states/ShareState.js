export class ShareState extends Phaser.State {
  // init() {
  // }
  create() {
    const shareBackground = this.game.add.button(0, 0, 'share', this.goBack, this, 0.01, 1, 0);
    shareBackground.scale.setTo(this.game.width / shareBackground.texture.width, this.game.height / shareBackground.texture.height);
 }
  goBack() {
    this.game.state.start('rank');
 }
}
