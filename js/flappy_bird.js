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
