(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.ctx = canvasEl.getContext("2d");

  };

  GameView.prototype.startMenu = function () {
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth * 0.90, window.innerHeight * 0.90);
    this.ctx.fillStyle = "black";  
    this.ctx.fillRect(0, 0, window.innerWidth * 0.90, window.innerHeight * 0.90);
    this.ctx.font = "30px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";   
    this.ctx.fillText(
      "Press arrow keys to move ship, s for shield, and spacebar to fire.",
      1000 / 2,
      200
    );
    this.ctx.font = "25px serif";
    this.ctx.fillText(
      "Press Enter to start!",
      1000 / 2,
      300
    )
  };

  GameView.prototype.start = function () {
    this.game = new Asteroids.Game();
    this.bindKeyHandlers();
    var img = new Image();
    img.src = 'images/space.jpg';
    // img.onload = function () {
    //     this.ctx.drawImage(img, 50, 50);
    // }.bind(this);
    var callback = function (ctx) {
      this.step();
      this.draw(ctx, img);
      //conditional for lost game, replay, etc
      if (this.lives <= 0) {
        gameview.endGame();
        // var canvasEl = document.getElementById("game-canvas");
        // new Asteroids.GameView(canvasEl).start();        
      }
    }
    var gameview = this;
    this.callbackID = setInterval(callback.bind(this.game, this.ctx), 20);
  };


  GameView.prototype.endGame = function () {
    window.clearInterval(this.callbackID);
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth * 0.90, window.innerHeight * 0.90);
    this.ctx.fillStyle = "black";  
    this.ctx.fillRect(0, 0, window.innerWidth * 0.90, window.innerHeight * 0.90);
    this.ctx.font = "30px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";   
    this.ctx.fillText(
      "The asteroids destroyed your ship!",
      1000 / 2,
      200
    );
    this.ctx.font = "25px serif";
    this.ctx.fillText(
      "Press Enter to play again",
      1000 / 2,
      300
    )

  }

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

    key('s', function(){
      if (this.game.ship.shields > 0) {
        this.game.ship.activateShield();
        this.game.ship.shields -= 1;
      }
    }.bind(this));
  };

  GameView.prototype.bindKeyHandlersMenu = function () {
    key('enter', function(){
      this.start();
      key.unbind('enter');
    }.bind(this));
  };

})();
