import { getRamdomRequest, getScaleRateY, setPreloadSprite } from 'utils';
import moment from 'moment';


export class LoadState extends Phaser.State {
  preload() {
    this.textOffsetY = getScaleRateY(30, this.game.height);
    const progressBarBorder = this.game.add.image(this.game.width / 2, this.game.height / 2, 'loadingEmpty');
    progressBarBorder.anchor.setTo(0.5, 1);
    progressBarBorder.scale.setTo(window.devicePixelRatio, window.devicePixelRatio);
    const progressBar = this.game.add.sprite(this.game.width / 2, this.game.height / 2, 'loadingFull');
    progressBar.anchor.setTo(0.5, 1);
    progressBar.scale.setTo(window.devicePixelRatio, window.devicePixelRatio);
    setPreloadSprite(progressBar, this.game);
    this.game.load.image('playerL', getRamdomRequest(`${__ASSET_DIR__}/tigerLeft.png`));
    this.game.load.image('playerR', getRamdomRequest(`${__ASSET_DIR__}/tigerRight.png`));
    this.game.load.image('shrimp', getRamdomRequest(`${__ASSET_DIR__}/shrimp.png`));
    this.game.load.image('bomb', getRamdomRequest(`${__ASSET_DIR__}/bomb.png`));
    this.game.load.image('pepper', getRamdomRequest(`${__ASSET_DIR__}/pepper.png`));
    this.game.load.image('shallot', getRamdomRequest(`${__ASSET_DIR__}/shallot.png`));
    this.game.load.image('pectinid', getRamdomRequest(`${__ASSET_DIR__}/pectinid.png`));
    this.game.load.image('road', getRamdomRequest(`${__ASSET_DIR__}/road.png`));
    this.game.load.image('house', getRamdomRequest(`${__ASSET_DIR__}/house.png`));
    this.game.load.image('pointsBar', getRamdomRequest(`${__ASSET_DIR__}/pointsBar.png`));
    this.game.load.image('backgroundGame', getRamdomRequest(`${__ASSET_DIR__}/backgroundGame.png`));
    this.game.load.image('blurGameHome', getRamdomRequest(`${__ASSET_DIR__}/blurGameHome.png`));
    this.game.load.image('themeDetail', getRamdomRequest(`${__ASSET_DIR__}/themeDetail.png`));
    this.game.load.image('gameRegulation', getRamdomRequest(`${__ASSET_DIR__}/gameRegulation.png`));
    this.game.load.image('gameWin', getRamdomRequest(`${__ASSET_DIR__}/gameWin.png`));
    this.game.load.image('gameFail', getRamdomRequest(`${__ASSET_DIR__}/gameFail.png`));
    this.game.load.image('celebration', getRamdomRequest(`${__ASSET_DIR__}/celebration.png`));
    this.game.load.image('backgroundInfo', getRamdomRequest(`${__ASSET_DIR__}/backgroundInfo.png`));
    this.game.load.image('squareLabel', getRamdomRequest(`${__ASSET_DIR__}/squareLabel.png`));
    this.game.load.image('rankbar', getRamdomRequest(`${__ASSET_DIR__}/rankbar.png`));
    this.game.load.image('awardDetail', getRamdomRequest(`${__ASSET_DIR__}/awardDetail.png`));
    this.game.load.image('scoreLabel', getRamdomRequest(`${__ASSET_DIR__}/scoreLabel.png`));
    this.game.load.image('picHolder', getRamdomRequest(`${__ASSET_DIR__}/picHolder.png`));
    this.game.load.image('pixel', getRamdomRequest(`${__ASSET_DIR__}/pixel.png`));
    this.game.load.image('myPointsLabel', getRamdomRequest(`${__ASSET_DIR__}/myPointsLabel.jpg`));

    this.game.load.audio('successSound', getRamdomRequest(`${__ASSET_DIR__}/success.mp3`));
    this.game.load.audio('failSound', getRamdomRequest(`${__ASSET_DIR__}/fail.mp3`));
    this.game.load.audio('background', getRamdomRequest(`${__ASSET_DIR__}/background.mp3`));
    this.game.load.audio('explode', getRamdomRequest(`${__ASSET_DIR__}/explode.mp3`));

    this.game.load.spritesheet('playAgain', getRamdomRequest(`${__ASSET_DIR__}/playAgain.png`));
    this.game.load.spritesheet('closeButton', getRamdomRequest(`${__ASSET_DIR__}/close.png`));
    this.game.load.spritesheet('shareToFriends', getRamdomRequest(`${__ASSET_DIR__}/shareToFriends.png`));
    this.game.load.spritesheet('getCoupon', getRamdomRequest(`${__ASSET_DIR__}/getCoupon.png`));
    this.game.load.spritesheet('couponButton', getRamdomRequest(`${__ASSET_DIR__}/coupon.png`));
    this.game.load.spritesheet('findAwardsButton', getRamdomRequest(`${__ASSET_DIR__}/findAwards.png`));
    this.game.load.spritesheet('challengeButton', getRamdomRequest(`${__ASSET_DIR__}/challenge.png`));
    this.game.load.spritesheet('share', getRamdomRequest(`${__ASSET_DIR__}/share.png`));
    this.game.load.spritesheet('shareScoreButton', getRamdomRequest(`${__ASSET_DIR__}/shareScore.png`));
    this.game.load.spritesheet('arrowButton', getRamdomRequest(`${__ASSET_DIR__}/arrow.png`));
    sessionStorage.setItem('assetLoaded', moment().add(1, 'days').calendar());
  }
  create() {
    this.game.state.start('regulation');
  }
}
