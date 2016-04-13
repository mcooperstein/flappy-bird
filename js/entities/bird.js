'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");
var PhysicsComponent = require("../components/physics/physics");
//var CircleCollisionComponent = require("../components/collision/circle");
var CollisionComponent = require("../components/collision/circle");
//var Settings = require("../settings");

var Bird = function () {
    //console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    //var collision = new collisionComponent.CircleCollisionComponent(this, 0.02);

    this.components = {
        graphics: new BirdGraphicsComponent(this),
        physics: new PhysicsComponent(this),
        collision: new CollisionComponent(this, 0.02)
            //collision: new CircleCollisionComponent(this, 0.02)
            //collision: collision,
            //physics: phyiscs,
            //graphics: graphics
    };
    this.components.physics.position.y = 0.5;
    this.components.physics.acceleration.y = -1.5;
    this.components.collision.onCollision = this.onCollision.bind(this);
};

Bird.prototype.onCollision = function (entity) {
    console.log("Bird collided with entity:", entity);
};

//exports.Bird = Bird;
module.exports = Bird;
