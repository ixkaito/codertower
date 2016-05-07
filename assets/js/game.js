enchant();

window.onload = function() {

  var game = new Core(window.innerWidth, window.innerHeight);
  game.fps = 15;
  game.preload('./assets/images/knight.png', './assets/images/green-slime.png');
  game.onload = function() {

    var player = new Sprite(32, 32);
    player.x = (this.width - 32) / 2;
    player.y = (this.height - 32) / 2;
    var playerImage = new Surface(192, 128);
    playerImage.draw(game.assets['./assets/images/knight.png'], 96, 0, 192, 128, 0, 0, 192, 128);
    player.image = playerImage;

    player.isMoving = false;
    player.direction = 0;
    player.walk = 1;
    player.on('enterframe', function() {
      this.frame = this.direction * 6 + this.walk;
      if (this.isMoving) {
        this.moveBy(this.vx, this.vy);

        if (!(game.frame % 3)) {
          this.walk++;
          this.walk %= 3;
        }
        if ((this.vx && (this.x - 8) % 16 == 0) || (this.vy && this.y % 16 == 0)) {
          this.isMoving = false;
          this.walk = 1;
        }
      } else {
        this.vx = this.vy = 0;
        if (game.input.left) {
          this.direction = 1;
          this.vx = -4;
        } else if (game.input.right) {
          this.direction = 2;
          this.vx = 4;
        } else if (game.input.up) {
          this.direction = 3;
          this.vy = -4;
        } else if (game.input.down) {
          this.direction = 4;
          this.vy = 4;
        }
        if (this.vx || this.vy) {
          var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * 16 : 0) + 16;
          var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * 16 : 0) + 16;
          // if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
          //   this.isMoving = true;
          //   arguments.callee.call(this);
          // }
        }
      }
    });

    var stage1 = new Group();
    stage1.addChild(player);
    game.rootScene.addChild(stage1);

  };

  game.start();

};
