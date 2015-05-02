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
    this.shieldOn = true;
    this.shields = 3;
    this.direction = 0;

    this.shipImage = new Image();
    this.shipImage.src = "images/ship.png";
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "red";
  Ship.SHIELDRADIUS = 40;

  Ship.prototype.draw = function (ctx) {
    ctx.save();

    ctx.translate(this.pos[0], this.pos[1]);

    ctx.rotate(this.direction);
    ctx.drawImage(
      this.shipImage,
      0,
      0,
      1000,
      915,
      -1 * this.radius,
      -1 * this.radius,
      this.radius * 2,
      this.radius * 2
      );

    ctx.restore();

    if (this.shieldOn) {
      ctx.beginPath();
      ctx.arc(
        this.pos[0],
        this.pos[1],
        40,
        0,
        2 * Math.PI,
        false
      );
    ctx.closePath();
    ctx.stroke();
    }

  };

  Ship.prototype.rotateLeft = function () {
    this.direction -= 8/360*2*Math.PI;
  };

  Ship.prototype.rotateRight = function () {
    this.direction += 8/360*2*Math.PI;
  }; 

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.activateShield();
    this.vel = [0,0];
  };

  Ship.prototype.accelerate = function() {
    var accelerationVec = Asteroids.Util.angleVec(this.direction, 0.2);

    if (Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2) < 50) { 
      this.vel[0] += accelerationVec[0];
      this.vel[1] += accelerationVec[1];
    }
  };

  Ship.prototype.decelerate = function () {
    this.vel[0] = 0.95 * this.vel[0];
    this.vel[1] = 0.95* this.vel[1];
  };

  Ship.prototype.activateShield = function () {
      this.shieldOn = true;
      setTimeout(function () {
        this.shieldOn = false;
      }.bind(this), 3000);
  };

  Ship.prototype.fireBullet = function() {
    var bulletPosition = [this.pos[0] + 1, this.pos[1] + 1];
    var angle = this.direction;
    var bulletVelocity = [5 * Math.cos(this.direction), 5 * Math.sin(this.direction)];
 
    var bullet = new Asteroids.Bullet(bulletPosition, bulletVelocity, this.game);
    this.game.add(bullet);
  };

})();
