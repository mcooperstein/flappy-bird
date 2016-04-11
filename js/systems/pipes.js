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
