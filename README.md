# asteroids.js

Browser-based remake of the classic arcade game

### [Play now!](http://www.junchen.me/asteroids/)

## How-to
* Use arrow keys to move in corresponding directions
* Press "spacebar" to fire
* Press "s" to activate shield (lasts several seconds)

## Features
* Keeps track of score, lives remaining, shields remaining

## Technical Goodies
* Written in JavaScript using HTML5 Canvas API
* Implements `inherits` function (in [util.js] class) for inheritance design pattern
* [Ship] class uses JavaScript 'Math' Object to calculate ship and bullet movement
* [Game] class determines collisions and removes appropriate objects

[util.js]: ./asteroids/lib/util.js
[Ship]: ./asteroids/lib/ship.js
[Game]: ./asteroids/lib/game.js

