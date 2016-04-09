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
