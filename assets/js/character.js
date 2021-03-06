/**
 * Character class
 *
 * @extends Sprite class
 */
var Character = enchant.Class.create(enchant.Sprite, {

  direction: 0,
  left:      1,
  right:     2,
  up:        3,
  down:      4,

  fps:   5,
  hp:    0,
  speed: 4,

  isAttacking:  false,
  _attackFrame: 3,
  attackFrames: 3,

  isMoving:   false,
  _walkFrame: 1,
  walkFrames: 3,

  /**
   * Set start position of the sprite
   *
   * @update x
   * @update y
   *
   * @param  {int} col The number of columns of tiles in the map.
   * @param  {int} row The number of rows of tiles in the map.
   * @return {undefined}
   */
  startPosition: function(map, col, row) {
    this.x = col ? map.tileWidth * col : 0;
    this.y = row ? map.tileHeight * row : 0;
  },

  /**
   * Retrieve the current frame of the surface
   *
   * @update surface.frame
   *
   * @return {nudefined}
   */
  currentSurfaceFrame: function() {
    this.surface.frame = this.direction * (this.surface.image.width / this.surface.width)
                         + (this.isAttacking ? this._attackFrame : this._walkFrame);
  },

  /**
   * Calculate the attack frame
   *
   * @return {undefined}
   */
  attack: function() {
    var game = enchant.Core.instance;

    if (!(game.frame % (game.fps / this.fps))) {
      this._attackFrame++;
      this._attackFrame %= this.attackFrames;
      this._attackFrame += this.walkFrames;
    }
    else if (this._attackFrame == 5) {
      this.isAttacking = false;
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
    var x = this.x + (map.tileWidth / 2) + (this.vx ? this.vx / Math.abs(this.vx) * map.tileWidth : 0);
    var y = this.y + (map.tileHeight / 2) + (this.vy ? this.vy / Math.abs(this.vy) * map.tileHeight : 0);
    return 0 <= x && x < map.width &&
           0 <= y && y < map.height &&
           !map.hitTest(x, y);
  },

  /**
   * Move the sprite
   *
   * @update x
   * @update y
   *
   * @return {undefined}
   */
  move: function(map) {
    var game = enchant.Core.instance;

    this.moveBy(this.vx, this.vy);

    if (!(game.frame % (game.fps / this.fps))) {
      this._walkFrame++;
      this._walkFrame %= this.walkFrames;
    }

    if (
      (this.vx && this.x % map.tileWidth == 0) ||
      (this.vy && this.y % map.tileHeight == 0)
    ) {
      this.isMoving = false;
      this._walkFrame = 1;
    }
  },

  /**
   * Stick the surface with the sprite
   *
   * @update surface.x
   * @update surface.y
   *
   * @return {nudefined}
   */
  stickSurface: function() {
    var offsetX = 0;
    var offsetY = - 8;
    this.surface.x = (this.width - this.surface.width) / 2 + this.x + offsetX;
    this.surface.y = (this.height - this.surface.height) / 2 + this.y + offsetY;
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
    }
    else if (this.direction == this.right) {
      this.vx = this.speed;
    }
    else if (this.direction == this.up) {
      this.vy = - this.speed;
    }
    else if (this.direction == this.down) {
      this.vy = this.speed;
    }
  },
});

/**
 * Player class
 *
 * @extends Character class
 *
 * @param  {Object} scene
 * @param  {Object} map
 * @param  {int}    col   The number of columns of tiles in the map.
 * @param  {int}    row   The number of rows of tiles in the map.
 */
var Player = enchant.Class.create(Character, {
  initialize: function(scene, map, col, row) {
    var game = enchant.Core.instance;
    enchant.Sprite.call(this, 16, 16);

    // create surface
    this.surface = new Sprite(32, 32);
    this.surface.image = new Surface(192, 128);
    this.surface.image.draw(
      game.assets['./assets/images/knight.png'],
      96, 0, 192, 128,
       0, 0, 192, 128
    );

    // retrieve all the enemies on the current stage
    var enemies = [];
    scene.childNodes.forEach(function(node) {
      if (node.isEnemy == true) {
        enemies.push(node);
      }
    });

    // move
    this.on('enterframe', function() {
      this.stickSurface();
      this.currentSurfaceFrame();

      if (this.isAttacking) {
        this.attack();
      }
      else if (this.isMoving) {
        this.move(map);
      }
      else if (game.buttons.a.pressed || game.input.a) {
        this.isAttacking = true;
        arguments.callee.call(this);
      }
      else {
        this._attackFrame = 3;
        this.vx = this.vy = 0;

        if (game.input.left) {
          if (this.direction == this.left) this.vx = - this.speed;
          this.direction = this.left;
        }
        else if (game.input.right) {
          if (this.direction == this.right) this.vx = this.speed;
          this.direction = this.right;
        }
        else if (game.input.up) {
          if (this.direction == this.up) this.vy = - this.speed;
          this.direction = this.up;
        }
        else if (game.input.down) {
          if (this.direction == this.down) this.vy = this.speed;
          this.direction = this.down;
        }
        if (this.vx || this.vy) {
          if (this.canMove(map)) {
            this.isMoving = true;
            arguments.callee.call(this);
          }
        }
      }

      for (i = 0; i < enemies.length; i++) {

        /**
         * Attack detection
         */
        if (this.within(enemies[i], 17) && !enemies[i].dead && this.isAttacking) {

          if (
            (this.direction == 1 && this.x > enemies[i].x) ||
            (this.direction == 2 && this.x < enemies[i].x) ||
            (this.direction == 3 && this.y > enemies[i].y) ||
            (this.direction == 4 && this.y < enemies[i].y)
          ) {
            enemies[i].dead = true;
            scene.removeChild(enemies[i]);
            scene.removeChild(enemies[i].surface);
          }
        }

        /**
         * Game over
         */
        if (this.within(enemies[i], 12) && !enemies[i].dead) {
          game.gameover();
          game.stop();
        }
      }

    });

    // position
    this.startPosition(map, col, row);
    scene.addChild(this);
    scene.addChild(this.surface);
  }
});

/**
 * Enemy class
 *
 * @extends Character class
 */
var Enemy = enchant.Class.create(Character, {
  isEnemy: true,
});

/**
 * Green slime class
 *
 * @param  {Object} scene
 * @param  {Object} map
 * @param  {int}    col   The number of columns of tiles in the map.
 * @param  {int}    row   The number of rows of tiles in the map.*
 */
var GreenSlime = enchant.Class.create(Enemy, {
  initialize: function(scene, map, col, row) {
    var game = enchant.Core.instance;
    enchant.Sprite.call(this, 16, 16);

    // create surface
    this.surface = new Sprite(32, 32);
    this.surface.image = new Surface(192, 128);
    this.surface.image.draw(
      game.assets['./assets/images/slime-and-witch.png'],
      0, 0, 192, 128,
      0, 4, 192, 128
    );

    this._delay = 30;
    this.delay = this._delay;
    this.speed = 2;

    // move
    this.on('enterframe', function() {
      this.stickSurface();
      this.currentSurfaceFrame();

      if (this.isMoving) {
        this.move(map);
      }
      else if (this.delay == 0) {
        this.delay = this._delay;
        this.vx = this.vy = 0;
        this.randomDirection();

        if (this.vx || this.vy) {
          if (this.canMove(map)) {
            this.isMoving = true;
            arguments.callee.call(this);
          }
        }
      }
      else {
        this.delay -= 1;
      }
    });

    // position
    this.startPosition(map, col, row);
    scene.addChild(this);
    scene.addChild(this.surface);
  }
});
