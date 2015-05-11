(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var GameView = Asteroids.GameView = function (canvasEl) {
    this.ctx = canvasEl.getContext("2d");

  };

  GameView.prototype.startMenu = function (img) {
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    //Why doesn't this work???
    // var img = new Image();
    // img.src = 'images/space.jpg';
    // this.ctx.drawImage(img, -550, -50);

    this.ctx.font = "bold italic 40px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "white";  
    this.ctx.fillText(
      "Welcome to Asteroids",
      window.innerWidth / 2,
      window.innerHeight * 0.15
    ); 
    this.ctx.font = "32px sans-serif";
    this.ctx.fillText(
      "GAME CONTROLS:",
      window.innerWidth / 2,
      window.innerHeight * 0.30
    ); 
    this.ctx.font = "24px sans-serif";
    this.ctx.fillText(
      "'left/right': rotates ship counterclockwise/clockise",
      window.innerWidth / 2,
      window.innerHeight * 0.35
    );
    this.ctx.fillText(
       "'up/down': accelerates/decelerates ship",
      window.innerWidth / 2,
      window.innerHeight * 0.40
    );
    this.ctx.fillText(
      "'s': activates temporary shield",
      window.innerWidth / 2,
      window.innerHeight * 0.45
    );
    this.ctx.fillText(
      "'spacebar': fires bullets",
      window.innerWidth / 2,
      window.innerHeight * 0.50
    )    
    this.ctx.font = "bold 30px sans-serif";
    this.ctx.fillText(
      "Press enter to play",
      window.innerWidth / 2,
      window.innerHeight * 0.70
    )    
  };

  GameView.prototype.start = function () {
    this.game = new Asteroids.Game(this.ctx);
    this.bindKeyHandlers();
    var img = new Image();
    img.src = 'images/space.jpg';
    var callback = function (ctx) {
      this.step();
      this.draw(ctx, img);
      if (this.lives <= 0) {
        gameview.endGame();     
      }
    }
    var gameview = this;
    this.keysID = setInterval(this.movementKeys.bind(this), 20);
    this.firingID = setInterval(this.firingKey.bind(this), 90);
    this.callbackID = setInterval(callback.bind(this.game, this.ctx), 20);
  };

  GameView.prototype.endGame = function () {
    window.clearInterval(this.callbackID);
    this.bindKeyHandlersMenu();

    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    this.ctx.font = "40px sans-serif";
    this.ctx.textAlign = "center";
    this.ctx.fillStyle = "red";  
    this.ctx.fillText(
      "You scored " + this.game.asteroidsDestroyed + " points!",
      window.innerWidth * 0.99 / 2,
      150
    ); 
    this.ctx.font = "30px sans-serif";
    this.ctx.fillText(
      "The asteroids destroyed your ship...",
      window.innerWidth * 0.99 / 2,
      250
    );
    this.ctx.font = "25px sans-serif";
    this.ctx.fillText(
      "Play again? Press enter.",
      window.innerWidth * 0.99 / 2,
      350
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
