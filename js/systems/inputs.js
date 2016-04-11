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
