(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Game = Asteroids.Game = function() {
      this.ship = new Asteroids.Ship([Game.DIM_X/2, Game.DIM_Y/2], this);
      this.bullets = [];
      this.lives = 5;
      this.asteroidsDestroyed = 0;
      this.level = 1;
      this.numAsteroids = 5;

      this.ship.activateShield();
      this.addAsteroids();
  };

  Game.DIM_X = window.innerWidth * 0.99;
  Game.DIM_Y = window.innerHeight * 0.90;
  // Game.NUM_ASTEROIDS = 5;
  Game.NUM_BULLETS = 20;

  Game.prototype.add = function(obj) {
    if (obj instanceof Asteroids.Asteroid) {
        this.asteroids.push(obj);
    } else if (obj instanceof Asteroids.Bullet) {
        this.bullets.push(obj);
    }

  };

  Game.prototype.remove = function (obj) {
    if (obj instanceof Asteroids.Asteroid) {
      for (var i = 0; i < this.asteroids.length; i++) {
        if(this.asteroids[i].pos === obj.pos) {
          this.asteroids.splice(i, 1);
        }
      }
    } else if (obj instanceof Asteroids.Bullet) {
      for (var i = 0; i < this.bullets.length; i++) {
        if(this.bullets[i].pos === obj.pos) {
          this.bullets.splice(i, 1);
        }
      }
    }

    if (this.asteroids.length === 0) {
      this.level += 1;
      this.numAsteroids += 1;
      this.addAsteroids();
    }
  };

  Game.prototype.addAsteroids = function(){
      this.asteroids = [];
      var i = 0;
      while(i < this.numAsteroids) {
          i += 1;
          var asteroid = new Asteroids.Asteroid(this.randomPosition(), this);
          this.add(asteroid);
      }
  };

  Game.prototype.randomPosition = function() {
    var x = Math.floor(Asteroids.Game.DIM_X * Math.random());
    var y = Math.floor(Asteroids.Game.DIM_Y * Math.random());
    return [x,y];
  };

  Game.prototype.draw = function(ctx, img) {
    ctx.clearRect(0, 0, Asteroids.Game.DIM_X, Asteroids.Game.DIM_Y);
    ctx.drawImage(img, -550, -50);

    this.allObjects().forEach(function (object) {
      object.draw(ctx);
    });

    ctx.fillStyle = 'red';
    ctx.font="27px Verdana red";
    ctx.fillText("Lives left: " + this.lives, 90, 30);
    ctx.fillText("Shields left: " + this.ship.shields, 290, 30);
    ctx.fillText("Asteroids Destroyed: " + this.asteroidsDestroyed, 550, 30);
    ctx.fillText("Level: " + this.level, 750, 30);


  };

  Game.prototype.moveObjects = function () {
    this.allObjects().forEach(function (object) {
      object.move();
    });
  };

  Game.wrap = function(pos) {
    var result = pos;
    var limit = Asteroids.Asteroid.RADIUS
    var justBelowLimit = Asteroids.Asteroid.RADIUS - 0.0001
    var justAboveLimit = Asteroids.Asteroid.RADIUS + 0.0001

    if(pos[0] < 0 - limit) {
      result[0] = Asteroids.Game.DIM_X + justBelowLimit;
    }
    else if (pos[0] > Asteroids.Game.DIM_X + limit) {
      result[0] = 0 - justAboveLimit;
    }

    if(pos[1] < 0 - limit) {
      result[1] = Asteroids.Game.DIM_Y + justBelowLimit;
    }
    else if (pos[1] > Asteroids.Game.DIM_Y + limit) {
      result[1] = 0 - justAboveLimit;
    }
    return result;
  };

  Game.prototype.checkCollisions = function () {
    for (var i = 0; i < this.allObjects().length - 1; i++) {
      for (var j = i + 1; j < this.allObjects().length; j++) {
        if (this.allObjects()[i].isCollidedWith(this.allObjects()[j])) {
          this.allObjects()[i].collideWith(this.allObjects()[j]);
        }
      }
    }
  };

  Game.prototype.step = function() {
    this.moveObjects();
    this.checkCollisions();
  };

  Game.prototype.split = function (asteroid) {
    var radius = asteroid.radius/2;
    for (i=0; i<3; i++){
      var ast = new Asteroids.Asteroid(asteroid.pos.slice(0), this, radius);
      this.add(ast);
    };
  };


  Game.prototype.allObjects = function () {
    return (this.asteroids.concat([this.ship]).concat(this.bullets));
  };

  Game.prototype.isOutofBounds = function (pos) {
    if (pos[0] > Asteroids.Game.DIM_X || pos[0] < 0 || pos[1] > Asteroids.Game.DIM_Y || pos[1] < 0) {
      return true;
    } else {
      return false;
    }

  };


})();
