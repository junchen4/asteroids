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
    this.shipMoved = false;
    this.shieldOn = true;
    this.shields = 3;

    this.shipImage = new Image();
    this.shipImage.src = "images/ship.png";
  }

  Asteroids.Util.inherits(Ship, Asteroids.MovingObject);

  Ship.RADIUS = 20;
  Ship.COLOR = "red";
  Ship.SHIELDRADIUS = 40;

  Ship.prototype.draw = function (ctx) {
    ctx.save();

    if (this.shipMoved === false) {
      ctx.drawImage(
      this.shipImage,
      0,
      0,
      1000,
      915,
      this.pos[0] - this.radius,
      this.pos[1] - this.radius,
      this.radius * 2,
      this.radius * 2
      );

    } else {
      ctx.translate(this.pos[0], this.pos[1]);

      if (this.vel[1] <= 0) {
        var angle = -1 * Math.acos(this.vel[0]/(Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))));
      } else {
        var angle = Math.acos(this.vel[0]/(Math.sqrt(Math.pow(this.vel[0], 2) + Math.pow(this.vel[1], 2))));
      }
      ctx.rotate(angle);
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
    }

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

  Ship.prototype.relocate = function() {
    this.pos = this.game.randomPosition();
    this.activateShield();
    this.vel = [0,0];
  };

  Ship.prototype.power = function(impulse) {
    this.shipMoved = true;
    if (Math.pow(this.vel[0] + impulse[0], 2) + Math.pow(this.vel[1] + impulse[1], 2) > 100) {
      return;
    } 

    //conditionals if velocity and impulse are opposite directions
    //to give faster direction switch
    // var k = Math.abs(Math.sin(this.vel[0])) + 1;
    if (impulse[0] * this.vel[0] < 0) {//opposite directions
      // if (this.vel[0] < 10) {
      //   this.vel[0] += k * impulse[0];
      // } else {
        this.vel[0] += 3 * impulse[0];
      // }
    } else if (impulse[1] * this.vel[1] < 0) {
      this.vel[1] += 3 * impulse[1];
    } else {
      this.vel[0] += impulse[0];
      this.vel[1] += impulse[1];
    }
  };

  Ship.prototype.activateShield = function () {
      this.shieldOn = true;
      setTimeout(function () {
        this.shieldOn = false;
      }.bind(this), 3000);
  };

  Ship.prototype.fireBullet = function() {
    var bulletPosition = [this.pos[0] + 1, this.pos[1] + 1];

    if (this.shipMoved === false) {
      var bulletVelocity = [5, 0];
    } else {
      var angle = Math.acos(this.vel[0]/(Math.sqrt(Math.pow(this.vel[0],2) + Math.pow(this.vel[1],2))));

      if (this.vel[1] <= 0) {
        var bulletVelocity = [3 * (this.vel[0] + Math.cos(-1 * angle)), 3 * (this.vel[1] + Math.sin(-1 * angle))];
      } else {
        var bulletVelocity = [3 * (this.vel[0] + Math.cos(angle)), 3 * (this.vel[1] + Math.sin(angle))];
      }
    }
    
    var bullet = new Asteroids.Bullet(bulletPosition, bulletVelocity, this.game);
    this.game.add(bullet);
  };

})();
