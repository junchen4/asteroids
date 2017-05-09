# asteroids.js

Browser-based remake of the classic arcade game

### [Play now!](http://asteroids-jc.herokuapp.com)

## How-to
* Use arrow keys to move in corresponding directions
* Press "spacebar" to fire
* Press "s" to activate shield (lasts several seconds)

## Features
* Keeps track of score, lives remaining, shields remaining
* (future) Keep track of high-score, increase difficulty, add sound effects

## Technical Goodies
* Written in JavaScript using HTML5 Canvas API
* Implements `inherits` function (in [util.js] class) for inheritance design pattern
* [Ship] class uses JavaScript 'Math' Object to calculate ship and bullet movement
* [Game] class determines collisions and removes appropriate objects

[util.js]: ./lib/util.js
[Ship]: ./lib/ship.js
[Game]: ./lib/game.js

