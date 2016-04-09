(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    //console.log("Drawing a bird");
    //var position = this.entity.components.physics.position;

    //context.save();
    //context.translate(position.x, position.y);
    //context.scale(size, size);
    context.beginPath();
    //context.arc(60, 60, 20, 0, 2 * Math.PI);
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.fill();
    //context.restore();
};

module.exports = BirdGraphicsComponent;

},{}],2:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");

var Bird = function () {
    console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: new BirdGraphicsComponent(this)
            //graphics: graphics
    };
};

//exports.Bird = Bird;
module.exports = Bird;

},{"../components/graphics/bird":1}],3:[function(require,module,exports){
'use strict';

var GraphicsSystem = require('./systems/graphics');

var Bird = require('./entities/bird');
//var pipe = require('./entities/pipe');

var FlappyBird = function () {
    //this.entities = [new bird.Bird()];
    this.entities = [new Bird()];
    this.graphics = new GraphicsSystem(this.entities);
    //this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

/*var FlappyPipe = function () {
    this.entities = [new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};*/

FlappyBird.prototype.run = function () {
    this.graphics.run();
};

/*FlappyPipe.prototype.run = function () {
    this.graphics.run();
};*/

module.exports = FlappyBird;
//exports.FlappyPipe = FlappyPipe;

},{"./entities/bird":2,"./systems/graphics":5}],4:[function(require,module,exports){
'use strict';

var FlappyBird = require('./flappy_bird');
//var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new FlappyBird();
    //var app = new flappyBird.FlappyBird();
    //var app = new flappyPipe.FlappyPipe();
    app.run();
});

},{"./flappy_bird":3}],5:[function(require,module,exports){
'use strict';

var GraphicsSystem = function (entities) {
    this.entities = entities;
    // Canvas is where we draw
    this.canvas = document.getElementById('main-canvas');
    // Context is what we draw to
    this.context = this.canvas.getContext('2d');

};

GraphicsSystem.prototype.run = function () {
    // Run the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

GraphicsSystem.prototype.tick = function () {
    // Set the canvas to the correct size if the window is resized
    if (this.canvas.width != this.canvas.offsetWidth ||
        this.canvas.height != this.canvas.offsetHeight) {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }

    // Clear the canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //Saving and restoring state
    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height);
    this.context.scale(this.canvas.height, -this.canvas.height);

    // Rendering goes here
    for (var i = 0; i < this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'graphics' in entity.components) {
            continue;
        }

        entity.components.graphics.draw(this.context);
    }
    //restoring state
    this.context.restore();
    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

module.exports = GraphicsSystem;

},{}]},{},[4]);
