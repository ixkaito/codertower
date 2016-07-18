enchant();

window.onload = function() {

  var game = new Core(320, 420);
  game.fps = 15;
  game.preload('./assets/images/map.png', './assets/images/knight.png', './assets/images/green-slime.png');
  game.onload = function() {

    var mapGrid = 16;
    var map = new Map(mapGrid, mapGrid);
    map.image = game.assets['./assets/images/map.png'];
    map.loadData([
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
      [ 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64, 64,],
    ],[
      [  7, 23, 23, 23, 23, 23, 23, 23, 23,  7, 23, 23, 23, 23, 23, 23, 23, 23, 23,  7,],
      [  7, -1, -1, -1, -1, -1, -1, -1, -1,  7, -1, -1, -1, -1, -1, -1, -1, -1, -1,  7,],
      [  7, -1, 23,  7, 23, -1, 23,  7, -1, 23, -1, 23,  7, 23, 23, 23, 23, 23, 23,  7,],
      [  7, -1, -1,  7, -1, -1, -1,  7, -1, -1, -1, -1,  7, -1, -1, -1, -1, -1, -1,  7,],
      [  7, -1,  7, 23, 23,  7, 23, 23, 23,  7, 23, -1, 23, 23,  7, 23, 23, 23, -1,  7,],
      [  7, -1,  7, -1, -1,  7, -1, -1, -1, 23, -1, -1, -1, -1, 23, -1, -1, -1, -1,  7,],
      [  7, -1, 23,  7, -1, 23, -1,  7, -1, -1, -1, 23,  7, -1, -1, -1,  7, -1, 23,  7,],
      [  7, -1, -1,  7, -1, -1, -1, 23, 23, 23,  7, -1,  7, 23, 23, 23, 23, -1, -1,  7,],
      [  7, 23, -1, 23, 23,  7, -1, -1, -1, -1,  7, -1, 23, -1, -1, -1, -1, -1, 23,  7,],
      [  7, -1, -1, -1, -1,  7, 23,  7, 23, -1, 23, -1, -1, -1,  7, 23,  7, -1, -1,  7,],
      [  7, -1,  7, 23, -1,  7, -1,  7, -1, -1, -1, 23,  7, -1, 23, -1,  7, 23,  7,  7,],
      [  7, -1,  7, -1, -1,  7, -1, 23, 23,  7, -1, -1,  7, -1, -1, -1, 23, -1, 23,  7,],
      [  7, -1, 23,  7, -1,  7, -1, -1, -1,  7, 23, -1, 23, 23,  7, -1, -1, -1, -1,  7,],
      [  7, -1, -1, 23, 23, 23, -1,  7, -1,  7, -1, -1, -1, -1, 23,  7, -1,  7, -1,  7,],
      [  7, 23, -1, -1, -1, -1, -1,  7, -1, 23,  7, -1,  7, -1, -1,  7, -1,  7, -1,  7,],
      [  7, -1, -1,  7, -1, 23, 23, 23, -1, -1, 23, 23,  7, 23, -1, 23, 23, 23, 23,  7,],
      [  7, 23, -1,  7, -1, -1, -1, -1,  7, -1, -1, -1, 23, -1, -1, -1, -1, -1, -1,  7,],
      [  7, -1, -1, 23, 23,  7, 23, -1, 23,  7, 23, -1, -1, -1, 23,  7, -1,  7, -1,  7,],
      [  7,  7, -1, -1, -1,  7, -1, -1, -1,  7, -1, -1,  7, -1, -1,  7, -1,  7, -1,  7,],
      [ 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,],
    ]);
    map.collisionData = [
      [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,],
      [  1,  0,  0,  0,  0,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  1,],
      [  1,  0,  1,  1,  1,  0,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,],
      [  1,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,],
      [  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  1,  0,  1,],
      [  1,  0,  1,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  0,  1,],
      [  1,  0,  1,  1,  0,  1,  0,  1,  0,  0,  0,  1,  1,  0,  0,  0,  1,  0,  1,  1,],
      [  1,  0,  0,  1,  0,  0,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,  0,  0,  1,],
      [  1,  1,  0,  1,  1,  1,  0,  0,  0,  0,  1,  0,  1,  0,  0,  0,  0,  0,  1,  1,],
      [  1,  0,  0,  0,  0,  1,  1,  1,  1,  0,  1,  0,  0,  0,  1,  1,  1,  0,  0,  1,],
      [  1,  0,  1,  1,  0,  1,  0,  1,  0,  0,  0,  1,  1,  0,  1,  0,  1,  1,  1,  1,],
      [  1,  0,  1,  0,  0,  1,  0,  1,  1,  1,  0,  0,  1,  0,  0,  0,  1,  0,  1,  1,],
      [  1,  0,  1,  1,  0,  1,  0,  0,  0,  1,  1,  0,  1,  1,  1,  0,  0,  0,  0,  1,],
      [  1,  0,  0,  1,  1,  1,  0,  1,  0,  1,  0,  0,  0,  0,  1,  1,  0,  1,  0,  1,],
      [  1,  1,  0,  0,  0,  0,  0,  1,  0,  1,  1,  0,  1,  0,  0,  1,  0,  1,  0,  1,],
      [  1,  0,  0,  1,  0,  1,  1,  1,  0,  0,  1,  1,  1,  1,  0,  1,  1,  1,  1,  1,],
      [  1,  1,  0,  1,  0,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  0,  0,  0,  0,  1,],
      [  1,  0,  0,  1,  1,  1,  1,  0,  1,  1,  1,  0,  0,  0,  1,  1,  0,  1,  0,  1,],
      [  1,  1,  0,  0,  0,  1,  0,  0,  0,  1,  0,  0,  1,  0,  0,  1,  0,  1,  0,  1,],
      [  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,],
    ];

    var playerWidth  = 32;
    var playerHeight = 32;
    var player = new Sprite(playerWidth, playerHeight);
    var playerImage = new Surface(192, 128);
    playerImage.draw(game.assets['./assets/images/knight.png'], 96, 0, 192, 128, 0, 0, 192, 128);
    player.image = playerImage;

    player.x = (map.width - playerWidth - mapGrid) / 2;
    player.y = (map.height - playerHeight) / 2;
    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
    player.walkFrames = 3;
    player.speed = 4;

    player.on('enterframe', function() {
      this.frame = this.direction * 6 + this.walk;
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);

        if (!(game.frame % player.walkFrames)) {
          this.walk++;
          this.walk %= player.walkFrames;
        }
        if ((this.vx && (this.x - (mapGrid / 2)) % mapGrid == 0) || (this.vy && this.y % mapGrid == 0)) {
          this.isMoving = false;
          this.walk = 1;
        }
      } else {
        this.vx = this.vy = 0;
        if (game.input.left) {
          this.direction = 1;
          this.vx = - player.speed;
        } else if (game.input.right) {
          this.direction = 2;
          this.vx = player.speed;
        } else if (game.input.up) {
          this.direction = 3;
          this.vy = - player.speed;
        } else if (game.input.down) {
          this.direction = 4;
          this.vy = player.speed;
        }
        if (this.vx || this.vy) {
          var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * (playerWidth / 2) : 0) + (playerWidth / 2);
          var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * (playerHeight / 2) : 0) + (playerHeight / 2);
          if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
            this.isMoving = true;
            arguments.callee.call(this);
          }
        }
      }
    });

    /**
     * Add map and player
     */
    var stage1 = new Group();
    stage1.addChild(map);
    stage1.addChild(player);

    /**
     * Green slime class
     * @param  {int} xGrid  Horizontal grid on the stage. Minimal 1 to max 18.
     * @param  {int} yGrid  Vertical grid on the stage. Minimal 1 to max 18.
     */
    var greenSlime = Class.create(Sprite, {
      initialize: function(x, y) {
        this.w = 32;
        this.h = 32;
        Sprite.call(this, this.w, this.h);
        var slimeImage = new Surface(96, 128);
        slimeImage.draw(game.assets['./assets/images/green-slime.png'], 0, 0, 96, 128, 0, 0, 96, 128);
        this.image = slimeImage;

        this.x = x;
        this.y = y;
        this.isMoving = false;
        this.direction = 0;
        this.walk = 1;
        this.walkFrames = 3;
        this.speed = 4;

        this.on('enterframe', function() {
          this.frame = this.direction * 3 + this.walk;
        });

        // stage1.addChild(this);
      }
    });

    function randomAddEnermies(enermy, num) {

      var i = 0;
      var randXGrid, randYGrid, x, y;
      var e = new enermy();

      while (i < num) {
        randXGrid = Math.floor((Math.random() * 18) + 1); ;
        randYGrid = Math.floor((Math.random() * 18) + 1); ;

        x = mapGrid * (randXGrid - 0.5);
        y = mapGrid * (randYGrid - 1);

        if (!map.hitTest(x + e.w / 2, y + e.h / 2)) {
          stage1.addChild(new enermy(x, y));
          i++;
        }
      }
    }

    randomAddEnermies(greenSlime, 8);

    /**
     * Add stage 1
     */
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
