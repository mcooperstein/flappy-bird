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
