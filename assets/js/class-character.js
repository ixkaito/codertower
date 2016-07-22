/**
 * Character class
 *
 * @extends Sprite class
 */
var Character = enchant.Class.create(enchant.Sprite, {

  isMoving: false,
  direction: 0,
  left: 1,
  right: 2,
  up: 3,
  down: 4,
  walk: 1,
  walkFrames: 3,
  speed: 4,

  startPosition: function(tileX, tileY) {
    this.x = settings.map.tileWidth * (tileX - 0.5);
    this.y = settings.map.tileHeight * (tileY - 1);
  },

  calFrame: function() {
    this.frame = this.direction * (this.image.width / this.width) + this.walk;
  },

  move: function(game) {
    this.moveBy(this.vx, this.vy);

    if (!(game.frame % this.walkFrames)) {
      this.walk++;
      this.walk %= this.walkFrames;
    }

    if (
      (this.vx && (this.x - (settings.map.tileWidth / 2)) % settings.map.tileWidth == 0) ||
      (this.vy && this.y % settings.map.tileHeight == 0)
    ) {
      this.isMoving = false;
      this.walk = 1;
    }
  },

  canMove: function(map) {
    var x = this.x + (this.width / 2) + (this.vx ? this.vx / Math.abs(this.vx) * (this.width / 2) : 0);
    var y = this.y + (this.height / 2) + (this.vy ? this.vy / Math.abs(this.vy) * (this.height / 2) : 0);
    return 0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y);
  },

  randomDirection() {
    this.direction = Math.floor(Math.random() * 4 + 1);
    if (this.direction == this.left) {
      this.vx = - this.speed;
    } else if (this.direction == this.right) {
      this.vx = this.speed;
    } else if (this.direction == this.up) {
      this.vy = - this.speed;
    } else if (this.direction == this.down) {
      this.vy = this.speed;
    }
  },
});

/**
 * Player class
 *
 * @extends Character class
 *
 * @param  {Object} stage
 * @param  {Object} map
 */
var Player = enchant.Class.create(Character, {
  initialize: function(game, stage, map, tileX, tileY) {
    Sprite.call(this, settings.character.width, settings.character.height);

    console.log(this);

    // image
    this.image = new Surface(192, 128);
    this.image.draw(
      game.assets['./assets/images/knight.png'],
      96, 0, 192, 128,
       0, 0, 192, 128
    );

    // move
    this.on('enterframe', function() {

      this.calFrame();

      if (this.isMoving) {
        this.move(game);
      } else {
        this.vx = this.vy = 0;
        if (game.input.left) {
          this.direction = this.left;
          this.vx = - this.speed;
        } else if (game.input.right) {
          this.direction = this.right;
          this.vx = this.speed;
        } else if (game.input.up) {
          this.direction = this.up;
          this.vy = - this.speed;
        } else if (game.input.down) {
          this.direction = this.down;
          this.vy = this.speed;
        }
        if (this.vx || this.vy) {
          if (this.canMove(map)) {
            this.isMoving = true;
            arguments.callee.call(this);
          }
        }
      }
    });

    // position
    this.startPosition(tileX, tileY);
    stage.addChild(this);

  }
});

/**
 * Green slime class
 * @param  {int} tileX  Horizontal grid on the stage. Minimal 1 to max 18.
 * @param  {int} tileY  Vertical grid on the stage. Minimal 1 to max 18.
 */
var GreenSlime = enchant.Class.create(Character, {
  initialize: function(game, stage, map, tileX, tileY) {
    Sprite.call(this, settings.character.width, settings.character.height);

    // image
    this.image = new Surface(96, 128);
    this.image.draw(
      game.assets['./assets/images/green-slime.png'],
      0, 0, 96, 128,
      0, 0, 96, 128
    );

    this._delay = 30;
    this.delay = this._delay;
    this.speed = 2;

    // move
    this.on('enterframe', function() {

      this.calFrame();

      if (this.isMoving) {
        this.move(game);
      } else if (this.delay == 0) {
        this.delay = this._delay;
        this.vx = this.vy = 0;
        this.randomDirection();

        if (this.vx || this.vy) {
          if (this.canMove(map)) {
            this.isMoving = true;
            arguments.callee.call(this);
          }
        }
      } else {
        this.delay -= 1;
      }
    });

    // position
    this.startPosition(tileX, tileY);

    var x = this.x + (this.width / 2);
    var y = this.y + (this.height / 2);

    if (!map.hitTest(x, y)) {
      stage.addChild(this);
    }
  }
});
