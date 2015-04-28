(function () {
  'use strict';
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Asteroid = Asteroids.Asteroid = function (pos, game, radius) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: Asteroids.Util.randomVec(2),
       color: Asteroid.COLOR,
       radius: radius || Asteroid.RADIUS,
       game: game})

    this.asteroidImage = new Image();
    this.asteroidImage.src = "images/asteroids.png";
  };

  Asteroid.RADIUS = 80;

  Asteroids.Util.inherits(Asteroid, Asteroids.MovingObject);

  Asteroid.prototype.collideWith = function(otherObject) {
    if (otherObject instanceof Asteroids.Ship) {
      if (this.game.ship.shieldOn === false) {
        otherObject.relocate();
        this.game.lives = this.game.lives - 1;
      } else {
        this.game.remove(otherObject);
        this.game.remove(this);  
        if (this.radius > 20) {
          this.game.split(this);
        }
      }
    }

    if (otherObject instanceof Asteroids.Bullet) {
      this.game.remove(otherObject);
      this.game.remove(this);  
      if (this.radius > 20) {
        this.game.split(this);
      } else {
        this.game.asteroidsDestroyed += 1;
      }
 
    }      
  };

  Asteroid.prototype.draw = function(ctx){
    ctx.drawImage(
      this.asteroidImage,
      0,
      700,
      100,
      100,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.radius * 2,
      this.radius * 2
    )
  };

})();
