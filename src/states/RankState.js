export class RankState extends Phaser.State {
  init() {
    this.score = this.game.global.score;
    this.rankData = this.game.global.rankData || [];
    this.scoreId = this.game.global.scoreId;
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
    this.spwanRecordsByData(this.rankData, label);
    // buttons
    const shareScoreButton = this.game.add.button(label.x - 20, (label.y + ((label.texture.height * 0.6) / 2)) - 60, 'shareScoreButton', this.share, this, 0.01, 1, 0);
    shareScoreButton.anchor.setTo(1, 0.5);
    shareScoreButton.scale.setTo(0.62, 0.62);
    const findAwardsButton = this.game.add.button(label.x + 20, (label.y + ((label.texture.height * 0.6) / 2)) - 60, 'findAwardsButton', this.findAwards, this, 0.01, 1, 0);
    findAwardsButton.anchor.setTo(0, 0.5);
    findAwardsButton.scale.setTo(0.62, 0.62);
    const couponButton = this.game.add.button(this.game.world.centerX, this.game.world.height * 0.92, 'couponButton', this.getCoupon, this, 0.01, 1, 0);
    couponButton.anchor.setTo(0.5, 0.5);
    couponButton.scale.setTo(0.5, 0.5);
    const myScoreLabel = this.game.add.image(this.game.world.centerX, shareScoreButton.y - ((shareScoreButton.texture.height * 0.5) / 2) - 30, 'scoreLabel');
    myScoreLabel.anchor.setTo(0.5, 1);
    myScoreLabel.scale.setTo(0.62, 0.62);
    const myScoreText = this.game.add.text(this.game.world.centerX, myScoreLabel.y - ((myScoreLabel.texture.height * 0.62) / 2), `分数: ${this.score}    排名: ${this.scoreId}`,
    { font: '28px Arial', fill: '#ffffff' });
    myScoreText.anchor.setTo(0.5, 0.5);
    const encourageText = this.game.add.image(this.game.world.centerX, myScoreLabel.y - (myScoreLabel.texture.height * 0.62) - 30, 'encourageText');
    encourageText.anchor.setTo(0.5, 1);
    encourageText.scale.setTo(0.7, 0.7);
 }
  spwanRecordsByData(data, label) {
    const length = data.length;
    let offsetY = label.y * 0.5;
    const newData = length > 3 ? data.slice(0, 3) : data;
    newData.forEach((record, index) => {
      const scoreLabel = this.game.add.image(this.game.world.centerX, offsetY, 'scoreLabel');
      scoreLabel.anchor.setTo(0.5, 0.5);
      scoreLabel.scale.setTo(0.62, 0.62);
      offsetY = scoreLabel.y + ((scoreLabel.texture.height * 0.62) / 2) + 35;
      const pentacle = this.game.add.image(scoreLabel.x - ((scoreLabel.texture.width * 0.62) / 2) + 10,
       scoreLabel.y, 'pentacle');
      pentacle.anchor.setTo(0, 0.5);
      pentacle.scale.setTo(0.6, 0.6);
      const recordIndex = this.game.add.text(pentacle.x + ((pentacle.texture.width * 0.5) / 2) + 2, pentacle.y, index,
    { font: '28px Arial', fill: '#ffffff' });
      recordIndex.anchor.setTo(0.5, 0.5);
      const picHolder = this.game.add.image(pentacle.x + pentacle.texture.width, pentacle.y, 'picHolder');
      picHolder.anchor.setTo(0, 0.5);
      picHolder.scale.setTo(0.5, 0.5);
      const recordTitle = this.game.add.text(picHolder.x + (picHolder.texture.width * 0.5) + 10, pentacle.y - 10, record.nickname || 'unknown',
    { font: '18px Arial', fill: '#ffffff' });
      recordTitle.anchor.setTo(0, 0.5);
      const recordText = this.game.add.text(picHolder.x + (picHolder.texture.width * 0.5) + 10, pentacle.y + 10, record.score,
    { font: '18px Arial', fill: '#ffffff' });
      recordText.anchor.setTo(0, 0.5);
      const challengeButton = this.game.add.button(scoreLabel.x + ((scoreLabel.texture.width * 0.62) / 2) - 15, pentacle.y, 'challengeButton', this.startGame, this, 0.01, 1, 0);
      challengeButton.anchor.setTo(1, 0.5);
      challengeButton.scale.setTo(0.7, 0.7);
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
