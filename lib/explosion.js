(function() {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  }

  var Explosion = Asteroids.Explosion = function (pos, game, radius) {
      this.pos = pos;
      this.game = game;
      this.radius = radius + 10;

      this.img = new Image();
      this.img.src = "images/explosion.png";

      setTimeout(this.game.remove.bind(this.game, this), 150); //Explosion appears on screen momentarily 
  };

  Explosion.prototype.draw = function (ctx) {
    ctx.drawImage(
          this.img,
          280,
          250,
          200,
          120,
          this.pos[0],
          this.pos[1],
          this.radius,
          this.radius
          )
  };

  Explosion.prototype.move = function () {
  };

  Explosion.prototype.isCollidedWith = function () {
  };

})();
