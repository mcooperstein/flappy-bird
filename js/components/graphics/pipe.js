'use strict';

var PipeGraphicsComponent = function (entity) {
    this.entity = entity;
};

PipeGraphicsComponent.prototype.draw = function (context) {
    //console.log("Drawing a Pipe");
};

//exports.PipeGraphicsComponent = PipeGraphicsComponent;
module.exports = PipeGraphicsComponent;
