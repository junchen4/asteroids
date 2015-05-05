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

  Bullet.RADIUS = 5;
  Bullet.COLOR = "white";

  Bullet.prototype.collideWith = function(otherObject) {
  };

  Bullet.prototype.isWrappable = false;

})();
