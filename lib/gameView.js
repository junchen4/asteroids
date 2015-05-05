(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.ctx = canvasEl.getContext("2d");

  };

  GameView.prototype.startMenu = function (img) {
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth * 0.99, window.innerHeight * 0.90);

    //Why doesn't this work???
    // var img = new Image();
    // img.src = 'images/space.jpg';
    // this.ctx.drawImage(img, -550, -50);

    this.ctx.font = "30px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";   
    this.ctx.fillText(
      "Press arrow keys to move ship, s for shield, and spacebar to fire.",
      window.innerWidth * 0.99 / 2,
      200
    );
    this.ctx.font = "25px serif";
    this.ctx.fillText(
      "Press Enter to start!",
      window.innerWidth * 0.99 / 2,
      300
    )    
  };

  GameView.prototype.start = function () {
    this.game = new Asteroids.Game();
    this.bindKeyHandlers();
    var img = new Image();
    img.src = 'images/space.jpg';
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
    this.keysID = setInterval(this.movementKeys.bind(this), 20);
    this.firingID = setInterval(this.firingKey.bind(this), 70);
    this.callbackID = setInterval(callback.bind(this.game, this.ctx), 20);
  };


  GameView.prototype.endGame = function () {
    window.clearInterval(this.callbackID);
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth * 0.99, window.innerHeight * 0.90);

    this.ctx.font = "40px serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";  
    this.ctx.fillText(
      "You scored " + this.game.asteroidsDestroyed + " points!",
      window.innerWidth * 0.99 / 2,
      100
    ); 
    this.ctx.font = "30px serif";
    this.ctx.fillText(
      "But the asteroids destroyed your ship...",
      window.innerWidth * 0.99 / 2,
      200
    );
    this.ctx.font = "25px serif";
    this.ctx.fillText(
      "Play again? Press enter.",
      window.innerWidth * 0.99 / 2,
      300
    )

  }

  GameView.prototype.movementKeys = function () {
    if (key.isPressed("up")) {
      this.game.ship.accelerate();
    }

    if (key.isPressed("down")) {
      this.game.ship.decelerate();
    }

    if (key.isPressed("left")) {
      this.game.ship.rotateLeft();
    }

    if (key.isPressed("right")) {
      this.game.ship.rotateRight();
    }
  };

  GameView.prototype.firingKey = function () {
    if (key.isPressed("space")) {
      this.game.ship.fireBullet();
    }
  };

  GameView.prototype.bindKeyHandlers = function() {
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
