'use strict';

var BirdGraphicsComponent = require("../components/graphics/bird");

var Bird = function () {
    console.log("Creating Bird entity");

    //var graphics = new graphicsComponent.BirdGraphicsComponent(this);
    this.components = {
        graphics: new BirdGraphicsComponent(this)
            //graphics: graphics
    };
};

//exports.Bird = Bird;
module.exports = Bird;
