enchant();

var settings = {
  map: {
    tileWidth: 16,
    tileHeight: 16,
  },
  character: {
    width: 32,
    height: 32,
  },
};

window.onload = function() {

  var game = new Core(320, 420);
  game.fps = 15;
  game.preload('./assets/images/map.png', './assets/images/knight.png', './assets/images/green-slime.png');
  game.onload = function() {

    /**
     * Stage 1
     */
    var stage1 = new Group();
    var map1 = new FloorMap(game, stage1, mapData1);
    var greenSlimes = [
      new GreenSlime(game, stage1, map1, 1, 1),
      new GreenSlime(game, stage1, map1, 2, 16),
      new GreenSlime(game, stage1, map1, 6, 5),
      new GreenSlime(game, stage1, map1, 7, 12),
      new GreenSlime(game, stage1, map1, 13, 6),
      new GreenSlime(game, stage1, map1, 15, 12),
      new GreenSlime(game, stage1, map1, 18, 1),
      new GreenSlime(game, stage1, map1, 18, 18),
    ];
    var player1 = new Player(game, stage1, map1, 9, 9);

    game.rootScene.addChild(stage1);

    /**
     * Add game pad
     */
    var pad = new Pad();
    pad.x = 0;
    pad.y = 320;
    game.rootScene.addChild(pad);

  };

  game.start();

};
