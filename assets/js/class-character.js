/**
 * HitZone class
 *
 * @extends Sprite class
 */
var HitZone = enchant.Class.create(enchant.Sprite, {
  initialize: function(stage, width, height) {
    Sprite.call(this);
    this.width = width;
    this.height = height;
    this.opacity = 0;
    stage.addChild(this);
  }
});

var EnemyHitZone = enchant.Class.create(enchant.Sprite, {
  initialize: function(stage, width, height) {
    Sprite.call(this);
    this.width = width;
    this.height = height;
    this.opacity = 0;
    stage.addChild(this);
  }
});

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

  /**
   * Set start position of the sprite
   *
   * @update x
   * @update y
   *
   * @param  {int} col The number of columns of tiles in the map.
   * @param  {int} row The number of rows of tiles in the map.
   * @return {null}
   */
  startPosition: function(map, col, row) {
    this.x = map.tileWidth * (col - 0.5);
    this.y = map.tileHeight * (row - 1);
  },

  /**
   * Calculate the current frame
   *
   * @update frame
   *
   * @return {null}
   */
  currentFrame: function() {
    this.frame = this.direction * (this.image.width / this.width) + this.walk;
  },

  /**
   * Move the sprite
   *
   * @update x
   * @update y
   *
   * @param  {Object} game The game core object.
   * @return {null}
   */
  move: function(game, map) {
    this.moveBy(this.vx, this.vy);

    if (!(game.frame % this.walkFrames)) {
      this.walk++;
      this.walk %= this.walkFrames;
    }

    if (
      (this.vx && (this.x - (map.tileWidth / 2)) % map.tileWidth == 0) ||
      (this.vy && this.y % map.tileHeight == 0)
    ) {
      this.isMoving = false;
      this.walk = 1;
    }
  },

  /**
   * Retrieve whether the sprite can move to the destination
   *
   * @param  {Object} map The current map object.
   * @return {Bool} true  If the sprite can move.
   *                false If the sprite can't move.
   */
  canMove: function(map) {
    var x = this.x + (this.width / 2) + (this.vx ? this.vx / Math.abs(this.vx) * (this.width / 2) : 0);
    var y = this.y + (this.height / 2) + (this.vy ? this.vy / Math.abs(this.vy) * (this.height / 2) : 0);
    return 0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y);
  },

  /**
   * Set the direction randomly
   *
   * @update direction
   * @update vx
   * @update vy
   *
   * @return {null}
   */
  randomDirection: function() {
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

  /**
   * Synchronize the hit zone with the sprite
   *
   * @return {null}
   */
  syncHitZone: function() {
    this.hitZone.x = (this.width - this.hitZone.width) / 2 + this.x;
    this.hitZone.y = (this.width - this.hitZone.width) + this.y;
  }
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
  initialize: function(game, stage, map, col, row, enemies) {
    Sprite.call(this);
    this.width = 32;
    this.height = 32;
    this.hitZone = new HitZone(stage, 16, 16);

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
      this.syncHitZone();
      this.currentFrame();

      if (this.isMoving) {
        this.move(game, map);
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

      /**
       * Game over
       */
      for (i = 0; i < enemies.length; i++) {
        if (this.hitZone.intersect(enemies[i].hitZone) != '') {
          game.stop();
        }
      }

    });

    // position
    this.startPosition(map, col, row);
    stage.addChild(this);

  }
});

/**
 * Green slime class
 * @param  {int} col  Horizontal grid on the stage. Minimal 1 to max 18.
 * @param  {int} row  Vertical grid on the stage. Minimal 1 to max 18.
 */
var GreenSlime = enchant.Class.create(Character, {
  initialize: function(game, stage, map, col, row) {
    Sprite.call(this);
    this.width = 32;
    this.height = 32;
    this.hitZone = new EnemyHitZone(stage, 16, 16);

    // image
    this.image = new Surface(96, 128);
    this.image.draw(
      game.assets['./assets/images/slime-and-witch.png'],
      0, 0, 96, 128,
      0, 4, 96, 128
    );

    this._delay = 30;
    this.delay = this._delay;
    this.speed = 2;

    // move
    this.on('enterframe', function() {
      this.syncHitZone();
      this.currentFrame();

      if (this.isMoving) {
        this.move(game, map);
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
    this.startPosition(map, col, row);

    var x = this.x + (this.width / 2);
    var y = this.y + (this.height / 2);

    if (!map.hitTest(x, y)) {
      stage.addChild(this);
    }
  }
});
