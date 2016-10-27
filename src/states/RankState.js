export class RankState extends Phaser.State {
  init() {
    this.rankData = this.game.global.randData || [];
    this.scoreId = this.game.global.scoreId;
    console.log('here', this.rankData);
  }
  create() {
    // create page
    const rankBackground = this.game.add.image(0, 0, 'backgroundInfo');
    rankBackground.scale.setTo(this.game.width / rankBackground.texture.width, this.game.height / rankBackground.texture.height);
    const label = this.game.add.image(this.game.width / 2, this.game.height / 2, 'squareLabel');
    label.scale.setTo(0.6, 0.6);
    label.anchor.setTo(0.5, 0.5);
    const rankBar = this.game.add.image(label.x, label.y - ((label.texture.height * 0.6) / 2), 'rankbar');
    rankBar.anchor.setTo(0.5, 0.5);
    rankBar.scale.setTo(0.5, 0.5);
    this.scoreRecords = this.game.add.group();
    this.spwanRecordsByData(this.rankData, label, this.scoreId);
    // buttons
    const shareScoreButton = this.game.add.button(label.x - 20, (label.y + ((label.texture.height * 0.6) / 2)) - 60, 'shareScoreButton', this.share, this, 0.01, 1, 0);
    shareScoreButton.anchor.setTo(1, 0.5);
    shareScoreButton.scale.setTo(0.5, 0.5);
    const findAwardsButton = this.game.add.button(label.x + 20, (label.y + ((label.texture.height * 0.6) / 2)) - 60, 'findAwardsButton', this.findAwards, this, 0.01, 1, 0);
    findAwardsButton.anchor.setTo(0, 0.5);
    findAwardsButton.scale.setTo(0.5, 0.5);
    const couponButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'couponButton', this.getCoupon, this, 0.01, 1, 0);
    couponButton.anchor.setTo(0.5, 0.5);
    couponButton.scale.setTo(0.5, 0.5);
 }
  spwanRecordsByData(data, label, scoreId) {
    const length = data.length;
    const winLevel = (data.length - Number(scoreId)) / data.length;
    console.log(winLevel);
    let offsetY = label.y * 0.5;
    // if (length > 3) {
    //   data.slice
    // }
    data.forEach((record, index) => {
      const scoreLabel = this.game.add.image(this.game.world.centerX, offsetY, 'scoreLabel');
      scoreLabel.anchor.setTo(0.5, 0.5);
      scoreLabel.scale.setTo(0.6, 0.6);
      offsetY = scoreLabel.y + ((scoreLabel.texture.height * 0.6) / 2) + 70;
      const pentacle = this.game.add.image(scoreLabel.x - ((scoreLabel.texture.width * 0.6) / 2) + 10,
       scoreLabel.y, 'pentacle');
      pentacle.anchor.setTo(0, 0.5);
      pentacle.scale.setTo(0.5, 0.5);
      const recordIndex = this.game.add.text(pentacle.x + ((pentacle.texture.width * 0.5) / 2) - 5, pentacle.y, index,
    { font: '18px Arial', fill: '#ffffff' });
      recordIndex.anchor.setTo(0, 0.5);
      const picHolder = this.game.add.image(pentacle.x + pentacle.texture.width, pentacle.y, 'picHolder');
      picHolder.anchor.setTo(0, 0.5);
      picHolder.scale.setTo(0.5, 0.5);
      const recordText = this.game.add.text(picHolder.x + (picHolder.texture.width * 0.5) + 10, pentacle.y, record.score,
    { font: '36px Arial', fill: '#ffffff' });
      recordText.anchor.setTo(0, 0.5);
      const challengeButton = this.game.add.button(scoreLabel.x + ((scoreLabel.texture.width * 0.6) / 2) - 15, pentacle.y, 'challengeButton', this.startGame, this, 0.01, 1, 0);
      challengeButton.anchor.setTo(1, 0.5);
      challengeButton.scale.setTo(0.5, 0.5);
    });
  }
  share() {
    this.game.state.start('share');
  }
  startGame() {
    this.game.state.start('play');
  }
  findAwards() {
    this.game.state.start('award');
  }
  getCoupon() {
    this.game.state.start('coupon');
  }
}
