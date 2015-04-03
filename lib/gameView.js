(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.game = new Asteroids.Game();
    this.ctx = canvasEl.getContext("2d");

  };

  GameView.prototype.start = function () {
    this.bindKeyHandlers();
    var img = new Image();
    img.src = 'lib/dog.jpg';
    img.onload = function () {
        this.ctx.drawImage(img, 50, 50);
    }.bind(this);
    var callback = function (ctx) {
      this.step();
      this.draw(ctx, img);
    };

    setInterval(callback.bind(this.game, this.ctx), 20);
  };

  GameView.prototype.bindKeyHandlers = function() {
    key('up', function(){
      this.game.ship.power([0, -0.5]);
    }.bind(this));
    key('down', function(){
      this.game.ship.power([0, 0.5]);
    }.bind(this));
    key('left', function(){
      this.game.ship.power([-0.5, 0]);
    }.bind(this));
    key('right', function(){
      this.game.ship.power([0.5, 0]);
    }.bind(this));
    ////////////////////
    key('space', function(){
      this.game.ship.fireBullet();
    }.bind(this));
  };

})();
