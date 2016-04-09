(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var BirdGraphicsComponent = function (entity) {
    this.entity = entity;
};

BirdGraphicsComponent.prototype.draw = function (context, position, size) {
    //console.log("Drawing a bird");
    context.save();
    context.translate(position.x, position.y);
    context.scale(size, size);
    context.beginPath();
    context.arc(0, 0, 1, 0, 2 * Math.PI);
    context.fill();
    context.restore();
};

exports.BirdGraphicsComponent = BirdGraphicsComponent;

},{}],2:[function(require,module,exports){
var PipeGraphicsComponent = function (entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
    //console.log("Drawing a Pipe");
};

exports.PipeGraphicsComponent = PipeGraphicsComponent;

},{}],3:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/bird");

var Bird = function () {
    console.log("Creating Bird entity");

    var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: graphics
    };
};

exports.Bird = Bird;

},{"../components/graphics/bird":1}],4:[function(require,module,exports){
var graphicsComponent = require("../components/graphics/pipe");

var Pipe = function () {
    console.log("Creating Pipe entity");

    var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
        graphics: graphics
    };
};

exports.Pipe = Pipe;

},{"../components/graphics/pipe":2}],5:[function(require,module,exports){
var graphicsSystem = require('./systems/graphics');
var bird = require('./entities/bird');
var pipe = require('./entities/pipe');

var FlappyBird = function () {
    this.entities = [new bird.Bird()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

var FlappyPipe = function () {
    this.entities = [new pipe.Pipe()];
    this.graphics = new graphicsSystem.GraphicsSystem(this.entities);
};

FlappyBird.prototype.run = function () {
    this.graphics.run();
};

FlappyPipe.prototype.run = function () {
    this.graphics.run();
};

exports.FlappyBird = FlappyBird;
exports.FlappyPipe = FlappyPipe;

},{"./entities/bird":3,"./entities/pipe":4,"./systems/graphics":7}],6:[function(require,module,exports){
var flappyBird = require('./flappy_bird');
//var flappyPipe = require('./flappy_bird');

document.addEventListener('DOMContentLoaded', function () {
    var app = new flappyBird.FlappyBird();
    //var app = new flappyPipe.FlappyPipe();
    app.run();
});

},{"./flappy_bird":5}],7:[function(require,module,exports){
var GraphicsSystem = function (entities) {
    this.entities = entities;
    /*
    // Canvas is where we draw
    var canvas = document.getElementById("main-canvas");
    // Context is what we draw to
    var context = canvas.getContext("2d");
    */

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
    this.context.restore();
    // Continue the render loop
    window.requestAnimationFrame(this.tick.bind(this));
};

exports.GraphicsSystem = GraphicsSystem;

},{}]},{},[6]);
