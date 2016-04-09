'use strict';

var PipeGraphicsComponent = require("../components/graphics/pipe");

var Pipe = function () {
    console.log("Creating Pipe entity");

    //var graphics = new graphicsComponent.PipeGraphicsComponent(this);
    this.components = {
        graphics: new PipeGraphicsComponent(this)
    };
};

module.exports = Pipe;
