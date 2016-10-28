export class LoadState extends Phaser.State {
  preload() {
    const loadingLabel = this.game.add.text(this.game.width / 2, (this.game.height / 2) - 30, '正在加载游戏中...', { font: '30px Arial', fill: '#ffffff' });
    loadingLabel.anchor.setTo(0.5, 0.5);
    const progressBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'progressBar');
    progressBar.anchor.setTo(0.5, 0.5);
    this.game.load.setPreloadSprite(progressBar);
    this.game.load.image('playerL', `${__ASSET_DIR__}/tigerLeft.png`);
    this.game.load.image('playerR', `${__ASSET_DIR__}/tigerRight.png`);
    this.game.load.image('shrimp', `${__ASSET_DIR__}/shrimp.png`);
    this.game.load.image('bomb', `${__ASSET_DIR__}/bomb.png`);
    this.game.load.image('pepper', `${__ASSET_DIR__}/pepper.png`);
    this.game.load.image('shallot', `${__ASSET_DIR__}/shallot.png`);
    this.game.load.image('pectinid', `${__ASSET_DIR__}/pectinid.png`);
    this.game.load.image('road', `${__ASSET_DIR__}/road.png`);
    this.game.load.image('house', `${__ASSET_DIR__}/house.png`);
    this.game.load.image('pointsBar', `${__ASSET_DIR__}/pointsBar.png`);
    this.game.load.image('backgroundGame', `${__ASSET_DIR__}/backgroundGame.png`);
    this.game.load.image('blurGameHome', `${__ASSET_DIR__}/blurGameHome.png`);
    this.game.load.image('themeDetail', `${__ASSET_DIR__}/themeDetail.png`);
    this.game.load.image('gameRegulation', `${__ASSET_DIR__}/gameRegulation.png`);
    this.game.load.image('gameWin', `${__ASSET_DIR__}/gameWin.png`);
    this.game.load.image('gameFail', `${__ASSET_DIR__}/gameFail.png`);
    this.game.load.image('celebration', `${__ASSET_DIR__}/celebration.png`);
    this.game.load.image('backgroundInfo', `${__ASSET_DIR__}/backgroundInfo.png`);
    this.game.load.image('squareLabel', `${__ASSET_DIR__}/squareLabel.png`);
    this.game.load.image('rankbar', `${__ASSET_DIR__}/rankbar.png`);
    this.game.load.image('awardDetail', `${__ASSET_DIR__}/awardDetail.png`);
    this.game.load.image('scoreLabel', `${__ASSET_DIR__}/scoreLabel.png`);
    this.game.load.image('pentacle', `${__ASSET_DIR__}/pentacle.png`);
    this.game.load.image('picHolder', `${__ASSET_DIR__}/picHolder.png`);
    this.game.load.image('encourageText', `${__ASSET_DIR__}/encourageText.png`);
    this.game.load.image('pixel', `${__ASSET_DIR__}/pixel.png`);

    this.game.load.audio('successSound', `${__ASSET_DIR__}/success.mp3`);
    this.game.load.audio('failSound', `${__ASSET_DIR__}/fail.mp3`);
    this.game.load.audio('background', `${__ASSET_DIR__}/background.mp3`);
    this.game.load.audio('explode', `${__ASSET_DIR__}/explode.mp3`);


    this.game.load.spritesheet('closeButton', `${__ASSET_DIR__}/close.png`);
    this.game.load.spritesheet('shareToFriends', `${__ASSET_DIR__}/shareToFriends.png`);
    this.game.load.spritesheet('getCoupon', `${__ASSET_DIR__}/getCoupon.png`);
    this.game.load.spritesheet('couponButton', `${__ASSET_DIR__}/coupon.png`);
    this.game.load.spritesheet('findAwardsButton', `${__ASSET_DIR__}/findAwards.png`);
    this.game.load.spritesheet('challengeButton', `${__ASSET_DIR__}/challenge.png`);
    this.game.load.spritesheet('share', `${__ASSET_DIR__}/share.png`);
    this.game.load.spritesheet('shareScoreButton', `${__ASSET_DIR__}/shareScore.png`);
    this.game.load.spritesheet('arrowButton', `${__ASSET_DIR__}/arrow.png`);
  }
  create() {
    this.loadingText = this.game.add.text(this.game.world.centerX,
    this.game.world.height / 2, '正在加载中ing');
    this.loadingText.anchor.setTo(0.5);
    this.game.state.start('regulation');
  }
}
