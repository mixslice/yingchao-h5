import { getScaleRateX } from 'utils';

export class CouponState extends Phaser.State {
  // init() {
  // }
  create() {
    this.halfScaleX = getScaleRateX(0.5, this.game.width);
    const couponBackground = this.game.add.button(0, 0, 'getCoupon', this.goBack, this, 0.01, 1, 0);
    couponBackground.scale.setTo(this.game.width / couponBackground.texture.width, this.game.height / couponBackground.texture.height);
    const shareToFriends = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'shareToFriends', this.share, this, 0.01, 1, 0);
    shareToFriends.anchor.setTo(0.5, 0.5);
    shareToFriends.scale.setTo(0.5, 0.5);
    shareToFriends.scale.setTo(this.halfScaleX, this.halfScaleX);
 }
  goBack() {
    this.game.state.start('rank');
 }
  share() {
    this.game.state.start('share');
  }
}
