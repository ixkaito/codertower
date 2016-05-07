enchant();

window.onload = function() {

  var game = new Core(window.innerWidth, window.innerHeight);
  game.fps = 15;
  game.preload('./assets/images/knight.png', './assets/images/green-slime.png');
  game.onload = function() {

    var player = new Sprite(32, 32);
    player.x = 0;
    player.y = 0;
    var playerImage = new Surface(288, 128);
    playerImage.draw(game.assets['./assets/images/knight.png'], 0, 0, 288, 128, 0, 0, 288, 128);
    player.image = playerImage;

    var stage1 = new Group();
    stage1.addChild(player);
    game.rootScene.addChild(stage1);

  };

  game.start();

};
