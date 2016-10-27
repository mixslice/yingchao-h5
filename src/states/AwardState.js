export class AwardState extends Phaser.State {
  // init() {
  // }
  create() {
    const background = this.game.add.image(0, 0, 'backgroundInfo');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    const awardDetail = this.game.add.image(this.game.width / 2, this.game.height / 2, 'awardDetail');
    awardDetail.scale.setTo(0.6, 0.6);
    awardDetail.anchor.setTo(0.5, 0.5);
    const closeButton = this.game.add.button(
      (awardDetail.x + ((awardDetail.texture.width * 0.6) / 2)) - 25,
      (awardDetail.y - ((awardDetail.texture.height * 0.6) / 2)) + 25,
      'closeButton', this.goBack, this, 0.01, 1, 0);
    closeButton.scale.setTo(0.5, 0.5);
    closeButton.anchor.setTo(1, 0);
    const shareButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'shareToFriends', this.share, this, 0.01, 1, 0);
    shareButton.anchor.setTo(0.5, 0.5);
    shareButton.scale.setTo(0.5, 0.5);
 }
  goBack() {
    this.game.state.start('rank');
 }
  share() {
    this.game.state.start('share');    
  }
}
