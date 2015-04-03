(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Ship = Asteroids.Ship = function (pos, game) {
    this.pos = pos;
    this.color = Ship.COLOR;
    this.radius = Ship.RADIUS;
    this.vel = [0,0];
    this.game = game;
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "red";

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    //conditionals if velocity and impulse are opposite directions
    //to give faster direction switch
    this.vel[0] += impulse[0];
    this.vel[1] += impulse[1];

    //give max velocity? vel[0]^2 + vel[1]^2 = MAX?
  };

  Ship.prototype.fireBullet = function() {
    var bulletPosition = [this.pos[0] + 1, this.pos[1] + 1];
    var angle = -1 * Math.acos(this.vel[0]/(Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2))));

    if (this.vel[1] <= 0) {
      var bulletVelocity = [this.vel[0] + 5 * Math.cos(angle) , this.vel[1] + 5 * Math.sin(angle)];
    } else {
      angle = 2 * Math.PI - angle;
      var bulletVelocity = [this.vel[0] + 5 * Math.cos(angle) , this.vel[1] + 5 * Math.sin(angle)];
    }

    var bullet = new Asteroids.Bullet(bulletPosition, bulletVelocity, this.game);
    this.game.add(bullet);
  };

})();
