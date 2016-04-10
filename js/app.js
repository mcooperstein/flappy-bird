(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context) {
    //console.log("Drawing a bird");
    var position = this.entity.components.physics.position;
    /*
    var position = {
        x: 0,
        y: 0.5
    };
    */


    context.save();
    context.translate(position.x, position.y);
    //context.scale(size, size);
    context.beginPath();
    context.arc(0, 0, 0.02, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
    context.restore();
};

module.exports = BirdGraphicsComponent;

},{}],2:[function(require,module,exports){
var PhysicsComponent = function (entity) {
    this.entity = entity;

    this.position = {
        x: 0,
        y: 0
    };
    this.velocity = {
        x: 0,
        y: 0
    };
    this.acceleration = {
        x: 0,
        y: 0
    };
};

PhysicsComponent.prototype.update = function (delta) {
    this.velocity.x += this.acceleration.x * delta;
    this.velocity.y += this.acceleration.y * delta;

    this.position.x += this.velocity.x * delta;
    this.position.y += this.velocity.y * delta;
};

//exports.PhysicsComponent = PhysicsComponent;
module.exports = PhysicsComponent;

},{}],3:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");
var PhysicsComponent = require("../components/physics/physics");

var Bird = function () {
    //console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new BirdGraphicsComponent(this),
        physics: new PhysicsComponent(this)
            //physics: phyiscs
            //graphics: graphics
    };
    this.components.physics.position.y = 0.5;
    this.components.physics.acceleration.y = -1.5;
};

//exports.Bird = Bird;
module.exports = Bird;

},{"../components/graphics/bird":1,"../components/physics/physics":2}],4:[function(require,module,exports){
'use strict';

var GraphicsSystem = require('./systems/graphics');
var PhysicsSystem = require('./systems/physics');
var InputSystem = require('./systems/inputs');

var Bird = require('./entities/bird');
//var pipe = require('./entities/pipe');

var FlappyBird = function () {
    //this.entities = [new bird.Bird()];
    this.entities = [new Bird()];
    this.graphics = new GraphicsSystem(this.entities);
    this.physics = new PhysicsSystem(this.entities);
    this.inputs = new InputSystem(this.entities);
    //this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    //this.physics = new physicsSystem.PhysicsSystem(this.entities);
};

/*var FlappyPipe = function () {
    this.entities = [new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};*/

FlappyBird.prototype.run = function () {
    this.graphics.run();
    this.physics.run();
    this.inputs.run();
};

/*FlappyPipe.prototype.run = function () {
    this.graphics.run();
};*/

module.exports = FlappyBird;
//exports.FlappyPipe = FlappyPipe;

},{"./entities/bird":3,"./systems/graphics":6,"./systems/inputs":7,"./systems/physics":8}],5:[function(require,module,exports){
'use strict';

var FlappyBird = require('./flappy_bird');
//var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new FlappyBird();
    //var app = new flappyBird.FlappyBird();
    //var app = new flappyPipe.FlappyPipe();
    app.run();
});

},{"./flappy_bird":4}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
var InputSystem = function (entities) {
    this.entities = entities;

    // Canvas is where we get input from
    this.canvas = document.getElementById('main-canvas');
};

InputSystem.prototype.run = function () {
    this.canvas.addEventListener('click', this.onClick.bind(this));
    this.canvas.addEventListener('touchstart', this.handleStart.bind(this));
    this.canvas.addEventListener('touchend', this.handleEnd.bind(this));
};

InputSystem.prototype.onClick = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.9;
};

InputSystem.prototype.handleStart = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.9;
};

InputSystem.prototype.handleEnd = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0;
};

module.exports = InputSystem;

},{}],8:[function(require,module,exports){
var PhysicsSystem = function (entities) {
    this.entities = entities;
};

PhysicsSystem.prototype.run = function () {
    // Run the update loop
    window.setInterval(this.tick.bind(this), 1000 / 60);
};

PhysicsSystem.prototype.tick = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entity = this.entities[i];
        if (!'physics' in entity.components) {
            continue;
        }

        entity.components.physics.update(1 / 60);
    }
};

module.exports = PhysicsSystem;

},{}]},{},[5]);
