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
'use strict';

var PipeGraphicsComponent = function (entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
    //console.log("Drawing a Pipe");
    var position = this.entity.components.physics.position;

    context.save();
    context.translate(position.x, position.y);
    context.beginPath();
    //context.fill(0, 0, this.entity.size.width, this.entity.size.height);
    context.fillRect(0, 0, 0.1, 1);
    context.closePath();
    context.restore();
};

//exports.PipeGraphicsComponent = PipeGraphicsComponent;
module.exports = PipeGraphicsComponent;

},{}],3:[function(require,module,exports){
'use strict';

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

},{}],4:[function(require,module,exports){
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

},{"../components/graphics/bird":1,"../components/physics/physics":3}],5:[function(require,module,exports){
'use strict';

var PipeGraphicsComponent = require("../components/graphics/pipe");
var PhysicsComponent = require("../components/physics/physics");

var Pipe = function (position) {
    //console.log("Creating Pipe entity");

    //var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new PipeGraphicsComponent(this),
        physics: new PhysicsComponent(this)
    };
    this.components.physics.position.x = position.x;
    this.components.physics.position.y = position.y;
    this.components.physics.velocity.x = -0.5;
};

module.exports = Pipe;

},{"../components/graphics/pipe":2,"../components/physics/physics":3}],6:[function(require,module,exports){
'use strict';

var GraphicsSystem = require('./systems/graphics');
var PhysicsSystem = require('./systems/physics');
var InputSystem = require('./systems/inputs');
var PipeSystem = require('./systems/pipes');

var Bird = require('./entities/bird');
//var Pipe = require('./entities/pipe');

var FlappyBird = function () {
    //this.entities = [new bird.Bird()];
    /*
    var gapPosition = randomRange(0.2, 0.8);
    var extraSpace = 0.2;

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }
    this.entities = [new Bird(), new Pipe({
        x: 0.7,
        y: (-gapPosition) - extraSpace
    }), new Pipe({
        x: 0.7,
        y: (1 - gapPosition) + extraSpace
    })];
    */
    /* this.entities = [new Bird(), new PipeSystem()]; */
    this.entities = [new Bird()];
    this.graphics = new GraphicsSystem(this.entities);
    this.physics = new PhysicsSystem(this.entities);
    this.inputs = new InputSystem(this.entities);
    this.pipes = new PipeSystem(this.entities);
    //this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
    //this.physics = new physicsSystem.PhysicsSystem(this.entities);
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
    this.physics.run();
    this.inputs.run();
    this.pipes.run();
};

module.exports = FlappyBird;

},{"./entities/bird":4,"./systems/graphics":8,"./systems/inputs":9,"./systems/physics":10,"./systems/pipes":11}],7:[function(require,module,exports){
'use strict';

var FlappyBird = require('./flappy_bird');
//var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new FlappyBird();
    //var app = new flappyBird.FlappyBird();
    //var app = new flappyPipe.FlappyPipe();
    app.run();
});

},{"./flappy_bird":6}],8:[function(require,module,exports){
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

        if (!('graphics' in entity.components)) {
            continue;
        }
        /*if (!'graphics' in entity.components) {
            continue;
        }*/
        entity.components.graphics.draw(this.context);
    }
    //restoring state
    this.context.restore();
    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

module.exports = GraphicsSystem;

},{}],9:[function(require,module,exports){
'use strict';

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
    /*var Bird = this.entities[0];
    Bird.components.physics.velocity.y = 0.9;*/
};

InputSystem.prototype.handleStart = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0.9;
    /*var Bird = this.entities[0];
    Bird.components.physics.velocity.y = 0.9;*/
};

InputSystem.prototype.handleEnd = function () {
    var bird = this.entities[0];
    bird.components.physics.velocity.y = 0;
    /*var Bird = this.entities[0];
    Bird.components.physics.velocity.y = 0;*/
};

module.exports = InputSystem;

},{}],10:[function(require,module,exports){
'use strict';

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
        /*if (!'physics' in entity.components) {
            continue;
        }*/

        if (!('physics' in entity.components)) {
            continue;
        }

        entity.components.physics.update(1 / 60);
    }
};

module.exports = PhysicsSystem;

},{}],11:[function(require,module,exports){
'use strict';

var Pipe = require('../entities/pipe');

var PipeSystem = function (entities) {
    this.entities = entities;
};

function randomRange(min, max) {
    return Math.random() * (max - min) + min;
};

PipeSystem.prototype.run = function () {
    this.tick();

    // Run the update loop
    window.setInterval(this.tick.bind(this), 2000);
};

PipeSystem.prototype.tick = function () {

    var gapPosition = randomRange(0.2, 0.8);
    var extraSpace = 0.2;

    /*this.entities = [new Pipe({
        x: 0.7,
        y: (-gapPosition) - extraSpace
    }), new Pipe({
        x: 0.7,
        y: (1 - gapPosition) + extraSpace
    })];*/
    this.entities.push(new Pipe({
        x: 0.7,
        y: (-gapPosition) - extraSpace
    }))
    this.entities.push(new Pipe({
        x: 0.7,
        y: (1 - gapPosition) + extraSpace
    }))
};

module.exports = PipeSystem;

},{"../entities/pipe":5}]},{},[7]);
