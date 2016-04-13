'use strict';

var PipeGraphicsComponent = require("../components/graphics/pipe");
var PhysicsComponent = require("../components/physics/physics");
var CollisionComponent = require('../components/collision/rect');

var Pipe = function (position) {
    //console.log("Creating Pipe entity");

    //var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new PipeGraphicsComponent(this),
        physics: new PhysicsComponent(this),
        collision: new CollisionComponent(this, 0.02)
    };
    this.components.physics.position.x = position.x;
    this.components.physics.position.y = position.y;
    this.components.physics.velocity.x = -0.5;
    this.components.collision.onCollision = this.onCollision.bind(this);
};

Pipe.prototype.onCollision = function (entity) {
    // console.log('Pipe collided with entity', entity);
};

module.exports = Pipe;
