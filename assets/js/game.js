enchant();

var pad, buttonA;

window.onload = function() {

  var game = new Core(320, 420);
  game.fps = 15;
  game.preload(
    './assets/images/gameover.png',
    './assets/images/map.png',
    './assets/images/knight.png',
    './assets/images/slime-and-witch.png'
  );
  game.onload = function() {

    var gameover = new Scene();

    var gameoverOverly = new Sprite(320, 320);
    gameoverOverly.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    gameover.addChild(gameoverOverly);

    var gameoverImage = new Sprite(189, 97);
    gameoverImage.image = game.assets['./assets/images/gameover.png'];
    gameoverImage.x = 65.5;
    gameoverImage.y = 111.5;
    gameover.addChild(gameoverImage);

    /**
     * Stage 1
     */
    var stage1 = new Group();
    var map1 = new FloorMap(stage1, mapData1);
    var enemies1 = [
      new GreenSlime(stage1, map1, 1, 1),
      new GreenSlime(stage1, map1, 2, 16),
      new GreenSlime(stage1, map1, 6, 5),
      new GreenSlime(stage1, map1, 7, 12),
      new GreenSlime(stage1, map1, 13, 6),
      new GreenSlime(stage1, map1, 15, 12),
      new GreenSlime(stage1, map1, 18, 1),
      new GreenSlime(stage1, map1, 18, 18),
    ];
    var player1 = new Player(stage1, map1, 9, 9, enemies1, gameover);

    game.rootScene.addChild(stage1);

    /**
     * Add game pad
     */
    pad = new Pad();
    pad.x = 0;
    pad.y = 320;
    game.rootScene.addChild(pad);

    buttonA = new Button('A', 'light');
    buttonA.x = 260;
    buttonA.y = 355;
    game.rootScene.addChild(buttonA);
    game.keybind( 'A'.charCodeAt(0), 'a' );

  };

  game.start();

};
