(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var CircleCollisionComponent = function (entity, radius) {
    this.entity = entity;
    this.radius = radius;
    this.type = 'circle';
    //this.boolean = false;
};

CircleCollisionComponent.prototype.collidesWith = function (entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    } else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

CircleCollisionComponent.prototype.collideCircle = function (entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var radiusA = this.radius;
    var radiusB = entity.components.collision.radius;

    var diff = {
        x: positionA.x - positionB.x,
        y: positionA.y - positionB.y
    };

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    var radiusSum = radiusA + radiusB;

    return distanceSquared < radiusSum * radiusSum;
    //return false;
};

CircleCollisionComponent.prototype.collideRect = function (entity) {
    var clamp = function (value, low, high) {
        if (value < low) {
            return low;
        }
        if (value > high) {
            return high;
        }
        return value;
    };

    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;
    var sizeB = entity.components.collision.size;

    var closest = {
        x: clamp(positionA.x, positionB.x - sizeB.x / 2,
            positionB.x + sizeB.x / 2),
        y: clamp(positionA.y, positionB.y - sizeB.y / 2,
            positionB.y + sizeB.y / 2)
    };


    var radiusA = this.radius;

    var diff = {
        x: positionA.x - closest.x,
        y: positionA.y - closest.y
    };

    var distanceSquared = diff.x * diff.x + diff.y * diff.y;
    return distanceSquared < radiusA * radiusA;
    //return false;
};

module.exports = CircleCollisionComponent;

},{}],2:[function(require,module,exports){
'use strict';

var RectCollisionComponent = function (entity, size) {
    this.entity = entity;
    this.size = size;
    this.type = 'rect';
    //this.boolean = false;
};

RectCollisionComponent.prototype.collidesWith = function (entity) {
    if (entity.components.collision.type == 'circle') {
        return this.collideCircle(entity);
    } else if (entity.components.collision.type == 'rect') {
        return this.collideRect(entity);
    }
    return false;
};

RectCollisionComponent.prototype.collideCircle = function (entity) {
    return entity.components.collision.collideRect(this.entity);
};

RectCollisionComponent.prototype.collideRect = function (entity) {
    var positionA = this.entity.components.physics.position;
    var positionB = entity.components.physics.position;

    var sizeA = this.size;
    var sizeB = entity.components.collision.size;

    var leftA = positionA.x - sizeA.x / 2;
    var rightA = positionA.x + sizeA.x / 2;
    var bottomA = positionA.y - sizeA.y / 2;
    var topA = positionA.y + sizeA.y / 2;

    var leftB = positionB.x - sizeB.x / 2;
    var rightB = positionB.x + sizeB.x / 2;
    var bottomB = positionB.y - sizeB.y / 2;
    var topB = positionB.y + sizeB.y / 2;

    return !(leftA > rightB || leftB > rightA ||
        bottomA > topB || bottomB > topA);
    //return false;
};

module.exports = RectCollisionComponent;

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
    context.fillStyle = "green";
    context.fillRect(0, 0, 0.1, 1);
    context.closePath();
    context.restore();
};

//exports.PipeGraphicsComponent = PipeGraphicsComponent;
module.exports = PipeGraphicsComponent;

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");
var PhysicsComponent = require("../components/physics/physics");
//var CircleCollisionComponent = require("../components/collision/circle");
var CollisionComponent = require("../components/collision/circle");
//var Settings = require("../settings");

var Bird = function () {
    //console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    //var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);

    this.components = {
        graphics: new BirdGraphicsComponent(this),
        physics: new PhysicsComponent(this),
        collision: new CollisionComponent(this, 0.02)
            //collision: new CircleCollisionComponent(this, 0.02)
            //collision: collision,
            //physics: phyiscs,
            //graphics: graphics
    };
    this.components.physics.position.y = 0.5;
    this.components.physics.acceleration.y = -1.5;
    this.components.collision.onCollision = this.onCollision.bind(this);
};

Bird.prototype.onCollision = function (entity) {
    console.log("Bird collided with entity:", entity);
};

//exports.Bird = Bird;
module.exports = Bird;

},{"../components/collision/circle":1,"../components/graphics/bird":3,"../components/physics/physics":5}],7:[function(require,module,exports){
'use strict';

var PipeGraphicsComponent = require("../components/graphics/pipe");
var PhysicsComponent = require("../components/physics/physics");
var CollisionComponent = require('../components/collision/rect');

var Pipe = function (position) {
    //console.log("Creating Pipe entity");

    //var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new PipeGraphicsComponent(this),
        physics: new PhysicsComponent(this),
        collision: new CollisionComponent(this, 0.02)
    };
    this.components.physics.position.x = position.x;
    this.components.physics.position.y = position.y;
    this.components.physics.velocity.x = -0.5;
    this.components.collision.onCollision = this.onCollision.bind(this);
};

Pipe.prototype.onCollision = function (entity) {
    // console.log('Pipe collided with entity', entity);
};

module.exports = Pipe;

},{"../components/collision/rect":2,"../components/graphics/pipe":4,"../components/physics/physics":5}],8:[function(require,module,exports){
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

},{"./entities/bird":6,"./systems/graphics":11,"./systems/inputs":12,"./systems/physics":13,"./systems/pipes":14}],9:[function(require,module,exports){
'use strict';

var FlappyBird = require('./flappy_bird');
//var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new FlappyBird();
    //var app = new flappyBird.FlappyBird();
    //var app = new flappyPipe.FlappyPipe();
    app.run();
});

},{"./flappy_bird":8}],10:[function(require,module,exports){
'use strict';

var CollisionSystem = function (entities) {
    this.entities = entities;
};

CollisionSystem.prototype.tick = function () {
    for (var i = 0; i < this.entities.length; i++) {
        var entityA = this.entities[i];
        if (!'collision' in entityA.components) {
            continue;
        }

        for (var j = i + 1; j < this.entities.length; j++) {
            var entityB = this.entities[j];
            if (!'collision' in entityB.components) {
                continue;
            }

            if (!entityA.components.collision.collidesWith(entityB)) {
                continue;
            }

            if (entityA.components.collision.onCollision) {
                entityA.components.collision.onCollision(entityB);
            }

            if (entityB.components.collision.onCollision) {
                entityB.components.collision.onCollision(entityA);
            }
        }
    }
};

module.exports = CollisionSystem;

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
'use strict';

var PhysicsSystem = function (entities) {
    this.entities = entities;
    this.collisionSystem = new CollisionSystem(entities);
};
var CollisionSystem = require("./collision");

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
    this.collisionSystem.tick();
};

module.exports = PhysicsSystem;

},{"./collision":10}],14:[function(require,module,exports){
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

},{"../entities/pipe":7}]},{},[9]);
