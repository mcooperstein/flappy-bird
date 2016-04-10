'use strict';

var PipeGraphicsComponent = require("../components/graphics/pipe");
var PhysicsComponent = require("../components/physics/physics");

var Pipe = function (position) {
    //console.log("Creating Pipe entity");

    //var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new PipeGraphicsComponent(this),
        physics: new PhysicsComponent(this)
    };
    this.components.physics.position.x = position.x;
    this.components.physics.position.y = position.y;
};

module.exports = Pipe;
