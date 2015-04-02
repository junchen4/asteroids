(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Bullet = Asteroids.Bullet = function (pos, vel, game) {
    Asteroids.MovingObject.call(this,
      {pos: pos,
       vel: vel,
       color: Bullet.COLOR,
       radius: Bullet.RADIUS,
       game: game})
  };

  Asteroids.Util.inherits(Bullet, Asteroids.MovingObject);

  Bullet.RADIUS = 10;
  Bullet.COLOR = "black";

  Bullet.prototype.collideWith = function(otherObject) {
    console.log("outside of colliding");
    if (otherObject instanceof Asteroids.Asteroid) {
      console.log("colliding");
      this.game.remove(otherObject);
      this.game.remove(this);
    }
  };

})();
