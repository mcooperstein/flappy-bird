'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");
var PhysicsComponent = require("../components/physics/physics");

var Bird = function () {
    //console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    //var physics = new physicsComponent.PhysicsComponent(this);
    this.components = {
        graphics: new BirdGraphicsComponent(this),
        physics: new PhysicsComponent(this)
            //physics: phyiscs
            //graphics: graphics
    };
    this.components.physics.position.y = 0.5;
    this.components.physics.acceleration.y = -2;
};

//exports.Bird = Bird;
module.exports = Bird;
