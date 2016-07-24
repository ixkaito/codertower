enchant();

window.onload = function() {

  var game = new Core(320, 420);
  game.fps = 15;
  game.preload(
    './assets/images/gameover.png',
    './assets/images/map.png',
    './assets/images/knight.png',
    './assets/images/slime-and-witch.png'
  );

  // buttons
  game.buttons = {
    a: new Button('A', 'light'),
  };
  game.buttons.a.x = 260;
  game.buttons.a.y = 355;

  game.over = function() {
    var game = enchant.Core.instance;

    var scene = new Scene();

    var overlay = new Sprite(320, 320);
    overlay.backgroundColor = 'rgba(0, 0, 0, 0.5';
    scene.addChild(overlay);

    var text = new Sprite(189, 97);
    text.image = game.assets['./assets/images/gameover.png'];
    text.x = (overlay.width - text.width) / 2;
    text.y = (overlay.height - text.height) / 2;
    scene.addChild(text);

    game.pushScene(scene);
  },

  game.onload = function() {

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
    var player1 = new Player(stage1, map1, 9, 9, enemies1);

    game.rootScene.addChild(stage1);

    /**
     * Add game pad
     */
    var pad = new Pad();
    pad.x = 0;
    pad.y = 320;
    game.rootScene.addChild(pad);

    // buttonA = new Button('A', 'light');
    // buttonA.x = 260;
    // buttonA.y = 355;
    game.rootScene.addChild(game.buttons.a);
    game.keybind( 'A'.charCodeAt(0), 'a' );

  };

  game.start();

};
