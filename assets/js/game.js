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
     * Map class
     * @param  {Object} stage
     * @param  {Object} mapData
     */
    var FloorMap = Class.create(Map, {
      initialize: function(stage, mapData) {
        Map.call(this, settings.map.tileWidth, settings.map.tileHeight);

        this.image = game.assets['./assets/images/map.png'];
        this.loadData(mapData.loadData[0], mapData.loadData[1]);
        this.collisionData = mapData.collisionData;

        stage.addChild(this);
      }
    });

    /**
     * Character class
     *
     * @extends Sprite class
     */
    var Character = Class.create(Sprite, {

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

        move: function() {
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
    var Player = Class.create(Character, {
      initialize: function(stage, map, tileX, tileY) {
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
            this.move();
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
    var GreenSlime = Class.create(Character, {
      initialize: function(stage, map, tileX, tileY) {
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
            this.move();
          } else if (this.delay == 0) {
            this.delay = this._delay;
            this.vx = this.vy = 0;
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

    /**
     * Stage 1
     */
    var stage1 = new Group();
    var map1 = new FloorMap(stage1, mapData1);
    var greenSlimes = [
      new GreenSlime(stage1, map1, 1, 1),
      new GreenSlime(stage1, map1, 2, 16),
      new GreenSlime(stage1, map1, 6, 5),
      new GreenSlime(stage1, map1, 7, 12),
      new GreenSlime(stage1, map1, 13, 6),
      new GreenSlime(stage1, map1, 15, 12),
      new GreenSlime(stage1, map1, 18, 1),
      new GreenSlime(stage1, map1, 18, 18),
    ];
    var player1 = new Player(stage1, map1, 9, 9);

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
