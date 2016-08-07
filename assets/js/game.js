enchant();

window.onload = function() {

  var game = new Core(320, 420);
  game.fps = 15;
  game.preload(
    './assets/images/start.png',
    './assets/images/gameover.png',
    './assets/images/map.png',
    './assets/images/knight.png',
    './assets/images/slime-and-witch.png'
  );

  /**
   * Add pad method
   */
  game.addPad = function() {
    var pad = new Pad();
    pad.x = 0;
    pad.y = 320;
    this.rootScene.addChild(pad);
  };

  /**
   * Add buttons method
   */
  game.addButtons = function() {
    this.buttons = {
      a: new Button('A', 'light'),
      start: new Button('START', 'dark'),
    };
    this.buttons.a.x = 260;
    this.buttons.a.y = 355;
    this.buttons.start.x = 145;
    this.buttons.start.y = 355;

    this.rootScene.addChild(this.buttons.a);
    this.keybind( 'A'.charCodeAt(0), 'a' );

    // this.rootScene.addChild(this.buttons.start);
    // this.keybind( 10, 'start' ); // enter key
  };

  /**
   * Push opening scene method
   */
  game.opening = function() {
    var scene = new Scene();

    var overlay = new Sprite(320, 320);
    overlay.backgroundColor = 'rgba(255, 255, 255, 1)';
    scene.addChild(overlay);

    var text = new Sprite(236, 48);
    text.image = this.assets['./assets/images/start.png'];
    text.x = (overlay.width - text.width) / 2;
    text.y = (overlay.height - text.height) / 2;
    scene.addChild(text);

    this.pushScene(scene);

    scene.on('touchstart', function() {
      game.popScene();
    });
  };

  /**
   * Push game over scene method
   */
  game.gameover = function() {
    var scene = new Scene();

    var overlay = new Sprite(320, 320);
    overlay.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    scene.addChild(overlay);

    var text = new Sprite(189, 97);
    text.image = this.assets['./assets/images/gameover.png'];
    text.x = (overlay.width - text.width) / 2;
    text.y = (overlay.height - text.height) / 2;
    scene.addChild(text);

    this.pushScene(scene);
  };

  game.onload = function() {
    /**
     * Add game pad and buttons
     */
    game.addPad();
    game.addButtons();

    /**
     * Add opening scene
     */
    // game.opening();

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
  };

  game.start();

};
