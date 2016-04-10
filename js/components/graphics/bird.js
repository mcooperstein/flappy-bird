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
