import { createCss } from 'utils';

require('pixi.js');
require('p2');
require('phaser');


// import { Game } from './game';
const { Game } = require('./game');

const fontSettings = {
  name: 'DFPHaiBaoW12',
  url: `${__ASSET_DIR__}/DFPHaiBaoW12.ttf`,
  format: 'truetype',
};

const fontFaceCssInHead = `@font-face { 
  font-family: '${fontSettings.name}'; 
  src: url('${fontSettings.url}') format('${fontSettings.format}');
}
.hiddenText {
        font-family: ${fontSettings.name};
        visibility: hidden;
        height: 0;
    }
`;
createCss('head', fontFaceCssInHead, () => new Game());
