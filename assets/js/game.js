enchant();

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
    var map = Class.create(Map, {
      initialize: function(stage, mapData) {
        this.grid = {
          width: 16,
          height: 16,
        }
        Map.call(this, this.grid.width, this.grid.height);

        this.image = game.assets['./assets/images/map.png'];
        this.loadData(mapData.loadData[0], mapData.loadData[1]);
        this.collisionData = mapData.collisionData;

        stage.addChild(this);
      }
    });

    /**
     * Player class
     * @param  {Object} stage
     * @param  {Object} map
     */
    var player = Class.create(Sprite, {
      initialize: function(stage, map) {
        this.width = 32;
        this.height = 32;
        Sprite.call(this, this.width, this.height);

        // image
        this.surface = {
          image: game.assets['./assets/images/knight.png'],
          width: 192,
          height: 128,
        };
        this.surface.column = this.surface.width / this.width;
        this.surface.clip = {
          x: 96,
          y: 0,
          width: this.surface.width,
          height: this.surface.height,
        };
        this.surface.position = {
          x: 0,
          y: 0,
          width: this.surface.width,
          height: this.surface.height,
        }

        var surface = new Surface(this.surface.width, this.surface.height);
        surface.draw(
          this.surface.image,
          this.surface.clip.x,
          this.surface.clip.y,
          this.surface.clip.width,
          this.surface.clip.height,
          this.surface.position.x,
          this.surface.position.y,
          this.surface.position.width,
          this.surface.position.height
        );
        this.image = surface;

        // move
        this.isMoving = false;
        this.direction = 0;
        this.left = 1;
        this.right = 2;
        this.up = 3;
        this.down = 4;
        this.walk = 1;
        this.walkFrames = 3;
        this.speed = 4;

        this.on('enterframe', function() {
          this.frame = this.direction * this.surface.column + this.walk;
          if (this.isMoving) {
            this.moveBy(this.vx, this.vy);

            if (!(game.frame % this.walkFrames)) {
              this.walk++;
              this.walk %= this.walkFrames;
            }
            if ((this.vx && (this.x - (map.grid.width / 2)) % map.grid.width == 0) || (this.vy && this.y % map.grid.height == 0)) {
              this.isMoving = false;
              this.walk = 1;
            }
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
              var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * (this.width / 2) : 0) + (this.width / 2);
              var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * (this.height / 2) : 0) + (this.height / 2);
              if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                this.isMoving = true;
                arguments.callee.call(this);
              }
            }
          }
        });

        // position
        this.x = (map.width - this.width - map.grid.width) / 2;
        this.y = (map.height - this.height) / 2;
        stage.addChild(this);

      }
    });

    /**
     * Green slime class
     * @param  {int} xGrid  Horizontal grid on the stage. Minimal 1 to max 18.
     * @param  {int} yGrid  Vertical grid on the stage. Minimal 1 to max 18.
     */
    var greenSlime = Class.create(Sprite, {
      initialize: function(stage, map, xGrid, yGrid) {
        this.width = 32;
        this.height = 32;
        Sprite.call(this, this.width, this.height);

        // image
        this.surface = {
          image: game.assets['./assets/images/green-slime.png'],
          width: 96,
          height: 128,
        };
        this.surface.column = this.surface.width / this.width;
        this.surface.clip = {
          x: 0,
          y: 0,
          width: this.surface.width,
          height: this.surface.height,
        };
        this.surface.position = {
          x: 0,
          y: 0,
          width: this.surface.width,
          height: this.surface.height,
        }

        var surface = new Surface(this.surface.width, this.surface.height);
        surface.draw(
          this.surface.image,
          this.surface.clip.x,
          this.surface.clip.y,
          this.surface.clip.width,
          this.surface.clip.height,
          this.surface.position.x,
          this.surface.position.y,
          this.surface.position.width,
          this.surface.position.height
        );
        this.image = surface;

        // move
        this.isMoving = false;
        this.direction = 0;
        this.left = 1;
        this.right = 2;
        this.up = 3;
        this.down = 4;
        this.walk = 1;
        this.walkFrames = 3;
        this.speed = 4;

        this.on('enterframe', function() {
          this.frame = this.direction * this.surface.column + this.walk;
          if (this.isMoving) {
            this.moveBy(this.vx, this.vy);

            if (!(game.frame % this.walkFrames)) {
              this.walk++;
              this.walk %= this.walkFrames;
            }
            if ((this.vx && (this.x - (map.grid.width / 2)) % map.grid.width == 0) || (this.vy && this.y % map.grid.height == 0)) {
              this.isMoving = false;
              this.walk = 1;
            }
          } else {
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
              var x = this.x + (this.vx ? this.vx / Math.abs(this.vx) * (this.width / 2) : 0) + (this.width / 2);
              var y = this.y + (this.vy ? this.vy / Math.abs(this.vy) * (this.height / 2) : 0) + (this.height / 2);
              if (0 <= x && x < map.width && 0 <= y && y < map.height && !map.hitTest(x, y)) {
                this.isMoving = true;
                arguments.callee.call(this);
              }
            }
          }
        });

        // position
        this.x = map.grid.width * (xGrid - 0.5);
        this.y = map.grid.height * (yGrid - 1);

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
    var map1 = new map(stage1, mapData1);
    var greenSlimes = [
      new greenSlime(stage1, map1, 1, 1),
      new greenSlime(stage1, map1, 2, 16),
      new greenSlime(stage1, map1, 6, 5),
      new greenSlime(stage1, map1, 7, 12),
      new greenSlime(stage1, map1, 13, 6),
      new greenSlime(stage1, map1, 15, 12),
      new greenSlime(stage1, map1, 18, 1),
      new greenSlime(stage1, map1, 18, 18),
    ];
    var player1 = new player(stage1, map1);

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
