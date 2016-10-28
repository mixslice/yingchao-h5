import { getScaleRateX, getScaleRateY } from 'utils';

export class AwardState extends Phaser.State {
  init() {
    this.awardDetailScale = getScaleRateX(0.6, this.game.width);
    this.halfScale = getScaleRateX(0.5, this.game.width);
    this.detailButtonOffsetX = getScaleRateX(25, this.game.width);
    this.detailButtonOffsetY = getScaleRateY(25, this.game.height);
  }
  create() {
    const background = this.game.add.image(0, 0, 'backgroundInfo');
    background.scale.setTo(this.game.width / background.texture.width, this.game.height / background.texture.height);
    const awardDetail = this.game.add.image(this.game.width / 2, this.game.height / 2, 'awardDetail');
    awardDetail.scale.setTo(this.awardDetailScale, this.awardDetailScale);
    awardDetail.anchor.setTo(0.5, 0.5);
    const closeButton = this.game.add.button(
      (awardDetail.x + ((awardDetail.texture.width * this.awardDetailScale) / 2)) - this.detailButtonOffsetX,
      (awardDetail.y - ((awardDetail.texture.height * this.awardDetailScale) / 2)) + this.detailButtonOffsetY,
      'closeButton', this.goBack, this, 0.01, 1, 0);
    closeButton.scale.setTo(this.halfScale, this.halfScale);
    closeButton.anchor.setTo(1, 0);
    const shareButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'shareToFriends', this.share, this, 0.01, 1, 0);
    shareButton.anchor.setTo(0.5, 0.5);
    shareButton.scale.setTo(this.halfScale, this.halfScale);
 }
  goBack() {
    this.game.state.start('rank');
 }
  share() {
    this.game.state.start('share');    
  }
}
