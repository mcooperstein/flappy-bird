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
