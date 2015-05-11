(function () {
  if (typeof Asteroids === "undefined") {
    window.Asteroids = {};
  };

  var Util = Asteroids.Util = {};

  Util.inherits = function(ChildClass, ParentClass) {
    function Surrogate () {};
    Surrogate.prototype = ParentClass.prototype;
    ChildClass.prototype = new Surrogate();
  };

  Util.angleVec = function (angle, length) {
    var y = length * Math.sin(angle);
    var x = length * Math.cos(angle);
    return [x,y];
  }

  Util.randomVec = function (max) {
    var length = Math.random() * (max - 1) + 1

    var randomX = Math.random() - 0.5;
    var randomY = Math.random() - 0.5;
    if (randomX < 0) {
      randomX = -1;
    } else {
      randomX = 1;
    }

    if (randomY < 0) {
      randomY = -1;
    } else {
      randomY = 1;
    }

    var x = randomX * Math.floor(Math.random() * length);
    var y = randomY * Math.floor(Math.sqrt((length * length) - (x * x)));
    return [x,y];
  };

})();
